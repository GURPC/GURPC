import EditPaperClient from './EditPaperClient';

export function generateStaticParams() {
  return [{ id: 'placeholder' }];
}

export default function EditPaperPage({ params }: { params: { id: string } }) {
  return <EditPaperClient id={params.id} />;
}
