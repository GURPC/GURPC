import { Project } from '@/types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'AI-Based Traffic Management System for Dhaka',
    description: 'A machine learning approach to optimize traffic signal timings based on real-time vehicle density.',
    category: 'AI/ML',
    status: 'ongoing',
    members: [
      { id: 'u1', name: 'Rahim Uddin', role: 'student', email: 'rahim@gub.edu.bd' },
      { id: 'u2', name: 'Dr. Hasan', role: 'faculty', email: 'hasan@gub.edu.bd' }
    ],
    createdAt: '2023-10-15',
  },
  {
    id: '2',
    title: 'Green Energy efficient IoT Home Automation',
    description: 'Developing a low-cost IoT solution for monitoring and reducing home energy consumption using ESP32.',
    category: 'IoT',
    status: 'completed',
    members: [
      { id: 'u3', name: 'Fatima Begum', role: 'student', email: 'fatima@gub.edu.bd' }
    ],
    createdAt: '2023-08-20',
  },
  {
    id: '3',
    title: 'Blockchain for Academic Credential Verification',
    description: 'A decentralized application (DApp) to issue and verify student certificates securely.',
    category: 'Blockchain',
    status: 'planning',
    members: [
      { id: 'u1', name: 'Rahim Uddin', role: 'student', email: 'rahim@gub.edu.bd' }
    ],
    createdAt: '2024-01-05',
  },
  {
    id: '4',
    title: 'Impact of Climate Change on Riverbank Erosion',
    description: 'A comprehensive study analyzing satellite imagery to predict erosion patterns in the Padma river.',
    category: 'Environmental Science',
    status: 'ongoing',
    members: [
      { id: 'u5', name: 'Tanvir Ahmed', role: 'student', email: 'tanvir@gub.edu.bd' },
      { id: 'u6', name: 'Prof. Anisul', role: 'faculty', email: 'anisul@gub.edu.bd' }
    ],
    createdAt: '2023-11-10',
  }
];
