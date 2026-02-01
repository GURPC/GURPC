import { TeamMember } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Linkedin } from 'lucide-react';
import React from 'react';

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col items-center p-6 text-center h-full">
      <div className="w-32 h-32 relative mb-4">
        <Image
          src={member.image || '/images/placeholder-avatar.svg'} // Fallback if no image
          alt={member.name}
          fill
          className="rounded-full object-cover border-4 border-gray-50 dark:border-gray-800 shadow-sm"
        />
      </div>
      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{member.name}</h3>
      <div className="text-green-700 dark:text-green-500 font-medium text-sm mb-2">{member.role}</div>
      {member.department && (
        <div className="text-gray-500 dark:text-gray-400 text-xs mb-3 font-medium uppercase tracking-wide">{member.department}</div>
      )}
      
      <div className="mt-auto flex space-x-3 pt-4 border-t border-gray-100 dark:border-gray-800 w-full justify-center">
        {member.email && (
          <a href={`mailto:${member.email}`} className="text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors bg-gray-50 dark:bg-gray-800 p-2 rounded-full">
            <Mail size={16} />
          </a>
        )}
        {member.linkedin && (
          <a 
            href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-gray-50 dark:bg-gray-800 p-2 rounded-full"
          >
            <Linkedin size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
