import React from 'react';
import { Project } from '@/types';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition p-6 bg-white flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {project.category}
        </span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">
        <Link href={`/projects/${project.id}`} className="hover:text-gurGreen">
          {project.title}
        </Link>
      </h3>
      
      <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
        {project.description}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t">
        <div className="flex -space-x-2">
           {/* Mock avatars based on initials */}
           {project.members.slice(0, 3).map((member, i) => (
             <div key={member.id} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-700" title={member.name}>
                {member.name.charAt(0)}
             </div>
           ))}
           {project.members.length > 3 && (
             <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-500">
               +{project.members.length - 3}
             </div>
           )}
        </div>
        <span className="text-xs text-gray-400">
          Posted {new Date(project.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
