'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, BookOpen, Share2, ExternalLink } from 'lucide-react';
import { blogPosts } from '@/data/blog';

export default function BlogPostClient({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#020a04] pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Post Not Found</h1>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-sm mb-6">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            className="px-4 py-2 cyber-card rounded-lg text-sm font-mono text-green-600 dark:text-green-400 hover:border-green-500/30 transition-all inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    Resource: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
    Achievement: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
    Technical: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
    Guide: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400',
  };

  // Simple markdown-to-JSX renderer for the content
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let keyCounter = 0;

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        const items = listItems.map((item, i) => (
          <li key={i} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {renderInline(item)}
          </li>
        ));
        if (listType === 'ol') {
          elements.push(
            <ol key={keyCounter++} className="list-decimal list-inside space-y-1.5 my-4 ml-2">
              {items}
            </ol>
          );
        } else {
          elements.push(
            <ul key={keyCounter++} className="list-disc list-inside space-y-1.5 my-4 ml-2">
              {items}
            </ul>
          );
        }
        listItems = [];
        listType = null;
      }
    };

    const renderInline = (text: string): React.ReactNode => {
      // Process bold, links, inline code
      const parts: React.ReactNode[] = [];
      let remaining = text;
      let partKey = 0;

      while (remaining.length > 0) {
        // Check for links [text](url)
        const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
        // Check for bold **text**
        const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
        // Check for inline code `text`
        const codeMatch = remaining.match(/`([^`]+)`/);

        // Find the earliest match
        const matches = [
          linkMatch ? { type: 'link', match: linkMatch, index: linkMatch.index! } : null,
          boldMatch ? { type: 'bold', match: boldMatch, index: boldMatch.index! } : null,
          codeMatch ? { type: 'code', match: codeMatch, index: codeMatch.index! } : null,
        ].filter(Boolean).sort((a, b) => a!.index - b!.index);

        if (matches.length === 0) {
          parts.push(remaining);
          break;
        }

        const first = matches[0]!;
        if (first.index > 0) {
          parts.push(remaining.substring(0, first.index));
        }

        if (first.type === 'link') {
          const m = first.match as RegExpMatchArray;
          parts.push(
            <a key={partKey++} href={m[2]} target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 hover:underline inline-flex items-center gap-0.5">
              {m[1]}
              {m[2].startsWith('http') && <ExternalLink className="w-3 h-3 inline" />}
            </a>
          );
          remaining = remaining.substring(first.index + m[0].length);
        } else if (first.type === 'bold') {
          const m = first.match as RegExpMatchArray;
          parts.push(<strong key={partKey++} className="font-semibold text-slate-800 dark:text-white">{m[1]}</strong>);
          remaining = remaining.substring(first.index + m[0].length);
        } else if (first.type === 'code') {
          const m = first.match as RegExpMatchArray;
          parts.push(
            <code key={partKey++} className="px-1.5 py-0.5 rounded bg-green-500/10 text-green-700 dark:text-green-300 text-xs font-mono">
              {m[1]}
            </code>
          );
          remaining = remaining.substring(first.index + m[0].length);
        }
      }

      return parts.length === 1 ? parts[0] : <>{parts}</>;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Horizontal rule
      if (line.trim() === '---') {
        flushList();
        elements.push(<hr key={keyCounter++} className="my-8 border-slate-200 dark:border-green-900/20" />);
        continue;
      }

      // Headings
      if (line.startsWith('# ')) {
        flushList();
        // Skip H1 — we render the title separately
        continue;
      }
      if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={keyCounter++} className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            {line.replace(/^## /, '').replace(/^[📚✅💡] /, (m) => m)}
          </h2>
        );
        continue;
      }
      if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={keyCounter++} className="text-lg font-semibold text-slate-800 dark:text-slate-100 mt-6 mb-3">
            {line.replace(/^### /, '')}
          </h3>
        );
        continue;
      }

      // Unordered list
      if (line.match(/^- /)) {
        if (listType !== 'ul') flushList();
        listType = 'ul';
        listItems.push(line.replace(/^- /, ''));
        continue;
      }

      // Ordered list
      if (line.match(/^\d+\. /)) {
        if (listType !== 'ol') flushList();
        listType = 'ol';
        listItems.push(line.replace(/^\d+\. /, ''));
        continue;
      }

      // Link line (starts with 🔗)
      if (line.startsWith('🔗')) {
        flushList();
        const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          elements.push(
            <p key={keyCounter++} className="my-2">
              <a
                href={linkMatch[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg cyber-card text-sm font-mono text-green-600 dark:text-green-400 hover:border-green-500/30 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                {linkMatch[1]}
              </a>
            </p>
          );
        }
        continue;
      }

      // Empty line
      if (line.trim() === '') {
        flushList();
        continue;
      }

      // Italic / emphasis line (*text*)
      if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
        flushList();
        elements.push(
          <p key={keyCounter++} className="text-sm italic text-slate-500 dark:text-slate-400 my-4">
            {line.replace(/^\*|\*$/g, '')}
          </p>
        );
        continue;
      }

      // Regular paragraph
      flushList();
      elements.push(
        <p key={keyCounter++} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed my-3">
          {renderInline(line)}
        </p>
      );
    }

    flushList();
    return elements;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020a04] pt-24 pb-12 px-4">
      <article className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-mono text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase border ${categoryColors[post.category] || categoryColors.Guide}`}>
              {post.category}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {post.date}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> {post.author}
            </span>
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded border border-slate-200 dark:border-green-900/30 text-slate-500 dark:text-slate-500 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="cyber-card rounded-2xl p-6 md:p-10">
          {renderContent(post.content)}
        </div>

        {/* Footer */}
        <footer className="mt-10 pt-6 border-t border-slate-200 dark:border-green-900/20">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="text-sm font-mono text-green-600 dark:text-green-400 flex items-center gap-1.5 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> More Articles
            </Link>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              GURPC Blog // {post.date}
            </span>
          </div>
        </footer>
      </article>
    </div>
  );
}
