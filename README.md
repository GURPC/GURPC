# GURPC — Green University Research & Publication Community

> A digital hub for the GURPC community to facilitate research collaboration, knowledge sharing, member management, and academic achievement tracking.

---

## Tech Stack

| Layer        | Technology                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| Framework    | [Next.js 14](https://nextjs.org/) (App Router, React 18)                  |
| Language     | TypeScript                                                                 |
| Styling      | Tailwind CSS + `class-variance-authority` + `tailwind-merge`               |
| Database     | [Supabase](https://supabase.com/) (PostgreSQL + Auth + Storage)            |
| Auth         | Supabase Auth via `@supabase/ssr` (cookie-based SSR sessions)              |
| Forms        | `react-hook-form` + `zod` validation + `@hookform/resolvers`              |
| Icons        | `lucide-react`                                                             |
| UI Primitives| Radix UI (`@radix-ui/react-select`, `@radix-ui/react-slot`)              |
| Deployment   | Vercel (default) or GitHub Pages (static export)                           |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A [Supabase](https://supabase.com/) project

### 1. Clone & Install

```bash
git clone https://github.com/MrMajharul/GURPC.git
cd GURPC
npm install
```

### 2. Configure Environment

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Required variables (see `.env.example`):

| Variable                        | Description                         |
| ------------------------------- | ----------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL           |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public API key   |
| `DEPLOY_TARGET`                 | Set to `github-pages` for GH Pages  |

### 3. Set Up Database

Run the SQL schema against your Supabase project:

```bash
# Copy the contents of supabase/schema.sql into the Supabase SQL Editor and execute.
```

This creates: `profiles`, `papers`, `research_groups`, `group_members`, `projects`, `project_members`, `blogs` tables with Row Level Security policies.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build for Production

```bash
npm run build     # Standard build (Vercel)
npm start         # Start production server
```

For GitHub Pages (static export):

```bash
DEPLOY_TARGET=github-pages npm run build
# Output in /out directory
```

---

## Project Structure

```
GURPC/
├── app/                        # Next.js App Router — all pages/routes
│   ├── layout.tsx              # Root layout (providers, navbar, footer)
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles & Tailwind directives
│   │
│   ├── auth/                   # Authentication pages
│   │   ├── login/              #   Login form
│   │   ├── signup/             #   Registration form
│   │   └── callback/           #   OAuth callback handler
│   │
│   ├── dashboard/              # Authenticated dashboard
│   │   └── papers/new/         #   Submit new paper
│   │
│   ├── blog/                   # Blog system
│   │   ├── page.tsx            #   Blog listing (server wrapper)
│   │   ├── BlogListClient.tsx  #   Client-side blog list with Supabase fetch
│   │   ├── create/             #   Create new blog post (auth required)
│   │   └── [slug]/             #   Dynamic blog post page
│   │
│   ├── groups/                 # Research groups
│   │   ├── create/             #   Create new group
│   │   └── [id]/               #   Group detail page
│   │
│   ├── projects/               # Research projects
│   │   ├── create/             #   Create new project
│   │   └── [id]/               #   Project detail page
│   │
│   ├── members/                # Member directory
│   │   └── [id]/               #   Member profile page
│   │
│   ├── profile/                # Current user's profile
│   ├── executives/             # Executive committee listing
│   ├── team/                   # Full team listing
│   ├── publications/           # Research publications
│   ├── conferences/            # Conference & journal directory
│   ├── training/               # Training programs
│   ├── resources/              # Software & dataset resources
│   ├── initiatives/            # GURPC initiatives
│   ├── stories/                # Success stories
│   ├── events/                 # Events calendar
│   ├── calendar/               # Academic calendar
│   ├── newsfeed/               # Community newsfeed
│   ├── join/                   # Membership application
│   ├── contact/                # Contact page
│   ├── about/                  # About GURPC
│   ├── guidelines/             # Research guidelines
│   ├── privacy/                # Privacy policy
│   └── terms/                  # Terms of service
│
├── components/                 # Reusable React components
│   ├── common/                 #   Shared components (Logo, etc.)
│   ├── layout/                 #   Layout components (Navbar, Footer)
│   ├── providers/              #   Context providers (Auth, Theme)
│   ├── effects/                #   Visual effects (GlowingOrb, MatrixRain, etc.)
│   ├── ui/                     #   Primitive UI components (Button, Card, Badge, etc.)
│   ├── projects/               #   Project-specific components (ProjectCard)
│   └── team/                   #   Team-specific components (TeamCard)
│
├── types/                      # TypeScript type definitions
│   ├── index.ts                #   Core types (User, TeamMember, Project) + re-exports
│   └── content.ts              #   Content types (Initiative, Conference, Resource, etc.)
│
├── lib/                        # Utilities & services
│   ├── utils.ts                #   Helper functions (cn for Tailwind class merging)
│   └── supabase/               #   Supabase client configuration
│       ├── client.ts           #     Browser client (singleton)
│       ├── server.ts           #     Server client (cookie-based)
│       ├── middleware.ts        #     Session refresh & token cleanup
│       └── types.ts            #     Database types (maps to DB schema)
│
├── hooks/                      # Custom React hooks
│   └── usePlatformStats.ts     #   Fetches platform statistics from Supabase
│
├── data/                       # Static/seed data (one file per concern)
│   ├── initiatives.ts          #   GURPC initiative definitions
│   ├── conferences.ts          #   Conference & journal directory
│   ├── resources.ts            #   Software & dataset resources
│   ├── training.ts             #   Training program catalog
│   ├── recruitment.ts          #   Membership recruitment criteria
│   ├── successStories.ts       #   Member success stories
│   ├── team.ts                 #   Team member directory
│   └── mockProjects.ts         #   Sample project data
│
├── supabase/
│   └── schema.sql              # Database schema (tables, RLS policies, triggers)
│
├── docs/
│   └── GURPC_Website_Plan.md   # High-level project plan & roadmap
│
├── public/                     # Static assets
│   ├── images/                 #   Logo files, placeholder images
│   └── sw.js                   #   Service worker
│
├── middleware.ts                # Next.js middleware (delegates to Supabase session)
├── next.config.js              # Next.js configuration (GitHub Pages conditional export)
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── .env.example                # Environment variable template
└── package.json                # Dependencies & scripts
```

---

## Type System

This project has two parallel type layers:

| Layer | Location | Purpose |
|-------|----------|---------|
| **UI / Static Data** | `types/index.ts` + `types/content.ts` | Types for static data in `data/` and UI components. Used by components and seed data. |
| **Database / Supabase** | `lib/supabase/types.ts` | Types that mirror the Supabase PostgreSQL schema. Used by pages that read/write to the database. |

Import convention:
```ts
import type { TeamMember } from '@/types';                   // UI/static data type
import type { Profile, Blog } from '@/lib/supabase/types';   // Database row type
```

---

## Key Patterns

### Path Aliases
All imports use `@/` which resolves to the project root (configured in `tsconfig.json`).

### Authentication Flow
1. `middleware.ts` refreshes Supabase sessions on every request
2. `AuthProvider` wraps the app and exposes `useAuth()` hook
3. Protected pages check `user` from `useAuth()` and redirect to login

### Styling Convention
- Tailwind utility classes with a cyber/green theme
- Custom CSS classes: `cyber-card`, `bg-grid-tech`, `tech-badge` (defined in `globals.css`)
- Primary color: green (`hsl(142, 76%, 36%)`)
- UI components use `class-variance-authority` for variant styles

### Data Flow
- **Static pages** (initiatives, training, etc.) import from `data/*.ts`
- **Dynamic pages** (blog, groups, projects, dashboard) fetch from Supabase at runtime
- **Supabase Storage** for file uploads (e.g., `blog-images` bucket)

---

## Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start development server             |
| `npm run build`  | Production build                     |
| `npm start`      | Start production server              |
| `npm run lint`   | Run ESLint                           |

---

## Contributing

1. Create a feature branch from `main`
2. Follow existing code patterns and naming conventions
3. Place types in `types/`, static data in `data/`, and components in the appropriate `components/` subfolder
4. Test with `npm run build` before pushing
5. Open a pull request with a clear description

---

## License

This project is maintained by the GURPC community at Green University of Bangladesh.

