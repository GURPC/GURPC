// Data for GURPC initiatives based on meeting decisions

export interface Initiative {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  status: 'active' | 'upcoming' | 'planning';
  tag: string;
}

export interface ConferenceJournal {
  id: string;
  name: string;
  type: 'conference' | 'journal';
  publisher: string;
  deadline?: string;
  frequency?: string;
  impactFactor?: string;
  indexing: string[];
  link: string;
  domain: string;
  isRecommended?: boolean;
}

export interface SoftwareResource {
  id: string;
  name: string;
  category: string;
  description: string;
  department: string[];
  type: 'software' | 'dataset' | 'tool' | 'template';
  link?: string;
  accessLevel: 'free' | 'university-licensed' | 'open-source';
}

export interface TrainingProgram {
  id: string;
  title: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'specialized';
  description: string;
  duration: string;
  semester: string;
  topics: string[];
  eligibility: string;
}

export interface RecruitmentCriteria {
  id: string;
  title: string;
  description: string;
  requirements: string[];
}

// ══════════ INITIATIVES ══════════

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

// ══════════ CONFERENCES & JOURNALS ══════════

export const conferencesAndJournals: ConferenceJournal[] = [
  // Conferences
  {
    id: 'conf-1',
    name: 'PECCII 2026 — International Conference on Power, Energy, Computing & Communication',
    type: 'conference',
    publisher: 'Pabna University of Science and Technology',
    deadline: 'Feb 20, 2026',
    indexing: ['IEEE Xplore', 'Scopus'],
    link: 'https://peccii.pust.ac.bd/',
    domain: 'EEE / CSE',
    isRecommended: true,
  },
  {
    id: 'conf-2',
    name: 'IEEE TENSYMP 2026',
    type: 'conference',
    publisher: 'IEEE Region 10',
    deadline: 'Apr 15, 2026',
    indexing: ['IEEE Xplore', 'Scopus', 'Web of Science'],
    link: 'https://tensymp2026.ieee.org/',
    domain: 'Multi-disciplinary',
    isRecommended: true,
  },
  {
    id: 'conf-3',
    name: 'ICERIE 2026 — International Conference on Engineering Research, Innovation and Education',
    type: 'conference',
    publisher: 'SUST, Sylhet',
    deadline: 'Mar 30, 2026',
    indexing: ['Scopus'],
    link: '#',
    domain: 'Engineering',
  },
  {
    id: 'conf-4',
    name: 'ICCIT 2026 — International Conference on Computer and Information Technology',
    type: 'conference',
    publisher: 'University of Dhaka',
    deadline: 'Jul 15, 2026',
    indexing: ['IEEE Xplore', 'Scopus'],
    link: '#',
    domain: 'CSE / IT',
    isRecommended: true,
  },
  {
    id: 'conf-5',
    name: 'ICEEICT 2026',
    type: 'conference',
    publisher: 'BUET',
    deadline: 'May 30, 2026',
    indexing: ['IEEE Xplore', 'Scopus'],
    link: '#',
    domain: 'EEE / CSE',
  },
  // Journals
  {
    id: 'jour-1',
    name: 'GUB Journal of Science and Engineering',
    type: 'journal',
    publisher: 'Green University of Bangladesh',
    frequency: 'Biannual',
    indexing: ['Google Scholar', 'DOAJ'],
    link: '#',
    domain: 'Multi-disciplinary',
    isRecommended: true,
  },
  {
    id: 'jour-2',
    name: 'IEEE Access',
    type: 'journal',
    publisher: 'IEEE',
    frequency: 'Continuous',
    impactFactor: '3.476',
    indexing: ['Scopus', 'Web of Science', 'IEEE Xplore'],
    link: 'https://ieeeaccess.ieee.org/',
    domain: 'Multi-disciplinary',
    isRecommended: true,
  },
  {
    id: 'jour-3',
    name: 'Elsevier Energy Reports',
    type: 'journal',
    publisher: 'Elsevier',
    frequency: 'Continuous',
    impactFactor: '4.937',
    indexing: ['Scopus', 'Web of Science'],
    link: 'https://www.sciencedirect.com/journal/energy-reports',
    domain: 'EEE / Energy',
  },
  {
    id: 'jour-4',
    name: 'MDPI Sensors',
    type: 'journal',
    publisher: 'MDPI',
    frequency: 'Continuous',
    impactFactor: '3.847',
    indexing: ['Scopus', 'Web of Science', 'PubMed'],
    link: 'https://www.mdpi.com/journal/sensors',
    domain: 'CSE / EEE',
  },
  {
    id: 'jour-5',
    name: 'Journal of King Saud University – Computer and Information Sciences',
    type: 'journal',
    publisher: 'Elsevier',
    frequency: 'Bimonthly',
    impactFactor: '6.9',
    indexing: ['Scopus', 'Web of Science'],
    link: '#',
    domain: 'CSE',
    isRecommended: true,
  },
  {
    id: 'jour-6',
    name: 'Heliyon',
    type: 'journal',
    publisher: 'Cell Press / Elsevier',
    frequency: 'Continuous',
    impactFactor: '3.4',
    indexing: ['Scopus', 'Web of Science', 'PubMed'],
    link: 'https://www.cell.com/heliyon/home',
    domain: 'Multi-disciplinary',
  },
];

