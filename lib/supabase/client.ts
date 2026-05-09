'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;
let implicitClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
  if (client) return client;
  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
  );
  return client;
}

export function createImplicitClient() {
  if (implicitClient) return implicitClient;
  implicitClient = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
    {
      auth: { flowType: 'implicit' },
    }
  );
  return implicitClient;
}
