import type { RecruitmentCriteria } from '@/types';

export const recruitmentCriteria: RecruitmentCriteria[] = [
  {
    id: 'rc-1',
    title: 'Academic Standing',
    description: 'Minimum academic requirements for GURPC membership',
    requirements: [
      'Minimum CGPA of 3.00 (on a 4.00 scale)',
      'Currently enrolled at Green University of Bangladesh',
      'No active academic probation',
    ],
  },
  {
    id: 'rc-2',
    title: 'Interest & Commitment',
    description: 'Demonstrated interest in research and willingness to commit',
    requirements: [
      'Brief statement of research interest (200-300 words)',
      'Commitment to attend at least 80% of training sessions',
      'Willingness to complete Foundation Research Training',
      'Active participation in paper reading sessions',
    ],
  },
  {
    id: 'rc-3',
    title: 'Skills Assessment',
    description: 'Basic skills evaluation during the selection process',
    requirements: [
      'Basic understanding of research methodology',
      'Ability to read and summarize academic papers',
      'Proficiency in English (reading & writing)',
      'Basic computer and internet skills',
    ],
  },
  {
    id: 'rc-4',
    title: 'Intake Schedule',
    description: 'Structured yearly intake process',
    requirements: [
      'Fixed intake once per semester (Spring & Fall)',
      'Application window: First 2 weeks of each semester',
      'Selection interview within 1 week of deadline',
      'Orientation and Foundation Training begins Week 3',
      'Maximum 30 members per batch',
    ],
  },
];
