'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen, FileText, Download, ExternalLink, Monitor, Database,
  Wrench, Cloud, ArrowRight, Search, SlidersHorizontal, Layers
} from 'lucide-react';
import { softwareResources } from '@/data/resources';
import GlowingOrb from '@/components/effects/GlowingOrb';

export default function ResourcesContent() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<(typeof softwareResources)[number] | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(softwareResources.map(r => r.category));
    return ['All', ...Array.from(cats).sort()];
  }, []);

  // Filter resources
  const filteredResources = useMemo(() => {
    return softwareResources.filter(resource => {
      const matchesCategory = activeCategory === 'All' || resource.category === activeCategory;
      const matchesSearch = !searchQuery ||
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.department.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const typeIcons: Record<string, React.ReactNode> = {
    software: <Monitor className="h-4 w-4" />,
    dataset: <Database className="h-4 w-4" />,
    tool: <Wrench className="h-4 w-4" />,
    template: <FileText className="h-4 w-4" />,
  };

  const accessColors: Record<string, string> = {
    'free': 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300',
    'university-licensed': 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300',
    'open-source': 'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-300',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020a04] pt-24 pb-12 px-4 relative overflow-hidden">
      <GlowingOrb color="bg-green-500" size="w-[500px] h-[500px]" position="top-[15%] right-[-200px]" blur="blur-[150px]" opacity="opacity-5" />
      <GlowingOrb color="bg-cyan-500" size="w-[400px] h-[400px]" position="bottom-[20%] left-[-150px]" blur="blur-[120px]" opacity="opacity-5" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="tech-badge inline-flex items-center px-3 py-1 rounded-full text-xs mb-3 gap-2">
            <Layers className="h-3 w-3" /> RESOURCE HUB
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Research <span className="text-green-600 dark:text-green-400">Resources</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-sm">
            Curated materials, software tools, datasets, and guidelines for your research journey.
          </p>
        </div>

        {/* Quick Sections: Publications, Guidelines, Opportunities */}
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          <div className="cyber-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Publications</h2>
            </div>
            <div className="space-y-3">
              <div className="border-b border-slate-100 dark:border-green-900/20 pb-2">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">AI-Driven Traffic Management System for Dhaka City</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">IEEE TENSYMP 2025</p>
              </div>
              <div className="pb-2">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Renewable Energy Solutions for Rural Bangladesh</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">Elsevier Energy Reports</p>
              </div>
            </div>
            <Link href="/publications" className="text-xs text-green-600 dark:text-green-400 font-mono mt-3 inline-flex items-center gap-1 hover:underline">
              View all publications <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="cyber-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Guidelines</h2>
            </div>
            <div className="space-y-2">
              {['How to write a standard research paper.pdf', 'Reference Management with Mendeley.pdf', 'Latex Template for IEEE Conferences.zip'].map((file) => (
                <Link key={file} href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-500/5 transition-colors text-sm text-slate-600 dark:text-slate-300">
                  <Download className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span className="text-xs truncate">{file}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="cyber-card rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <ExternalLink className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Opportunities</h2>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                <h4 className="text-sm font-medium text-slate-800 dark:text-green-300">GU Journal of Science & Engineering</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1">Deadline: June 30, 2026</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-green-500/10">
                <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200">International Conference on Industry 4.0</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1">Deadline: Aug 15, 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Software & Tools Section with Category Filters */}
        <section>
          <div className="text-center mb-8">
            <span className="tech-badge inline-flex items-center px-3 py-1 rounded-full text-xs mb-3 gap-2">
              <SlidersHorizontal className="h-3 w-3" /> CENTRAL HUB
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Software, Tools & <span className="text-green-600 dark:text-green-400">Datasets</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-mono text-sm max-w-xl mx-auto">
              Department-wise curated software and datasets. Filter by category to find what you need.
            </p>
          </div>

          {/* Search + Category Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search tools, datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm font-mono rounded-xl bg-white dark:bg-[#0a1a0f] border border-slate-200 dark:border-green-900/30 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/30"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => {
                const count = cat === 'All'
                  ? softwareResources.length
                  : softwareResources.filter(r => r.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                      activeCategory === cat
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                        : 'bg-white dark:bg-[#0a1a0f] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-green-900/30 hover:border-green-500/30'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resource Grid */}
          {filteredResources.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-10 h-10 text-green-500/30 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400 font-mono text-sm">No resources match your filter</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="text-green-600 dark:text-green-400 text-xs font-mono mt-2 hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="cyber-card rounded-xl p-5 hover:border-green-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                      {typeIcons[resource.type]}
                      <span className="text-[10px] font-mono uppercase tracking-wider">{resource.category}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${accessColors[resource.accessLevel]}`}>
                      {resource.accessLevel === 'university-licensed' ? 'Licensed' : resource.accessLevel === 'open-source' ? 'Open Source' : 'Free'}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">{resource.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{resource.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {resource.department.map(dept => (
                      <span key={dept} className="text-[9px] px-1.5 py-0.5 rounded border border-slate-200 dark:border-green-900/30 text-slate-500 dark:text-slate-500 font-mono">
                        {dept}
                      </span>
                    ))}
                  </div>
                  {resource.details && (
                    <button
                      type="button"
                      onClick={() => setSelectedResource(resource)}
                      className="text-xs text-green-600 dark:text-green-400 font-mono flex items-center gap-1 hover:underline mb-3"
                    >
                      View Details <ExternalLink className="h-3 w-3" />
                    </button>
                  )}
                  {resource.link && resource.link !== '#' && (
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-green-600 dark:text-green-400 font-mono flex items-center gap-1 hover:underline"
                      >
                        Access Post <ExternalLink className="h-3 w-3" />
                      </Link>
                      {resource.posterLink && (
                        <Link
                          href={resource.posterLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-green-600 dark:text-green-400 font-mono flex items-center gap-1 hover:underline"
                        >
                          View Poster <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {selectedResource && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4"
            onClick={() => setSelectedResource(null)}
          >
            <div
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-green-500/20 bg-white dark:bg-[#07120a] p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-green-600 dark:text-green-400 font-mono">Community Update</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{selectedResource.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{selectedResource.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedResource(null)}
                  className="rounded-full border border-slate-200 dark:border-green-900/30 px-3 py-1 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-7">
                {selectedResource.details?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {selectedResource.link && (
                  <Link
                    href={selectedResource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-green-500 px-4 py-2 text-sm font-mono text-white hover:bg-green-600"
                  >
                    Open Facebook Post <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                )}
                {selectedResource.posterLink && (
                  <Link
                    href={selectedResource.posterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-green-500/20 px-4 py-2 text-sm font-mono text-green-600 dark:text-green-400 hover:border-green-500/40"
                  >
                    Open Poster <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16 cyber-card rounded-xl p-8">
          <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">Looking for a specific tool or dataset?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="px-4 py-2.5 cyber-card rounded-lg text-sm font-mono text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 hover:border-green-500/30 transition-all flex items-center gap-2"
            >
              Suggest a Resource <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/conferences"
              className="px-4 py-2.5 cyber-card rounded-lg text-sm font-mono text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 hover:border-green-500/30 transition-all flex items-center gap-2"
            >
              Journals & Conferences <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
