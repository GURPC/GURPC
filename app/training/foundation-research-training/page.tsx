import { Metadata } from 'next';
import CourseReader from '@/components/training/CourseReader';
import { courseCatalog } from '@/data/course-content';

export const metadata: Metadata = {
  title: 'Foundation Research Training - GURPC',
  description: 'Room-based foundational course in research methodology, ethics, and proposal development.',
};

export default function FoundationResearchTrainingPage() {
  return <CourseReader course={courseCatalog['foundation-research-training']} />;
}
