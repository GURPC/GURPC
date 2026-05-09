'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Calendar, User, ArrowRight, Plus, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/AuthProvider';

interface BlogWithProfile {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  created_at: string;
  profiles: { name: string | null } | null;
}

const categoryColors: Record<string, string> = {
  Resource: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
  Achievement: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
  Technical: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
  Guide: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400',
  General: 'bg-gray-500/10 border-gray-500/20 text-gray-600 dark:text-gray-400',
};

export default function BlogListClient() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('blogs')
          .select(`
            *,
            profiles:author_id (name)
          `)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching blogs:', error);
        }
        setPosts((data || []) as BlogWithProfile[]);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020a04] pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-left">
            <span className="tech-badge inline-flex items-center px-3 py-1 rounded-full text-xs mb-3 gap-2">
              <BookOpen className="h-3 w-3" /> BLOG &amp; NEWS
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Insights &amp; <span className="text-green-600 dark:text-green-400">Updates</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-mono text-sm">
              Articles, guides, and stories from the GURPC community.
            </p>
          </div>

          {user && (
            <Link href="/blog/create">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Write a Post
              </Button>
            </Link>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground mb-6">Be the first to share your knowledge with the community.</p>
            {user && (
              <Link href="/blog/create">
                <Button>Create Post</Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Featured (first post) */}
            <Link href={`/blog/${posts[0].slug}`} className="block mb-8">
              <div className="cyber-card rounded-2xl p-6 md:p-8 hover:border-green-500/30 transition-all group overflow-hidden relative">
                {posts[0].image_url && (
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity relative">
                    <Image
                      src={posts[0].image_url}
                      alt=""
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase border ${categoryColors[posts[0].excerpt?.includes('Guide') ? 'Guide' : 'General']}`}>
                      Article
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {new Date(posts[0].created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-3">
                    {posts[0].title}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1">
                      <User className="w-3 h-3" /> {posts[0].profiles?.name || 'Unknown Author'}
                    </span>
                    <span className="text-sm text-green-600 dark:text-green-400 font-mono flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Rest of posts */}
            <div className="grid gap-4 md:grid-cols-2">
              {posts.slice(1).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                  <div className="cyber-card rounded-xl p-5 hover:border-green-500/30 transition-all h-full group flex flex-col relative overflow-hidden">
                    {post.image_url && (
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity relative">
                        <Image
                          src={post.image_url}
                          alt=""
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase border ${categoryColors[post.excerpt?.includes('Guide') ? 'Guide' : 'General']}`}>
                          Article
                        </span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1">
                          <User className="w-3 h-3" /> {post.profiles?.name || 'Unknown Author'}
                        </span>
                        <span className="text-xs text-green-600 dark:text-green-400 font-mono">
                          Read &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
