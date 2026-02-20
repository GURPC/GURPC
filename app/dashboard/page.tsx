'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Profile, Paper, ResearchGroup, Project } from '@/lib/supabase/types';

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

    // Fetch all data in parallel
    const [profileRes, papersRes, groupsRes, projectsRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('papers').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      supabase.from('group_members').select('group_id, role, research_groups(*)').eq('user_id', user.id),
      supabase.from('project_members').select('project_id, role, projects(*)').eq('user_id', user.id),
    ]);

    setProfile(profileRes.data as Profile | null);
    setPapers((papersRes.data || []) as Paper[]);
    // Extract groups from joined data
    setGroups((groupsRes.data || []).map((gm: Record<string, unknown>) => gm.research_groups as unknown as ResearchGroup).filter(Boolean));
    setProjects((projectsRes.data || []).map((pm: Record<string, unknown>) => pm.projects as unknown as Project).filter(Boolean));
    setLoading(false);
  }, [supabase, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!profile) return null;

  const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    submitted: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    under_review: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    accepted: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    published: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    idea: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    literature_review: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    experiments: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome, {profile.name || 'Researcher'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {profile.department || 'GURPC Member'} {profile.batch_year ? `| Batch ${profile.batch_year}` : ''}
            </p>
          </div>
          <Link
            href="/profile"
            className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
          >
            Edit Profile
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Papers', count: papers.length, icon: '📄', color: 'emerald' },
            { label: 'Groups', count: groups.length, icon: '👥', color: 'blue' },
            { label: 'Projects', count: projects.length, icon: '🔬', color: 'purple' },
            { label: 'Published', count: papers.filter(p => p.status === 'published').length, icon: '🏆', color: 'yellow' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Papers Section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My Papers</h2>
              <Link
                href="/dashboard/papers/new"
                className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                + Add Paper
              </Link>
            </div>
            {papers.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📝</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">No papers yet. Start tracking your research!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {papers.slice(0, 5).map((paper) => (
                  <div key={paper.id} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">{paper.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[paper.status || 'draft']}`}>
                        {(paper.status || 'draft').replace('_', ' ')}
                      </span>
                      {paper.year && <span className="text-xs text-gray-400">{paper.year}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Projects Section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My Projects</h2>
              <Link
                href="/projects/create"
                className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                + New Project
              </Link>
            </div>
            {projects.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🔬</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">No projects yet. Start a research project!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.slice(0, 5).map((project) => (
                  <Link key={project.id} href={`/projects/${project.id}`} className="block p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">{project.title}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[project.status || 'idea']}`}>
                        {(project.status || 'idea').replace('_', ' ')}
                      </span>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div
                            className="bg-emerald-500 h-1.5 rounded-full transition-all"
                            style={{ width: `${project.progress_percentage || 0}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{project.progress_percentage || 0}%</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Groups Section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My Research Groups</h2>
              <div className="flex gap-3">
                <Link href="/groups" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:underline">
                  Browse All
                </Link>
                <Link href="/groups/create" className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
                  + Create Group
                </Link>
              </div>
            </div>
            {groups.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">👥</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">You haven&apos;t joined any research groups yet.</p>
                <Link href="/groups" className="inline-block mt-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
                  Explore Groups &rarr;
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {groups.map((group) => (
                  <Link key={group.id} href={`/groups/${group.id}`} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">{group.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{group.description}</p>
                    <div className="mt-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-medium">
                        {group.domain}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
