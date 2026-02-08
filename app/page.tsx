import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Lightbulb, Calendar, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#002800] dark:bg-[#002000] text-white">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-8 animate-in fade-in zoom-in duration-500">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm rounded-full bg-green-900/50 text-green-100 hover:bg-green-800 border-green-700">
              Welcome to GURPC
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-green-100 to-green-200">
              Innovation Starts <br className="hidden sm:inline" /> With Research
            </h1>
            <p className="mx-auto max-w-[700px] text-green-100/80 md:text-xl leading-relaxed font-light">
              Green University Research & Publication Community is dedicated to cultivating a culture of academic excellence, collaboration, and scientific discovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 min-w-[300px] justify-center pt-4">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-500 text-white rounded-full px-8 h-12 text-base shadow-lg hover:shadow-green-900/20 transition-all border border-transparent">
                <Link href="/join">
                  Join the Community <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-green-400/30 hover:bg-green-900/30 hover:text-white rounded-full px-8 h-12 text-base font-medium">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Grid BG - Adjusted for dark theme */}
        <div className="absolute inset-0 bg-grid-white/[0.05] -z-10 pointer-events-none" />
        
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-green-500/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
              <Users className="h-8 w-8 text-green-700 dark:text-green-500 mb-2" />
              <h3 className="text-3xl font-bold tracking-tight">60+</h3>
              <p className="text-muted-foreground text-sm uppercase tracking-wide font-medium">Active Members</p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
              <BookOpen className="h-8 w-8 text-green-700 dark:text-green-500 mb-2" />
              <h3 className="text-3xl font-bold tracking-tight">15+</h3>
              <p className="text-muted-foreground text-sm uppercase tracking-wide font-medium">Publications</p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
              <Lightbulb className="h-8 w-8 text-green-700 dark:text-green-500 mb-2" />
              <h3 className="text-3xl font-bold tracking-tight">10+</h3>
              <p className="text-muted-foreground text-sm uppercase tracking-wide font-medium">Ongoing Projects</p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
              <Microscope className="h-8 w-8 text-green-700 dark:text-green-500 mb-2" />
              <h3 className="text-3xl font-bold tracking-tight">4+</h3>
              <p className="text-muted-foreground text-sm uppercase tracking-wide font-medium">Research Labs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Events/News */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Happening at GURPC</h2>
              <p className="text-muted-foreground text-lg">Stay updated with our latest workshops, seminars, and news.</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:inline-flex hover:bg-green-50 dark:hover:bg-green-900/20">
              <Link href="/events" className="group text-primary font-semibold">
                View all events <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mock Event 1 */}
            <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-muted">
              <div className="h-48 w-full bg-slate-100 dark:bg-slate-800 relative rounded-t-lg overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200 dark:bg-slate-800 group-hover:scale-105 transition-transform duration-500">
                  <Calendar className="h-12 w-12 opacity-50" />
                </div>
                <Badge className="absolute top-4 left-4 bg-primary text-white shadow-sm">Upcoming</Badge>
              </div>
              <CardHeader>
                <div className="text-xs font-semibold text-primary mb-2 flex items-center gap-2 uppercase tracking-wide">
                  <Calendar className="h-3 w-3" /> March 15, 2026
                </div>
                <CardTitle className="text-xl leading-tight">Research Methodology Workshop</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  An intensive session on qualitative and quantitative research methods for beginners.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/events" className="text-sm font-medium text-primary hover:underline flex items-center">
                  Read Details <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            {/* Mock Event 2 */}
            <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-muted">
              <div className="h-48 w-full bg-slate-100 dark:bg-slate-800 relative rounded-t-lg overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200 dark:bg-slate-800 group-hover:scale-105 transition-transform duration-500">
                   <Calendar className="h-12 w-12 opacity-50" />
                </div>
              </div>
              <CardHeader>
                <div className="text-xs font-semibold text-primary mb-2 flex items-center gap-2 uppercase tracking-wide">
                  <Calendar className="h-3 w-3" /> April 2, 2026
                </div>
                <CardTitle className="text-xl leading-tight">Annual Research Symposium</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Present your ongoing research and get feedback from industry experts and faculty.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/events" className="text-sm font-medium text-primary hover:underline flex items-center">
                  Read Details <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

             {/* Mock Event 3 */}
             <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-muted">
              <div className="h-48 w-full bg-slate-100 dark:bg-slate-800 relative rounded-t-lg overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200 dark:bg-slate-800 group-hover:scale-105 transition-transform duration-500">
                   <Lightbulb className="h-12 w-12 opacity-50" />
                </div>
                <Badge variant="secondary" className="absolute top-4 left-4 shadow-sm bg-white dark:bg-slate-900">News</Badge>
              </div>
              <CardHeader>
                <div className="text-xs font-semibold text-primary mb-2 flex items-center gap-2 uppercase tracking-wide">
                  <Calendar className="h-3 w-3" /> Feb 10, 2026
                </div>
                <CardTitle className="text-xl leading-tight">Call for Papers: GUB Journal</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Submit your research papers for the upcoming issue of the Green University Journal of Science.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/blog" className="text-sm font-medium text-primary hover:underline flex items-center">
                  Read Details <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-10 text-center md:hidden">
             <Button variant="outline" asChild className="w-full">
              <Link href="/events">View all events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your research journey?</h2>
          <p className="text-green-100 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            Join a community of passionate learners and innovators. Whether you are a student, alumni, or faculty member, there is a place for you.
          </p>
          <Button asChild size="lg" variant="secondary" className="font-bold rounded-full px-10 h-14 text-lg shadow-xl hover:bg-white hover:text-green-800 transition-colors">
            <Link href="/join">Register Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

