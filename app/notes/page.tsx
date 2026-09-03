'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Notes() {
  const [notes, setNotes] = useState<unknown>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('notes').select().then(({ data }) => setNotes(data));
  }, []);

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}