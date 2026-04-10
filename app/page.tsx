'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Lightbulb, Calendar, Microscope, Zap, Code, Binary, Shield, Terminal, Cpu, Quote, Video, BookMarked, Share2, Monitor, GraduationCap, Mic, Target, Library, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleGrid from '@/components/effects/ParticleGrid';
import GlowingOrb from '@/components/effects/GlowingOrb';
import TypewriterText from '@/components/effects/TypewriterText';
import CountUp from '@/components/effects/CountUp';
import { useEffect, useRef, useState } from 'react';
import { usePlatformStats } from '@/hooks/usePlatformStats';

const SURVEY_POST_URL = 'https://www.facebook.com/share/p/18EGFy4yyt/';
const SURVEY_POSTER_URL = 'https://drive.google.com/file/d/1qr_yXSAHpwgiovhqigZsIbxyvowoamDt/view?usp=sharing';
const SURVEY_POSTER_PREVIEW_URL = 'https://drive.google.com/file/d/1qr_yXSAHpwgiovhqigZsIbxyvowoamDt/preview';
const SURVEY_FORM_URL = 'https://tally.so/r/lb7L7p';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, revealed };
}

function RevealSection({ children, className = '', delay = '' }: { children: React.ReactNode; className?: string; delay?: string }) {
  const { ref, revealed } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal-up ${revealed ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const { stats } = usePlatformStats();
  const [showSurveyPopup, setShowSurveyPopup] = useState(false);

  useEffect(() => {
    const hasSeenSurveyPopup = window.localStorage.getItem('gurpc-survey-popup-seen');
    if (hasSeenSurveyPopup !== 'true') {
      setShowSurveyPopup(true);
    }
  }, []);

  const closeSurveyPopup = () => {
    setShowSurveyPopup(false);
    window.localStorage.setItem('gurpc-survey-popup-seen', 'true');
  };

  return (
    <div className="flex flex-col min-h-screen bg-grid-tech">

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 to-white dark:from-[#020a04] dark:to-[#020a04] scanline">
        {/* Particle Background */}
        <ParticleGrid />
        
        {/* Glowing Orbs */}
        <GlowingOrb color="bg-green-500" size="w-[600px] h-[600px]" position="top-[-200px] left-1/2 -translate-x-1/2" blur="blur-[150px]" opacity="opacity-20" />
        <GlowingOrb color="bg-emerald-400" size="w-[300px] h-[300px]" position="bottom-[-100px] right-[-100px]" blur="blur-[100px]" opacity="opacity-15" />
        <GlowingOrb color="bg-green-600" size="w-[200px] h-[200px]" position="top-[20%] left-[-50px]" blur="blur-[80px]" opacity="opacity-10" />

        {/* Content */}
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
            
            {/* Tech Badge */}
            <div className="tech-badge px-4 py-1.5 text-xs rounded-full flex items-center gap-2 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono tracking-wider">SYSTEM.INIT // GURPC v2.0</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter max-w-4xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-green-700 to-green-600 dark:from-white dark:via-green-100 dark:to-green-300 neon-text">
                Innovation Starts
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-300">
                With Research
              </span>
            </h1>

            {/* Typewriter */}
            <div className="h-8 flex items-center">
              <span className="font-mono text-green-400/70 text-sm md:text-base mr-2">&gt;_</span>
              <TypewriterText
                words={[
                  'Building a research-centric Bangladesh',
                  'Advancing scientific discovery',
                  'Cultivating academic excellence',
                  'Empowering future researchers',
                ]}
                className="font-mono text-green-300/80 text-sm md:text-base"
              />
            </div>

            {/* Description */}
            <p className="mx-auto max-w-[650px] text-slate-600 dark:text-slate-400 md:text-lg leading-relaxed">
              Green University Research &amp; Publication Community — where cutting-edge research meets collaborative innovation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-500 text-white rounded-lg px-8 h-12 text-base shadow-lg shadow-green-900/30 hover:shadow-green-500/20 transition-all border border-green-500/20 group">
                <Link href="/join">
                  <Terminal className="mr-2 h-4 w-4" />
                  Join the Community 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent text-green-700 border-green-300 hover:bg-green-50 hover:text-green-800 hover:border-green-400 dark:text-green-300 dark:border-green-500/20 dark:hover:bg-green-900/20 dark:hover:text-green-200 dark:hover:border-green-400/40 rounded-lg px-8 h-12 text-base font-medium transition-all">
                <Link href="/about">
                  <Code className="mr-2 h-4 w-4" />
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Survey Callout */}
            <div className="max-w-3xl w-full mt-4 rounded-2xl border border-green-500/20 bg-white/80 dark:bg-[#07120a]/80 backdrop-blur-md shadow-lg shadow-green-900/10 px-5 py-4 text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-green-600 dark:text-green-400 font-mono mb-1">Research Interest Mapping 2026</p>
                  <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">Fill the survey and help shape the next GURPC workshops</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                    Tell us your research area, current progress, and the support you need so we can match workshops, mentors, and collaborations to your interests.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                  <Button asChild className="bg-green-600 hover:bg-green-500 text-white rounded-lg px-4 h-11 shadow-lg shadow-green-900/20">
                    <Link href={SURVEY_FORM_URL} target="_blank" rel="noopener noreferrer">
                      Fill Survey
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-lg px-4 h-11 border-green-300 text-green-700 hover:bg-green-50 dark:text-green-300 dark:border-green-500/20 dark:hover:bg-green-900/20">
                    <Link href={SURVEY_POST_URL} target="_blank" rel="noopener noreferrer">
                      View Post
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-lg px-4 h-11 border-green-300 text-green-700 hover:bg-green-50 dark:text-green-300 dark:border-green-500/20 dark:hover:bg-green-900/20">
                    <Link href={SURVEY_POSTER_URL} target="_blank" rel="noopener noreferrer">
                      View Poster
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="pt-12 animate-bounce">
              <div className="w-6 h-10 rounded-full border-2 border-green-400/40 dark:border-green-500/30 flex items-start justify-center p-1.5">
                <div className="w-1 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#020a04] to-transparent pointer-events-none z-20" />
      </section>

      {showSurveyPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6">
          <div className="w-full max-w-2xl rounded-3xl border border-green-500/20 bg-white dark:bg-[#061009] shadow-2xl shadow-green-950/30 overflow-hidden">
            <div className="flex items-start justify-between gap-4 px-6 pt-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-green-600 dark:text-green-400 font-mono">Community Survey</p>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-2">Research Interest Mapping 2026</h3>
              </div>
              <button
                type="button"
                onClick={closeSurveyPopup}
                className="rounded-full border border-slate-200 dark:border-green-900/30 px-3 py-1 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="px-6 pb-6 pt-4 space-y-4">
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-7">
                Tell GURPC what you are working on, what you want to learn next, and what support would help you move faster.
                This survey helps us plan the right workshops, mentors, and collaboration opportunities.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 text-sm text-slate-600 dark:text-slate-300">
                <div className="rounded-2xl border border-slate-200 dark:border-green-900/20 bg-slate-50 dark:bg-white/[0.02] p-4">
                  <p className="font-semibold text-slate-900 dark:text-white mb-1">How to participate</p>
                  <p>Open the survey, share your research area and current progress, and submit in about 1 minute.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 dark:border-green-900/20 bg-slate-50 dark:bg-white/[0.02] p-4">
                  <p className="font-semibold text-slate-900 dark:text-white mb-1">Need the poster?</p>
                  <p>Use the poster link to view the official flyer shared with the announcement.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-green-900/20 bg-slate-50 dark:bg-white/[0.02] p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-green-600 dark:text-green-400">Poster Preview</p>
                  <Link
                    href={SURVEY_POSTER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-green-600 dark:text-green-400 hover:underline"
                  >
                    Open Full Poster
                  </Link>
                </div>
                <iframe
                  src={SURVEY_POSTER_PREVIEW_URL}
                  title="Research Interest Mapping 2026 Poster"
                  className="w-full h-[320px] rounded-xl border border-slate-200 dark:border-green-900/20 bg-white"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild className="bg-green-600 hover:bg-green-500 text-white rounded-lg px-5 h-12">
                  <Link href={SURVEY_FORM_URL} target="_blank" rel="noopener noreferrer" onClick={closeSurveyPopup}>
                    Fill Survey Now
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-lg px-5 h-12 border-green-300 text-green-700 hover:bg-green-50 dark:text-green-300 dark:border-green-500/20 dark:hover:bg-green-900/20">
                  <Link href={SURVEY_POST_URL} target="_blank" rel="noopener noreferrer">
                    Open Facebook Post
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-lg px-5 h-12 border-green-300 text-green-700 hover:bg-green-50 dark:text-green-300 dark:border-green-500/20 dark:hover:bg-green-900/20">
                  <Link href={SURVEY_POSTER_URL} target="_blank" rel="noopener noreferrer">
                    Open Poster
                  </Link>
                </Button>
              </div>

              <button
                type="button"
                onClick={closeSurveyPopup}
                className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ STATS SECTION ═══════════ */}
      <section className="relative py-16 bg-slate-50 dark:bg-[#020a04] border-y border-green-200 dark:border-green-900/20 overflow-hidden">
        <div className="absolute inset-0 hex-pattern" />
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, value: stats.members, suffix: '+', label: 'Active Members', href: '/members' },
              { icon: BookOpen, value: stats.papers, suffix: '+', label: 'Publications', href: '/publications' },
              { icon: Lightbulb, value: stats.projects, suffix: '+', label: 'Ongoing Projects', href: '/projects' },
              { icon: Folder, value: stats.groups, suffix: '+', label: 'Research Groups', href: '/groups' },
            ].map((stat, i) => (
              <RevealSection key={stat.label} delay={`${i * 100}ms`}>
                <Link href={stat.href} className="block">
                  <div className="cyber-card rounded-xl p-6 text-center group cursor-pointer hover:border-green-500/30 transition-all">
                    <stat.icon className="h-8 w-8 text-green-500 mx-auto mb-3 group-hover:text-green-400 transition-colors animate-float" style={{ animationDelay: `${i * 0.5}s` }} />
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </h3>
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-mono">{stat.label}</p>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ DIRECTOR'S MESSAGE ═══════════ */}
      <section className="relative py-20 md:py-28 bg-white dark:bg-[#010803] overflow-hidden">
        <GlowingOrb color="bg-green-500" size="w-[400px] h-[400px]" position="top-[-100px] right-[-100px]" blur="blur-[120px]" opacity="opacity-8" />
        <GlowingOrb color="bg-emerald-600" size="w-[300px] h-[300px]" position="bottom-[-80px] left-[-80px]" blur="blur-[100px]" opacity="opacity-6" />
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <RevealSection>
            <div className="text-center mb-12">
              <span className="tech-badge inline-flex items-center px-3 py-1 rounded-full text-xs mb-4 gap-2">
                <Quote className="h-3 w-3" /> LEADERSHIP
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                Messages from <span className="text-green-600 dark:text-green-400">Our Leaders</span>
              </h2>
            </div>
          </RevealSection>

          <RevealSection delay="100ms">
            <div className="max-w-4xl mx-auto cyber-card rounded-2xl p-8 md:p-12 relative">
              {/* Decorative quote marks */}
              <div className="absolute top-6 left-6 text-green-500/10 text-8xl font-serif leading-none select-none">&ldquo;</div>
              
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                {/* Director Photo */}
                <div className="shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-600/10 border border-green-500/20 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/d/1kk5gbzQRCPB4UnulN6lAF2NsHL2yLZ8-"
                      alt="Prof. Dr. ASM Shihavuddin"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-slate-900 dark:text-white font-semibold text-sm">Prof. Dr. ASM Shihavuddin</h3>
                    <p className="text-green-600/70 dark:text-green-400/70 text-xs font-mono mt-1">Director, CRIT &amp; CETL</p>
                  </div>
                </div>

                {/* Message */}
                <div className="flex-1 relative z-10">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base mb-4">
                    Research is the cornerstone of academic excellence and societal progress. At GURPC, we are committed to fostering a vibrant research culture among students at Green University of Bangladesh.
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm md:text-base mb-4">
                    Our mission is to empower young minds with the skills and knowledge needed to contribute meaningfully to the global research community. Through collaborative projects, mentorship programs, and publication support, we strive to bridge the gap between classroom learning and real-world innovation.
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                    I invite all students, faculty, and researchers to join us in this journey of discovery and excellence. Together, we can build a research-centric Bangladesh.
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-green-500/10 flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-gradient-to-r from-green-500 to-transparent" />
                    <span className="text-green-400/60 font-mono text-xs">Prof. Dr. ASM Shihavuddin</span>
                  </div>
                </div>
              </div>

              {/* Decorative closing quote */}
              <div className="absolute bottom-6 right-8 text-green-500/10 text-8xl font-serif leading-none select-none">&rdquo;</div>
            </div>
          </RevealSection>

          {/* Assistant Director Message */}
          <RevealSection delay="200ms">
            <div className="max-w-4xl mx-auto cyber-card rounded-2xl p-8 md:p-12 relative mt-8">
              {/* Decorative quote marks */}
              <div className="absolute top-6 left-6 text-green-500/10 text-8xl font-serif leading-none select-none">&ldquo;</div>
              
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                {/* Assistant Director Photo */}
                <div className="shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-600/10 border border-green-500/20 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/d/1GLqe0ITL2MJa2D4zbnb83z8DotBv8xb4"
                      alt="Ms. Farhana Akter Sunny"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-slate-900 dark:text-white font-semibold text-sm">Ms. Farhana Akter Sunny</h3>
                    <p className="text-green-600/70 dark:text-green-400/70 text-xs font-mono mt-1">Asst. Director, CRIT</p>
                  </div>
                </div>

                {/* Message */}
                <div className="flex-1 relative z-10">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base mb-4">
                    GURPC represents a unique platform where curiosity meets opportunity. As the Assistant Director of CRIT, I am deeply passionate about nurturing research talent and creating pathways for students to excel in academic publishing.
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm md:text-base mb-4">
                    Our community thrives on collaboration and the shared belief that every student has the potential to contribute to meaningful research. We provide the tools, guidance, and support system needed to turn ideas into impactful publications.
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                    I encourage every aspiring researcher to take the first step — join GURPC, engage with our workshops, and let us help you shape the future through the power of research.
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-green-500/10 flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-gradient-to-r from-green-500 to-transparent" />
                    <span className="text-green-400/60 font-mono text-xs">Ms. Farhana Akter Sunny</span>
                  </div>
                </div>
              </div>

              {/* Decorative closing quote */}
              <div className="absolute bottom-6 right-8 text-green-500/10 text-8xl font-serif leading-none select-none">&rdquo;</div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════ FEATURES / WHAT WE DO ═══════════ */}
      <section className="relative py-20 md:py-28 bg-slate-50 dark:bg-[#020a04] overflow-hidden">
        <GlowingOrb color="bg-green-500" size="w-[500px] h-[500px]" position="top-[50%] left-[-200px] -translate-y-1/2" blur="blur-[150px]" opacity="opacity-10" />
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <RevealSection>
            <div className="text-center mb-16">
              <span className="tech-badge inline-flex items-center px-3 py-1 rounded-full text-xs mb-4 gap-2">
                <Cpu className="h-3 w-3" /> CORE MODULES
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                What We <span className="text-green-600 dark:text-green-400">Build</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                Our community operates at the intersection of academic research and technological innovation.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: 'Research Publications', desc: 'Publish papers in peer-reviewed journals with mentorship from experienced researchers and faculty.', tag: 'PUBLISH' },
              { icon: Lightbulb, title: 'Innovation Labs', desc: 'Hands-on project labs where ideas transform into prototypes, papers, and real-world solutions.', tag: 'INNOVATE' },
              { icon: Users, title: 'Collaborative Network', desc: 'Connect with researchers across departments and institutions for cross-disciplinary breakthroughs.', tag: 'CONNECT' },
              { icon: Calendar, title: 'Workshops & Seminars', desc: 'Regular events on research methodology, data analysis, academic writing, and emerging technologies.', tag: 'LEARN' },
              { icon: Shield, title: 'Mentorship Program', desc: 'One-on-one guidance from published researchers, professors, and industry professionals.', tag: 'MENTOR' },
              { icon: Binary, title: 'Open Source Contributions', desc: 'Contribute to open-source research tools and datasets that benefit the global academic community.', tag: 'CONTRIBUTE' },
            ].map((feature, i) => (
              <RevealSection key={feature.title} delay={`${i * 80}ms`}>
                <div className="cyber-card rounded-xl p-6 h-full group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20 group-hover:border-green-400/30 transition-all">
                      <feature.icon className="h-5 w-5 text-green-400" />
                    </div>
                    <span className="font-mono text-[10px] text-green-500/60 tracking-widest">[{feature.tag}]</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors">{feature.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ EVENTS SECTION ═══════════ */}
      <section className="relative py-20 md:py-28 bg-white dark:bg-[#010803] overflow-hidden">
        <GlowingOrb color="bg-emerald-500" size="w-[400px] h-[400px]" position="top-0 right-[-150px]" blur="blur-[120px]" opacity="opacity-10" />
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <RevealSection>
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
              <div>
                <span className="tech-badge inline-flex items-center px-3 py-1 rounded-full text-xs mb-4 gap-2">
                  <Zap className="h-3 w-3" /> NEW INITIATIVES
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                  Meeting <span className="text-green-600 dark:text-green-400">Decisions</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400">Key initiatives from our latest meeting driving GURPC forward.</p>
              </div>
              <Button variant="ghost" asChild className="hidden md:inline-flex text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20 border border-green-300 dark:border-green-500/20">
                <Link href="/initiatives" className="group font-mono text-sm">
                  view_all() <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Video, title: 'Content Recording', desc: 'All sessions professionally recorded and archived for on-demand access.', tag: 'RECORD', href: '/initiatives' },
              { icon: BookMarked, title: 'Paper Reading Team', desc: 'Dedicated team reviewing and discussing key research papers weekly.', tag: 'READ', href: '/initiatives' },
              { icon: Share2, title: 'Resource Sharing', desc: 'Centralized system for datasets, software, and research materials.', tag: 'SHARE', href: '/resources' },
              { icon: Monitor, title: 'Software Workshops', desc: 'Department-wise workshops: R, SPSS, MATLAB, Python, LaTeX.', tag: 'SOFTWARE', href: '/resources' },
              { icon: GraduationCap, title: 'Training Ecosystem', desc: 'Structured membership with batch training and specialized groups.', tag: 'TRAIN', href: '/training' },
              { icon: Mic, title: 'Research Talks', desc: 'Domain-based talks by faculty and alumni experts.', tag: 'TALK', href: '/events' },
              { icon: Target, title: 'Paper Targets', desc: 'Ambitious publication targets with mentorship support.', tag: 'TARGET', href: '/initiatives' },
              { icon: Library, title: 'Journal Directory', desc: 'Curated list of conferences and journals with deadlines.', tag: 'DIRECTORY', href: '/conferences' },
            ].map((item, i) => (
              <RevealSection key={item.title} delay={`${i * 60}ms`}>
                <Link href={item.href} className="block h-full">
                  <div className="cyber-card rounded-xl p-5 h-full group cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-lg bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                        <item.icon className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="font-mono text-[9px] text-green-500/60 tracking-widest">[{item.tag}]</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5 group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors">{item.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Button variant="outline" asChild className="w-full border-green-300 text-green-600 hover:bg-green-50 dark:border-green-500/20 dark:text-green-400 dark:hover:bg-green-900/20">
              <Link href="/initiatives">View all initiatives</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════ UPCOMING EVENTS SECTION ═══════════ */}
      <section className="relative py-20 md:py-28 bg-slate-50 dark:bg-[#020a04] overflow-hidden">
        <GlowingOrb color="bg-emerald-500" size="w-[400px] h-[400px]" position="top-0 right-[-150px]" blur="blur-[120px]" opacity="opacity-10" />
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <RevealSection>
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
              <div>
                <span className="tech-badge inline-flex items-center px-3 py-1 rounded-full text-xs mb-4 gap-2">
                  <Zap className="h-3 w-3" /> LIVE FEED
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                  Upcoming <span className="text-green-600 dark:text-green-400">Events</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400">Stay synced with our latest workshops, seminars, and news.</p>
              </div>
              <Button variant="ghost" asChild className="hidden md:inline-flex text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20 border border-green-300 dark:border-green-500/20">
                <Link href="/events" className="group font-mono text-sm">
                  view_all() <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { date: 'Mar 15, 2026', title: 'Research Methodology Workshop', desc: 'An intensive session on qualitative and quantitative research methods for beginners.', badge: 'UPCOMING', color: 'bg-green-500' },
              { date: 'Apr 2, 2026', title: 'Annual Research Symposium', desc: 'Present your ongoing research and get feedback from industry experts and faculty.', badge: 'REGISTER', color: 'bg-emerald-500' },
              { date: 'Feb 10, 2026', title: 'Call for Papers: GUB Journal', desc: 'Submit your research papers for the upcoming issue of the Green University Journal of Science.', badge: 'OPEN', color: 'bg-teal-500' },
            ].map((event, i) => (
              <RevealSection key={event.title} delay={`${i * 100}ms`}>
                <div className="cyber-card rounded-xl overflow-hidden h-full group">
                  {/* Top accent */}
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-green-500 to-transparent data-flow" />
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs text-slate-500">{event.date}</span>
                      <span className="tech-badge px-2 py-0.5 rounded text-[10px] font-mono">{event.badge}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors">{event.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{event.desc}</p>
                    <Link href="/events" className="inline-flex items-center text-sm font-mono text-green-400 hover:text-green-300 transition-colors group/link">
                      details() <ArrowRight className="ml-1 h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild className="w-full border-green-300 text-green-600 hover:bg-green-50 dark:border-green-500/20 dark:text-green-400 dark:hover:bg-green-900/20">
              <Link href="/events">View all events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA SECTION ═══════════ */}
      <section className="relative py-24 overflow-hidden bg-white dark:bg-[#010803]">
        <GlowingOrb color="bg-green-500" size="w-[800px] h-[400px]" position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur="blur-[150px]" opacity="opacity-15" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-tech" />
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <RevealSection>
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 tech-badge px-4 py-1.5 rounded-full text-xs mb-6">
                <Terminal className="h-3 w-3" />
                <span className="font-mono">READY TO DEPLOY</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 neon-text">
                Start Your Research<br />
                <span className="text-green-600 dark:text-green-400">Journey Today</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-10">
                Join a community of passionate learners and innovators. Whether you&apos;re a student, alumni, or faculty member — your next breakthrough starts here.
              </p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg px-12 h-14 text-lg shadow-xl shadow-green-900/30 hover:shadow-green-500/20 transition-all border border-green-500/20 animate-glow-pulse group">
                <Link href="/join">
                  <Zap className="mr-2 h-5 w-5" />
                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}

