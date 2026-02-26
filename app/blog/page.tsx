import { Metadata } from 'next';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
  title: 'Blog - GURPC',
  description: 'Latest news, articles, and updates from the community.',
};

export default function BlogPage() {
  return <BlogListClient />;
}
