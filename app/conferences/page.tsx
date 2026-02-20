'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen, Globe, Calendar, ExternalLink, Star, Award, Filter,
  ArrowRight, Search
} from 'lucide-react';
import { conferencesAndJournals } from '@/data/initiatives';

export default function ConferencesPage() {
  const [filter, setFilter] = useState<'all' | 'conference' | 'journal'>('all');
  const [domainFilter, setDomainFilter] = useState<string>('all');

  const domains = Array.from(new Set(conferencesAndJournals.map(item => item.domain)));

  const filtered = conferencesAndJournals.filter(item => {
    if (filter !== 'all' && item.type !== filter) return false;
    if (domainFilter !== 'all' && item.domain !== domainFilter) return false;
    return true;
  });

  const conferences = filtered.filter(item => item.type === 'conference');
  const journals = filtered.filter(item => item.type === 'journal');

  return (
    <div className="container px-4 py-12 md:py-20 mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="outline" className="mb-4 text-green-600 dark:text-green-400 border-green-300 dark:border-green-500/30">
          Curated Directory
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Conferences & Journals</h1>
        <p className="text-muted-foreground text-lg">
          A curated list of recommended conferences and journals for GURPC members, with submission deadlines and indexing details.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Type:</span>
          {(['all', 'conference', 'journal'] as const).map((type) => (
            <Button
              key={type}
              variant={filter === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(type)}
              className={filter === type ? 'bg-green-600 hover:bg-green-500 text-white' : 'border-green-200 dark:border-green-500/20'}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Domain:</span>
          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="text-sm border border-green-200 dark:border-green-500/20 rounded-md px-3 py-1.5 bg-background"
          >
            <option value="all">All Domains</option>
            {domains.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* Conferences */}
      {(filter === 'all' || filter === 'conference') && conferences.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Globe className="text-green-600 dark:text-green-400 h-6 w-6" /> Upcoming Conferences
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {conferences.map((conf) => (
              <Card key={conf.id} className="hover:shadow-md transition-shadow border-green-100 dark:border-green-900/20 hover:border-green-300 dark:hover:border-green-500/30">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-snug">{conf.name}</CardTitle>
                    {conf.isRecommended && (
                      <Badge className="shrink-0 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30" variant="outline">
                        <Star className="h-3 w-3 mr-1 fill-current" /> Recommended
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5" /> {conf.publisher}
                    </span>
                    {conf.deadline && (
                      <span className="flex items-center gap-1.5 text-red-500 dark:text-red-400 font-medium">
                        <Calendar className="h-3.5 w-3.5" /> Deadline: {conf.deadline}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {conf.indexing.map(idx => (
                      <Badge key={idx} variant="secondary" className="text-[10px] bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                        {idx}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="text-[10px]">{conf.domain}</Badge>
                  </div>
                  {conf.link !== '#' && (
                    <Button variant="link" size="sm" className="px-0 text-green-600 dark:text-green-400" asChild>
                      <Link href={conf.link} target="_blank">
                        Visit Website <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Journals */}
      {(filter === 'all' || filter === 'journal') && journals.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="text-green-600 dark:text-green-400 h-6 w-6" /> Recommended Journals
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {journals.map((journal) => (
              <Card key={journal.id} className="hover:shadow-md transition-shadow border-green-100 dark:border-green-900/20 hover:border-green-300 dark:hover:border-green-500/30">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-snug">{journal.name}</CardTitle>
                    {journal.isRecommended && (
                      <Star className="h-4 w-4 text-amber-500 fill-current shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><span className="font-medium">Publisher:</span> {journal.publisher}</p>
                    {journal.frequency && <p><span className="font-medium">Frequency:</span> {journal.frequency}</p>}
                    {journal.impactFactor && (
                      <p>
                        <span className="font-medium">Impact Factor:</span>{' '}
                        <span className="text-green-600 dark:text-green-400 font-semibold">{journal.impactFactor}</span>
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {journal.indexing.map(idx => (
                      <Badge key={idx} variant="secondary" className="text-[10px] bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                        {idx}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="text-[10px]">{journal.domain}</Badge>
                  </div>
                  {journal.link !== '#' && (
                    <Button variant="link" size="sm" className="px-0 text-green-600 dark:text-green-400" asChild>
                      <Link href={journal.link} target="_blank">
                        Visit <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p>No results match the selected filters.</p>
        </div>
      )}

      {/* CTA */}
      <div className="text-center mt-8">
        <p className="text-muted-foreground mb-4">Want to suggest a journal or conference? Contact us!</p>
        <Button asChild variant="outline" className="border-green-300 dark:border-green-500/30">
          <Link href="/contact">Get in Touch <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}
