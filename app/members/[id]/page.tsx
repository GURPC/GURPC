'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, Users, BookOpen, GraduationCap, Github, Globe, ExternalLink,
  Calendar, FileText, Cpu, Folder, Mail
} from 'lucide-react';
import type { Profile, Paper, ResearchGroup } from '@/lib/supabase/types';
import GlowingOrb from '@/components/effects/GlowingOrb';

const statusColors: Record<string, string> = {
  draft: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
  submitted: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  under_review: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  accepted: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  published: 'bg-green-500/10 text-green-400 border-green-500/20',
};

const statusLabels: Record<string, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  under_review: 'Under Review',
  accepted: 'Accepted',
  published: 'Published',
};

export default function MemberProfilePage() {
  const [member, setMember] = useState<Profile | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [groups, setGroups] = useState<ResearchGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const memberId = params.id as string;

  const fetchMember = useCallback(async () => {
    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Fetch profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', memberId)
      .single();

    if (error || !profile) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setMember(profile as Profile);

    // Fetch member's papers and groups in parallel
    const [papersRes, groupsRes] = await Promise.all([
      supabase
        .from('papers')
        .select('*')
        .eq('user_id', memberId)
        .order('created_at', { ascending: false }),
      supabase
        .from('group_members')
        .select('research_groups(*)')
        .eq('user_id', memberId),
    ]);

    setPapers((papersRes.data || []) as Paper[]);
    setGroups(
      (groupsRes.data || [])
        .map((gm: Record<string, unknown>) => gm.research_groups as unknown as ResearchGroup)
        .filter(Boolean)
    );
    setLoading(false);
  }, [supabase, router, memberId]);

  useEffect(() => {
    if (memberId && memberId !== 'placeholder') {
      fetchMember();
    }
  }, [fetchMember, memberId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020a04] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
          <span className="text-green-400/60 font-mono text-sm">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (notFound || !member) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020a04] flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-green-500/20 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Member Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 font-mono text-sm">This profile doesn&apos;t exist or has been removed.</p>
          <Link href="/members" className="text-green-500 hover:text-green-400 font-mono text-sm">
            &larr; Back to Members
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020a04] pt-24 pb-12 px-4 relative overflow-hidden">
      <GlowingOrb color="bg-green-500" size="w-[500px] h-[500px]" position="top-[10%] left-[-200px]" blur="blur-[150px]" opacity="opacity-5" />
      <GlowingOrb color="bg-cyan-500" size="w-[400px] h-[400px]" position="bottom-[10%] right-[-150px]" blur="blur-[120px]" opacity="opacity-5" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back link */}
        <Link href="/members" className="inline-flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors font-mono text-sm mb-8">
          <ArrowLeft className="w-4 h-4" /> back_to_members()
        </Link>

        {/* Profile Header Card */}
        <div className="cyber-card rounded-2xl p-6 md:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/20 flex items-center justify-center shrink-0 overflow-hidden relative">
              {member.photo_url ? (
                <Image
                  src={member.photo_url}
                  alt={member.name || ''}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              ) : (
                <span className="text-green-400 font-bold text-4xl md:text-5xl">
                  {member.name?.charAt(0)?.toUpperCase() || '?'}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {member.name || 'Unnamed Member'}
                </h1>
                {member.role !== 'member' && (
                  <span className="tech-badge px-2.5 py-0.5 rounded text-[10px] font-mono uppercase inline-block w-fit mx-auto sm:mx-0">
                    {member.role}
                  </span>
                )}
              </div>

              {member.department && (
                <p className="text-green-600 dark:text-green-400 font-mono text-sm mb-1">
                  {member.department}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                {member.batch_year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Batch {member.batch_year}
                  </span>
                )}
                {member.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" /> {member.email}
                  </span>
                )}
              </div>

              {member.bio && (
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed max-w-2xl">
                  {member.bio}
                </p>
              )}

              {/* Academic Links */}
              <div className="flex flex-wrap gap-3 mt-4">
                {member.google_scholar_url && (
                  <a href={member.google_scholar_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors">
                    <GraduationCap className="w-3.5 h-3.5" /> Google Scholar
                  </a>
                )}
                {member.github_url && (
                  <a href={member.github_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors">
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                )}
                {member.researchgate_url && (
                  <a href={member.researchgate_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors">
                    <BookOpen className="w-3.5 h-3.5" /> ResearchGate
                  </a>
                )}
                {member.orcid_url && (
                  <a href={member.orcid_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" /> ORCID
                  </a>
                )}
                {member.ieee_url && (
                  <a href={member.ieee_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" /> IEEE
                  </a>
                )}
                {member.website_url && (
                  <a href={member.website_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors">
                    <Globe className="w-3.5 h-3.5" /> Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Research Interests */}
          {member.research_interests && member.research_interests.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-green-900/20">
              <h3 className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Research Interests</h3>
              <div className="flex flex-wrap gap-2">
                {member.research_interests.map(interest => (
                  <span
                    key={interest}
                    className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 font-mono"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Publications */}
        <div className="cyber-card rounded-2xl p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <FileText className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Publications</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{papers.length} paper{papers.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {papers.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500 font-mono text-center py-6">No publications yet</p>
          ) : (
            <div className="space-y-3">
              {papers.map(paper => (
                <div key={paper.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-[#0a1a0f] border border-slate-100 dark:border-green-900/20">
                  <BookOpen className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white">{paper.title}</h4>
                      <span className={`shrink-0 px-2 py-0.5 rounded text-[9px] font-mono uppercase border ${statusColors[paper.status] || statusColors.draft}`}>
                        {statusLabels[paper.status] || paper.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-mono">
                      {paper.year && <span>{paper.year}</span>}
                      {paper.co_authors && paper.co_authors.length > 0 && (
                        <span>with {paper.co_authors.join(', ')}</span>
                      )}
                    </div>
                    {paper.doi_url && (
                      <a href={paper.doi_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-1.5 text-xs text-green-500 hover:text-green-400 font-mono">
                        <ExternalLink className="w-3 h-3" /> View Paper
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Research Groups */}
        <div className="cyber-card rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <Folder className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Research Groups</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{groups.length} group{groups.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {groups.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500 font-mono text-center py-6">Not a member of any group yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {groups.map(group => (
                <Link
                  key={group.id}
                  href={`/groups/${group.id}`}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-[#0a1a0f] border border-slate-100 dark:border-green-900/20 hover:border-green-500/30 transition-colors group/card"
                >
                  <Cpu className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white group-hover/card:text-green-500 transition-colors">{group.title}</h4>
                    {group.domain && (
                      <span className="text-[10px] text-green-500/60 font-mono">{group.domain}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
