'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Terminal, FileText, Users, Folder, Trophy, ArrowRight, Plus, Activity, Zap, BookOpen, Code } from 'lucide-react';
import type { Profile, Paper, ResearchGroup, Project } from '@/lib/supabase/types';
import GlowingOrb from '@/components/effects/GlowingOrb';

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [groups, setGroups] = useState<ResearchGroup[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  const fetchData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const [profileRes, papersRes, groupsRes, projectsRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('papers').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      supabase.from('group_members').select('group_id, role, research_groups(*)').eq('user_id', user.id),
      supabase.from('project_members').select('project_id, role, projects(*)').eq('user_id', user.id),
    ]);

    setProfile(profileRes.data as Profile | null);
    setPapers((papersRes.data || []) as Paper[]);
    setGroups((groupsRes.data || []).map((gm: Record<string, unknown>) => gm.research_groups as unknown as ResearchGroup).filter(Boolean));
    setProjects((projectsRes.data || []).map((pm: Record<string, unknown>) => pm.projects as unknown as Project).filter(Boolean));
    setLoading(false);
  }, [supabase, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020a04] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
          <span className="text-green-400/60 font-mono text-sm">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const stats = [
    { label: 'Papers', count: papers.length, icon: FileText, color: 'from-green-500 to-emerald-600' },
    { label: 'Groups', count: groups.length, icon: Users, color: 'from-cyan-500 to-blue-600' },
    { label: 'Projects', count: projects.length, icon: Folder, color: 'from-purple-500 to-violet-600' },
    { label: 'Published', count: papers.filter(p => p.status === 'published').length, icon: Trophy, color: 'from-amber-500 to-orange-600' },
  ];

  const statusColors: Record<string, string> = {
    draft: 'border-slate-500/30 text-slate-600 dark:text-slate-400 bg-slate-500/10',
    submitted: 'border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10',
    under_review: 'border-yellow-500/30 text-yellow-600 dark:text-yellow-400 bg-yellow-500/10',
    accepted: 'border-green-500/30 text-green-600 dark:text-green-400 bg-green-500/10',
    published: 'border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10',
    idea: 'border-slate-500/30 text-slate-600 dark:text-slate-400 bg-slate-500/10',
    literature_review: 'border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10',
    experiments: 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020a04] pt-24 pb-12 px-4 relative overflow-hidden">
      <GlowingOrb color="bg-green-500" size="w-[600px] h-[600px]" position="top-[10%] right-[-200px]" blur="blur-[180px]" opacity="opacity-5" />
      <GlowingOrb color="bg-emerald-500" size="w-[400px] h-[400px]" position="bottom-[20%] left-[-150px]" blur="blur-[120px]" opacity="opacity-5" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/10 border border-green-500/20 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <span className="text-green-600/60 dark:text-green-400/60 font-mono text-xs">~/dashboard</span>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  Welcome, <span className="text-green-600 dark:text-green-400">{profile.name || 'Researcher'}</span>
                </h1>
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-mono text-sm ml-[52px]">
              {profile.department || 'GURPC Member'} {profile.batch_year ? `// Batch ${profile.batch_year}` : ''}
            </p>
          </div>
          <Link
            href="/profile"
            className="px-4 py-2 cyber-card rounded-lg text-sm font-medium text-green-600 dark:text-green-400 hover:border-green-500/40 transition-all flex items-center gap-2 font-mono"
          >
            <Code className="w-4 h-4" /> edit_profile
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="cyber-card rounded-xl p-5 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 blur-2xl transition-opacity`} />
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white font-mono">{stat.count}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 font-mono mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { label: 'Add Paper', href: '/dashboard/papers/new', icon: Plus },
            { label: 'Create Group', href: '/groups/create', icon: Users },
            { label: 'Browse Groups', href: '/groups', icon: Activity },
            { label: 'Resources', href: '/resources', icon: BookOpen },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="px-4 py-2.5 cyber-card rounded-lg text-sm font-mono text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 hover:border-green-500/30 transition-all flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {action.label}
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Papers Section */}
          <div className="cyber-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">My Papers</h2>
              </div>
              <Link
                href="/dashboard/papers/new"
                className="text-sm font-mono text-green-600 dark:text-green-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> add
              </Link>
            </div>
            {papers.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-green-500/20 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/15 flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-green-600/60 dark:text-green-400/60" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-mono">No papers yet</p>
                <Link href="/dashboard/papers/new" className="text-green-600 dark:text-green-400 text-sm font-mono mt-2 inline-block hover:underline">
                  + Start tracking research
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {papers.slice(0, 5).map((paper) => (
                  <div key={paper.id} className="p-3 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-green-500/10 hover:border-green-500/30 transition-colors">
                    <h3 className="font-medium text-slate-900 dark:text-white text-sm line-clamp-1">{paper.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${statusColors[paper.status || 'draft']}`}>
                        {(paper.status || 'draft').replace('_', ' ')}
                      </span>
                      {paper.year && <span className="text-xs text-slate-400 font-mono">{paper.year}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Projects Section */}
          <div className="cyber-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Folder className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">My Projects</h2>
              </div>
            </div>
            {projects.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-green-500/20 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/15 flex items-center justify-center mx-auto mb-3">
                  <Folder className="w-6 h-6 text-purple-500/60 dark:text-purple-400/60" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-mono">No projects yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.slice(0, 5).map((project) => (
                  <Link key={project.id} href={`/projects/${project.id}`} className="block p-3 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-green-500/10 hover:border-green-500/30 transition-colors">
                    <h3 className="font-medium text-slate-900 dark:text-white text-sm line-clamp-1">{project.title}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${statusColors[project.status || 'idea']}`}>
                        {(project.status || 'idea').replace('_', ' ')}
                      </span>
                      <div className="flex-1">
                        <div className="w-full bg-slate-200 dark:bg-green-500/10 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-400 h-1.5 rounded-full transition-all"
                            style={{ width: `${project.progress_percentage || 0}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{project.progress_percentage || 0}%</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Groups Section */}
          <div className="cyber-card rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">My Research Groups</h2>
              </div>
              <div className="flex gap-3">
                <Link href="/groups" className="text-sm font-mono text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-1">
                  browse <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/groups/create" className="text-sm font-mono text-green-600 dark:text-green-400 hover:underline flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> create
                </Link>
              </div>
            </div>
            {groups.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-green-500/20 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-cyan-500/60 dark:text-cyan-400/60" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-mono">Not in any groups yet</p>
                <Link href="/groups" className="text-green-600 dark:text-green-400 text-sm font-mono mt-2 inline-flex items-center gap-1 hover:underline">
                  Explore Groups <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {groups.map((group) => (
                  <Link key={group.id} href={`/groups/${group.id}`} className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-green-500/10 hover:border-green-500/30 transition-all group">
                    <span className="text-xs px-2 py-0.5 rounded-full border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 font-mono">
                      {group.domain}
                    </span>
                    <h3 className="font-medium text-slate-900 dark:text-white text-sm mt-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{group.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{group.description}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Terminal-style footer */}
        <div className="mt-8 text-center">
          <p className="text-green-600/30 dark:text-green-400/30 font-mono text-xs">
            <Zap className="w-3 h-3 inline-block mr-1" />
            GURPC Research Platform v2.0 // {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
