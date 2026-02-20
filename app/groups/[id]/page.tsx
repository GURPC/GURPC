'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { ResearchGroup, Profile, Project } from '@/lib/supabase/types';

interface GroupMemberWithProfile {
  user_id: string;
  role: string;
  joined_at: string;
  profiles: Profile;
}

export default function GroupDetailPage() {
  const { id } = useParams() as { id: string };
  const [group, setGroup] = useState<ResearchGroup | null>(null);
  const [members, setMembers] = useState<GroupMemberWithProfile[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const fetchGroup = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);

    const [groupRes, membersRes, projectsRes] = await Promise.all([
      supabase.from('research_groups').select('*').eq('id', id).single(),
      supabase.from('group_members').select('user_id, role, joined_at, profiles(*)').eq('group_id', id),
      supabase.from('projects').select('*').eq('group_id', id).order('created_at', { ascending: false }),
    ]);

    if (!groupRes.data) {
      router.push('/groups');
      return;
    }

    const groupData = groupRes.data as ResearchGroup;
    setGroup(groupData);
    setMembers((membersRes.data || []) as unknown as GroupMemberWithProfile[]);
    setProjects((projectsRes.data || []) as Project[]);

    if (user) {
      const membership = (membersRes.data || []).find(
        (m: { user_id: string }) => m.user_id === user.id
      );
      setIsMember(!!membership);
      setIsAdmin(membership?.role === 'admin' || groupData.created_by === user.id);
    }

    setLoading(false);
  }, [supabase, id, router]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup]);

  const handleJoin = async () => {
    if (!currentUserId) {
      router.push('/auth/login');
      return;
    }
    setJoining(true);
    await supabase.from('group_members').insert({
      group_id: id as string,
      user_id: currentUserId,
      role: 'member',
    });
    await fetchGroup();
    setJoining(false);
  };

  const handleLeave = async () => {
    if (!currentUserId) return;
    await supabase.from('group_members')
      .delete()
      .eq('group_id', id as string)
      .eq('user_id', currentUserId);
    await fetchGroup();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!group) return null;

  const statusColors: Record<string, string> = {
    idea: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    literature_review: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    experiments: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    draft: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    submitted: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    published: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/groups" className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            &larr; Back to Groups
          </Link>
        </div>

        {/* Group Header */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex-1">
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-medium">
                {group.domain}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-3">{group.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-3">{group.description}</p>
              {group.tags && group.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {group.tags.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {isMember ? (
                <>
                  {isAdmin && (
                    <Link
                      href={`/projects/create?group=${id}`}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      + New Project
                    </Link>
                  )}
                  {!isAdmin && (
                    <button
                      onClick={handleLeave}
                      className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm font-medium rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
                    >
                      Leave Group
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={handleJoin}
                  disabled={joining}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {joining ? 'Joining...' : 'Join Group'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Members */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Members ({members.length})
            </h2>
            <div className="space-y-3">
              {members.map((member) => (
                <div key={member.user_id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                    {member.profiles?.photo_url ? (
                      <img src={member.profiles.photo_url} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                        {member.profiles?.name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {member.profiles?.name || 'Unknown'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {member.role === 'admin' ? '👑 Admin' : 'Member'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Projects ({projects.length})
            </h2>
            {projects.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🔬</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">No projects yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((project) => (
                  <Link key={project.id} href={`/projects/${project.id}`} className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                    <h3 className="font-medium text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{project.description}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[project.status || 'idea']}`}>
                        {(project.status || 'idea').replace('_', ' ')}
                      </span>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${project.progress_percentage || 0}%` }} />
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{project.progress_percentage || 0}%</span>
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
