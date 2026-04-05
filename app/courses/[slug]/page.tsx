import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CourseReader from '@/components/training/CourseReader';
import { courses, getCourseBySlug } from '@/data/course-content';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Course Not Found - GURPC',
    };
  }

  return {
    title: `${course.title} - GURPC`,
    description: course.shortDescription,
  };
}

export default async function CourseDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseReader course={course} />;
}
