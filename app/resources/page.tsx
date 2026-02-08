import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Download, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resources - GURPC',
  description: 'Publications, guidelines, and research opportunities for students.',
};

export default function ResourcesPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Research Resources</h1>
        <p className="text-muted-foreground text-lg">
          Curated materials to help you succeed in your research journey.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Resource Group 1 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="text-primary h-6 w-6" />
            <h2 className="text-2xl font-bold">Publications</h2>
          </div>
          <Card>
             <CardHeader>
                <CardTitle className="text-lg">Recent User Publications</CardTitle>
                <CardDescription>Papers published by our members in 2025-2026.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="border-b pb-2 last:border-0 last:pb-0">
                    <Link href="#" className="font-medium hover:text-primary hover:underline block">
                        AI-Driven Traffic Management System for Dhaka City
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">Published in IEEE TENSYMP 2025</p>
                </div>
                <div className="border-b pb-2 last:border-0 last:pb-0">
                    <Link href="#" className="font-medium hover:text-primary hover:underline block">
                        Renewable Energy Solutions for Rural Bangladesh
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">Published in Elsevier Energy Reports</p>
                </div>
                <Button variant="link" className="px-0 pt-2 text-primary" asChild>
                    <Link href="#">View all publications</Link>
                </Button>
             </CardContent>
          </Card>
        </section>

        {/* Resource Group 2 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="text-primary h-6 w-6" />
            <h2 className="text-2xl font-bold">Guidelines</h2>
          </div>
          <Card>
             <CardHeader>
                <CardTitle className="text-lg">Research Basics</CardTitle>
             </CardHeader>
             <CardContent className="space-y-3">
                <Link href="#" className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                    <Download className="h-4 w-4 text-muted-foreground" />
                    <span>How to write a standard research paper.pdf</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                    <Download className="h-4 w-4 text-muted-foreground" />
                    <span>Reference Management with Mendeley.pdf</span>
                </Link>
                <Link href="#" className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                    <Download className="h-4 w-4 text-muted-foreground" />
                    <span>Latex Template for IEEE Conferences.zip</span>
                </Link>
             </CardContent>
          </Card>
        </section>

        {/* Resource Group 3 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <ExternalLink className="text-primary h-6 w-6" />
            <h2 className="text-2xl font-bold">Opportunities</h2>
          </div>
          <Card>
             <CardHeader>
                <CardTitle className="text-lg">Calls for Papers</CardTitle>
             </CardHeader>
             <CardContent className="space-y-3">
                 <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-100 dark:border-green-800">
                    <h4 className="font-semibold text-green-900 dark:text-green-300 text-sm">GU Journal of Science & Engineering</h4>
                    <p className="text-xs text-muted-foreground mt-1">Deadline: June 30, 2026</p>
                    <Link href="#" className="text-xs text-primary font-medium hover:underline mt-2 inline-block">Submit Manuscript &rarr;</Link>
                 </div>
                 <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded border">
                    <h4 className="font-semibold text-sm">International Conference on Industry 4.0</h4>
                    <p className="text-xs text-muted-foreground mt-1">Deadline: Aug 15, 2026</p>
                    <Link href="#" className="text-xs text-primary font-medium hover:underline mt-2 inline-block">Learn More &rarr;</Link>
                 </div>
             </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
