'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Award, BookOpen, Quote, ExternalLink, Star, User, Filter,
  Trophy, GraduationCap, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { successStories, SuccessStory } from '@/data/successStories';

export default function SuccessStoriesPage() {
  const [filter, setFilter] = useState<'all' | 'publication' | 'award' | 'achievement'>('all');

  const filtered = filter === 'all'
    ? successStories
    : successStories.filter(s => s.category === filter);

  const stats = {
    total: successStories.length,
    publications: successStories.filter(s => s.category === 'publication').length,
    awards: successStories.filter(s => s.category === 'award').length,
    journals: new Set(successStories.map(s => s.journal)).size,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-green-600 dark:text-green-400 border-green-300 dark:border-green-500/30">
            <Sparkles className="h-3 w-3 mr-1" /> Member Spotlights
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Success Stories
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Real members, real publications. See how GURPC is helping students and alumni achieve their research goals.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Success Stories', value: stats.total, icon: Star },
            { label: 'Publications', value: stats.publications, icon: BookOpen },
            { label: 'Awards Won', value: stats.awards, icon: Trophy },
            { label: 'Journals Featured', value: stats.journals, icon: GraduationCap },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 text-center">
              <stat.icon className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Filter className="h-4 w-4 text-gray-400" />
          {(['all', 'publication', 'award'] as const).map((type) => (
            <Button
              key={type}
              variant={filter === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(type)}
              className={filter === type
                ? 'bg-green-600 hover:bg-green-500 text-white'
                : 'border-green-200 dark:border-green-500/20'}
            >
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1) + 's'}
            </Button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p>No stories match the selected filter.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Want to be featured here?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            Join GURPC, start your research journey, and publish your work. Every member has the potential to be our next success story.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild className="bg-green-600 hover:bg-green-500 text-white">
              <Link href="/join">Become a Member</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-300 dark:border-green-500/30">
              <Link href="/guidelines">Submission Guidelines</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryCard({ story }: { story: SuccessStory }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-green-300 dark:hover:border-green-700 transition-colors group">
      <div className="p-6 space-y-4">
        {/* Header: Avatar + Name */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center overflow-hidden shrink-0 border-2 border-green-200 dark:border-green-500/20">
            {story.image ? (
              <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
            ) : (
              <User className="h-6 w-6 text-green-600 dark:text-green-400" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">{story.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{story.role}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="outline"
                className={
                  story.category === 'award'
                    ? 'text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30 text-[10px]'
                    : 'text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30 text-[10px]'
                }
              >
                {story.category === 'award' && <Award className="h-2.5 w-2.5 mr-1" />}
                {story.category === 'publication' && <BookOpen className="h-2.5 w-2.5 mr-1" />}
                {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
              </Badge>
              <span className="text-[10px] text-gray-400">{story.year}</span>
            </div>
          </div>
        </div>

        {/* Paper Title */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-800">
          <p className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed">
            &ldquo;{story.paperTitle}&rdquo;
          </p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
            {story.journal}
          </p>
        </div>

        {/* Indexing Badges */}
        <div className="flex flex-wrap gap-1.5">
          {story.indexing.map(idx => (
            <Badge key={idx} variant="secondary" className="text-[10px] bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
              {idx}
            </Badge>
          ))}
        </div>

        {/* Quote */}
        <div className="flex gap-3 pt-1">
          <Quote className="h-4 w-4 text-green-500/40 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-500 dark:text-gray-400 italic leading-relaxed">
            {story.quote}
          </p>
        </div>

        {/* Link */}
        {story.link && story.link !== '#' && (
          <div className="pt-1">
            <Button variant="link" size="sm" className="px-0 text-green-600 dark:text-green-400" asChild>
              <Link href={story.link} target="_blank">
                Read Paper <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
