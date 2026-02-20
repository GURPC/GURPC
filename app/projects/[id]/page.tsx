import ProjectDetailClient from './ProjectDetailClient';

export function generateStaticParams() {
  return [];
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return <ProjectDetailClient id={params.id} />;
}

