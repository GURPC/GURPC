import { Metadata } from 'next';
import CourseReader from '@/components/training/CourseReader';
import { courseCatalog } from '@/data/course-content';

export const metadata: Metadata = {
  title: 'Specialized Research Group - AI/ML - GURPC',
  description: 'Advanced specialization stream focused on AI and ML research workflows.',
};

export default function SpecializedResearchGroupAIMLPage() {
  return <CourseReader course={courseCatalog['specialized-research-group-ai-ml']} />;
}
