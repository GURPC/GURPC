'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface PlatformStats {
  members: number;
  papers: number;
  projects: number;
  groups: number;
}

export function usePlatformStats() {
  const [stats, setStats] = useState<PlatformStats>({
    members: 60,
    papers: 15,
    projects: 10,
    groups: 4,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient();

        const [membersRes, papersRes, projectsRes, groupsRes] = await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('papers').select('*', { count: 'exact', head: true }),
          supabase.from('projects').select('*', { count: 'exact', head: true }),
          supabase.from('research_groups').select('*', { count: 'exact', head: true }),
        ]);

        setStats({
          members: membersRes.count ?? 60,
          papers: papersRes.count ?? 15,
          projects: projectsRes.count ?? 10,
          groups: groupsRes.count ?? 4,
        });
      } catch {
        // Keep fallback values on error
      } finally {
        setLoaded(true);
      }
    };

    fetchStats();
  }, []);

  return { stats, loaded };
}
