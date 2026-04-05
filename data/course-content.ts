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
    shortDescription: 'Beginner course for students who are new to research. You will learn how to pick a topic, read papers, design a simple study, and write a short proposal.',
    targetAudience: 'New researchers and first-time project members',
    estimatedDuration: '5 weeks',
    instructor: 'Faculty mentors and senior research members',
    modules: [
      {
        id: 'm1',
        title: 'Start Your Research Journey',
        summary: 'Understand what research is and how to choose a clear topic.',
        lessons: [
          {
            id: 'l1',
            title: 'Lesson 1: What Research Really Means',
            objective: 'Understand research in simple terms and set your personal goal.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'Research Basics for Beginners', url: 'https://www.scribbr.com/category/research-process/' },
            ],
            reflectionQuestion: 'Write one sentence: What topic do I want to understand better this semester?',
            content: [
              'Research means asking a useful question and finding evidence-based answers.',
              'You do not need to discover something world-changing at the beginning.',
              'Your first target is simple: choose one real problem and study it carefully.',
              'Keep a small research notebook where you write ideas, questions, and decisions.',
            ],
          },
          {
            id: 'l2',
            title: 'Lesson 2: Choose a Good Research Question',
            objective: 'Turn a broad topic into one clear and testable question.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'How to Write a Research Question', url: 'https://www.scribbr.com/research-process/research-question/' },
            ],
            reflectionQuestion: 'Write your question in this format: How does X affect Y in Z context?',
            content: [
              'Bad topic example: Technology in education. Better question: How does daily mobile use affect study time of first-year students?',
              'A good question is specific, realistic, and possible to measure.',
              'If your question needs 1000 participants or expensive tools, make it smaller.',
              'Share your draft question with a mentor and improve it using feedback.',
            ],
          },
          {
            id: 'l3',
            title: 'Lesson 3: Find and Read the Right Papers',
            objective: 'Learn how to search papers and understand them quickly.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'Google Scholar Help', url: 'https://scholar.google.com/intl/en/scholar/help.html' },
            ],
            reflectionQuestion: 'Collect 5 papers and write one key point from each.',
            content: [
              'Use Google Scholar keywords, then improve your search with AND, OR, and quotes.',
              'Read papers in this order: abstract, conclusion, method, then full details.',
              'For each paper, write: problem, method, result, and limitation.',
              'Do not just collect links; create notes so you remember why each paper matters.',
            ],
          },
        ],
      },
      {
        id: 'm2',
        title: 'Build Correct Research Practice',
        summary: 'Learn ethics, method design, and data handling in a beginner-friendly way.',
        lessons: [
          {
            id: 'l4',
            title: 'Lesson 4: Ethics and Plagiarism Safety',
            objective: 'Use sources correctly and avoid common academic mistakes.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'Academic Integrity Guide', url: 'https://owl.purdue.edu/owl/avoiding_plagiarism/index.html' },
            ],
            reflectionQuestion: 'How will you cite sources while writing your report?',
            content: [
              'If an idea is not yours, cite it. This includes text, data, and images.',
              'Copy-paste is risky. Read, understand, then rewrite in your own words.',
              'Use a citation manager from day one, such as Zotero or Mendeley.',
              'When collecting human data, protect privacy and ask consent clearly.',
            ],
          },
          {
            id: 'l5',
            title: 'Lesson 5: Plan a Simple Research Method',
            objective: 'Create a method plan that matches your question.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'Types of Research Methods', url: 'https://www.scribbr.com/methodology/research-methods/' },
            ],
            reflectionQuestion: 'Which method will you use: survey, experiment, or interview? Why?',
            content: [
              'Start by defining what data you need to answer your question.',
              'Choose one simple method and keep your process realistic for your timeline.',
              'Write sample size, data source, and analysis plan in one short page.',
              'A clear simple method is better than a complex method you cannot finish.',
            ],
          },
          {
            id: 'l6',
            title: 'Lesson 6: Collect and Clean Data Properly',
            objective: 'Store data cleanly and avoid confusion later.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'Data Cleaning Basics', url: 'https://www.ibm.com/think/topics/data-cleaning' },
            ],
            reflectionQuestion: 'Name 3 quality checks you will apply to your dataset.',
            content: [
              'Create a simple data sheet with clear column names and units.',
              'Keep raw data and cleaned data in separate files.',
              'Document every change so others can understand what you did.',
              'Check missing values, duplicates, and obvious errors before analysis.',
            ],
          },
        ],
      },
      {
        id: 'm3',
        title: 'Write and Present Your First Proposal',
        summary: 'Learn to analyze findings, write clearly, and defend your idea.',
        lessons: [
          {
            id: 'l7',
            title: 'Lesson 7: Basic Data Analysis for Beginners',
            objective: 'Interpret your data without overcomplicating statistics.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'Descriptive Statistics Intro', url: 'https://www.scribbr.com/statistics/descriptive-statistics/' },
            ],
            reflectionQuestion: 'What is the main pattern you observed in your data?',
            content: [
              'Start with basic charts and summary numbers before advanced tests.',
              'Explain findings in plain language: what changed, how much, and why it matters.',
              'Never claim more than your data supports.',
              'Mention limitations honestly; this makes your work more trustworthy.',
            ],
          },
          {
            id: 'l8',
            title: 'Lesson 8: Write a Clear Academic Draft',
            objective: 'Write introduction, related work, and short abstract clearly.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'How to Write an Abstract', url: 'https://www.scribbr.com/dissertation/abstract/' },
            ],
            reflectionQuestion: 'Write a 120-word abstract for your mini project.',
            content: [
              'Introduction should answer: what is the problem and why now?',
              'Related work should compare previous studies, not just list them.',
              'Keep paragraphs short and focused on one idea each.',
              'Use simple clear sentences. Clarity is more important than fancy words.',
            ],
          },
          {
            id: 'l9',
            title: 'Lesson 9: Final Presentation and Viva',
            objective: 'Prepare and defend a short proposal with confidence.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [
              { label: 'Research Proposal Template', url: 'https://www.overleaf.com/latex/templates' },
            ],
            reflectionQuestion: 'What feedback did you receive, and what will you improve next?',
            content: [
              'Prepare 5 to 7 slides: problem, gap, method, expected output, timeline.',
              'Practice a 5-minute talk and keep one slide for limitations.',
              'Treat questions as help, not criticism.',
              'Update your proposal after feedback. Revision is part of real research.',
            ],
          },
        ],
      },
    ],
    completionTask: 'Submit one beginner-friendly micro proposal and present it in a short viva session.',
  },

  'data-analysis-visualization': {
    slug: 'data-analysis-visualization',
    title: 'Data Analysis and Visualization',
    shortDescription: 'Practical course to help beginners clean data, run simple analysis, and make clear charts for reports and papers.',
    targetAudience: 'Students who finished Foundation course',
    estimatedDuration: '6 weeks',
    prerequisites: ['foundation-research-training'],
    instructor: 'Data mentors and faculty reviewers',
    modules: [
      {
        id: 'm1',
        title: 'Prepare Data Correctly',
        summary: 'Learn to organize, clean, and understand your dataset before analysis.',
        lessons: [
          {
            id: 'l1',
            title: 'Lesson 1: Understand Your Dataset',
            objective: 'Know what each column means and what question it supports.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'Data Literacy Basics', url: 'https://www.tableau.com/learn/articles/data-literacy' }],
            reflectionQuestion: 'Which 3 variables are most important for your research question?',
            content: [
              'Create a data dictionary for every variable and unit.',
              'Check if your sample matches the population you claim to study.',
              'Find missing values early so you can plan treatment strategy.',
            ],
          },
          {
            id: 'l2',
            title: 'Lesson 2: Data Cleaning Workflow',
            objective: 'Apply repeatable cleaning steps without losing original data.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'Cleaning Data in Practice', url: 'https://www.kaggle.com/learn/data-cleaning' }],
            reflectionQuestion: 'Which cleaning rules did you apply and why?',
            content: [
              'Keep a raw file, a cleaned file, and a change log.',
              'Handle duplicates, inconsistent formats, and outlier errors carefully.',
              'Write each cleaning step so teammates can repeat the same process.',
            ],
          },
        ],
      },
      {
        id: 'm2',
        title: 'Analyze with Confidence',
        summary: 'Use beginner statistics and interpret outcomes correctly.',
        lessons: [
          {
            id: 'l3',
            title: 'Lesson 3: Descriptive and Basic Inferential Stats',
            objective: 'Choose simple tests and explain output clearly.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'Statistics for Beginners', url: 'https://www.scribbr.com/statistics/' }],
            reflectionQuestion: 'Which result supports your hypothesis the most?',
            content: [
              'Start with mean, median, and spread to understand basic behavior.',
              'Use inferential tests only when assumptions are reasonable.',
              'Report results with meaning, not only numbers.',
            ],
          },
          {
            id: 'l4',
            title: 'Lesson 4: Make Charts That Tell a Story',
            objective: 'Create visualizations that are clear for non-technical readers.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'Data Visualization Guide', url: 'https://www.data-to-viz.com/' }],
            reflectionQuestion: 'Which chart best communicates your main finding?',
            content: [
              'Use the right chart type for the data type and question.',
              'Label axes clearly and avoid unnecessary decoration.',
              'One chart should communicate one key message.',
            ],
          },
        ],
      },
      {
        id: 'm3',
        title: 'Report and Reproducibility',
        summary: 'Package your analysis into a useful report with reproducible steps.',
        lessons: [
          {
            id: 'l5',
            title: 'Lesson 5: Write Findings for Reports and Papers',
            objective: 'Convert analysis into short and understandable findings.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'Writing Results Section', url: 'https://www.scribbr.com/dissertation/results/' }],
            reflectionQuestion: 'Write 3 bullet-point findings from your analysis.',
            content: [
              'Link each result back to the original question.',
              'Mention practical meaning, not just statistical significance.',
              'Separate result description from interpretation and opinion.',
            ],
          },
          {
            id: 'l6',
            title: 'Lesson 6: Reproduce and Share Your Workflow',
            objective: 'Organize files so your analysis can be checked by others.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'Reproducible Research Practices', url: 'https://the-turing-way.netlify.app/reproducible-research/reproducible-research' }],
            reflectionQuestion: 'What files will you share so others can reproduce your result?',
            content: [
              'Save scripts, cleaned data, and output charts in one structured folder.',
              'Add a README with setup and run steps.',
              'Use version control so you can track changes and roll back if needed.',
            ],
          },
        ],
      },
    ],
    completionTask: 'Submit one complete analysis report with at least three meaningful visualizations and a reproducible folder structure.',
  },

  'advanced-research-publication': {
    slug: 'advanced-research-publication',
    title: 'Advanced Research and Publication',
    shortDescription: 'Step-by-step publishing course for learners who already have a draft and want to submit to journals or conferences.',
    targetAudience: 'Researchers with a draft manuscript',
    estimatedDuration: '8 weeks',
    prerequisites: ['foundation-research-training'],
    instructor: 'Publication mentors and faculty panel',
    modules: [
      {
        id: 'm1',
        title: 'Prepare a Submission-Ready Paper',
        summary: 'Improve structure, clarity, and venue fit before submission.',
        lessons: [
          {
            id: 'l1',
            title: 'Lesson 1: Strong IMRaD Writing',
            objective: 'Make each section complete, clear, and connected.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'IMRaD Writing Guide', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6639986/' }],
            reflectionQuestion: 'Which section of your draft is currently weakest?',
            content: [
              'Introduction explains the gap and why it matters now.',
              'Methods must be clear enough that another researcher can repeat them.',
              'Results should be factual, and discussion should explain meaning.',
            ],
          },
          {
            id: 'l2',
            title: 'Lesson 2: Select the Right Venue',
            objective: 'Choose a journal or conference that fits your work.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'How to Choose a Journal', url: 'https://authorservices.wiley.com/author-resources/Journal-Authors/Prepare/choosing-a-journal.html' }],
            reflectionQuestion: 'List your top 3 target venues and why each fits.',
            content: [
              'Read aims and scope before formatting your paper.',
              'Check indexing, review time, and acceptance style.',
              'Avoid predatory venues by verifying legitimacy and editorial quality.',
            ],
          },
        ],
      },
      {
        id: 'm2',
        title: 'Handle Review and Revisions',
        summary: 'Respond professionally to reviewer comments and improve the manuscript.',
        lessons: [
          {
            id: 'l3',
            title: 'Lesson 3: Reviewer Response Writing',
            objective: 'Write point-by-point responses clearly and respectfully.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'Responding to Reviewer Comments', url: 'https://www.aje.com/arc/ten-simple-rules-for-responding-to-reviewers/' }],
            reflectionQuestion: 'Pick one difficult reviewer comment and draft your response.',
            content: [
              'Thank reviewers, then respond directly to each point.',
              'State what you changed and where it appears in the revised draft.',
              'If you disagree, explain your reason politely with evidence.',
            ],
          },
          {
            id: 'l4',
            title: 'Lesson 4: Final Camera-Ready Preparation',
            objective: 'Finalize text, formatting, figures, and references before final upload.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'Manuscript Submission Checklist', url: 'https://authorservices.taylorandfrancis.com/publishing-your-research/writing-your-paper/manuscript-checklist/' }],
            reflectionQuestion: 'What final checks will you do before pressing submit?',
            content: [
              'Check references, figure labels, and formatting one final time.',
              'Ask a peer to do a final readability review.',
              'Prepare your short presentation if accepted for conference talk.',
            ],
          },
        ],
      },
    ],
    completionTask: 'Submit a publication-ready manuscript package including paper draft, target venue plan, and reviewer response template.',
  },

  'specialized-research-group-ai-ml': {
    slug: 'specialized-research-group-ai-ml',
    title: 'Specialized Research Group - AI/ML',
    shortDescription: 'Applied AI/ML research path focused on reproducible experiments and publishable project outcomes.',
    targetAudience: 'Learners interested in AI/ML research projects',
    estimatedDuration: 'Ongoing',
    prerequisites: ['foundation-research-training'],
    instructor: 'Faculty-led AI/ML supervision team',
    modules: [
      {
        id: 'm1',
        title: 'Research-Ready AI/ML Foundations',
        summary: 'Move from coding models to doing reliable research experiments.',
        lessons: [
          {
            id: 'l1',
            title: 'Lesson 1: Problem Setup and Baseline',
            objective: 'Define a research problem and build a trustworthy baseline.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'Machine Learning Experiment Design', url: 'https://developers.google.com/machine-learning/guides/rules-of-ml' }],
            reflectionQuestion: 'What is your baseline model and why did you choose it?',
            content: [
              'Begin with one clear task and one clear metric.',
              'Build a simple baseline before trying advanced models.',
              'If baseline is weak, your improvement claims become unclear.',
            ],
          },
          {
            id: 'l2',
            title: 'Lesson 2: Fair Evaluation and Error Analysis',
            objective: 'Evaluate models correctly and understand failure patterns.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'Model Evaluation Concepts', url: 'https://scikit-learn.org/stable/model_selection.html' }],
            reflectionQuestion: 'Which error type appears most often in your model outputs?',
            content: [
              'Use train-validation-test splits consistently across experiments.',
              'Track precision, recall, and other useful metrics for your task.',
              'Analyze where the model fails, not only where it succeeds.',
            ],
          },
        ],
      },
      {
        id: 'm2',
        title: 'From Experiment to Paper',
        summary: 'Organize experiments and convert results into publishable research.',
        lessons: [
          {
            id: 'l3',
            title: 'Lesson 3: Reproducible Experiment Pipeline',
            objective: 'Make your experiments repeatable for team members and reviewers.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'Reproducibility in ML', url: 'https://paperswithcode.com/reproducibility' }],
            reflectionQuestion: 'What exact steps should another researcher follow to reproduce your result?',
            content: [
              'Set random seeds, record versions, and save run configurations.',
              'Log experiments so you can compare trials without confusion.',
              'Store code, data references, and results together for transparency.',
            ],
          },
          {
            id: 'l4',
            title: 'Lesson 4: Write and Present AI/ML Findings',
            objective: 'Turn experiment output into clear claims with evidence.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'How to Report ML Results', url: 'https://distill.pub/2018/building-blocks/' }],
            reflectionQuestion: 'What is your strongest contribution compared to baseline methods?',
            content: [
              'Write claims only when you have direct evidence from experiments.',
              'Include ablation or comparison results when possible.',
              'Explain practical meaning of your improvement, not only percentages.',
            ],
          },
        ],
      },
    ],
    completionTask: 'Submit one mini AI/ML research report with reproducible code structure and baseline comparison.',
  },

  'specialized-research-group-iot-embedded-systems': {
    slug: 'specialized-research-group-iot-embedded-systems',
    title: 'Specialized Research Group - IoT and Embedded Systems',
    shortDescription: 'Hands-on research path for IoT and embedded systems from sensing setup to tested prototype documentation.',
    targetAudience: 'Learners interested in hardware-software research projects',
    estimatedDuration: 'Ongoing',
    prerequisites: ['foundation-research-training'],
    instructor: 'Faculty-led IoT and embedded systems lab',
    modules: [
      {
        id: 'm1',
        title: 'IoT System Fundamentals',
        summary: 'Design a complete sensing pipeline and stable embedded workflow.',
        lessons: [
          {
            id: 'l1',
            title: 'Lesson 1: System Architecture and Sensor Planning',
            objective: 'Choose sensors and communication flow based on project needs.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'IoT Architecture Overview', url: 'https://aws.amazon.com/what-is/iot/' }],
            reflectionQuestion: 'Draw your sensor-to-cloud pipeline in 5 blocks.',
            content: [
              'Define the problem first, then choose sensors that measure the right signal.',
              'Pick communication protocol by power, distance, and reliability needs.',
              'Keep architecture simple so testing and debugging stay manageable.',
            ],
          },
          {
            id: 'l2',
            title: 'Lesson 2: Embedded Programming and Testing',
            objective: 'Write stable firmware and test it in small steps.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'Embedded Testing Basics', url: 'https://www.embedded.com/' }],
            reflectionQuestion: 'What tests will you run before field deployment?',
            content: [
              'Split firmware into modules: sensing, processing, communication.',
              'Test each module separately before full integration.',
              'Log errors and timing behavior to find stability issues early.',
            ],
          },
        ],
      },
      {
        id: 'm2',
        title: 'Edge Intelligence and Reporting',
        summary: 'Run lightweight intelligence and document the prototype as research output.',
        lessons: [
          {
            id: 'l3',
            title: 'Lesson 3: TinyML and Edge Inference Basics',
            objective: 'Deploy lightweight models on limited hardware.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'TinyML Intro', url: 'https://www.tensorflow.org/lite/microcontrollers' }],
            reflectionQuestion: 'What is your trade-off between model accuracy and device constraints?',
            content: [
              'Measure memory, latency, and power before and after deployment.',
              'Use smaller models when real-time performance is more important than small accuracy gain.',
              'Document model version and deployment settings clearly.',
            ],
          },
          {
            id: 'l4',
            title: 'Lesson 4: Write Prototype Results Like a Researcher',
            objective: 'Present hardware and software evaluation in a clear report.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            slidesUrl: 'https://drive.google.com/',
            readingLinks: [{ label: 'Engineering Report Writing', url: 'https://www.wikihow.com/Write-an-Engineering-Report' }],
            reflectionQuestion: 'What result proves your prototype is useful?',
            content: [
              'Report setup, test scenario, and performance metrics clearly.',
              'Include failure cases and what improvements are needed.',
              'Share wiring or configuration details so others can replicate your prototype.',
            ],
          },
        ],
      },
    ],
    completionTask: 'Submit one tested prototype report with architecture diagram, evaluation table, and improvement roadmap.',
  },
};

export const courses = Object.values(courseCatalog);

export function getCourseBySlug(slug: string) {
  return courseCatalog[slug];
}
