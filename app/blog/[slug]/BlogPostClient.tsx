'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, ExternalLink, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  created_at: string;
  profiles: {
    name: string | null;
    department: string | null;
  } | null;
}

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from('blogs')
          .select(`
            *,
            profiles:author_id (name, department)
          `)
          .eq('slug', slug)
          .single();

        if (fetchError || !data) {
          setError(true);
          return;
        }

        const blogPost = data as unknown as BlogPost;
        setPost(blogPost);
        // Update page title
        document.title = `${blogPost.title} - GURPC Blog`;
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020a04]">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#020a04] gap-4">
        <h2 className="text-2xl font-bold">Post Not Found</h2>
        <p className="text-muted-foreground">The blog post you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/blog" className="text-green-600 dark:text-green-400 hover:underline font-mono text-sm">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }
  
  const categoryColors: Record<string, string> = {
    Resource: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
    Achievement: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
    Technical: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
    Guide: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400',
    General: 'bg-gray-500/10 border-gray-500/20 text-gray-600 dark:text-gray-400',
  };

  // Simple markdown-to-JSX renderer for the content
  // Re-using the logic from previous version but cleaned up
  const renderContent = (content: string) => {
    if (!content) return null;
    
    // Split by newlines but keep code blocks together? 
    // This simple parser is very fragile. 
    // Ideally we should use 'react-markdown' or 'marked'.
    // Given I can't install packages easily, I will try to make this slightly more robust
    // or just stick to the previous implementation which handled basic markdown.
    
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let keyCounter = 0;

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        if (listType === 'ol') {
          elements.push(
            <ol key={`list-${keyCounter++}`} className="list-decimal list-inside space-y-1.5 my-4 ml-4 text-slate-700 dark:text-slate-300">
              {listItems}
            </ol>
          );
        } else {
          elements.push(
            <ul key={`list-${keyCounter++}`} className="list-disc list-inside space-y-1.5 my-4 ml-4 text-slate-700 dark:text-slate-300">
              {listItems}
            </ul>
          );
        }
        listItems = [];
        listType = null;
      }
    };

    const renderInline = (text: string): React.ReactNode => {
      // Process bold, links, inline code - simple regex implementation
      // Note: This does not handle nested formatted or complex markdown 
      
      const parts: React.ReactNode[] = [];
      let remaining = text;
      let partKey = 0;

      while (remaining.length > 0) {
        // [text](url)
        const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
        // **bold**
        const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
        // `code`
        const codeMatch = remaining.match(/`([^`]+)`/);

        const matches = [
          linkMatch ? { type: 'link', match: linkMatch, index: linkMatch.index! } : null,
          boldMatch ? { type: 'bold', match: boldMatch, index: boldMatch.index! } : null,
          codeMatch ? { type: 'code', match: codeMatch, index: codeMatch.index! } : null,
        ].filter((m): m is { type: string; match: RegExpMatchArray; index: number } => m !== null)
         .sort((a, b) => a.index - b.index);

        if (matches.length === 0) {
          parts.push(remaining);
          break;
        }

        const first = matches[0];
        
        // Add text before match
        if (first.index > 0) {
          parts.push(remaining.substring(0, first.index));
        }

        const m = first.match;
        const fullMatch = m[0];
        const content = m[1]; 
        const url = m[2]; // only for link

        if (first.type === 'link') {
          parts.push(
            <a key={partKey++} href={url} target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 hover:underline inline-flex items-center gap-0.5">
              {content}
              {url.startsWith('http') && <ExternalLink className="w-3 h-3 inline ml-0.5" />}
            </a>
          );
        } else if (first.type === 'bold') {
           parts.push(<strong key={partKey++} className="font-semibold text-slate-900 dark:text-white">{content}</strong>);
        } else if (first.type === 'code') {
           parts.push(
            <code key={partKey++} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-green-700 dark:text-green-400 text-xs font-mono border border-slate-200 dark:border-slate-700">
              {content}
            </code>
          );
        }
        
        remaining = remaining.substring(first.index + fullMatch.length);
      }

      return <>{parts}</>;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Headers
      if (line.startsWith('# ')) {
        flushList();
        // Skip H1 as we render title separately, or render as H2
        continue; 
      }
      if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={keyCounter++} className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            {line.replace(/^## /, '')}
          </h2>
        );
        continue;
      }
      if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={keyCounter++} className="text-xl font-semibold text-slate-800 dark:text-slate-100 mt-6 mb-3">
            {line.replace(/^### /, '')}
          </h3>
        );
        continue;
      }

      // HR
      if (line.trim() === '---') {
        flushList();
        elements.push(<hr key={keyCounter++} className="my-8 border-slate-200 dark:border-slate-800" />);
        continue;
      }

      // Lists
      const ulMatch = line.match(/^[-*]\s+(.*)/);
      if (ulMatch) {
         if (listType !== 'ul') flushList();
         listType = 'ul';
         listItems.push(<li key={listItems.length}>{renderInline(ulMatch[1])}</li>);
         continue;
      }

      const olMatch = line.match(/^(\d+)\.\s+(.*)/);
      if (olMatch) {
         if (listType !== 'ol') flushList();
         listType = 'ol';
         listItems.push(<li key={listItems.length}>{renderInline(olMatch[2])}</li>);
         continue;
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        flushList();
        elements.push(
          <blockquote key={keyCounter++} className="border-l-4 border-green-500/50 pl-4 py-1 my-4 italic text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/30 rounded-r">
            {renderInline(line.replace(/^> /, ''))}
          </blockquote>
        );
        continue;
      }

      // Empty lines
      if (line.trim() === '') {
        flushList();
        continue;
      }

      // Paragraphs
      flushList();
      elements.push(
        <p key={keyCounter++} className="text-base text-slate-600 dark:text-slate-300 leading-relaxed my-3 mb-4">
          {renderInline(line)}
        </p>
      );
    }
    flushList();
    return elements;
  };

  const formattedDate = new Date(post.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase border ${post.excerpt?.toLowerCase().includes('guide') ? categoryColors.Guide : categoryColors.General}`}>
              {post.excerpt?.toLowerCase().includes('guide') ? 'Guide' : 'Article'}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {formattedDate}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-500" />
               </div>
               <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {post.profiles?.name || 'Unknown Author'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {post.profiles?.department || 'Member'}
                  </p>
               </div>
            </div>
            
            <div className="flex gap-2">
                <button 
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                  title="Copy Link"
                >
                   <ExternalLink className="w-4 h-4" />
                </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.image_url && (
            <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                <img 
                    src={post.image_url} 
                    alt={post.title}
                    className="w-full h-auto object-cover max-h-[500px]"
                />
            </div>
        )}

        {/* Content */}
        <div className="cyber-card rounded-2xl p-6 md:p-10 bg-white dark:bg-slate-900/50">
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
          </div>
        </footer>
      </article>
    </div>
  );
}
