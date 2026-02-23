import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog - GURPC',
  description: 'Latest news, articles, and updates from the community.',
};

export default function BlogPage() {
  // Sort posts by id descending (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => b.id - a.id);

  const categoryColors: Record<string, string> = {
    Resource: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
    Achievement: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
    Technical: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
    Guide: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020a04] pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="tech-badge inline-flex items-center px-3 py-1 rounded-full text-xs mb-3 gap-2">
            <BookOpen className="h-3 w-3" /> BLOG & NEWS
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Insights & <span className="text-green-600 dark:text-green-400">Updates</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-sm">
            Articles, guides, and stories from the GURPC community.
          </p>
        </div>

        {/* Featured (first post) */}
        {sortedPosts.length > 0 && (
          <Link href={`/blog/${sortedPosts[0].slug}`} className="block mb-8">
            <div className="cyber-card rounded-2xl p-6 md:p-8 hover:border-green-500/30 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase border ${categoryColors[sortedPosts[0].category] || categoryColors.Guide}`}>
                  {sortedPosts[0].category}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {sortedPosts[0].date}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-3">
                {sortedPosts[0].title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                {sortedPosts[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1">
                  <User className="w-3 h-3" /> {sortedPosts[0].author}
                </span>
                <span className="text-sm text-green-600 dark:text-green-400 font-mono flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Rest of posts */}
        <div className="grid gap-4 md:grid-cols-2">
          {sortedPosts.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block">
              <div className="cyber-card rounded-xl p-5 hover:border-green-500/30 transition-all h-full group">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase border ${categoryColors[post.category] || categoryColors.Guide}`}>
                    {post.category}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{post.date}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1">
                    <User className="w-3 h-3" /> {post.author}
                  </span>
                  <span className="text-xs text-green-600 dark:text-green-400 font-mono">
                    Read &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
