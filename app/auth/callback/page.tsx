'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/dashboard';

    if (code) {
      const supabase = createClient();
      supabase.auth.exchangeCodeForSession(code).then(async ({ data, error }) => {
        if (!error && data.user) {
          // Auto-populate profile with signup metadata
          const meta = data.user.user_metadata;
          if (meta) {
            const updates: Record<string, string> = {};
            if (meta.name) updates.name = meta.name;
            if (meta.department) updates.department = meta.department;
            if (meta.batch_year) updates.batch_year = meta.batch_year;

            if (Object.keys(updates).length > 0) {
              await supabase
                .from('profiles')
                .update(updates)
                .eq('id', data.user.id);
            }
          }
          router.replace(next);
        } else {
          router.replace('/auth/login?error=Could not authenticate');
        }
      });
    } else {
      router.replace('/auth/login?error=Missing auth code');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-500 dark:text-gray-400">Completing sign in...</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}
