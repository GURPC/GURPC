import ProjectDetailClient from './ProjectDetailClient';

export function generateStaticParams() {
  // Must return at least one entry for `output: 'export'` builds (GitHub Pages).
  // On Vercel, dynamicParams defaults to true so any ID still works at request time.
  return [{ id: 'placeholder' }];
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return <ProjectDetailClient id={params.id} />;
}

