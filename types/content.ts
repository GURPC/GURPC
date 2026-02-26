// ─── Content & Data Types ────────────────────────────────────────────
// Type definitions for static/seed data used across the application.
// These types describe the shape of data in the `data/` directory.

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

export interface SuccessStory {
  id: string;
  name: string;
  role: string;
  department: string;
  image?: string;
  paperTitle: string;
  journal: string;
  year: number;
  indexing: string[];
  quote: string;
  link?: string;
  category: 'publication' | 'award' | 'achievement';
}
