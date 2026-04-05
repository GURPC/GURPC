import { Metadata } from 'next';
import CoursesOverviewClient from './CoursesOverviewClient';

export const metadata: Metadata = {
	title: 'Courses - GURPC',
	description: 'Browse and enroll in GURPC learning tracks and research training courses.',
};

export default function CoursesPage() {
	return <CoursesOverviewClient />;
}
