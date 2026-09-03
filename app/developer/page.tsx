import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Code2,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  ExternalLink,
  Cpu,
  Database,
  Layers,
  Wrench,
  FlaskConical,
  Users,
} from 'lucide-react';

/* ─── Data ────────────────────────────────────────────────────────── */

const SKILLS: Record<string, string[]> = {
  Frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  Backend:  ['Node.js', 'REST API', 'Supabase', 'PostgreSQL'],
  Database: ['Supabase', 'PostgreSQL', 'Firebase'],
  Tools:    ['Git', 'GitHub', 'Figma', 'VS Code', 'Vercel'],
};

const SKILL_ICONS: Record<string, React.ReactNode> = {
  Frontend: <Layers   className="h-3.5 w-3.5" />,
  Backend:  <Cpu      className="h-3.5 w-3.5" />,
  Database: <Database className="h-3.5 w-3.5" />,
  Tools:    <Wrench   className="h-3.5 w-3.5" />,
};

const INTERESTS = [
  'Artificial Intelligence',
  'Machine Learning',
  'Bioinformatics',
  'Data Science',
  'Web Development',
  'Open Source',
];

/* ─── Shared component ────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.22em] text-green-600 dark:text-green-400">
      <span className="h-px flex-1 bg-green-500/20" />
      {children}
      <span className="h-px flex-1 bg-green-500/20" />
    </h2>
  );
}

/* ─── Page ────────────────────────────────────────────────────────── */

