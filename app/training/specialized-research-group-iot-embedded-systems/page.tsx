import { Metadata } from 'next';
import CourseReader from '@/components/training/CourseReader';
import { courseCatalog } from '@/data/course-content';

export const metadata: Metadata = {
  title: 'Specialized Research Group - IoT and Embedded Systems - GURPC',
  description: 'Applied specialization stream for IoT architecture, embedded systems, and edge intelligence.',
};

export default function SpecializedResearchGroupIotEmbeddedSystemsPage() {
  return <CourseReader course={courseCatalog['specialized-research-group-iot-embedded-systems']} />;
}
