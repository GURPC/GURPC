// Data for GURPC initiatives based on meeting decisions
import type { Initiative } from '@/types';

export const initiatives: Initiative[] = [
  {
    id: 'content-recording',
    title: 'Content Recording',
    description: 'All future workshops, seminars, research talks, and training sessions will be professionally recorded and archived for on-demand access by GURPC members.',
    icon: 'Video',
    status: 'active',
    tag: 'RECORD',
  },
  {
    id: 'paper-reading-team',
    title: 'Paper Reading Team',
    description: 'A dedicated team that reviews, discusses, and presents key research papers weekly. Members develop critical analysis skills and stay updated on recent advances across domains.',
    icon: 'BookMarked',
    status: 'active',
    tag: 'READ',
  },
  {
    id: 'resource-sharing',
    title: 'Central Resource Sharing',
    description: 'A centralized system for sharing datasets, software tools, code repositories, research templates, and academic resources across all GURPC members.',
    icon: 'Share2',
    status: 'active',
    tag: 'SHARE',
  },
  {
    id: 'domain-software',
    title: 'Domain-Specific Software Workshops',
    description: 'Department-wise specialized workshops on research software including R, SPSS, MATLAB, Python, LaTeX, and other domain-specific tools for each department.',
    icon: 'Monitor',
    status: 'upcoming',
    tag: 'SOFTWARE',
  },
  {
    id: 'structured-membership',
    title: 'Structured Membership & Training',
    description: 'A comprehensive membership ecosystem with fixed yearly intake, standardized basic training, specialized research groups, and semester-wise batch progression.',
    icon: 'GraduationCap',
    status: 'active',
    tag: 'TRAIN',
  },
  {
    id: 'research-talks',
    title: 'Domain-Based Research Talks',
    description: 'Regular research talks by faculty and alumni experts covering diverse domains — from AI/ML to renewable energy, biomedical engineering to social sciences.',
    icon: 'Mic',
    status: 'upcoming',
    tag: 'TALK',
  },
  {
    id: 'publication-target',
    title: 'Research Paper Targets',
    description: 'Setting ambitious but achievable research paper publication targets for GURPC members each semester, with guidance and support throughout the writing process.',
    icon: 'Target',
    status: 'active',
    tag: 'TARGET',
  },
  {
    id: 'journal-conference-list',
    title: 'Journal & Conference Directory',
    description: 'A curated and regularly updated list of recommended journals and conferences across all departments, with submission deadlines and impact factors.',
    icon: 'Library',
    status: 'active',
    tag: 'DIRECTORY',
  },
];
