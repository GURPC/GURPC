'use client';

import { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/lib/supabase/types';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);
  const supabase = createClient();

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (mountedRef.current) {
        setProfile(data as Profile | null);
      }
    } catch {
      if (mountedRef.current) {
        setProfile(null);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // SignOut may fail if token is already invalid — that's fine
    }
    setUser(null);
    setProfile(null);
  };

  useEffect(() => {
    mountedRef.current = true;

    // Safety timeout — always resolve loading after 2.5s max
    const safetyTimeout = setTimeout(() => {
      if (mountedRef.current) {
        setLoading(false);
      }
    }, 2500);

    // Use onAuthStateChange as the SINGLE source of truth.
    // It fires INITIAL_SESSION on startup (replaces getSession() race).
    let subscription: { unsubscribe: () => void } | null = null;
    try {
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (!mountedRef.current) return;

          // Handle token refresh failures
          if (event === 'TOKEN_REFRESHED' && !session) {
            console.warn('Token refresh failed, clearing session...');
            try { await supabase.auth.signOut({ scope: 'local' }); } catch {}
            setUser(null);
            setProfile(null);
            setLoading(false);
            return;
          }

          // Signed out — clear everything
          if (event === 'SIGNED_OUT') {
            setUser(null);
            setProfile(null);
            setLoading(false);
            return;
          }

          const currentUser = session?.user ?? null;
          setUser(currentUser);

          if (currentUser) {
            // Fetch profile without blocking the loading state
            setLoading(false);
            fetchProfile(currentUser.id);
          } else {
            setProfile(null);
            setLoading(false);
          }
        }
      );
      subscription = data.subscription;
    } catch {
      // Auth listener setup failed (e.g. placeholder URL) — show guest UI
      setLoading(false);
    }

    return () => {
      mountedRef.current = false;
      clearTimeout(safetyTimeout);
      subscription?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
