import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Download, ExternalLink, Monitor, Database, Wrench, Cloud, ArrowRight } from 'lucide-react';
import { softwareResources } from '@/data/initiatives';

export const metadata: Metadata = {
  title: 'Resources - GURPC',
  description: 'Publications, guidelines, software tools, datasets, and research resources for GURPC members.',
};

export default function ResourcesPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Research Resources</h1>
        <p className="text-muted-foreground text-lg">
          Curated materials, software tools, datasets, and guidelines to help you succeed in your research journey.
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

      {/* ══════════ SOFTWARE & TOOLS SECTION ══════════ */}
      <section className="mt-20">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-green-600 dark:text-green-400 border-green-300 dark:border-green-500/30">
            Central Resource Hub
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-3">Software, Tools & Datasets</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Department-wise curated software and datasets for your research. Shared centrally for all GURPC members.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {softwareResources.map((resource) => {
            const typeIcons: Record<string, React.ReactNode> = {
              software: <Monitor className="h-4 w-4" />,
              dataset: <Database className="h-4 w-4" />,
              tool: <Wrench className="h-4 w-4" />,
              template: <FileText className="h-4 w-4" />,
            };
            const accessColors: Record<string, string> = {
              'free': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
              'university-licensed': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
              'open-source': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
            };

            return (
              <Card key={resource.id} className="hover:shadow-md transition-shadow border-green-100 dark:border-green-900/20 hover:border-green-300 dark:hover:border-green-500/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {typeIcons[resource.type]}
                      <span className="text-xs font-medium uppercase">{resource.category}</span>
                    </div>
                    <Badge variant="secondary" className={`text-[10px] ${accessColors[resource.accessLevel]}`}>
                      {resource.accessLevel === 'university-licensed' ? 'Licensed' : resource.accessLevel === 'open-source' ? 'Open Source' : 'Free'}
                    </Badge>
                  </div>
                  <CardTitle className="text-base mt-2">{resource.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {resource.department.map(dept => (
                      <Badge key={dept} variant="outline" className="text-[10px]">{dept}</Badge>
                    ))}
                  </div>
                  {resource.link && resource.link !== '#' && (
                    <Button variant="link" size="sm" className="px-0 text-green-600 dark:text-green-400" asChild>
                      <Link href={resource.link} target="_blank">
                        Access <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center mt-16">
        <p className="text-muted-foreground mb-4">Looking for a specific tool or dataset? Suggest it to us!</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline" className="border-green-300 dark:border-green-500/30">
            <Link href="/contact">Suggest a Resource <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="outline" className="border-green-300 dark:border-green-500/30">
            <Link href="/conferences">Journals & Conferences <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