// ══════════ SOFTWARE RESOURCES ══════════

export const softwareResources: SoftwareResource[] = [
  {
    id: 'sw-1',
    name: 'R & RStudio',
    category: 'Statistical Analysis',
    description: 'Statistical computing and graphics. Essential for data analysis, hypothesis testing, regression, and visualization in research.',
    department: ['CSE', 'EEE', 'Textile', 'Business'],
    type: 'software',
    link: 'https://posit.co/download/rstudio-desktop/',
    accessLevel: 'free',
  },
  {
    id: 'sw-2',
    name: 'SPSS (IBM)',
    category: 'Statistical Analysis',
    description: 'Statistical Package for Social Sciences — widely used for survey analysis, descriptive statistics, and advanced analytics.',
    department: ['Business', 'CSE', 'Textile'],
    type: 'software',
    link: '#',
    accessLevel: 'university-licensed',
  },
  {
    id: 'sw-3',
    name: 'MATLAB',
    category: 'Engineering Computing',
    description: 'Numerical computing, simulation, and algorithm development for engineering research and signal processing.',
    department: ['EEE', 'CSE'],
    type: 'software',
    link: 'https://www.mathworks.com/products/matlab.html',
    accessLevel: 'university-licensed',
  },
  {
    id: 'sw-4',
    name: 'Python (Anaconda)',
    category: 'Data Science & ML',
    description: 'Complete Python distribution with Jupyter, NumPy, Pandas, TensorFlow, and PyTorch for machine learning and deep learning research.',
    department: ['CSE', 'EEE'],
    type: 'software',
    link: 'https://www.anaconda.com/download',
    accessLevel: 'free',
  },
  {
    id: 'sw-5',
    name: 'LaTeX (Overleaf)',
    category: 'Academic Writing',
    description: 'Professional typesetting system for research papers, theses, and conference submissions with IEEE/ACM templates.',
    department: ['All'],
    type: 'tool',
    link: 'https://www.overleaf.com/',
    accessLevel: 'free',
  },
  {
    id: 'sw-6',
    name: 'Mendeley / Zotero',
    category: 'Reference Management',
    description: 'Organize, annotate, and cite research papers efficiently. Essential for managing bibliography in research writing.',
    department: ['All'],
    type: 'tool',
    link: 'https://www.zotero.org/',
    accessLevel: 'free',
  },
  {
    id: 'sw-7',
    name: 'Proteus / KiCad',
    category: 'Circuit Design',
    description: 'Electronic circuit simulation and PCB design tools for EEE research projects and prototyping.',
    department: ['EEE'],
    type: 'software',
    link: '#',
    accessLevel: 'open-source',
  },
  {
    id: 'sw-8',
    name: 'Kaggle Datasets',
    category: 'Datasets',
    description: 'Open-source datasets for machine learning, NLP, computer vision, and data science research projects.',
    department: ['CSE', 'EEE'],
    type: 'dataset',
    link: 'https://www.kaggle.com/datasets',
    accessLevel: 'free',
  },
  {
    id: 'sw-9',
    name: 'IEEE DataPort',
    category: 'Datasets',
    description: 'Research datasets from IEEE for engineering and technology research across multiple domains.',
    department: ['EEE', 'CSE'],
    type: 'dataset',
    link: 'https://ieee-dataport.org/',
    accessLevel: 'free',
  },
  {
    id: 'sw-10',
    name: 'Google Colab',
    category: 'Cloud Computing',
    description: 'Free cloud-based Jupyter notebooks with GPU support for running ML experiments without local hardware.',
    department: ['CSE', 'EEE'],
    type: 'tool',
    link: 'https://colab.research.google.com/',
    accessLevel: 'free',
  },
];

