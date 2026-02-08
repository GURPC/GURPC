import { Metadata } from 'next';
import Image from 'next/image';
import { Handshake, FileText, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - GURPC',
  description: 'Mission, Vision, and History of Green University Research & Publication Community.',
};

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:py-20 mx-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-primary">About GURPC</h1>
          <p className="text-xl text-muted-foreground">
            Building a community of innovation and academic excellence.
          </p>
        </section>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border">
            <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To foster a research-centric environment at Green University of Bangladesh enabling students and faculty to collaborate, innovate, and contribute to global scientific initiatives through high-quality publications and projects.
            </p>
          </section>
          
          <section className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border">
            <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To become a leading research community in Bangladesh that empowers young minds to solve real-world problems through technology and scientific research.
            </p>
          </section>
        </div>

        {/* Why Join */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Why Join GURPC?</h2>
          <div className="grid sm:grid-cols-3 gap-6 pt-4">
             <div className="text-center space-y-2">
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Handshake className="h-8 w-8 text-green-700 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-lg">Mentorship</h3>
                <p className="text-sm text-muted-foreground">Get guidance from experienced faculty and alumni researchers.</p>
             </div>
             <div className="text-center space-y-2">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                   <FileText className="h-8 w-8 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg">Publication Support</h3>
                <p className="text-sm text-muted-foreground">Resources and workshops to help you publish in top journals.</p>
             </div>
             <div className="text-center space-y-2">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Globe className="h-8 w-8 text-purple-700 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg">Networking</h3>
                <p className="text-sm text-muted-foreground">Connect with like-minded peers and industry professionals.</p>
             </div>
          </div>
        </section>

        {/* History */}
        <section className="prose dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">Our History</h2>
          <p>
            The Green University Research & Publication Community (GURPC) was founded with the vision of bridging the gap between academic learning and practical research application. Starting as a small study group, it has grown into a vibrant community of over 200+ active members from various departments including CSE, EEE, and Textile Engineering.
          </p>
          <p>
            Over the years, our members have published in reputable IEEE conferences, Scopus-indexed journals, and have won multiple innovation awards at national hackathons.
          </p>
        </section>

      </div>
    </div>
  );
}
