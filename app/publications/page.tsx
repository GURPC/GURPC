'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { BookOpen, Search, Cpu, FileText, ExternalLink, Users, Calendar } from 'lucide-react';
import type { Paper, Profile } from '@/lib/supabase/types';
import GlowingOrb from '@/components/effects/GlowingOrb';

interface PaperWithAuthor extends Paper {
  profiles: Pick<Profile, 'name' | 'department'> | null;
}

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

export default function PublicationsPage() {
  const [papers, setPapers] = useState<PaperWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const supabase = createClient();
  const router = useRouter();

  const fetchPapers = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const { data } = await supabase
      .from('papers')
      .select('*, profiles(name, department)')
      .order('created_at', { ascending: false });

    setPapers((data || []) as unknown as PaperWithAuthor[]);
    setLoading(false);
  }, [supabase, router]);

  useEffect(() => {
    fetchPapers();
  }, [fetchPapers]);

  const statuses = Array.from(new Set(papers.map(p => p.status).filter(Boolean))) as string[];

  const filteredPapers = papers.filter(p => {
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.co_authors?.some(a => a.toLowerCase().includes(search.toLowerCase())) ||
      p.profiles?.name?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020a04] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
          <span className="text-green-400/60 font-mono text-sm">Loading publications...</span>
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
            <Cpu className="h-3 w-3" /> RESEARCH OUTPUT
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Community <span className="text-green-600 dark:text-green-400">Publications</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-mono text-sm">
            {papers.length} papers submitted by GURPC members
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title, author..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#0a1a0f] border border-slate-200 dark:border-green-900/30 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/30"
            />
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
              statusFilter === 'all'
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                : 'bg-white dark:bg-[#0a1a0f] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-green-900/30 hover:border-green-500/30'
            }`}
          >
            ALL ({papers.length})
          </button>
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                statusFilter === status
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                  : 'bg-white dark:bg-[#0a1a0f] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-green-900/30 hover:border-green-500/30'
              }`}
            >
              {statusLabels[status] || status} ({papers.filter(p => p.status === status).length})
            </button>
          ))}
        </div>

        {/* Papers List */}
        {filteredPapers.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-green-500/30 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-mono">No publications found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPapers.map(paper => (
              <div
                key={paper.id}
                className="cyber-card rounded-xl p-5 group hover:border-green-500/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-green-500" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors">
                        {paper.title}
                      </h3>
                      <span className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${statusColors[paper.status] || statusColors.draft}`}>
                        {statusLabels[paper.status] || paper.status}
                      </span>
                    </div>

                    {/* Author & Meta */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {paper.profiles?.name && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" /> {paper.profiles.name}
                          {paper.profiles.department && (
                            <span className="text-slate-400 dark:text-slate-500">({paper.profiles.department})</span>
                          )}
                        </span>
                      )}
                      {paper.year && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {paper.year}
                        </span>
                      )}
                    </div>

                    {/* Co-Authors */}
                    {paper.co_authors && paper.co_authors.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {paper.co_authors.map(author => (
                          <span
                            key={author}
                            className="px-2 py-0.5 rounded-full text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 font-mono"
                          >
                            {author}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* DOI Link */}
                    {paper.doi_url && (
                      <a
                        href={paper.doi_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-3 text-xs text-green-500 hover:text-green-400 font-mono transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" /> View Paper
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
