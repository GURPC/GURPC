import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { courses } from '@/data/course-content';

export const metadata: Metadata = {
  title: 'Admin Courses - GURPC',
  description: 'Admin course management area for creating and maintaining course content.',
};

export default function AdminCoursesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Admin Courses</h1>
          <p className="text-muted-foreground">Create, edit, publish, and review learning progress.</p>
        </div>
        <Button>Create New Course</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {courses.map((course) => {
              const lessonCount = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
              return (
                <div key={course.slug} className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{lessonCount} lessons • {course.estimatedDuration}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">Published</Badge>
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Unpublish</Button>
                    <Button size="sm" variant="outline">Delete</Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/courses/${course.slug}`}>View</Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enrollment and Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Supabase-backed analytics and completer export can be connected in the next phase using the provided tables in schema.sql.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
