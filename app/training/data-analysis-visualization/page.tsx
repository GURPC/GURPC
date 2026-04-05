import { Metadata } from 'next';
import CourseReader from '@/components/training/CourseReader';
import { courseCatalog } from '@/data/course-content';

export const metadata: Metadata = {
  title: 'Data Analysis and Visualization - GURPC',
  description: 'Structured course for statistical analysis and data storytelling using practical tools.',
};

export default function DataAnalysisVisualizationPage() {
  return <CourseReader course={courseCatalog['data-analysis-visualization']} />;
}
