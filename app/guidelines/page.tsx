import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  FileText, BookOpen, CheckCircle, AlertCircle, ExternalLink,
  ArrowRight, Download, ClipboardList, Users, Calendar, Mail
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Submission Guidelines - GURPC',
  description: 'How to publish research papers — step-by-step submission guidelines for GURPC members.',
};

const steps = [
  {
    step: 1,
    title: 'Choose Your Research Topic',
    description: 'Select a topic aligned with your department and interests. Consult with GURPC advisors or faculty mentors for guidance on feasibility and novelty.',
    icon: ClipboardList,
  },
  {
    step: 2,
    title: 'Form Your Research Team',
    description: 'Collaborate with fellow GURPC members or form a cross-departmental group. Use the Groups feature (after login) to find collaborators.',
    icon: Users,
  },
  {
    step: 3,
    title: 'Draft & Structure Your Paper',
    description: 'Follow the standard structure: Abstract, Introduction, Literature Review, Methodology, Results, Discussion, Conclusion, References. Use LaTeX or Word templates provided by your target journal.',
    icon: FileText,
  },
  {
    step: 4,
    title: 'Internal Peer Review',
    description: 'Submit your draft to GURPC\'s internal review panel. Attend a peer review session where members provide constructive feedback before external submission.',
    icon: CheckCircle,
  },
  {
    step: 5,
    title: 'Select a Journal or Conference',
    description: 'Browse our curated Conferences & Journals directory to find the best venue for your work. Consider impact factor, indexing, scope, and deadlines.',
    icon: BookOpen,
  },
  {
    step: 6,
    title: 'Submit & Track',
    description: 'Submit through the journal/conference portal. Track your submission status and respond to reviewer comments promptly. GURPC mentors can help with revisions.',
    icon: Calendar,
  },
];

const journals = [
  {
    name: 'GUB Journal of Science and Engineering',
    publisher: 'Green University of Bangladesh',
    scope: 'Multi-disciplinary — CSE, SWE, AI & DS, EEE, Textile & more',
    indexing: ['Google Scholar', 'DOAJ'],
    link: '#',
    recommended: true,
    note: 'Best for first-time authors — GUB\'s own journal accepts student research.',
  },
  {
    name: 'IEEE Access',
    publisher: 'IEEE',
    scope: 'Multi-disciplinary engineering and computing',
    indexing: ['Scopus', 'Web of Science', 'IEEE Xplore'],
    link: 'https://ieeeaccess.ieee.org/',
    recommended: true,
    note: 'Open-access, high impact factor (3.476). Good for CSE/SWE/AI/EEE papers.',
  },
  {
    name: 'Heliyon (Cell Press / Elsevier)',
    publisher: 'Elsevier',
    scope: 'Multi-disciplinary',
    indexing: ['Scopus', 'Web of Science', 'PubMed'],
    link: 'https://www.cell.com/heliyon/home',
    recommended: false,
    note: 'Open access, rapid review. Accepts a wide range of research fields.',
  },
  {
    name: 'MDPI Sensors',
    publisher: 'MDPI',
    scope: 'IoT, sensing, instrumentation',
    indexing: ['Scopus', 'Web of Science'],
    link: 'https://www.mdpi.com/journal/sensors',
    recommended: false,
    note: 'Great for hardware/IoT-focused research papers.',
  },
  {
    name: 'Elsevier Energy Reports',
    publisher: 'Elsevier',
    scope: 'Energy systems, renewable energy',
    indexing: ['Scopus', 'Web of Science'],
    link: 'https://www.sciencedirect.com/journal/energy-reports',
    recommended: false,
    note: 'Ideal for EEE department energy-related research.',
  },
];

const formatting = [
  { label: 'File Format', value: 'PDF or DOCX (check journal requirements)' },
  { label: 'Citation Style', value: 'IEEE, APA, or as specified by the target journal' },
  { label: 'Plagiarism Check', value: 'Must be below 15% (use Turnitin or iThenticate)' },
  { label: 'Abstract Length', value: '150–300 words' },
  { label: 'Paper Length', value: '4,000–8,000 words (varies by journal)' },
  { label: 'Figures & Tables', value: 'High resolution (300 DPI minimum), properly captioned' },
  { label: 'References', value: 'Minimum 20 recent references (last 5 years preferred)' },
  { label: 'Language', value: 'English — proofread or use Grammarly/QuillBot' },
];

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 text-green-600 dark:text-green-400 border-green-300 dark:border-green-500/30">
            <FileText className="h-3 w-3 mr-1" /> For Researchers
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Submission Guidelines
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            A step-by-step guide for GURPC members on how to write, review, and publish research papers in reputed journals and conferences.
          </p>
        </div>

        {/* Step-by-step Process */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <ArrowRight className="h-5 w-5 text-green-600 dark:text-green-400" />
            Publication Process
          </h2>
          <div className="space-y-4">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:border-green-300 dark:hover:border-green-700 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-sm shrink-0">
                    {item.step}
                  </div>
                  {item.step < steps.length && (
                    <div className="w-0.5 flex-1 bg-green-200 dark:bg-green-500/20 mt-2" />
                  )}
                </div>
                <div className="pb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Formatting Requirements */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-green-600 dark:text-green-400" />
            Formatting Requirements
          </h2>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {formatting.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <span className="text-sm font-medium text-gray-900 dark:text-white sm:w-40 shrink-0">
                    {item.label}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="mb-16">
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-6">
            <h3 className="font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5" />
              Important Notes
            </h3>
            <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-400/80">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>All submissions must be original work. Plagiarism will result in immediate rejection and possible disciplinary action.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>List &ldquo;Green University of Bangladesh&rdquo; as your affiliation. Include GURPC acknowledgment where appropriate.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Get approval from your faculty supervisor before submitting to any external journal or conference.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Predatory journals are strictly prohibited. Always verify journals using the DOAJ or Beall&apos;s List before submission.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>GURPC can assist with APC (Article Processing Charges) for approved publications — contact the coordinator.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Recommended Journals */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
            Recommended Journals
          </h2>
          <div className="space-y-4">
            {journals.map((journal, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:border-green-300 dark:hover:border-green-700 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{journal.name}</h3>
                  {journal.recommended && (
                    <Badge className="shrink-0 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-500/30 text-[10px]" variant="outline">
                      Recommended
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{journal.note}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-400">Publisher: {journal.publisher}</span>
                  <span className="text-gray-300 dark:text-gray-700">·</span>
                  {journal.indexing.map(idx => (
                    <Badge key={idx} variant="secondary" className="text-[10px] bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                      {idx}
                    </Badge>
                  ))}
                  {journal.link !== '#' && (
                    <>
                      <span className="text-gray-300 dark:text-gray-700">·</span>
                      <Link href={journal.link} target="_blank" className="text-xs text-green-600 dark:text-green-400 hover:underline inline-flex items-center gap-1">
                        Visit <ExternalLink className="h-3 w-3" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button asChild variant="outline" className="border-green-300 dark:border-green-500/30">
              <Link href="/conferences">
                View Full Conferences & Journals Directory <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Need Help */}
        <section className="text-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-10">
          <Mail className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Need Help With Your Submission?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            GURPC coordinators and advisors are here to guide you through every step — from topic selection to final publication.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild className="bg-green-600 hover:bg-green-500 text-white">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-300 dark:border-green-500/30">
              <Link href="/stories">See Success Stories</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
