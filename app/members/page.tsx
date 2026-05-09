'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Search, Cpu, GraduationCap, BookOpen, Github, Globe, ExternalLink } from 'lucide-react';
import type { Profile } from '@/lib/supabase/types';
import GlowingOrb from '@/components/effects/GlowingOrb';

export default function MembersPage() {
  const [members, setMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const supabase = createClient();
  const router = useRouter();

  const fetchMembers = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    setMembers((data || []) as Profile[]);
    setLoading(false);
  }, [supabase, router]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const departments = Array.from(new Set(members.map(m => m.department).filter(Boolean))) as string[];

  const filteredMembers = members.filter(m => {
    const matchDept = deptFilter === 'all' || m.department === deptFilter;
    const matchSearch = !search ||
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.department?.toLowerCase().includes(search.toLowerCase()) ||
      m.research_interests?.some(i => i.toLowerCase().includes(search.toLowerCase()));
    return matchDept && matchSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020a04] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
          <span className="text-green-400/60 font-mono text-sm">Loading members...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020a04] pt-24 pb-12 px-4 relative overflow-hidden">
      <GlowingOrb color="bg-green-500" size="w-[500px] h-[500px]" position="top-[20%] left-[-200px]" blur="blur-[150px]" opacity="opacity-5" />
      <GlowingOrb color="bg-cyan-500" size="w-[400px] h-[400px]" position="bottom-[10%] right-[-150px]" blur="blur-[120px]" opacity="opacity-5" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <span className="tech-badge inline-flex items-center px-3 py-1 rounded-full text-xs mb-3 gap-2">
            <Cpu className="h-3 w-3" /> COMMUNITY
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Active <span className="text-green-600 dark:text-green-400">Members</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-mono text-sm">
            {members.length} registered members in the GURPC community
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, or interests..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0a1a0f] border border-slate-200 dark:border-green-900/30 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/30"
            />
          </div>
        </div>

        {/* Department Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setDeptFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
              deptFilter === 'all'
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                : 'bg-white dark:bg-[#0a1a0f] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-green-900/30 hover:border-green-500/30'
            }`}
          >
            ALL ({members.length})
          </button>
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                deptFilter === dept
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                  : 'bg-white dark:bg-[#0a1a0f] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-green-900/30 hover:border-green-500/30'
              }`}
            >
              {dept} ({members.filter(m => m.department === dept).length})
            </button>
          ))}
        </div>

        {/* Members Grid */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-12 h-12 text-green-500/30 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-mono">No members found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map(member => (
              <Link
                key={member.id}
                href={`/members/${member.id}`}
                className="cyber-card rounded-xl p-5 group hover:border-green-500/30 transition-all block"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/20 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {member.photo_url ? (
                      <Image
                        src={member.photo_url}
                        alt={member.name || ''}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-green-400 font-bold text-lg">
                        {member.name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors">
                      {member.name || 'Unnamed Member'}
                    </h3>
                    {member.department && (
                      <p className="text-xs text-green-600/70 dark:text-green-400/70 font-mono mt-0.5 truncate">
                        {member.department}
                      </p>
                    )}
                    {member.batch_year && (
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                        Batch {member.batch_year}
                      </p>
                    )}
                  </div>

                  {/* Role badge */}
                  {member.role !== 'member' && (
                    <span className="tech-badge px-2 py-0.5 rounded text-[9px] font-mono uppercase shrink-0">
                      {member.role}
                    </span>
                  )}
                </div>

                {/* Bio */}
                {member.bio && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>
                )}

                {/* Research Interests */}
                {member.research_interests && member.research_interests.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {member.research_interests.slice(0, 3).map(interest => (
                      <span
                        key={interest}
                        className="px-2 py-0.5 rounded-full text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 font-mono"
                      >
                        {interest}
                      </span>
                    ))}
                    {member.research_interests.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        +{member.research_interests.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-green-900/20">
                  {member.google_scholar_url && (
                    <a href={member.google_scholar_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-500 transition-colors" title="Google Scholar">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.github_url && (
                    <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-500 transition-colors" title="GitHub">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.researchgate_url && (
                    <a href={member.researchgate_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-500 transition-colors" title="ResearchGate">
                      <BookOpen className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.website_url && (
                    <a href={member.website_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-500 transition-colors" title="Website">
                      <Globe className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.orcid_url && (
                    <a href={member.orcid_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-green-500 transition-colors" title="ORCID">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
