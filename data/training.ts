export type TrainingProgramLevel = 'basic' | 'intermediate' | 'advanced' | 'specialized';

export type TrainingProgram = {
	id: string;
	title: string;
	description: string;
	level: TrainingProgramLevel;
	duration: string;
	semester: string;
	eligibility: string;
	topics: string[];
};

export const trainingPrograms: TrainingProgram[] = [
	{
		id: 'foundation-research-training',
		title: 'Foundation Research Training',
		description: 'Core research fundamentals for new members to build a strong academic base.',
		level: 'basic',
		duration: '8 Weeks',
		semester: '1st-2nd Semester',
		eligibility: 'New Members',
		topics: [
			'Introduction to Research',
			'Literature Review Basics',
			'Research Ethics and Integrity',
			'Academic Writing Essentials',
		],
	},
	{
		id: 'data-analysis-visualization',
		title: 'Data Analysis and Visualization',
		description: 'Practical data handling, analysis, and visualization workflows for research projects.',
		level: 'intermediate',
		duration: '10 Weeks',
		semester: '3rd-4th Semester',
		eligibility: 'Completed Foundation Training',
		topics: [
			'Data Cleaning and Preparation',
			'Statistical Analysis Basics',
			'Python for Research Data',
			'Visualization with Matplotlib and Seaborn',
		],
	},
	{
		id: 'advanced-research-publication',
		title: 'Advanced Research and Publication',
		description: 'End-to-end paper development and publication strategy for serious researchers.',
		level: 'advanced',
		duration: '12 Weeks',
		semester: '5th-6th Semester',
		eligibility: 'Active Researchers',
		topics: [
			'Research Proposal Design',
			'Experimental Design and Validation',
			'Paper Structuring for Journals',
			'Submission and Revision Workflow',
		],
	},
	{
		id: 'specialized-research-groups',
		title: 'Specialized Research Groups',
		description: 'Domain-focused groups for deep work in selected fields under expert supervision.',
		level: 'specialized',
		duration: 'Ongoing',
		semester: '7th Semester+',
		eligibility: 'By Selection and Interest',
		topics: [
			'Artificial Intelligence and Machine Learning',
			'IoT and Embedded Systems',
			'Natural Language Processing',
			'Interdisciplinary Research Collaboration',
		],
	},
];
