type EnrollmentRecord = {
	enrolledAt: string;
};

type Enrollments = Record<string, EnrollmentRecord>;
type CourseProgress = Record<string, boolean>;
type ProgressStore = Record<string, CourseProgress>;

const ENROLLMENTS_KEY = 'gurpc.learning.enrollments';
const PROGRESS_KEY = 'gurpc.learning.progress';

function isBrowser() {
	return typeof window !== 'undefined';
}

function readJSON<T>(key: string, fallback: T): T {
	if (!isBrowser()) return fallback;

	try {
		const raw = window.localStorage.getItem(key);
		if (!raw) return fallback;
		return JSON.parse(raw) as T;
	} catch {
		return fallback;
	}
}

function writeJSON<T>(key: string, value: T) {
	if (!isBrowser()) return;
	window.localStorage.setItem(key, JSON.stringify(value));
}

export function getEnrollments(): Enrollments {
	return readJSON<Enrollments>(ENROLLMENTS_KEY, {});
}

export function enrollCourse(courseSlug: string): Enrollments {
	const enrollments = getEnrollments();

	if (!enrollments[courseSlug]) {
		enrollments[courseSlug] = { enrolledAt: new Date().toISOString() };
		writeJSON(ENROLLMENTS_KEY, enrollments);
	}

	return enrollments;
}

export function getCourseProgress(courseSlug: string, lessonIds?: string[]): CourseProgress {
	const store = readJSON<ProgressStore>(PROGRESS_KEY, {});
	const courseProgress = store[courseSlug] ?? {};

	if (!lessonIds || lessonIds.length === 0) {
		return courseProgress;
	}

	const normalized: CourseProgress = {};
	for (const lessonId of lessonIds) {
		normalized[lessonId] = Boolean(courseProgress[lessonId]);
	}

	return normalized;
}

export function markLessonComplete(courseSlug: string, lessonId: string, completed = true): CourseProgress {
	const store = readJSON<ProgressStore>(PROGRESS_KEY, {});
	const courseProgress = store[courseSlug] ?? {};
	courseProgress[lessonId] = completed;
	store[courseSlug] = courseProgress;
	writeJSON(PROGRESS_KEY, store);
	return courseProgress;
}

export function getProgressPercent(progress: CourseProgress, lessonIds: string[]): number {
	if (lessonIds.length === 0) return 0;
	const completedCount = lessonIds.filter((id) => progress[id]).length;
	return Math.round((completedCount / lessonIds.length) * 100);
}
