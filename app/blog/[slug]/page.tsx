import { blogPosts } from '@/data/blog';
import BlogPostClient from './BlogPostClient';

export function generateStaticParams() {
  // Return all known slugs + a placeholder for GitHub Pages static export
  return [
    ...blogPosts.map((post) => ({ slug: post.slug })),
    { slug: 'placeholder' },
  ];
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: 'Post Not Found - GURPC' };
  }
  return {
    title: `${post.title} - GURPC Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostClient slug={params.slug} />;
}
