import BlogPostClient from './BlogPostClient';

export function generateStaticParams() {
  // Must return at least one entry for `output: 'export'` builds (GitHub Pages).
  // At runtime the client component fetches the actual post by slug.
  return [{ slug: 'placeholder' }];
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostClient slug={params.slug} />;
}
