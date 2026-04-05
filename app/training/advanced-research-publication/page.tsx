import { Metadata } from 'next';
import CourseReader from '@/components/training/CourseReader';
import { courseCatalog } from '@/data/course-content';

export const metadata: Metadata = {
  title: 'Advanced Research and Publication - GURPC',
  description: 'Publication-focused training on writing, venue strategy, peer review, and camera-ready delivery.',
};

export default function AdvancedResearchPublicationPage() {
  return <CourseReader course={courseCatalog['advanced-research-publication']} />;
}
