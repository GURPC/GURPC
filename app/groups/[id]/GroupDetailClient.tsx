'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Users, Globe, Lock, Crown, UserPlus, UserMinus, Search, X, Mail, Folder, Plus, Cpu } from 'lucide-react';
import type { ResearchGroup, Profile, Project } from '@/lib/supabase/types';
import GlowingOrb from '@/components/effects/GlowingOrb';

interface GroupMemberWithProfile {
  user_id: string;
  role: string;
  joined_at: string;
  profiles: Profile;
}

export default function GroupDetailClient({ id }: { id: string }) {
  const [group, setGroup] = useState<ResearchGroup | null>(null);
  const [members, setMembers] = useState<GroupMemberWithProfile[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  // Add member modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [addingUser, setAddingUser] = useState<string | null>(null);
  const [removingUser, setRemovingUser] = useState<string | null>(null);

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
      group_id: id,
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
      .eq('group_id', id)
      .eq('user_id', currentUserId);
    await fetchGroup();
  };

  const searchUsers = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearchLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
      .limit(10);

    // Filter out existing members
    const memberIds = new Set(members.map(m => m.user_id));
    setSearchResults(((data || []) as Profile[]).filter(p => !memberIds.has(p.id)));
    setSearchLoading(false);
  };

  const addMember = async (userId: string) => {
    setAddingUser(userId);
    await supabase.from('group_members').insert({
      group_id: id,
      user_id: userId,
      role: 'member',
    });
    await fetchGroup();
    setAddingUser(null);
    // Remove from search results
    setSearchResults(prev => prev.filter(p => p.id !== userId));
  };

  const removeMember = async (userId: string) => {
    setRemovingUser(userId);
    await supabase.from('group_members')
      .delete()
      .eq('group_id', id)
      .eq('user_id', userId);
    await fetchGroup();
    setRemovingUser(null);
  };

  const statusColors: Record<string, string> = {
    idea: 'border-slate-500/30 text-slate-600 dark:text-slate-400 bg-slate-500/10',
    literature_review: 'border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10',
    experiments: 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10',
    draft: 'border-orange-500/30 text-orange-600 dark:text-orange-400 bg-orange-500/10',
    submitted: 'border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10',
    published: 'border-green-500/30 text-green-600 dark:text-green-400 bg-green-500/10',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020a04] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
          <span className="text-green-600/60 dark:text-green-400/60 font-mono text-sm">Loading group...</span>
        </div>
      </div>
    );
  }

  if (!group) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020a04] pt-24 pb-12 px-4 relative overflow-hidden">
      <GlowingOrb color="bg-green-500" size="w-[500px] h-[500px]" position="top-[20%] right-[-200px]" blur="blur-[150px]" opacity="opacity-5" />
      <GlowingOrb color="bg-cyan-500" size="w-[300px] h-[300px]" position="bottom-[10%] left-[-100px]" blur="blur-[100px]" opacity="opacity-5" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-6">
          <Link href="/groups" className="text-sm text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors font-mono flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" /> back_to_groups
          </Link>
        </div>

        {/* Group Header */}
        <div className="cyber-card rounded-2xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/5 to-transparent" />
          
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs px-2.5 py-1 rounded-full border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 font-mono">
                  {group.domain}
                </span>
                <span className="text-slate-400">
                  {group.is_public ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{group.title}</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">{group.description}</p>
              {group.tags && group.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {group.tags.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-green-500/5 text-slate-500 dark:text-green-400/60 font-mono border border-slate-200 dark:border-green-500/10">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {isMember ? (
                <>
                  {isAdmin && (
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 font-mono"
                    >
                      <UserPlus className="w-4 h-4" /> Add Members
                    </button>
                  )}
                  {isAdmin && (
                    <Link
                      href={`/projects/create?group=${id}`}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-green-500/20 flex items-center gap-2 font-mono"
                    >
                      <Plus className="w-4 h-4" /> Project
                    </Link>
                  )}
                  {!isAdmin && (
                    <button
                      onClick={handleLeave}
                      className="px-4 py-2 border border-red-500/30 text-red-500 text-sm font-medium rounded-lg hover:bg-red-500/10 transition-all font-mono flex items-center gap-2"
                    >
                      <UserMinus className="w-4 h-4" /> Leave
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={handleJoin}
                  disabled={joining}
                  className="px-5 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-green-500/20 font-mono flex items-center gap-2"
                >
                  {joining ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      joining...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" /> Join Group
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Members Panel */}
          <div className="cyber-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Members <span className="text-green-600/60 dark:text-green-400/60 font-mono text-sm">({members.length})</span>
                </h2>
              </div>
              {isAdmin && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="w-7 h-7 rounded-lg border border-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400 hover:bg-green-500/10 transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="space-y-2">
              {members.map((member) => (
                <div key={member.user_id} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-green-500/10 group/member">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {member.profiles?.photo_url ? (
                      <img src={member.profiles.photo_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-green-600 dark:text-green-400 font-mono">
                        {member.profiles?.name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {member.profiles?.name || 'Unknown'}
                    </p>
                    <p className="text-xs font-mono flex items-center gap-1">
                      {member.role === 'admin' ? (
                        <span className="text-amber-500 flex items-center gap-1">
                          <Crown className="w-3 h-3" /> admin
                        </span>
                      ) : (
                        <span className="text-slate-400">member</span>
                      )}
                    </p>
                  </div>
                  {/* Remove button for admin */}
                  {isAdmin && member.role !== 'admin' && member.user_id !== currentUserId && (
                    <button
                      onClick={() => removeMember(member.user_id)}
                      disabled={removingUser === member.user_id}
                      className="opacity-0 group-hover/member:opacity-100 w-7 h-7 rounded-lg border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all"
                      title="Remove member"
                    >
                      {removingUser === member.user_id ? (
                        <div className="w-3 h-3 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
                      ) : (
                        <X className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Projects Panel */}
          <div className="lg:col-span-2 cyber-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Folder className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Projects <span className="text-green-600/60 dark:text-green-400/60 font-mono text-sm">({projects.length})</span>
                </h2>
              </div>
              {isAdmin && (
                <Link
                  href={`/projects/create?group=${id}`}
                  className="text-sm font-mono text-green-600 dark:text-green-400 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> new
                </Link>
              )}
            </div>
            {projects.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-green-500/20 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/15 flex items-center justify-center mx-auto mb-3">
                  <Folder className="w-6 h-6 text-purple-500/60 dark:text-purple-400/60" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-mono">No projects yet</p>
                {isAdmin && (
                  <Link href={`/projects/create?group=${id}`} className="text-green-600 dark:text-green-400 text-sm font-mono mt-2 inline-block hover:underline">
                    + Start a project
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((project) => (
                  <Link key={project.id} href={`/projects/${project.id}`} className="block p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-green-500/10 hover:border-green-500/30 transition-all group">
                    <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{project.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{project.description}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${statusColors[project.status || 'idea']}`}>
                        {(project.status || 'idea').replace('_', ' ')}
                      </span>
                      <div className="flex-1">
                        <div className="w-full bg-slate-200 dark:bg-green-500/10 rounded-full h-1.5">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-1.5 rounded-full transition-all" style={{ width: `${project.progress_percentage || 0}%` }} />
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{project.progress_percentage || 0}%</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowAddModal(false); setSearchQuery(''); setSearchResults([]); }} />
          <div className="relative w-full max-w-lg cyber-card rounded-2xl p-6 shadow-2xl shadow-green-500/10 max-h-[80vh] flex flex-col bg-white dark:bg-[#0a1a0f]">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Add Members</h3>
              </div>
              <button
                onClick={() => { setShowAddModal(false); setSearchQuery(''); setSearchResults([]); }}
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-green-500/20 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-green-500/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => searchUsers(e.target.value)}
                placeholder="Search by name or email..."
                autoFocus
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-green-500/15 bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-green-500/40 focus:border-green-500/40 transition-all font-mono text-sm"
              />
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {searchLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
                </div>
              ) : searchQuery.length < 2 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/15 flex items-center justify-center mx-auto mb-3">
                    <Search className="w-6 h-6 text-green-600/40 dark:text-green-400/40" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-mono">
                    Type at least 2 characters to search
                  </p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-mono">
                    No users found matching &quot;{searchQuery}&quot;
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {searchResults.map((user) => (
                    <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-green-500/10 bg-slate-50 dark:bg-white/[0.02] hover:border-green-500/30 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {user.photo_url ? (
                          <img src={user.photo_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-sm font-bold text-green-600 dark:text-green-400 font-mono">
                            {user.name?.charAt(0)?.toUpperCase() || '?'}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {user.name || 'Unknown'}
                        </p>
                        <p className="text-xs text-slate-400 font-mono flex items-center gap-1 truncate">
                          <Mail className="w-3 h-3 flex-shrink-0" />
                          {user.email || 'No email'}
                        </p>
                      </div>
                      <button
                        onClick={() => addMember(user.id)}
                        disabled={addingUser === user.id}
                        className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-all font-mono flex items-center gap-1.5 flex-shrink-0"
                      >
                        {addingUser === user.id ? (
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <UserPlus className="w-3 h-3" /> Add
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Existing Members */}
            {members.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-green-500/10">
                <p className="text-xs text-slate-400 font-mono mb-2">
                  Current members ({members.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {members.map((m) => (
                    <span key={m.user_id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-200 dark:border-green-500/10 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.02]">
                      {m.role === 'admin' && <Crown className="w-3 h-3 text-amber-500" />}
                      {m.profiles?.name || 'Unknown'}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
