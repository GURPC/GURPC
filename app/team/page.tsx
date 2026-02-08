import { Metadata } from 'next';
import { teamMembers } from '@/data/team';
import TeamCard from '@/components/team/TeamCard';

export const metadata: Metadata = {
  title: 'Our Team - GURPC',
  description: 'Meet the dedicated executive committee and advisors of GURPC.',
};

export default function TeamPage() {
  const advisors = teamMembers.filter(m => m.category === 'Advisor');
  const moderators = teamMembers.filter(m => m.category === 'Moderation Board');
  // Use explicit filter for Executive Committee, or catch-all for remaining members
  const executives = teamMembers.filter(m => m.category === 'Executive Committee' || (m.category !== 'Advisor' && m.category !== 'Moderation Board'));

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Meet Our Team</h1>
        <p className="text-muted-foreground text-lg">
          The passionate individuals leading the charge for research excellence at Green University.
        </p>
      </div>

      {/* Advisors Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8 text-center border-b pb-4">Advisory Panel</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {advisors.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* Moderation Board */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8 text-center border-b pb-4">Moderation Board</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {moderators.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>

       {/* Executives (if any) */}
       {executives.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center border-b pb-4">Executive Committee</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {executives.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

