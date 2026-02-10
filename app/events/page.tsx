import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Events - GURPC',
  description: 'Upcoming seminars, workshops, and conferences.',
};

const events = [
  {
    id: 5,
    title: "PECCII 2026 International Conference",
    date: "June 17-18, 2026",
    time: "Submission Deadline: Feb 20, 2026",
    location: "Pabna University of Science and Technology",
    description: "Official call for submissions in Power, Electronics, AI, and Computing. GURPC provides support for abstracts and reviews.",
    category: "Conference",
    isUpcoming: true,
    link: "https://peccii.pust.ac.bd/",
    buttonText: "Visit Website"
  },
  {
    id: 1,
    title: "Research Methodology Workshop",
    date: "March 15, 2026",
    time: "10:00 AM - 1:00 PM",
    location: "Green University Campus, Room A-302",
    description: "An intensive session designed for beginners to understand the fundamentals of qualitative and quantitative research methods. Required for new members.",
    category: "Workshop",
    isUpcoming: true
  },
  {
    id: 2,
    title: "Annual Research Symposium 2026",
    date: "April 2, 2026",
    time: "9:00 AM - 5:00 PM",
    location: "Auditorium",
    description: "A day-long event where students present their ongoing research projects. Faculty and industry experts will provide feedback.",
    category: "Symposium",
    isUpcoming: true
  },
  {
    id: 3,
    title: "Intro to Python for Data Science",
    date: "January 20, 2026",
    time: "2:00 PM",
    location: "Lab 4",
    description: "Hands-on workshop covering pandas, numpy, and matplotlib basics.",
    category: "Tech Talk",
    isUpcoming: false
  },
  {
    id: 4,
    title: "How to Write a Review Paper",
    date: "December 10, 2025",
    time: "11:00 AM",
    location: "Online (Zoom)",
    description: "Expert session on structuring and writing high-impact review papers.",
    category: "Seminar",
    isUpcoming: false
  }
];

export default function EventsPage() {
  const upcomingEvents = events.filter(e => e.isUpcoming);
  const pastEvents = events.filter(e => !e.isUpcoming);

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Events & Workshops</h1>
        <p className="text-muted-foreground text-lg">
          Join us to learn, share, and grow.
        </p>
      </div>

      {/* Upcoming Events */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="text-primary" /> Upcoming Events
        </h2>
        
        {upcomingEvents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {upcomingEvents.map(event => (
               <EventCard key={event.id} event={event} />
             ))}
          </div>
        ) : (
          <p className="text-muted-foreground italic">No upcoming events scheduled at the moment.</p>
        )}
      </section>

      {/* Past Events */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-slate-700 dark:text-slate-300">Past Events</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 opacity-80 hover:opacity-100 transition-opacity">
           {pastEvents.map(event => (
               <EventCard key={event.id} event={event} isPast />
             ))}
        </div>
      </section>
    </div>
  );
}

function EventCard({ event, isPast }: { event: any, isPast?: boolean }) {
  return (
    <Card className={`flex flex-col h-full ${isPast ? 'bg-slate-50 dark:bg-slate-900 border-slate-200' : 'border-primary/20 shadow-md'}`}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant={isPast ? "outline" : "default"} className={!isPast ? "bg-primary" : ""}>
            {event.category}
          </Badge>
          {isPast && <span className="text-xs text-muted-foreground font-medium">Completed</span>}
        </div>
        <CardTitle className="text-xl line-clamp-2 leading-tight">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
           <Calendar className="h-4 w-4 shrink-0" /> 
           <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
           <Clock className="h-4 w-4 shrink-0" /> 
           <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
           <MapPin className="h-4 w-4 shrink-0" /> 
           <span>{event.location}</span>
        </div>
        <p className="pt-2 text-slate-600 dark:text-slate-400 line-clamp-3">
          {event.description}
        </p>
      </CardContent>
      <CardFooter>
        {event.link && !isPast ? (
          <Button className="w-full" variant="default" asChild>
            <Link href={event.link} target="_blank" rel="noopener noreferrer">
              {event.buttonText || "Register Now"}
            </Link>
          </Button>
        ) : (
          <Button className="w-full" variant={isPast ? "outline" : "default"} disabled={isPast}>
            {isPast ? "Event Ended" : (event.buttonText || "Register Now")}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
