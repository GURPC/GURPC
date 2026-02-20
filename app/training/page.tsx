import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Clock, Users, ArrowRight, CheckCircle2, Star, BookOpen, Layers } from 'lucide-react';
import { trainingPrograms } from '@/data/initiatives';

export const metadata: Metadata = {
  title: 'Training Programs - GURPC',
  description: 'Structured training ecosystem with basic, intermediate, advanced, and specialized tracks for GURPC members.',
};

const levelConfig = {
  basic: { label: 'Foundation', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20', icon: BookOpen },
  intermediate: { label: 'Intermediate', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20', icon: Layers },
  advanced: { label: 'Advanced', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20', icon: Star },
  specialized: { label: 'Specialized', color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20', icon: GraduationCap },
};

export default function TrainingPage() {
  return (
    <div className="container px-4 py-12 md:py-20 mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="outline" className="mb-4 text-green-600 dark:text-green-400 border-green-300 dark:border-green-500/30">
          Semester-wise Batches
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Training Programs</h1>
        <p className="text-muted-foreground text-lg">
          Our structured training ecosystem takes you from research basics to published author with semester-wise batch progression and specialized research groups.
        </p>
      </div>

      {/* Training Flow */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row items-stretch gap-4 max-w-4xl mx-auto">
          {['Foundation', 'Intermediate', 'Advanced', 'Specialized Group'].map((step, i) => (
            <div key={step} className="flex-1 relative">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20 rounded-xl p-5 border border-green-200 dark:border-green-800/30 text-center h-full">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white text-xs font-bold mb-2">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-sm">{step}</h3>
              </div>
              {i < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-4 w-4 text-green-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {trainingPrograms.map((program) => {
          const level = levelConfig[program.level];
          const LevelIcon = level.icon;
          return (
            <Card key={program.id} className="overflow-hidden border-green-100 dark:border-green-900/20 hover:border-green-300 dark:hover:border-green-500/30 transition-colors">
              <CardHeader className="bg-slate-50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                      <LevelIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{program.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-0.5">{program.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`shrink-0 w-fit ${level.color}`}>
                    {level.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-4 mb-5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> {program.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4" /> {program.semester}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" /> {program.eligibility}
                  </span>
                </div>

                <h4 className="text-sm font-semibold mb-3">Topics Covered</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {program.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <p className="text-muted-foreground mb-4">Ready to start your research training journey?</p>
        <Button asChild className="bg-green-600 hover:bg-green-500 text-white">
          <Link href="/join">Apply for Membership <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}