// ══════════ TRAINING PROGRAMS ══════════

export const trainingPrograms: TrainingProgram[] = [
  {
    id: 'train-1',
    title: 'Foundation Research Training',
    level: 'basic',
    description: 'Mandatory training for all new GURPC members covering research fundamentals, ethics, and methodology.',
    duration: '4 weeks',
    semester: 'Every Semester',
    topics: [
      'Introduction to Research Methodology',
      'Literature Review & Gap Analysis',
      'Research Ethics & Plagiarism',
      'Reference Management (Mendeley/Zotero)',
      'Academic Writing Basics',
      'Introduction to LaTeX',
    ],
    eligibility: 'All new GURPC members',
  },
  {
    id: 'train-2',
    title: 'Data Analysis & Visualization',
    level: 'intermediate',
    description: 'Hands-on training on statistical analysis and data visualization using R, Python, and SPSS.',
    duration: '6 weeks',
    semester: 'Spring 2026',
    topics: [
      'Descriptive & Inferential Statistics',
      'Python for Data Science (Pandas, NumPy)',
      'Data Visualization (Matplotlib, Seaborn)',
      'R Programming for Research',
      'SPSS for Survey Analysis',
      'Interpreting Results & Reporting',
    ],
    eligibility: 'Completed Foundation Training',
  },
  {
    id: 'train-3',
    title: 'Advanced Research & Publication',
    level: 'advanced',
    description: 'Intensive program for members ready to write and publish their own research papers in indexed journals.',
    duration: '8 weeks',
    semester: 'Fall 2026',
    topics: [
      'Structured Paper Writing (IMRaD)',
      'Selecting Target Journals & Conferences',
      'Peer Review Process',
      'Addressing Reviewer Comments',
      'Camera-Ready Preparation',
      'Presentation Skills for Conferences',
    ],
    eligibility: 'Completed Intermediate Training + 1 paper draft',
  },
  {
    id: 'train-4',
    title: 'Specialized Research Group — AI/ML',
    level: 'specialized',
    description: 'Selected members join focused research groups working on cutting-edge AI and Machine Learning projects under faculty supervision.',
    duration: 'Ongoing (semester-based)',
    semester: 'Spring 2026',
    topics: [
      'Deep Learning Architectures',
      'Natural Language Processing',
      'Computer Vision Research',
      'Model Training & Evaluation',
      'Paper Replication Studies',
      'Collaborative Research Projects',
    ],
    eligibility: 'Selection-based — top performers from intermediate batch',
  },
  {
    id: 'train-5',
    title: 'Specialized Research Group — IoT & Embedded Systems',
    level: 'specialized',
    description: 'Focused research group for IoT, embedded systems, and hardware-software co-design projects.',
    duration: 'Ongoing (semester-based)',
    semester: 'Spring 2026',
    topics: [
      'IoT System Architecture',
      'Sensor Networks & Data Acquisition',
      'Embedded C/C++ Programming',
      'PCB Design & Prototyping',
      'Edge Computing & TinyML',
      'Research Paper Development',
    ],
    eligibility: 'Selection-based — EEE/CSE students with hardware experience',
  },
];

// ══════════ RECRUITMENT CRITERIA ══════════

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
