'use client';

import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Calendar, ChevronLeft, ChevronRight, Clock, MapPin, ExternalLink,
  Filter, BookOpen, Presentation, GraduationCap, Mic, FileText, Globe
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date YYYY-MM-DD
  endDate?: string;
  time?: string;
  location: string;
  description: string;
  category: 'workshop' | 'conference' | 'call-for-papers' | 'seminar' | 'deadline' | 'training' | 'webinar';
  link?: string;
  isExternal?: boolean;
}

const categoryConfig: Record<string, { label: string; color: string; icon: any }> = {
  'workshop': { label: 'Workshop', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30', icon: GraduationCap },
  'conference': { label: 'Conference', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30', icon: Globe },
  'call-for-papers': { label: 'Call for Papers', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-500/30', icon: FileText },
  'seminar': { label: 'Seminar', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30', icon: Mic },
  'deadline': { label: 'Deadline', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-500/30', icon: Clock },
  'training': { label: 'Training', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-500/30', icon: Presentation },
  'webinar': { label: 'Webinar', color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30', icon: Mic },
};

const calendarEvents: CalendarEvent[] = [
  {
    id: 'ev-1',
    title: 'Research Methodology Workshop',
    date: '2026-03-15',
    time: '10:00 AM – 1:00 PM',
    location: 'Green University Campus, Room A-302',
    description: 'Fundamentals of qualitative and quantitative research methods. Required for new members.',
    category: 'workshop',
  },
  {
    id: 'ev-2',
    title: 'Annual Research Symposium 2026',
    date: '2026-04-02',
    time: '9:00 AM – 5:00 PM',
    location: 'Green University Auditorium',
    description: 'Day-long event — students present ongoing research. Faculty and industry experts provide feedback.',
    category: 'conference',
  },
  {
    id: 'ev-3',
    title: 'IEEE TENSYMP 2026 — Submission Deadline',
    date: '2026-04-15',
    time: 'End of day',
    location: 'Online Submission',
    description: 'Final deadline for paper submissions to IEEE TENSYMP 2026 (Region 10 Symposium).',
    category: 'call-for-papers',
    link: 'https://tensymp2026.ieee.org/',
    isExternal: true,
  },
  {
    id: 'ev-4',
    title: 'LaTeX & Academic Writing Training',
    date: '2026-03-22',
    time: '2:00 PM – 4:00 PM',
    location: 'Lab 4, Green University',
    description: 'Hands-on training on writing papers with LaTeX, using Overleaf, IEEE templates, and reference management with Zotero.',
    category: 'training',
  },
  {
    id: 'ev-5',
    title: 'ICERIE 2026 — Paper Submission Deadline',
    date: '2026-03-30',
    time: 'End of day',
    location: 'Online Submission (SUST)',
    description: 'Deadline for submissions to the International Conference on Engineering Research, Innovation and Education at SUST, Sylhet.',
    category: 'call-for-papers',
    link: '#',
  },
  {
    id: 'ev-6',
    title: 'Peer Review Workshop',
    date: '2026-04-10',
    time: '11:00 AM – 1:00 PM',
    location: 'Green University, Room B-201',
    description: 'Learn how to write constructive peer reviews. Practice reviewing sample papers with faculty guidance.',
    category: 'workshop',
  },
  {
    id: 'ev-7',
    title: 'Python for Data Science — Beginners',
    date: '2026-04-18',
    time: '2:00 PM – 5:00 PM',
    location: 'Lab 4, Green University',
    description: 'Hands-on workshop: pandas, numpy, matplotlib, and basic ML with scikit-learn.',
    category: 'training',
  },
  {
    id: 'ev-8',
    title: 'ICEEICT 2026 — Paper Submission Deadline',
    date: '2026-05-30',
    time: 'End of day',
    location: 'Online Submission (BUET)',
    description: 'Final deadline for ICEEICT 2026 paper submissions. GURPC offers abstract review support.',
    category: 'call-for-papers',
    link: '#',
  },
  {
    id: 'ev-9',
    title: 'PECCII 2026 International Conference',
    date: '2026-06-17',
    endDate: '2026-06-18',
    time: 'All day',
    location: 'Pabna University of Science and Technology',
    description: 'International conference on Power, Electronics, AI, and Computing. GURPC members presenting.',
    category: 'conference',
    link: 'https://peccii.pust.ac.bd/',
    isExternal: true,
  },
  {
    id: 'ev-10',
    title: 'How to Write a Literature Review — Seminar',
    date: '2026-03-08',
    time: '11:00 AM – 12:30 PM',
    location: 'Online (Zoom)',
    description: 'Expert session on conducting systematic literature reviews and structuring the review section of your paper.',
    category: 'seminar',
  },
  {
    id: 'ev-11',
    title: 'ICCIT 2026 — Submission Deadline',
    date: '2026-07-15',
    time: 'End of day',
    location: 'Online Submission (University of Dhaka)',
    description: 'Paper submission deadline for the International Conference on Computer and Information Technology.',
    category: 'call-for-papers',
    link: '#',
  },
  {
    id: 'ev-12',
    title: 'Research Ethics & Integrity Seminar',
    date: '2026-05-10',
    time: '10:00 AM – 12:00 PM',
    location: 'Green University, Seminar Hall',
    description: 'Understanding research ethics, avoiding plagiarism, and maintaining academic integrity in publications.',
    category: 'seminar',
  },
  {
    id: 'ev-13',
    title: 'The Mystery Unveiled: Session 01',
    date: '2026-05-14',
    time: '7:00 PM',
    location: 'Online (Zoom)',
    description: 'Research Genesis Session 01 on the basics of research, featuring Prof. Dr. ASM Shihavuddin. Register: https://forms.gle/VLkLqiHshrQP4EAZ9',
    category: 'webinar',
    link: 'https://www.facebook.com/share/1AwmDYPhTb/',
    isExternal: true,
  },
];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return { firstDay, daysInMonth };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function CalendarPage() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { firstDay, daysInMonth } = getMonthDays(currentYear, currentMonth);

  const goToPrev = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const goToNext = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };
  const goToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDate(null);
  };

  // Events indexed by date string
  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    calendarEvents.forEach(ev => {
      if (!map[ev.date]) map[ev.date] = [];
      map[ev.date].push(ev);
    });
    return map;
  }, []);

  // Events for the selected date or upcoming
  const displayEvents = useMemo(() => {
    let events: CalendarEvent[];
    if (selectedDate) {
      events = eventsByDate[selectedDate] || [];
    } else {
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      events = calendarEvents
        .filter(ev => ev.date >= todayStr)
        .sort((a, b) => a.date.localeCompare(b.date));
    }
    if (categoryFilter !== 'all') {
      events = events.filter(ev => ev.category === categoryFilter);
    }
    return events;
  }, [selectedDate, categoryFilter, eventsByDate, today]);

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-green-600 dark:text-green-400 border-green-300 dark:border-green-500/30">
            <Calendar className="h-3 w-3 mr-1" /> Live Calendar
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Events Calendar
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Upcoming workshops, conferences, calls for papers, and training sessions — all at a glance.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Calendar Grid */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={goToPrev} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {MONTHS[currentMonth]} {currentYear}
                </h2>
                <button onClick={goToToday} className="text-xs text-green-600 dark:text-green-400 hover:underline mt-1">
                  Go to today
                </button>
              </div>
              <button onClick={goToNext} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map(d => (
                <div key={d} className="text-center text-xs font-medium text-gray-400 dark:text-gray-500 py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Date cells */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells before first day */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayEvents = eventsByDate[dateStr] || [];
                const isToday = dateStr === todayStr;
                const isSelected = dateStr === selectedDate;
                const hasEvents = dayEvents.length > 0;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all relative
                      ${isToday ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-bold' : ''}
                      ${isSelected ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' : ''}
                      ${!isToday && !isSelected ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300' : ''}
                    `}
                  >
                    {day}
                    {hasEvents && (
                      <div className="flex gap-0.5 mt-0.5">
                        {dayEvents.slice(0, 3).map((ev, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${
                              ev.category === 'call-for-papers' || ev.category === 'deadline'
                                ? 'bg-red-500'
                                : ev.category === 'conference'
                                ? 'bg-purple-500'
                                : ev.category === 'workshop'
                                ? 'bg-blue-500'
                                : ev.category === 'training'
                                ? 'bg-green-500'
                                : 'bg-amber-500'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
              {Object.entries(categoryConfig).map(([key, cfg]) => (
                <div key={key} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <div className={`w-2 h-2 rounded-full ${
                    key === 'call-for-papers' || key === 'deadline' ? 'bg-red-500'
                    : key === 'conference' ? 'bg-purple-500'
                    : key === 'workshop' ? 'bg-blue-500'
                    : key === 'training' ? 'bg-green-500'
                    : 'bg-amber-500'
                  }`} />
                  {cfg.label}
                </div>
              ))}
            </div>
          </div>

          {/* Event List Sidebar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {selectedDate ? formatDate(selectedDate) : 'Upcoming Events'}
              </h3>
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate(null)}
                  className="text-xs text-green-600 dark:text-green-400 hover:underline"
                >
                  Show all upcoming
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-1.5">
              <Filter className="h-3.5 w-3.5 text-gray-400 mt-1" />
              {['all', 'workshop', 'conference', 'call-for-papers', 'seminar', 'training'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    categoryFilter === cat
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat === 'all' ? 'All' : categoryConfig[cat]?.label || cat}
                </button>
              ))}
            </div>

            {/* Event Cards */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {displayEvents.length > 0 ? displayEvents.map(ev => {
                const cfg = categoryConfig[ev.category];
                const IconComp = cfg?.icon || Calendar;
                return (
                  <div key={ev.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:border-green-300 dark:hover:border-green-700 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 mt-0.5">
                        <IconComp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                            {ev.title}
                          </h4>
                        </div>
                        <Badge variant="outline" className={`text-[10px] mb-2 ${cfg?.color || ''}`}>
                          {cfg?.label || ev.category}
                        </Badge>
                        <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" />
                            {formatDate(ev.date)}{ev.endDate ? ` – ${formatDate(ev.endDate)}` : ''}
                          </div>
                          {ev.time && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3 w-3" />
                              {ev.time}
                            </div>
                          )}
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3" />
                            {ev.location}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 leading-relaxed line-clamp-2">
                          {ev.description}
                        </p>
                        {ev.link && ev.link !== '#' && (
                          <Link
                            href={ev.link}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 hover:underline mt-2"
                          >
                            Visit Website <ExternalLink className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                  <Calendar className="h-8 w-8 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">
                    {selectedDate
                      ? 'No events on this date.'
                      : 'No upcoming events found.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Want to submit a paper or attend a conference? Check our guidelines.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild className="bg-green-600 hover:bg-green-500 text-white">
              <Link href="/guidelines">Submission Guidelines</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-300 dark:border-green-500/30">
              <Link href="/conferences">Conferences & Journals</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