export default function DeveloperPage() {
  return (
    <main className="min-h-screen bg-slate-100 dark:bg-[#020a04] px-4 py-20">
      <div className="mx-auto max-w-4xl space-y-5">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors duration-150 hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* ══════════════════════════════════════════════════════════════
            MAIN CARD
        ══════════════════════════════════════════════════════════════ */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md dark:border-green-900/20 dark:bg-[#07120a]">

          {/* ── HERO SECTION ─────────────────────────────────────────── */}
          <div className="relative border-b border-slate-200 dark:border-green-900/20 px-8 py-10 md:px-10">
            {/* Dot grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
              style={{
                backgroundImage: 'radial-gradient(circle, #16a34a 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            {/* Top-right green glow */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-green-500/5 blur-3xl dark:bg-green-500/8" />

            <div className="relative">
              {/* Row 1 — Profile identity + Info card */}
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-8">

                {/* Left — Photo + identity */}
                <div className="flex items-start gap-5">
                  {/* Avatar */}
                  <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-2xl border-2 border-green-500/30 shadow-lg shadow-green-900/10 ring-4 ring-green-500/8">
                    <Image
                      src="/images/majharul-islam.png"
                      alt="Majharul Islam"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="pt-1">
                    {/* Developer badge */}
                    <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-50 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-green-700 dark:border-green-500/20 dark:bg-green-900/20 dark:text-green-400">
                      <Sparkles className="h-3 w-3" />
                      Developer
                    </div>

                    <h1 className="text-[1.65rem] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                      Majharul Islam
                    </h1>
                    <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                      Full-Stack Developer &amp; CSE Student
                    </p>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-300">
                      Building modern, scalable, and user-focused digital experiences for research and academic communities.
                    </p>
                  </div>
                </div>

                {/* Right — Info card */}
                <div className="w-full shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5 shadow-sm dark:border-green-900/25 dark:bg-slate-950/60 dark:shadow-md md:w-[240px]">
                  <div className="flex items-center gap-2">
                    <Code2 className="h-3.5 w-3.5 shrink-0 text-green-600 dark:text-green-400" />
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-green-600 dark:text-green-400">
                      Building Digital Experiences
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">
                    Designing and developing reliable digital platforms that turn ideas into practical, user-friendly experiences.
                  </p>
                </div>
              </div>

              {/* Row 2 — CTA Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://github.com/MrMajharul"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:bg-green-500 active:scale-[0.98]"
                >
                  <Github className="h-4 w-4" />
                  View Projects
                </a>
                <a
                  href="mailto:majharul.cs@gmail.com"
                  className="inline-flex items-center gap-2 rounded-xl border border-green-500/40 bg-transparent px-6 py-2.5 text-sm font-medium text-green-700 transition-all duration-150 hover:bg-green-50 hover:border-green-500/60 dark:text-green-400 dark:hover:bg-green-900/20 active:scale-[0.98]"
                >
                  <Mail className="h-4 w-4" />
                  Contact Me
                </a>
              </div>
            </div>
          </div>

          {/* ── BODY ─────────────────────────────────────────────────── */}
          <div className="grid gap-0 md:grid-cols-[1fr_300px]">

            {/* LEFT COLUMN */}
            <div className="space-y-8 border-b border-slate-200 p-8 dark:border-green-900/20 md:border-b-0 md:border-r md:p-10">

              {/* ABOUT */}
              <section>
                <SectionLabel>About</SectionLabel>
                <p className="text-sm leading-[1.9] text-slate-600 dark:text-slate-300">
                  Majharul Islam is a Computer Science &amp; Engineering student and full-stack
                  developer passionate about building clean, modern, and reliable web applications.
                  As the Web Developer of the Green University Research &amp; Publication Community,
                  he designed, developed, and maintains the platform, working across its user
                  interface, core features, member profiles, publications, events, and administrative
                  functionality.
                </p>
              </section>

              {/* TECHNICAL SKILLS */}
              <section>
                <SectionLabel>Technical Skills</SectionLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(SKILLS).map(([category, items]) => (
                    <div
                      key={category}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors duration-150 hover:border-green-400/40 dark:border-green-900/20 dark:bg-white/[0.03] dark:hover:border-green-700/30"
                    >
                      <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                        <span className="text-green-600 dark:text-green-400">
                          {SKILL_ICONS[category]}
                        </span>
                        {category}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] text-slate-600 dark:border-slate-700/50 dark:bg-slate-800/60 dark:text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* RESEARCH & INTERESTS */}
              <section>
                <SectionLabel>Research &amp; Interests</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:border-green-800/40 dark:bg-green-900/15 dark:text-green-300"
                    >
                      <FlaskConical className="h-3 w-3 shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>
              </section>

              {/* COMMUNITY CONTRIBUTIONS */}
              <section>
                <SectionLabel>Community Contributions</SectionLabel>
                <div className="rounded-2xl border border-green-500/20 bg-green-50/60 p-5 transition-colors duration-150 hover:border-green-500/35 dark:border-green-800/30 dark:bg-green-900/10 dark:hover:border-green-700/40">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 shrink-0 rounded-xl border border-green-500/20 bg-green-100 p-2.5 text-green-700 dark:border-green-800/30 dark:bg-green-900/30 dark:text-green-400">
                      <Users className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-sm text-slate-900 dark:text-white">
                        Green University Research &amp; Publication Community
                      </p>
                      <p className="mt-0.5 mb-3 text-[10px] font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">
                        Web Developer
                      </p>
                      <p className="text-xs leading-[1.85] text-slate-500 dark:text-slate-400">
                        Designed, developed, and currently maintain the GURPC digital platform,
                        including its public-facing pages, member profiles, publications, events,
                        community features, and administrative functionality.
                      </p>
                      <a
                        href="https://gurpc.green.edu.bd"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-mono text-green-600 transition-colors duration-150 hover:text-green-500 hover:underline dark:text-green-400 dark:hover:text-green-300"
                      >
                        gurpc.green.edu.bd
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN — CONNECT */}
            <div className="p-8 md:p-8">
              <div className="sticky top-24">
                <h2 className="mb-5 text-[10px] font-mono uppercase tracking-[0.22em] text-green-600 dark:text-green-400">
                  Let&apos;s Connect
                </h2>

                {/* Availability */}
                <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-50 px-3.5 py-2.5 dark:border-green-800/30 dark:bg-green-900/15">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" style={{ animationDuration: '2s' }} />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-[11px] font-medium text-green-700 dark:text-green-300">
                    Available for Collaboration
                  </span>
                </div>

                {/* Links */}
                <ul className="space-y-2">
                  {[
                    {
                      href: 'mailto:majharul.cs@gmail.com',
                      icon: <Mail className="h-4 w-4" />,
                      label: 'majharul.cs@gmail.com',
                      external: false,
                    },
                    {
                      href: 'https://github.com/MrMajharul',
                      icon: <Github className="h-4 w-4" />,
                      label: 'GitHub',
                      external: true,
                    },
                    {
                      href: 'https://www.linkedin.com/in/majharul-islam-m/',
                      icon: <Linkedin className="h-4 w-4" />,
                      label: 'LinkedIn',
                      external: true,
                    },
                  ].map(({ href, icon, label, external }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noreferrer' : undefined}
                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs text-slate-600 transition-all duration-150 hover:border-green-400/50 hover:bg-green-50 hover:text-green-700 dark:border-green-900/20 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-green-700/30 dark:hover:bg-green-900/15 dark:hover:text-green-300"
                      >
                        <span className="shrink-0 text-green-600 dark:text-green-400">{icon}</span>
                        <span className="truncate">{label}</span>
                        {external && <ExternalLink className="ml-auto h-3 w-3 shrink-0 opacity-40" />}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Footer note */}
                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-green-900/15 dark:bg-white/[0.02]">
                  <p className="text-[11px] leading-5 text-slate-500 dark:text-slate-400 text-center">
                    Open to collaboration, research initiatives, academic projects, and freelance opportunities.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
