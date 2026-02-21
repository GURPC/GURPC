'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Users, Search, Plus, Globe, Lock, ArrowRight, Cpu } from 'lucide-react';
import type { ResearchGroup } from '@/lib/supabase/types';
import GlowingOrb from '@/components/effects/GlowingOrb';

interface GroupWithCount extends ResearchGroup {
  group_members: { count: number }[];
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<GroupWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const supabase = createClient();

  const fetchGroups = useCallback(async () => {
    const { data } = await supabase
      .from('research_groups')
      .select('*, group_members(count)')
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    setGroups((data || []) as unknown as GroupWithCount[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const domains = Array.from(new Set(groups.map(g => g.domain).filter(Boolean)));

  const filteredGroups = groups.filter(g => {
    const matchFilter = filter === 'all' || g.domain === filter;
    const matchSearch = !search || 
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.description?.toLowerCase().includes(search.toLowerCase()) ||
      g.domain?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020a04] pt-24 pb-12 px-4 relative overflow-hidden">
      <GlowingOrb color="bg-green-500" size="w-[500px] h-[500px]" position="top-[20%] left-[-200px]" blur="blur-[150px]" opacity="opacity-5" />
      <GlowingOrb color="bg-cyan-500" size="w-[400px] h-[400px]" position="bottom-[10%] right-[-150px]" blur="blur-[120px]" opacity="opacity-5" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="tech-badge inline-flex items-center px-3 py-1 rounded-full text-xs mb-3 gap-2">
              <Cpu className="h-3 w-3" /> RESEARCH NETWORK
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Research <span className="text-green-600 dark:text-green-400">Groups</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-mono text-sm">
              Find and join domain-specific research communities
            </p>
          </div>
          <Link
            href="/groups/create"
            className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-green-500/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Group
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search groups..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-green-500/15 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-green-500/40 focus:border-green-500/40 transition-all font-mono text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-2 rounded-lg text-xs font-mono transition-all border ${
                filter === 'all'
                  ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
                  : 'border-slate-200 dark:border-green-500/10 text-slate-500 dark:text-slate-400 hover:border-green-500/30'
              }`}
            >
              All
            </button>
            {domains.map(d => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-3 py-2 rounded-lg text-xs font-mono transition-all border ${
                  filter === d
                    ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
                    : 'border-slate-200 dark:border-green-500/10 text-slate-500 dark:text-slate-400 hover:border-green-500/30'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
              <span className="text-green-600/60 dark:text-green-400/60 font-mono text-sm">Fetching groups...</span>
            </div>
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/15 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-green-600/40 dark:text-green-400/40" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No groups found</h3>
            <p className="text-slate-500 dark:text-slate-400 font-mono text-sm">
              {search || filter !== 'all' ? 'Try adjusting your search or filters.' : 'Be the first to create a research group!'}
            </p>
            <Link
              href="/groups/create"
              className="inline-flex items-center gap-2 mt-4 text-green-600 dark:text-green-400 font-mono text-sm hover:underline"
            >
              Create a group <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ) : (
          <>
            <p className="text-slate-400 dark:text-green-400/40 font-mono text-xs mb-4">
              {filteredGroups.length} group{filteredGroups.length !== 1 ? 's' : ''} found
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGroups.map((group) => {
                const memberCount = group.group_members?.[0]?.count || 0;
                return (
                  <Link
                    key={group.id}
                    href={`/groups/${group.id}`}
                    className="cyber-card rounded-xl p-5 hover:border-green-500/30 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/5 to-transparent blur-2xl group-hover:opacity-100 opacity-0 transition-opacity" />
                    
                    <div className="flex items-start justify-between mb-3 relative z-10">
                      <span className="text-xs px-2.5 py-1 rounded-full border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 font-mono">
                        {group.domain}
                      </span>
                      <span className="text-slate-400">
                        {group.is_public ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2 relative z-10">
                      {group.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 relative z-10">
                      {group.description}
                    </p>

                    {group.tags && group.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3 relative z-10">
                        {group.tags.slice(0, 4).map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-green-500/5 text-slate-500 dark:text-green-400/60 font-mono border border-slate-200 dark:border-green-500/10">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200 dark:border-green-500/10 relative z-10">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                        <Users className="w-3.5 h-3.5" />
                        {memberCount} member{memberCount !== 1 ? 's' : ''}
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        {new Date(group.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
