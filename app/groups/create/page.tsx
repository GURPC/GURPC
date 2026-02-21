'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ResearchGroup } from '@/lib/supabase/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Users, Globe, Lock, Tag, Cpu, Layers, FileText, Zap } from 'lucide-react';
import GlowingOrb from '@/components/effects/GlowingOrb';

const domainOptions = [
  'Machine Learning',
  'Natural Language Processing',
  'Computer Vision',
  'Cybersecurity',
  'IoT & Embedded Systems',
  'Cloud Computing',
  'Data Science',
  'Software Engineering',
  'Networking',
  'Blockchain',
  'Renewable Energy',
  'Biomedical Engineering',
  'Robotics',
  'Other',
];

export default function CreateGroupPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('');
  const [tags, setTags] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const { data: group, error: groupError } = await supabase
      .from('research_groups')
      .insert({
        title,
        description,
        domain,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        is_public: isPublic,
        created_by: user.id,
      })
      .select()
      .single();

    if (groupError || !group) {
      setError(groupError?.message || 'Failed to create group');
      setLoading(false);
      return;
    }

    const createdGroup = group as ResearchGroup;

    await supabase
      .from('group_members')
      .insert({
        group_id: createdGroup.id,
        user_id: user.id,
        role: 'admin',
      });

    router.push(`/groups/${createdGroup.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020a04] pt-24 pb-12 px-4 relative overflow-hidden">
      <GlowingOrb color="bg-green-500" size="w-[500px] h-[500px]" position="top-[30%] right-[-200px]" blur="blur-[150px]" opacity="opacity-5" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="mb-6">
          <Link href="/groups" className="text-sm text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors font-mono flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" /> back_to_groups
          </Link>
        </div>

        <div className="cyber-card rounded-2xl p-8 relative overflow-hidden">
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/5 to-transparent" />

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/10 border border-green-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <span className="text-green-600/60 dark:text-green-400/60 font-mono text-xs">~/groups/create</span>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Research Group</h1>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mb-8 ml-[52px] text-sm">
            Start a new domain-specific research community. Invite members and collaborate on projects.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-sm text-red-600 dark:text-red-400 font-mono">{error}</p>
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Layers className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                <span className="font-mono">group_name</span>
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. NLP Research Lab, CV Study Group"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-green-500/15 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-green-500/40 focus:border-green-500/40 transition-all font-mono text-sm"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <FileText className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                <span className="font-mono">description</span>
                <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe the group's focus, goals, and what members can expect..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-green-500/15 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-green-500/40 focus:border-green-500/40 transition-all font-mono text-sm resize-none"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Cpu className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                <span className="font-mono">research_domain</span>
                <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {domainOptions.map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDomain(d)}
                    className={`px-3 py-2 rounded-lg text-xs font-mono transition-all border text-left ${
                      domain === d
                        ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 shadow-lg shadow-green-500/5'
                        : 'border-slate-200 dark:border-green-500/10 text-slate-500 dark:text-slate-400 hover:border-green-500/30 hover:bg-green-500/5'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Tag className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                <span className="font-mono">tags</span>
                <span className="text-slate-400 font-normal text-xs">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. deep-learning, transformers, bert"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-green-500/15 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-green-500/40 focus:border-green-500/40 transition-all font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-green-500/10 bg-slate-50 dark:bg-white/[0.02]">
              <button
                type="button"
                onClick={() => setIsPublic(!isPublic)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isPublic ? 'bg-green-600' : 'bg-slate-300 dark:bg-green-500/20'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isPublic ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
              <div className="flex items-center gap-2">
                {isPublic ? (
                  <Globe className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-400" />
                )}
                <span className="text-sm text-slate-700 dark:text-slate-300 font-mono">
                  {isPublic ? 'Public — visible to everyone' : 'Private — invite only'}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !title || !description || !domain}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-green-600/50 disabled:to-emerald-600/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 font-mono"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  initializing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Create Group
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
