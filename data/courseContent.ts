export type CourseLesson = {
  id: string;
  title: string;
  objective: string;
  content: string[];
  videoUrl?: string;
  slidesUrl?: string;
  readingLinks?: Array<{ label: string; url: string }>;
  reflectionQuestion?: string;
};

export type CourseModule = {
  id: string;
  title: string;
  summary: string;
  lessons: CourseLesson[];
};

export type CourseContent = {
  slug: string;
  title: string;
  shortDescription: string;
  targetAudience: string;
  estimatedDuration: string;
  prerequisites?: string[];
  coverImage?: string;
  modules: CourseModule[];
  completionTask: string;
  instructor?: string;
};

export const courseCatalog: Record<string, CourseContent> = {
  'foundation-research-training': {
    slug: 'foundation-research-training',
    title: 'Foundation Research Training',
    shortDescription: 'A beginner-friendly, room-based pathway to learn the fundamentals of academic research and complete a micro proposal.',
    targetAudience: '2nd-4th year students, new GURPC members, and research beginners',
    estimatedDuration: '5 weeks',
    instructor: 'Faculty-led with GURPC mentors',
    modules: [
      {
        id: 'm1',
        title: 'Room 0-2: Orientation and Problem Discovery',
        summary: 'Build your research mindset and convert a broad topic into a focused question.',
        lessons: [
          {
            id: 'l1',
            title: 'Room 0: Research Mindset and Goals',
            objective: 'Understand what makes a good research journey and define measurable learning goals.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'What is Research Methodology?', url: 'https://www.scribbr.com/methodology/research-methodology/' },
            ],
            reflectionQuestion: 'What problem area do you want to investigate this semester and why?',
            content: [
              'Research is a process of asking answerable questions using credible evidence and a repeatable method.',
              'Set one primary goal and two supporting goals for your semester research journey.',
              'Write your motivation in two to three lines so you can revisit it when progress slows down.',
            ],
          },
          {
            id: 'l2',
            title: 'Room 1: Problem Framing',
            objective: 'Transform a broad idea into a clear and testable research question.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'How to Write a Research Question', url: 'https://www.scribbr.com/research-process/research-question/' },
            ],
            reflectionQuestion: 'Write one research question using: How does X influence Y under Z?',
            content: [
              'Start broad (example: student productivity) then narrow by context, population, and measurable outcomes.',
              'Use this frame: How does X influence Y under condition Z?',
              'A good question is specific, feasible, ethical, and relevant to an existing knowledge gap.',
            ],
          },
          {
            id: 'l3',
            title: 'Room 2: Literature Recon',
            objective: 'Collect quality papers quickly using search operators and keyword maps.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'Google Scholar Search Tips', url: 'https://scholar.google.com/intl/en/scholar/help.html' },
            ],
            reflectionQuestion: 'List 5 keywords and 3 synonym groups for your topic search.',
            content: [
              'Create a keyword bank with synonyms and related terms before searching.',
              'Use operators like AND, OR, quotation marks, and filters by year and discipline.',
              'Capture each paper with one-line notes: problem, method, key result, limitation.',
            ],
          },
        ],
      },
      {
        id: 'm2',
        title: 'Room 3-6: Method and Data Foundations',
        summary: 'Learn evidence quality, ethics, research design, and data hygiene.',
        lessons: [
          {
            id: 'l4',
            title: 'Room 3: Source Validation',
            objective: 'Evaluate credibility and reduce bias in selected references.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'Evaluating Sources for Research', url: 'https://owl.purdue.edu/owl/research_and_citation/conducting_research/evaluating_sources_of_information/index.html' },
            ],
            reflectionQuestion: 'Pick one source and score it on credibility, bias, and relevance.',
            content: [
              'Score sources using venue quality, citation context, recency, and author expertise.',
              'Identify possible bias by checking sampling limitations and funding disclosure.',
              'Prioritize sources that present transparent methods and reproducible analysis.',
            ],
          },
          {
            id: 'l5',
            title: 'Room 4: Ethics and Integrity',
            objective: 'Apply citation ethics and avoid plagiarism in all written sections.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'Research Ethics Basics', url: 'https://ori.hhs.gov/education/products/rcrintro/' },
            ],
            reflectionQuestion: 'How will you avoid plagiarism in your upcoming assignment?',
            content: [
              'Use proper citation for every idea, figure, and dataset that is not originally yours.',
              'Paraphrase responsibly and keep source meaning intact while rewriting in your own style.',
              'For human-subject data, maintain informed consent and privacy boundaries.',
            ],
          },
          {
            id: 'l6',
            title: 'Room 5: Research Design Lab',
            objective: 'Draft a small but valid method aligned with your research question.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'Choosing Research Methods', url: 'https://www.scribbr.com/methodology/research-methods/' },
            ],
            reflectionQuestion: 'Which method type best fits your question and why?',
            content: [
              'Define variables, hypothesis direction, and the minimum data needed to test it.',
              'Choose method type based on question intent: exploratory, descriptive, or causal.',
              'Write a one-page method blueprint with sampling plan and analysis approach.',
            ],
          },
          {
            id: 'l7',
            title: 'Room 6: Data Capture and Cleaning',
            objective: 'Collect and clean data using a documented and auditable process.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'Data Cleaning Fundamentals', url: 'https://www.ibm.com/think/topics/data-cleaning' },
            ],
            reflectionQuestion: 'What two data quality rules will you enforce in your dataset?',
            content: [
              'Build a data dictionary before collection so variables stay consistent.',
              'Handle missing values and outliers using clearly documented decisions.',
              'Store raw and cleaned datasets separately and maintain a change log.',
            ],
          },
        ],
      },
      {
        id: 'm3',
        title: 'Room 7-9 and Final Boss',
        summary: 'Interpret findings, draft manuscript sections, and package reproducible outputs.',
        lessons: [
          {
            id: 'l8',
            title: 'Room 7: Analysis Starter Lab',
            objective: 'Use basic statistics to summarize and interpret outcomes correctly.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'Intro to Descriptive Statistics', url: 'https://www.scribbr.com/statistics/descriptive-statistics/' },
            ],
            reflectionQuestion: 'What metric best summarizes your current dataset and why?',
            content: [
              'Begin with descriptive metrics and visual checks before inferential analysis.',
              'Avoid overclaiming: report what your data supports and what remains uncertain.',
              'Tie every analysis result back to your original research question.',
            ],
          },
          {
            id: 'l9',
            title: 'Room 8: Writing Sprint',
            objective: 'Draft abstract, introduction, and related work with academic structure.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'How to Write an Abstract', url: 'https://www.scribbr.com/dissertation/abstract/' },
            ],
            reflectionQuestion: 'Draft your abstract in 120-150 words.',
            content: [
              'Write abstract last, but maintain a draft to track your evolving contribution.',
              'Introduction should cover background, gap, and contribution in a concise flow.',
              'Related work should compare, not just list, prior studies and limitations.',
            ],
          },
          {
            id: 'l10',
            title: 'Room 9: Reproducibility Toolkit',
            objective: 'Set up tools and artifacts so your research can be replicated.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'Reproducible Research Checklist', url: 'https://www.nature.com/articles/d41586-022-04502-4' },
            ],
            reflectionQuestion: 'List the reproducibility artifacts you will maintain from day one.',
            content: [
              'Use Zotero or Mendeley to keep references organized and citation-ready.',
              'Prepare a LaTeX starter template for consistent paper formatting.',
              'Track versions with Git and include a concise README for your workflow.',
            ],
          },
          {
            id: 'l11',
            title: 'Final Boss Room: Micro Proposal and Viva',
            objective: 'Present a complete mini proposal and defend decisions with evidence.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'Sample Research Proposal Template', url: 'https://www.overleaf.com/latex/templates' },
            ],
            reflectionQuestion: 'What was the strongest reviewer feedback and how did you address it?',
            content: [
              'Submit a micro proposal including question, method, expected outcomes, and ethics checklist.',
              'Deliver a five-minute viva defending design and analysis choices.',
              'Incorporate peer-review feedback to produce your final revised version.',
            ],
          },
        ],
      },
    ],
    completionTask: 'Submit one micro proposal document and complete viva-style presentation.',
  },
  'data-analysis-visualization': {
    slug: 'data-analysis-visualization',
    title: 'Data Analysis and Visualization',
    shortDescription: 'Hands-on pathway for statistical analysis and result storytelling using Python, R, and SPSS basics.',
    targetAudience: '2nd-4th year students and members who completed Foundation Research Training',
    estimatedDuration: '6 weeks',
    prerequisites: ['foundation-research-training'],
    instructor: 'Faculty + data science mentors',
    modules: [
      {
        id: 'm1',
        title: 'Statistical Core',
        summary: 'Understand descriptive and inferential methods and when to use each.',
        lessons: [
          {
            id: 'l1',
            title: 'Descriptive Statistics Essentials',
            objective: 'Summarize data distributions accurately.',
            content: [
              'Use central tendency and spread to describe dataset behavior.',
              'Visualize distribution first to avoid misleading average-only conclusions.',
            ],
          },
          {
            id: 'l2',
            title: 'Inferential Statistics Starter',
            objective: 'Interpret significance and confidence intervals correctly.',
            content: [
              'Choose tests based on variable type and sample assumptions.',
              'Report p-values and practical significance together.',
            ],
          },
        ],
      },
      {
        id: 'm2',
        title: 'Tools and Reporting',
        summary: 'Perform analysis and produce publication-ready visual outputs.',
        lessons: [
          {
            id: 'l3',
            title: 'Python and R Workflow',
            objective: 'Use Pandas and R scripts for reproducible analysis.',
            content: [
              'Build a clean notebook and script flow from import to final chart export.',
              'Keep transformations documented for reproducibility.',
            ],
          },
          {
            id: 'l4',
            title: 'SPSS and Result Interpretation',
            objective: 'Generate tables and explain findings clearly.',
            content: [
              'Produce standard SPSS outputs and map them to research questions.',
              'Turn numerical output into concise interpretation statements.',
            ],
          },
        ],
      },
    ],
    completionTask: 'Submit one analysis report with at least three visualizations and interpretation notes.',
  },
  'advanced-research-publication': {
    slug: 'advanced-research-publication',
    title: 'Advanced Research and Publication',
    shortDescription: 'Publication-focused course for writing, submission strategy, peer review response, and camera-ready preparation.',
    targetAudience: 'Senior students, alumni, and active researchers with draft-ready studies',
    estimatedDuration: '8 weeks',
    prerequisites: ['foundation-research-training'],
    instructor: 'Faculty publication panel',
    modules: [
      {
        id: 'm1',
        title: 'Writing and Venue Strategy',
        summary: 'Build a strong IMRaD draft and choose realistic target venues.',
        lessons: [
          {
            id: 'l1',
            title: 'IMRaD Structure Mastery',
            objective: 'Write each paper section with purpose-driven clarity.',
            content: [
              'Ensure methods can be repeated by independent readers.',
              'Keep results objective and move interpretation to discussion.',
            ],
          },
          {
            id: 'l2',
            title: 'Journal and Conference Matching',
            objective: 'Select venues based on scope, quality, and acceptance fit.',
            content: [
              'Screen aims and scope before formatting effort.',
              'Create a ranking list with deadline and expected review time.',
            ],
          },
        ],
      },
      {
        id: 'm2',
        title: 'Review Cycle and Finalization',
        summary: 'Handle reviewer feedback and prepare final camera-ready assets.',
        lessons: [
          {
            id: 'l3',
            title: 'Reviewer Response Strategy',
            objective: 'Address comments with traceable and respectful responses.',
            content: [
              'Use point-by-point response with exact manuscript line references.',
              'Separate major revisions from minor edits for clarity.',
            ],
          },
          {
            id: 'l4',
            title: 'Camera-Ready and Presentation',
            objective: 'Finalize publication package and conference-ready slides.',
            content: [
              'Run final formatting checks and reference consistency review.',
              'Prepare a concise talk highlighting contribution and validity.',
            ],
          },
        ],
      },
    ],
    completionTask: 'Submit one target-ready manuscript plus reviewer response template draft.',
  },
  'specialized-research-group-ai-ml': {
    slug: 'specialized-research-group-ai-ml',
    title: 'Specialized Research Group - AI/ML',
    shortDescription: 'Specialized applied research stream for model development, replication studies, and collaborative AI/ML projects.',
    targetAudience: 'CSE/EEE students, alumni, and faculty researchers in AI/ML domains',
    estimatedDuration: 'Ongoing',
    prerequisites: ['foundation-research-training'],
    instructor: 'Faculty-led specialization track',
    modules: [
      {
        id: 'm1',
        title: 'Core AI/ML Research Skills',
        summary: 'Strengthen fundamentals needed for quality experimentation.',
        lessons: [
          {
            id: 'l1',
            title: 'Deep Learning Architecture Review',
            objective: 'Compare model families and identify trade-offs.',
            content: [
              'Match architecture choice to problem constraints and data scale.',
              'Track compute cost and explainability early in design.',
            ],
          },
          {
            id: 'l2',
            title: 'Experiment Design and Evaluation',
            objective: 'Build robust baselines and fair benchmark comparisons.',
            content: [
              'Define reproducible experiment settings and seeds.',
              'Report multiple metrics beyond headline accuracy.',
            ],
          },
        ],
      },
      {
        id: 'm2',
        title: 'Project and Publication Pipeline',
        summary: 'Convert prototype experiments into publication-quality outcomes.',
        lessons: [
          {
            id: 'l3',
            title: 'Replication and Extension Studies',
            objective: 'Replicate published work and identify extension opportunities.',
            content: [
              'Start from one strong baseline paper and reproduce its central claim.',
              'Propose one measurable extension grounded in limitations.',
            ],
          },
          {
            id: 'l4',
            title: 'Collaborative Research Workflow',
            objective: 'Coordinate multi-member research execution effectively.',
            content: [
              'Maintain issue-driven tasks and structured experiment logs.',
              'Use regular review checkpoints for quality control.',
            ],
          },
        ],
      },
    ],
    completionTask: 'Deliver one replication report and one collaborative project proposal.',
  },
  'specialized-research-group-iot-embedded-systems': {
    slug: 'specialized-research-group-iot-embedded-systems',
    title: 'Specialized Research Group - IoT and Embedded Systems',
    shortDescription: 'Applied hardware-software research stream for IoT systems, edge analytics, and prototype validation.',
    targetAudience: 'EEE/CSE students, alumni, and faculty focused on IoT and embedded systems',
    estimatedDuration: 'Ongoing',
    prerequisites: ['foundation-research-training'],
    instructor: 'Faculty-led hardware and systems lab',
    modules: [
      {
        id: 'm1',
        title: 'System Foundations',
        summary: 'Design complete sensing pipelines from data capture to edge output.',
        lessons: [
          {
            id: 'l1',
            title: 'IoT Architecture and Sensor Strategy',
            objective: 'Build reliable acquisition and communication flows.',
            content: [
              'Select sensors based on measurement range and calibration needs.',
              'Define transmission protocols matching latency and power constraints.',
            ],
          },
          {
            id: 'l2',
            title: 'Embedded Programming and Prototyping',
            objective: 'Implement firmware with maintainable hardware interfaces.',
            content: [
              'Write modular embedded code for sensing, processing, and communication.',
              'Use test benches to validate stability before field deployment.',
            ],
          },
        ],
      },
      {
        id: 'm2',
        title: 'Edge Intelligence and Research Outputs',
        summary: 'Apply edge analytics and package findings into publication-ready artifacts.',
        lessons: [
          {
            id: 'l3',
            title: 'Edge Computing and TinyML Basics',
            objective: 'Deploy lightweight inference on constrained devices.',
            content: [
              'Profile model size, latency, and energy cost before deployment.',
              'Optimize models while preserving useful accuracy.',
            ],
          },
          {
            id: 'l4',
            title: 'Research Paper Development',
            objective: 'Translate prototype evidence into research narrative.',
            content: [
              'Document architecture, evaluation setup, and limitations transparently.',
              'Provide reproducibility assets for hardware and firmware configuration.',
            ],
          },
        ],
      },
    ],
    completionTask: 'Submit one tested prototype report and draft paper outline.',
  },
};

export const courses = Object.values(courseCatalog);

export function getCourseBySlug(slug: string) {
  return courseCatalog[slug];
}
