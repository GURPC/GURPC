import GroupDetailClient from './GroupDetailClient';

export function generateStaticParams() {
  return [];
}

export default function GroupDetailPage({ params }: { params: { id: string } }) {
  return <GroupDetailClient id={params.id} />;
}

