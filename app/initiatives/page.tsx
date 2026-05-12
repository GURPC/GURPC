import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Video, BookMarked, Share2, Monitor, GraduationCap, Mic, Target, Library,
  ArrowRight, CheckCircle2, Clock, Rocket
} from 'lucide-react';
import { initiatives } from '@/data/initiatives';

export const metadata: Metadata = {
  title: 'Initiatives & Programs - GURPC',
  description: 'Explore GURPC programs: content recording, paper reading team, resource sharing, software workshops, training, and more.',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Video, BookMarked, Share2, Monitor, GraduationCap, Mic, Target, Library,
};

const statusConfig = {
  active: { label: 'Active', color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20', icon: CheckCircle2 },
  upcoming: { label: 'Upcoming', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20', icon: Clock },
  planning: { label: 'Planning', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20', icon: Rocket },
};

export default function InitiativesPage() {
  return (
    <div className="container px-4 py-12 md:py-20 mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Initiatives & Programs</h1>
        <p className="text-muted-foreground text-lg">
          Explore the key initiatives driving our community forward.
        </p>
      </div>

      {/* Initiatives Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-20">
        {initiatives.map((initiative) => {
          const IconComponent = iconMap[initiative.icon] || Rocket;
          const status = statusConfig[initiative.status];
          const StatusIcon = status.icon;
          return (
            <Card key={initiative.id} className="group hover:shadow-lg transition-all duration-300 border-green-100 dark:border-green-900/20 hover:border-green-300 dark:hover:border-green-500/30">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                    <IconComponent className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <Badge variant="outline" className={`text-[10px] font-mono ${status.color}`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {status.label}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {initiative.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {initiative.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Membership Pipeline */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Membership Pipeline</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our structured membership ecosystem ensures every member grows from beginner to published researcher.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {[
            { step: '01', title: 'Apply', desc: 'Submit application during fixed intake window', color: 'from-green-500 to-green-600' },
            { step: '02', title: 'Foundation Training', desc: 'Same-level basic research training for all new members', color: 'from-green-500 to-emerald-500' },
            { step: '03', title: 'Batch Training', desc: 'Semester-wise advanced training tracks', color: 'from-emerald-500 to-teal-500' },
            { step: '04', title: 'Research Group', desc: 'Selected members join specialized research groups', color: 'from-teal-500 to-cyan-500' },
            { step: '05', title: 'Publish', desc: 'Write and publish research papers with mentorship', color: 'from-cyan-500 to-blue-500' },
          ].map((item, i) => (
            <div key={item.step} className="relative">
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800 h-full text-center hover:border-green-300 dark:hover:border-green-500/30 transition-colors">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-bold mb-3`}>
                  {item.step}
                </div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              {i < 4 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-4 w-4 text-green-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Research Paper Target */}
      <section className="mb-20">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20 border-green-200 dark:border-green-800/30">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="shrink-0 text-center">
                <div className="text-6xl md:text-7xl font-bold text-green-600 dark:text-green-400">
                  10+
                </div>
                <p className="text-sm text-muted-foreground mt-2 font-mono">TARGET PAPERS / YEAR</p>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Publication Target from GURPC</h3>
                <p className="text-muted-foreground mb-4">
                  GURPC aims to produce at least 10 quality research papers annually, published in recognized journals and conferences. Members receive end-to-end support from topic selection to publication.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['IEEE Conferences', 'Scopus Journals', 'GUB Journal', 'MDPI Journals'].map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Links */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-6">Explore More</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="outline" className="border-green-300 dark:border-green-500/30 hover:bg-green-50 dark:hover:bg-green-900/20">
            <Link href="/training">Training Programs <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="outline" className="border-green-300 dark:border-green-500/30 hover:bg-green-50 dark:hover:bg-green-900/20">
            <Link href="/conferences">Journals & Conferences <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="outline" className="border-green-300 dark:border-green-500/30 hover:bg-green-50 dark:hover:bg-green-900/20">
            <Link href="/resources">Resources & Software <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild className="bg-green-600 hover:bg-green-500 text-white">
            <Link href="/join">Join GURPC <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
