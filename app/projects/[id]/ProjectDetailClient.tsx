'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Project, Profile, Milestone } from '@/lib/supabase/types';

interface ProjectMemberWithProfile {
  user_id: string;
  role: string;
  joined_at: string;
  profiles: Profile;
}

export default function ProjectDetailClient({ id }: { id: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [members, setMembers] = useState<ProjectMemberWithProfile[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newMilestone, setNewMilestone] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const statusOrder: Project['status'][] = ['idea', 'literature_review', 'experiments', 'draft', 'submitted', 'published'];
  const statusLabels: Record<string, string> = {
    idea: '💡 Idea',
    literature_review: '📚 Literature Review',
    experiments: '🧪 Experiments',
    draft: '📝 Draft',
    submitted: '📤 Submitted',
    published: '🏆 Published',
  };

  const fetchProject = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);

    const [projectRes, membersRes, milestonesRes] = await Promise.all([
      supabase.from('projects').select('*').eq('id', id).single(),
      supabase.from('project_members').select('user_id, role, joined_at, profiles(*)').eq('project_id', id),
      supabase.from('milestones').select('*').eq('project_id', id).order('created_at', { ascending: true }),
    ]);

    if (!projectRes.data) {
      router.push('/dashboard');
      return;
    }

    const projectData = projectRes.data as Project;
    setProject(projectData);
    setMembers((membersRes.data || []) as unknown as ProjectMemberWithProfile[]);
    setMilestones((milestonesRes.data || []) as Milestone[]);

    if (user) {
      const membership = (membersRes.data || []).find(
        (m: { user_id: string }) => m.user_id === user.id
      );
      setIsMember(!!membership);
      setIsAdmin(membership?.role === 'admin' || projectData.created_by === user.id);
    }

    setLoading(false);
  }, [supabase, id, router]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleAddMilestone = async () => {
    if (!newMilestone.trim() || !isAdmin) return;
    await supabase.from('milestones').insert({
      project_id: id,
      title: newMilestone.trim(),
    });
    setNewMilestone('');
    await fetchProject();
  };

  const handleToggleMilestone = async (milestoneId: string, completed: boolean) => {
    if (!isMember) return;
    await supabase.from('milestones').update({
      is_completed: !completed,
      completed_at: !completed ? new Date().toISOString() : null,
    }).eq('id', milestoneId);

    const updatedMilestones = milestones.map(m =>
      m.id === milestoneId ? { ...m, is_completed: !completed } : m
    );
    const completedCount = updatedMilestones.filter(m => m.is_completed).length;
    const progressPercentage = updatedMilestones.length > 0
      ? Math.round((completedCount / updatedMilestones.length) * 100)
      : 0;

    await supabase.from('projects').update({
      progress_percentage: progressPercentage,
    }).eq('id', id);

    await fetchProject();
  };

  const handleStatusChange = async (newStatus: Project['status']) => {
    if (!isAdmin || !project) return;
    setStatusUpdating(true);
    await supabase.from('projects').update({
      status: newStatus,
      updated_at: new Date().toISOString(),
    }).eq('id', id);
    await fetchProject();
    setStatusUpdating(false);
  };

  const handleJoin = async () => {
    if (!currentUserId) {
      router.push('/auth/login');
      return;
    }
    await supabase.from('project_members').insert({
      project_id: id,
      user_id: currentUserId,
      role: 'member',
    });
    await fetchProject();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!project) return null;

  const completedMilestones = milestones.filter(m => m.is_completed).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard" className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>

        {/* Project Header */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex-1">
              {project.domain && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-medium">
                  {project.domain}
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-3">{project.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-3">{project.description}</p>
            </div>
            {!isMember && currentUserId && (
              <button
                onClick={handleJoin}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Join Project
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{project.progress_percentage || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${project.progress_percentage || 0}%` }}
              />
            </div>
          </div>

          {/* Status Pipeline */}
          {isAdmin && (
            <div className="mt-6">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Project Status</label>
              <div className="flex flex-wrap gap-2">
                {statusOrder.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={statusUpdating}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                      project.status === status
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {statusLabels[status]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Milestones */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Milestones
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {completedMilestones}/{milestones.length} completed
            </p>

            {/* Add Milestone */}
            {isAdmin && (
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newMilestone}
                  onChange={(e) => setNewMilestone(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddMilestone()}
                  placeholder="Add a milestone..."
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-sm"
                />
                <button
                  onClick={handleAddMilestone}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
            )}

            {milestones.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📋</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">No milestones yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                    <button
                      onClick={() => handleToggleMilestone(milestone.id, milestone.is_completed || false)}
                      disabled={!isMember}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        milestone.is_completed
                          ? 'bg-emerald-600 border-emerald-600'
                          : 'border-gray-300 dark:border-gray-600 hover:border-emerald-500'
                      }`}
                    >
                      {milestone.is_completed && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <span className={`text-sm flex-1 ${
                      milestone.is_completed
                        ? 'text-gray-400 dark:text-gray-500 line-through'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {milestone.title}
                    </span>
                    {milestone.completed_at && (
                      <span className="text-xs text-gray-400">
                        {new Date(milestone.completed_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Members */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Team ({members.length})
            </h2>
            <div className="space-y-3">
              {members.map((member) => (
                <div key={member.user_id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                    {member.profiles?.photo_url ? (
                      <Image
                        src={member.profiles.photo_url}
                        alt=""
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
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
                      {member.role === 'admin' ? '👑 Lead' : 'Member'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
