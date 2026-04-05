'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { courses } from '@/data/course-content';
import { enrollCourse, getCourseProgress, getEnrollments, getProgressPercent } from '@/lib/learning/storage';

export default function CoursesOverviewClient() {
  const [enrollmentState, setEnrollmentState] = useState<Record<string, { enrolledAt: string }>>({});
  const [coursePercent, setCoursePercent] = useState<Record<string, number>>({});

  useEffect(() => {
    const enrollments = getEnrollments();
    setEnrollmentState(enrollments);

    const nextPercent: Record<string, number> = {};
    for (const course of courses) {
      const lessonIds = course.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id));
      const progress = getCourseProgress(course.slug, lessonIds);
      nextPercent[course.slug] = getProgressPercent(progress, lessonIds);
    }
    setCoursePercent(nextPercent);
  }, []);

  const foundationDone = useMemo(() => (coursePercent['foundation-research-training'] ?? 0) === 100, [coursePercent]);

  const handleEnroll = (slug: string) => {
    const updated = enrollCourse(slug);
    setEnrollmentState(updated);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="outline" className="mb-4 border-green-400/60 text-green-700 dark:text-green-300">
          Learn Research Step by Step
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Courses Overview</h1>
        <p className="text-muted-foreground text-lg">
          Members can enroll instantly, learn lesson by lesson, and complete full courses with tracked progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => {
          const enrolled = Boolean(enrollmentState[course.slug]);
          const percent = coursePercent[course.slug] ?? 0;
          const hasPrereq = (course.prerequisites ?? []).length > 0;
          const prereqLocked = hasPrereq && !foundationDone;

          return (
            <Card key={course.slug} className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  {enrolled ? (
                    <Badge variant="outline" className="border-amber-400/60 text-amber-700 dark:text-amber-300">
                      Enrolled
                    </Badge>
                  ) : (
                    <Badge variant="outline">Open</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{course.shortDescription}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div><span className="font-medium text-foreground">Duration:</span> {course.estimatedDuration}</div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-green-600 transition-all" style={{ width: `${percent}%` }} />
                  </div>
                </div>

                {hasPrereq && (
                  <p className="text-xs text-muted-foreground">
                    Prerequisite: Complete Foundation Research Training first.
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {!enrolled && (
                    <Button
                      onClick={() => handleEnroll(course.slug)}
                      disabled={prereqLocked}
                      className="bg-green-600 hover:bg-green-500 text-white"
                    >
                      Enroll Now
                    </Button>
                  )}
                  <Button asChild variant="outline" disabled={!enrolled}>
                    <Link href={`/courses/${course.slug}`}>{percent > 0 ? 'Resume' : 'Start Learning'}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
