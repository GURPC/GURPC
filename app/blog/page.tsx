import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Blog - GURPC',
  description: 'Latest news, articles, and updates from the community.',
};

const blogPosts = [
  {
    id: 1,
    title: "GURPC Wins Best Research Award at TechFest 2025",
    slug: "gurpc-wins-techfest-2025",
    excerpt: "Our team's project on IoT-based Smart Agriculture secured the first position among 50 universities.",
    date: "Jan 15, 2026",
    category: "Achievement",
    author: "Admin"
  },
  {
    id: 2,
    title: "Understanding Large Language Models: A Beginner's Guide",
    slug: "understanding-llms",
    excerpt: "A deep dive into how transformers work and how you can start building your own AI applications.",
    date: "Dec 12, 2025",
    category: "Technical",
    author: "Md. Saklain"
  },
  {
    id: 3,
    title: "5 Tips for Writing Your First Conference Paper",
    slug: "tips-conference-paper",
    excerpt: "Essential advice for undergraduates looking to publish their research in IEEE or Springer conferences.",
    date: "Nov 30, 2025",
    category: "Guide",
    author: "Dulal Hossain"
  }
];

export default function BlogPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Blog & News</h1>
        <p className="text-muted-foreground text-lg">
          Insights, updates, and stories from our community.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <Badge variant="secondary" className="text-xs font-normal">
                    {post.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
              <CardTitle className="leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {post.excerpt}
              </p>
            </CardContent>
            <CardFooter className="mt-auto pt-0">
               <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-primary hover:underline">
                 Read Article &rarr;
               </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
