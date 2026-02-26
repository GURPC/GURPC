import React from 'react';
import { teamMembers } from '@/data/executive';
import TeamCard from '@/components/team/TeamCard';

const ExecutivesPage = () => {
  const advisors = teamMembers.filter(m => m.category === 'Advisor');
  const moderators = teamMembers.filter(m => m.category === 'Moderation Board');
  const executives = teamMembers.filter(m => m.category === 'Executive Committee');

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-16 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-20 tracking-tight">Our Team</h1>
        
        {/* Advisors Section */}
        {advisors.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-green-600 pl-4">
              Advisors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {advisors.map(member => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Moderation Board Section */}
        {moderators.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-4">
              Moderation Board
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {moderators.map(member => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Executive Committee Section */}
        {executives.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-yellow-500 pl-4">
              Executive Committee
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {executives.map(member => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutivesPage;
