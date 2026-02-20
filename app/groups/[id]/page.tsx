import GroupDetailClient from './GroupDetailClient';

export function generateStaticParams() {
  // Must return at least one entry for `output: 'export'` builds (GitHub Pages).
  // On Vercel, dynamicParams defaults to true so any ID still works at request time.
  return [{ id: 'placeholder' }];
}

export default function GroupDetailPage({ params }: { params: { id: string } }) {
  return <GroupDetailClient id={params.id} />;
}

