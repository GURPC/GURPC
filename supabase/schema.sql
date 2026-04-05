-- ══════════════════════════════════════════════════════════════
-- GURPC Database Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════════

-- ═══════════ PROFILES ═══════════
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  department TEXT,
  batch_year TEXT,
  bio TEXT,
  research_interests TEXT[] DEFAULT '{}',
  photo_url TEXT,
  google_scholar_url TEXT,
  ieee_url TEXT,
  researchgate_url TEXT,
  orcid_url TEXT,
  github_url TEXT,
  website_url TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'executive', 'moderator', 'advisor', 'admin')),
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, department, batch_year)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'department',
    NEW.raw_user_meta_data->>'batch_year'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ═══════════ PAPERS ═══════════
CREATE TABLE IF NOT EXISTS papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  doi_url TEXT,
  year INTEGER,
  co_authors TEXT[] DEFAULT '{}',
  file_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'accepted', 'published')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════ RESEARCH GROUPS ═══════════
CREATE TABLE IF NOT EXISTS research_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  domain TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT TRUE,
  created_by UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES research_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- ═══════════ PROJECTS ═══════════
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  domain TEXT,
  group_id UUID REFERENCES research_groups(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'idea' CHECK (status IN ('idea', 'literature_review', 'experiments', 'draft', 'submitted', 'published')),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  is_public BOOLEAN DEFAULT TRUE,
  created_by UUID NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- ═══════════ MILESTONES ═══════════
CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ══════════════════════════════════════════════════════════════

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

-- PROFILES: Public read, own write
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- PAPERS: Public read, own write
CREATE POLICY "Published papers are viewable" ON papers
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own papers" ON papers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own papers" ON papers
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own papers" ON papers
  FOR DELETE USING (auth.uid() = user_id);

-- RESEARCH GROUPS: Public groups visible to all, private to members only
CREATE POLICY "Public groups are viewable" ON research_groups
  FOR SELECT USING (
    is_public = true
    OR created_by = auth.uid()
    OR EXISTS (SELECT 1 FROM group_members WHERE group_id = id AND user_id = auth.uid())
  );

CREATE POLICY "Authenticated users can create groups" ON research_groups
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Group admin can update" ON research_groups
  FOR UPDATE USING (
    created_by = auth.uid()
    OR EXISTS (SELECT 1 FROM group_members WHERE group_id = id AND user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Group admin can delete" ON research_groups
  FOR DELETE USING (created_by = auth.uid());

-- GROUP MEMBERS
CREATE POLICY "Group members viewable" ON group_members
  FOR SELECT USING (true);

CREATE POLICY "Group admin can manage members" ON group_members
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM group_members gm WHERE gm.group_id = group_id AND gm.user_id = auth.uid() AND gm.role = 'admin')
    OR EXISTS (SELECT 1 FROM research_groups rg WHERE rg.id = group_id AND rg.created_by = auth.uid())
  );

CREATE POLICY "Members can leave or admin can remove" ON group_members
  FOR DELETE USING (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM group_members gm WHERE gm.group_id = group_id AND gm.user_id = auth.uid() AND gm.role = 'admin')
  );

-- PROJECTS
CREATE POLICY "Public projects are viewable" ON projects
  FOR SELECT USING (
    is_public = true
    OR created_by = auth.uid()
    OR EXISTS (SELECT 1 FROM project_members WHERE project_id = id AND user_id = auth.uid())
  );

CREATE POLICY "Authenticated users can create projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Project admin can update" ON projects
  FOR UPDATE USING (
    created_by = auth.uid()
    OR EXISTS (SELECT 1 FROM project_members WHERE project_id = id AND user_id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Project admin can delete" ON projects
  FOR DELETE USING (created_by = auth.uid());

-- PROJECT MEMBERS
CREATE POLICY "Project members viewable" ON project_members
  FOR SELECT USING (true);

CREATE POLICY "Project admin can manage members" ON project_members
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM project_members pm WHERE pm.project_id = project_id AND pm.user_id = auth.uid() AND pm.role = 'admin')
    OR EXISTS (SELECT 1 FROM projects p WHERE p.id = project_id AND p.created_by = auth.uid())
  );

CREATE POLICY "Members can leave or admin can remove" ON project_members
  FOR DELETE USING (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM project_members pm WHERE pm.project_id = project_id AND pm.user_id = auth.uid() AND pm.role = 'admin')
  );

-- MILESTONES
CREATE POLICY "Milestones viewable with project" ON milestones
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects p WHERE p.id = project_id
      AND (p.is_public = true OR p.created_by = auth.uid()
        OR EXISTS (SELECT 1 FROM project_members pm WHERE pm.project_id = p.id AND pm.user_id = auth.uid()))
    )
  );

CREATE POLICY "Project members can manage milestones" ON milestones
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM projects p WHERE p.id = project_id AND p.created_by = auth.uid())
    OR EXISTS (SELECT 1 FROM project_members pm WHERE pm.project_id = project_id AND pm.user_id = auth.uid())
  );

CREATE POLICY "Project members can update milestones" ON milestones
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM projects p WHERE p.id = project_id AND p.created_by = auth.uid())
    OR EXISTS (SELECT 1 FROM project_members pm WHERE pm.project_id = project_id AND pm.user_id = auth.uid())
  );

CREATE POLICY "Project admin can delete milestones" ON milestones
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM projects p WHERE p.id = project_id AND p.created_by = auth.uid())
  );

-- ══════════════════════════════════════════════════════════════
-- STORAGE BUCKETS
-- ══════════════════════════════════════════════════════════════

-- Create storage buckets (run in SQL editor)
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('papers', 'papers', false) ON CONFLICT DO NOTHING;

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar" ON storage.objects
  FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for papers
CREATE POLICY "Paper files accessible to authenticated users" ON storage.objects
  FOR SELECT USING (bucket_id = 'papers' AND auth.role() = 'authenticated');

CREATE POLICY "Users can upload their own papers" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'papers' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own papers" ON storage.objects
  FOR DELETE USING (bucket_id = 'papers' AND auth.uid()::text = (storage.foldername(name))[1]);
