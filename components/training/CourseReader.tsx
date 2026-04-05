'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Circle, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CourseContent } from '@/data/course-content';
import { getCourseProgress, getProgressPercent, markLessonComplete } from '@/lib/learning/storage';

type CourseReaderProps = {
	course: CourseContent;
};

export default function CourseReader({ course }: CourseReaderProps) {
	const lessonIds = useMemo(
		() => course.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id)),
		[course]
	);

	const [progress, setProgress] = useState<Record<string, boolean>>(() =>
		getCourseProgress(course.slug, lessonIds)
	);

	const progressPercent = getProgressPercent(progress, lessonIds);

	const handleToggleLesson = (lessonId: string) => {
		const nextValue = !progress[lessonId];
		const updated = markLessonComplete(course.slug, lessonId, nextValue);
		setProgress({ ...progress, ...updated });
	};

	return (
		<div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
			<div className="mb-8">
				<Button asChild variant="ghost" className="mb-4 -ml-3">
					<Link href="/courses">
						<ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
					</Link>
				</Button>

				<div className="flex flex-wrap items-center gap-3 mb-2">
					<h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
					<Badge variant="outline">{progressPercent}% Completed</Badge>
				</div>

				<p className="text-muted-foreground mb-4">{course.shortDescription}</p>

				<div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mb-2 max-w-md">
					<div className="h-full bg-green-600 transition-all" style={{ width: `${progressPercent}%` }} />
				</div>

				<div className="text-sm text-muted-foreground flex flex-wrap gap-4">
					<span>
						<strong className="text-foreground">Audience:</strong> {course.targetAudience}
					</span>
					<span>
						<strong className="text-foreground">Duration:</strong> {course.estimatedDuration}
					</span>
				</div>
			</div>

			<div className="space-y-6">
				{course.modules.map((module, moduleIndex) => (
					<Card key={module.id} className="border-slate-200 dark:border-slate-800">
						<CardHeader>
							<CardTitle className="text-xl">
								Module {moduleIndex + 1}: {module.title}
							</CardTitle>
							<p className="text-sm text-muted-foreground">{module.summary}</p>
						</CardHeader>

						<CardContent className="space-y-4">
							{module.lessons.map((lesson) => {
								const done = Boolean(progress[lesson.id]);

								return (
									<div key={lesson.id} className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
										<div className="flex items-start justify-between gap-3">
											<div>
												<h3 className="font-semibold">{lesson.title}</h3>
												<p className="text-sm text-muted-foreground mt-1">{lesson.objective}</p>
											</div>

											<Button
												type="button"
												variant={done ? 'default' : 'outline'}
												size="sm"
												className={done ? 'bg-green-600 hover:bg-green-500 text-white' : ''}
												onClick={() => handleToggleLesson(lesson.id)}
											>
												{done ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Circle className="mr-2 h-4 w-4" />}
												{done ? 'Completed' : 'Mark Complete'}
											</Button>
										</div>

										<ul className="mt-3 space-y-1 text-sm text-muted-foreground list-disc pl-5">
											{lesson.content.map((point) => (
												<li key={point}>{point}</li>
											))}
										</ul>

										{(lesson.videoUrl || lesson.slidesUrl || (lesson.readingLinks?.length ?? 0) > 0) && (
											<div className="mt-3 flex flex-wrap gap-2">
												{lesson.videoUrl && (
													<Button asChild variant="outline" size="sm">
														<Link href={lesson.videoUrl} target="_blank" rel="noopener noreferrer">
															Watch Video <ExternalLink className="ml-2 h-3.5 w-3.5" />
														</Link>
													</Button>
												)}

												{lesson.slidesUrl && (
													<Button asChild variant="outline" size="sm">
														<Link href={lesson.slidesUrl} target="_blank" rel="noopener noreferrer">
															View Slides <ExternalLink className="ml-2 h-3.5 w-3.5" />
														</Link>
													</Button>
												)}

												{lesson.readingLinks?.map((reading) => (
													<Button key={reading.url} asChild variant="outline" size="sm">
														<Link href={reading.url} target="_blank" rel="noopener noreferrer">
															{reading.label} <ExternalLink className="ml-2 h-3.5 w-3.5" />
														</Link>
													</Button>
												))}
											</div>
										)}
									</div>
								);
							})}
						</CardContent>
					</Card>
				))}
			</div>

			<Card className="mt-8 border-emerald-300/60 dark:border-emerald-700/60 bg-emerald-50/40 dark:bg-emerald-950/20">
				<CardHeader>
					<CardTitle className="text-lg">Completion Task</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">{course.completionTask}</p>
				</CardContent>
			</Card>
		</div>
	);
}
