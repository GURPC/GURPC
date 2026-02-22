import { Metadata } from 'next';
import ResourcesContent from './ResourcesContent';

export const metadata: Metadata = {
  title: 'Resources - GURPC',
  description: 'Publications, guidelines, software tools, datasets, and research resources for GURPC members.',
};

export default function ResourcesPage() {
  return <ResourcesContent />;
}
