import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Lightbulb, Trophy, Target, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-950 pt-32 pb-20 relative overflow-hidden">
        {/* Minimal gradient blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-green-500/10 dark:bg-green-500/5 rounded-[100%] blur-3xl -z-10 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900 dark:text-gray-50 tracking-tight leading-tight">
              Innovation starts <br className="hidden md:block" /> with <span className="text-green-700 dark:text-green-500">research.</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
              Join the Green University Research & Publication Community. Connect with mentors, collaborate on projects, and shape the future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                href="/register" 
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Join the Community <ArrowRight size={18} />
              </Link>
              <Link 
                href="/projects" 
                className="bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-full font-medium hover:border-gray-900 dark:hover:border-gray-100 hover:text-gray-900 dark:hover:text-gray-100 transition"
              >
                Explore Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Minimal */}
      <section className="py-12 border-y border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">50+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">Researchers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">12+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">5+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">Workshops</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">3</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">Papers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-xs font-bold text-green-600 dark:text-green-500 tracking-widest uppercase mb-6">Our Vision</h2>
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 leading-tight">
            Bridging the gap between academic learning and real-world innovation.
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
            We aim to clear misconceptions about research, making it accessible for every student. By connecting curious minds with mentors and resources, we turn theoretical ideas into tangible impact.
          </p>
        </div>
      </section>

      {/* Minimal Features */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-transparent p-6">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-700 dark:text-gray-300 mb-6 transition-colors">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Community</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                Find teammates who share your passion. Connect with seniors, alumni, and faculty to guide your research journey.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-transparent p-6">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-700 dark:text-gray-300 mb-6 transition-colors">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Resources</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                Access resources on academic writing, LaTeX, and publishing. Get your work featured.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-transparent p-6">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-700 dark:text-gray-300 mb-6 transition-colors">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                A dedicated space to brainstorm ideas, validate concepts, and turn theoretical knowledge into prototypes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates - Clean Cards */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
             <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">What's Happening</h2>
                <p className="text-gray-500 dark:text-gray-400">Latest from the community</p>
             </div>
             <Link href="/events" className="text-green-700 dark:text-green-500 font-medium hover:underline text-sm">View all updates</Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="group cursor-pointer">
              <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-6 overflow-hidden relative">
                 <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <Calendar size={48} opacity={0.5}/>
                 </div>
                 <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    UPCOMING WORKSHOP
                 </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-700 dark:group-hover:text-green-500 transition-colors">
                Research Methodology 101
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                 Join us for a comprehensive session on how to start your research journey, from literature review to selecting a topic.
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-500 font-medium">
                 Feb 28, 2026 • 10:00 AM
              </div>
            </div>

             {/* Card 2 */}
             <div className="group cursor-pointer">
              <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-6 overflow-hidden relative">
                 <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <Trophy size={48} opacity={0.5}/>
                 </div>
                 <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    FEATURED PROJECT
                 </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-700 dark:group-hover:text-green-500 transition-colors">
                Early Disease Detection via ML
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                 Developing a machine learning model to detect early signs of plant diseases using smartphone camera images.
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-500 font-medium">
                 Team Alpha • Ongoing
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Ready to join?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg font-light">
            Be part of a growing community of researchers and innovators at Green University.
          </p>
          <Link 
            href="/register" 
            className="inline-block bg-green-700 text-white px-10 py-4 rounded-full font-bold hover:bg-green-800 transition shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200"
          >
            Become a Member
          </Link>
        </div>
      </section>
    </div>
  );
}
