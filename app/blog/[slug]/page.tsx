import { createClient } from '@/lib/supabase/server';
import BlogPostClient from './BlogPostClient';
import { notFound } from 'next/navigation';
import type { Blog } from '@/lib/supabase/types';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', params.slug)
    .single();

  const post = data as Blog | null;

  if (!post) {
    return { title: 'Post Not Found - GURPC' };
  }
  return {
    title: `${post.title} - GURPC Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      *,
      profiles:author_id (name, department)
    `)
    .eq('slug', params.slug)
    .single();

  const post = data as (Blog & { profiles: { name: string | null; department: string | null } | null }) | null;

  if (error || !post) {
    console.error('Error fetching post:', error);
    notFound();
  }

  // Transform data to match client component expectations if needed, or update client component
  // I will update the client component to handle the Supabase data structure
  
  return <BlogPostClient post={post} />;
}
