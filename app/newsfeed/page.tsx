'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Cpu, Bell, BookOpen, Users, Folder, FileText, Calendar,
  ExternalLink, ArrowRight, Megaphone, Newspaper
} from 'lucide-react';
import type { Paper, ResearchGroup, Project, Profile } from '@/lib/supabase/types';
import GlowingOrb from '@/components/effects/GlowingOrb';

interface FeedItem {
  id: string;
  type: 'paper' | 'group' | 'project';
  title: string;
  description: string;
  author: string;
  authorId: string;
  date: string;
  meta?: string;
  link?: string;
}

export default function NewsfeedPage() {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'paper' | 'group' | 'project'>('all');
  const supabase = createClient();
  const router = useRouter();

  const fetchFeed = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Fetch recent papers, groups, and projects in parallel
    const [papersRes, groupsRes, projectsRes] = await Promise.all([
      supabase
        .from('papers')
        .select('*, profiles(name)')
        .order('created_at', { ascending: false })
        .limit(20),
      supabase
        .from('research_groups')
        .select('*, profiles:created_by(name)')
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(20),
      supabase
        .from('projects')
        .select('*, profiles:created_by(name)')
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(20),
    ]);

    const items: FeedItem[] = [];

    // Papers
    (papersRes.data || []).forEach((paper: Record<string, unknown>) => {
      const p = paper as unknown as Paper & { profiles: Pick<Profile, 'name'> | null };
      items.push({
        id: `paper-${p.id}`,
        type: 'paper',
        title: p.title,
        description: p.co_authors?.length
          ? `Co-authored with ${p.co_authors.join(', ')}`
          : 'New research paper added',
        author: p.profiles?.name || 'A member',
        authorId: p.user_id,
        date: p.created_at,
        meta: p.status === 'published' ? 'Published' : p.status?.replace('_', ' '),
        link: p.doi_url || undefined,
      });
    });

    // Groups
    (groupsRes.data || []).forEach((group: Record<string, unknown>) => {
      const g = group as unknown as ResearchGroup & { profiles: Pick<Profile, 'name'> | null };
      items.push({
        id: `group-${g.id}`,
        type: 'group',
        title: g.title,
        description: g.description || 'New research group created',
        author: g.profiles?.name || 'A member',
        authorId: g.created_by,
        date: g.created_at,
        meta: g.domain,
        link: `/groups/${g.id}`,
      });
    });

    // Projects
    (projectsRes.data || []).forEach((project: Record<string, unknown>) => {
      const pr = project as unknown as Project & { profiles: Pick<Profile, 'name'> | null };
      items.push({
        id: `project-${pr.id}`,
        type: 'project',
        title: pr.title,
        description: pr.description || 'New research project started',
        author: pr.profiles?.name || 'A member',
        authorId: pr.created_by,
        date: pr.created_at,
        meta: `${pr.progress_percentage || 0}% complete`,
        link: `/projects/${pr.id}`,
      });
    });

    // Sort by date descending
    items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setFeed(items);
    setLoading(false);
  }, [supabase, router]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const filteredFeed = filter === 'all' ? feed : feed.filter(item => item.type === filter);

  const typeConfig = {
    paper: { icon: FileText, label: 'Publication', color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20' },
    group: { icon: Users, label: 'Research Group', color: 'text-cyan-500', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    project: { icon: Folder, label: 'Project', color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/20' },
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020a04] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
          <span className="text-green-400/60 font-mono text-sm">Loading newsfeed...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020a04] pt-24 pb-12 px-4 relative overflow-hidden">
      <GlowingOrb color="bg-green-500" size="w-[500px] h-[500px]" position="top-[20%] left-[-200px]" blur="blur-[150px]" opacity="opacity-5" />
      <GlowingOrb color="bg-cyan-500" size="w-[400px] h-[400px]" position="bottom-[10%] right-[-150px]" blur="blur-[120px]" opacity="opacity-5" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <span className="tech-badge inline-flex items-center px-3 py-1 rounded-full text-xs mb-3 gap-2">
            <Newspaper className="h-3 w-3" /> LIVE FEED
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Community <span className="text-green-600 dark:text-green-400">Newsfeed</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-mono text-sm">
            Latest updates from the GURPC community — papers, groups, and projects
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { key: 'all' as const, label: 'All Updates', count: feed.length },
            { key: 'paper' as const, label: 'Publications', count: feed.filter(f => f.type === 'paper').length },
            { key: 'group' as const, label: 'Groups', count: feed.filter(f => f.type === 'group').length },
            { key: 'project' as const, label: 'Projects', count: feed.filter(f => f.type === 'project').length },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                filter === f.key
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                  : 'bg-white dark:bg-[#0a1a0f] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-green-900/30 hover:border-green-500/30'
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        {/* Feed Items */}
        {filteredFeed.length === 0 ? (
          <div className="text-center py-20">
            <Bell className="w-12 h-12 text-green-500/30 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-mono">No updates yet</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              Activity will appear here when members add papers, create groups, or start projects.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFeed.map((item) => {
              const config = typeConfig[item.type];
              const Icon = config.icon;

              return (
                <div
                  key={item.id}
                  className="cyber-card rounded-xl p-5 hover:border-green-500/30 transition-all"
                >
                  <div className="flex gap-4">
                    {/* Type Icon */}
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${config.bg}`}>
                      <Icon className={`w-5 h-5 ${config.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        {item.meta && (
                          <span className={`shrink-0 px-2 py-0.5 rounded text-[9px] font-mono uppercase border ${config.bg} ${config.color}`}>
                            {item.meta}
                          </span>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-green-900/20">
                        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-mono">
                          <Link
                            href={`/members/${item.authorId}`}
                            className="hover:text-green-500 transition-colors"
                          >
                            {item.author}
                          </Link>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(item.date)}
                          </span>
                        </div>
                        {item.link && (
                          <Link
                            href={item.link}
                            target={item.link.startsWith('http') ? '_blank' : undefined}
                            rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-xs text-green-500 hover:text-green-400 font-mono flex items-center gap-1 transition-colors"
                          >
                            View <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
