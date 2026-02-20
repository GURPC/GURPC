export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'alumni' | 'admin';
  department?: string;
  avatarUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'Director' | 'Advisor' | 'Moderation Board' | 'Executive Committee';
  department?: string;
  image?: string;
  email?: string;
  linkedin?: string;
  studentId?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'planning' | 'ongoing' | 'completed';
  members: User[];
  createdAt: string;
}
