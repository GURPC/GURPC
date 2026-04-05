'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { courses } from '@/data/course-content';
import { getCourseProgress, getEnrollments, getProgressPercent } from '@/lib/learning/storage';

export default function LearningDashboardPage() {
  const [enrolledSlugs, setEnrolledSlugs] = useState<string[]>([]);
  const [percentMap, setPercentMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const enrollments = getEnrollments();
    const slugs = Object.keys(enrollments);
    setEnrolledSlugs(slugs);

    const nextMap: Record<string, number> = {};
    for (const course of courses) {
      const lessonIds = course.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id));
      const progress = getCourseProgress(course.slug, lessonIds);
      nextMap[course.slug] = getProgressPercent(progress, lessonIds);
    }
    setPercentMap(nextMap);
  }, []);

  const enrolledCourses = courses.filter((course) => enrolledSlugs.includes(course.slug));
  const completedCourses = enrolledCourses.filter((course) => (percentMap[course.slug] ?? 0) === 100);
  const activeCourses = enrolledCourses.filter((course) => (percentMap[course.slug] ?? 0) < 100);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Learning Dashboard</h1>
        <p className="text-muted-foreground mt-2">Track enrolled courses, continue lessons, and review completed learning paths.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>In Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {activeCourses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active courses. Enroll from the courses overview.</p>
          ) : (
            <div className="space-y-4">
              {activeCourses.map((course) => (
                <div key={course.slug} className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                    <h3 className="font-semibold">{course.title}</h3>
                    <Badge variant="outline">{percentMap[course.slug] ?? 0}%</Badge>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mb-3">
                    <div className="h-full bg-green-600" style={{ width: `${percentMap[course.slug] ?? 0}%` }} />
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/courses/${course.slug}`}>Continue</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed Courses</CardTitle>
        </CardHeader>
        <CardContent>
          {completedCourses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No completed courses yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {completedCourses.map((course) => (
                <div key={course.slug} className="rounded-lg border border-emerald-300/60 dark:border-emerald-700/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
                  <h3 className="font-semibold mb-1">{course.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">Certificate preview will be available in next phase.</p>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/courses/${course.slug}`}>Review Course</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
