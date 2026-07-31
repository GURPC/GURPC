import Link from 'next/link';
import { ArrowLeft, Code2, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

export default function DeveloperPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020a04] px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="overflow-hidden rounded-3xl border border-green-500/15 bg-white/80 shadow-xl shadow-green-500/10 backdrop-blur dark:border-green-500/10 dark:bg-slate-900/70">
          <div className="border-b border-green-500/10 bg-gradient-to-r from-green-600/10 to-emerald-500/5 p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-green-600 dark:text-green-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  Developer Profile
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
                  Majharul Islam
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
                  I build polished, user-focused web experiences with modern Next.js and thoughtful UI design,
                  turning ideas into practical digital products for communities and organizations.
                </p>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-slate-950/90 p-5 text-sm text-slate-300 shadow-lg shadow-green-500/10">
                <div className="flex items-center gap-2 text-green-400">
                  <Code2 className="h-4 w-4" />
                  <span className="font-mono">Full Stack Developer</span>
                </div>
                <p className="mt-3 text-slate-400">
                  Focused on React, Next.js, TypeScript, and creating seamless digital experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10">
            <div className="space-y-6">
              <section>
                <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                  About
                </h2>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Majharul Islam is a developer passionate about building clean, modern interfaces and reliable
                  web applications. This profile page is part of the GURPC website experience and highlights the
                  work behind the platform.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'UI Design'].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="rounded-2xl border border-green-500/15 bg-slate-50 p-6 dark:border-green-500/10 dark:bg-slate-800/60">
              <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                Contact
              </h2>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span>majharul.cs@gmail.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Github className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <a href="https://github.com/MrMajharul" target="_blank" rel="noreferrer" className="hover:text-green-600 dark:hover:text-green-400">
                    GitHub
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <a href="https://www.linkedin.com/in/majharul-islam-m/" target="_blank" rel="noreferrer" className="hover:text-green-600 dark:hover:text-green-400">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
