'use client';

import { TeamMember } from '@/types';
import Image from 'next/image';
import { Mail, Linkedin } from 'lucide-react';
import React, { useState } from 'react';

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  const [imgSrc, setImgSrc] = useState(member.image || '/images/placeholder-avatar.svg');

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col items-center p-6 text-center h-full group">
      <div className="w-32 h-32 relative mb-4">
        <Image
          src={imgSrc}
          alt={member.name}
          fill
          className="rounded-full object-cover border-4 border-gray-50 dark:border-gray-800 shadow-sm transition-opacity duration-300 group-hover:scale-105"
          onError={() => setImgSrc('/images/placeholder-avatar.svg')}
        />
        {/* Helper for layout stability on failure if using fill */}
      </div>
      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 leading-tight">{member.name}</h3>
      <div className="text-green-700 dark:text-green-500 font-medium text-sm mb-2">{member.role}</div>
      {member.department && (
        <div className="text-gray-500 dark:text-gray-400 text-xs mb-3 font-medium uppercase tracking-wide line-clamp-2 min-h-[2.5em]">{member.department}</div>
      )}
      
      <div className="mt-auto flex space-x-3 pt-4 border-t border-gray-100 dark:border-gray-800 w-full justify-center">
        {member.email && (
          <a 
            href={`mailto:${member.email}`} 
            className="text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors bg-gray-50 dark:bg-gray-800 p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900/20"
            aria-label={`Email ${member.name}`}
          >
            <Mail size={16} />
          </a>
        )}
        {member.linkedin && (
          <a 
            href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-gray-50 dark:bg-gray-800 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
            aria-label={`LinkedIn ${member.name}`}
          >
            <Linkedin size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
