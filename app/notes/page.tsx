'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Notes() {
  const [notes, setNotes] = useState<unknown[] | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('notes').select();
      setNotes(data);
    };

    fetchNotes();
  }, []);

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}