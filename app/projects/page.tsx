import React from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import { mockProjects } from '@/data/mockProjects';

export default function ProjectsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
             <h1 className="text-3xl font-bold text-gray-900">Research Projects</h1>
             <p className="text-gray-600 mt-2">Explore ongoing and completed research from our community.</p>
          </div>
          <button className="hidden md:block bg-gurGreen text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-800 transition shadow-sm">
            + Post New Project
          </button>
        </div>

        {/* Filters (Placeholder) */}
        <div className="flex flex-wrap gap-2 mb-8">
           {['All', 'AI/ML', 'IoT', 'Blockchain', 'Environmental Science'].map((tag) => (
             <button key={tag} className="px-4 py-2 bg-white border rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
               {tag}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
