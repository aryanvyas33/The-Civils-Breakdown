'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, Flame, ArrowRight, Filter } from 'lucide-react';

interface TrendingTheme {
  name: string;
  paper: 'gs1' | 'gs2' | 'gs3' | 'gs4' | 'essay' | 'all';
  paperLabel: string;
  hyi?: number;
  highlight?: boolean;
}

const TRENDING_THEMES: TrendingTheme[] = [
  { name: 'Sustainable Development', paper: 'all', paperLabel: 'ALL', hyi: 100, highlight: true },
  { name: 'Cooperative Federalism', paper: 'gs2', paperLabel: 'GS2', hyi: 95, highlight: true },
  { name: 'Climate Change & COP', paper: 'gs3', paperLabel: 'GS3', hyi: 94, highlight: true },
  { name: 'Ethics Case Studies', paper: 'gs4', paperLabel: 'GS4', hyi: 96, highlight: true },
  { name: 'Women Empowerment', paper: 'gs1', paperLabel: 'GS1', hyi: 88, highlight: true },
  { name: 'Constitutional Morality', paper: 'gs2', paperLabel: 'GS2', hyi: 91 },
  { name: 'Artificial Intelligence & Ethics', paper: 'all', paperLabel: 'ALL', hyi: 92, highlight: true },
  { name: 'Inclusive Economic Growth', paper: 'gs3', paperLabel: 'GS3', hyi: 89 },
  { name: 'Judicial Activism & PIL', paper: 'gs2', paperLabel: 'GS2', hyi: 86 },
  { name: 'Agrarian Distress & MSP', paper: 'gs3', paperLabel: 'GS3', hyi: 87 },
  { name: 'Mahatma Gandhi Philosophy', paper: 'essay', paperLabel: 'ESSAY', hyi: 90 },
  { name: 'Internal Security & Cyber Warfare', paper: 'gs3', paperLabel: 'GS3', hyi: 85 },
  { name: 'Public Service Probity', paper: 'gs4', paperLabel: 'GS4', hyi: 88 },
  { name: 'Indian Pluralism & Secularism', paper: 'gs1', paperLabel: 'GS1', hyi: 83 },
  { name: 'India Foreign Policy & Global South', paper: 'gs2', paperLabel: 'GS2', hyi: 86 },
  { name: 'Biodiversity & Wildlife Conservation', paper: 'gs3', paperLabel: 'GS3', hyi: 82 },
  { name: 'Emotional Intelligence in Admin', paper: 'gs4', paperLabel: 'GS4', hyi: 84 },
  { name: 'Social Justice & Marginalized Sections', paper: 'gs2', paperLabel: 'GS2', hyi: 87 },
  { name: 'Urbanization & Smart Cities', paper: 'gs1', paperLabel: 'GS1', hyi: 81 },
  { name: 'Disaster Risk Reduction (Sendai)', paper: 'gs3', paperLabel: 'GS3', hyi: 83 },
  { name: 'Philosophical & Abstract Themes', paper: 'essay', paperLabel: 'ESSAY', hyi: 93, highlight: true },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Themes' },
  { id: 'gs1', label: 'GS-1' },
  { id: 'gs2', label: 'GS-2' },
  { id: 'gs3', label: 'GS-3' },
  { id: 'gs4', label: 'GS-4' },
  { id: 'essay', label: 'Essay' },
] as const;

export default function TrendingTopics() {
  const [activeTab, setActiveTab] = useState<typeof FILTER_TABS[number]['id']>('all');

  const filteredThemes = TRENDING_THEMES.filter((theme) => {
    if (activeTab === 'all') return true;
    return theme.paper === activeTab || theme.paper === 'all';
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
      <div className="retro-container bg-retro-window border-4">
        
        {/* Terminal Header */}
        <div className="window-header bg-retro-border">
          <div className="flex items-center gap-2 font-vt text-lg text-white">
            <Tag className="w-4 h-4 text-retro-folder" />
            <span>C:\INDEX\HIGH_YIELD_THEMES.DB</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-vt uppercase text-white/80">
              Corpus: 14 Years (2013-2026)
            </span>
            <div className="w-3 h-3 bg-retro-accent border border-white"></div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          
          {/* Header & Description */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b-2 border-retro-border gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="retro-tag text-[11px] bg-retro-folder text-retro-border">RECURRING PATTERNS</span>
                <span className="retro-tag text-[11px] bg-[#FFD1D1] text-retro-accent">HIGH FREQUENCY</span>
              </div>
              <h2 className="font-vt text-3xl sm:text-4xl uppercase text-retro-border flex items-center gap-2">
                <span>Trending & High-Yield Micro-Themes</span>
              </h2>
              <p className="font-space text-xs sm:text-sm text-retro-border/80 mt-1 max-w-2xl">
                Topics that recur across papers and years. Click any theme to instantly query all matching questions, marks weightage, and year distributions.
              </p>
            </div>

            <Link
              href="/high-yield"
              className="retro-btn inline-flex items-center gap-2 self-start md:self-auto hover:bg-retro-accent hover:text-white transition-colors"
            >
              <Flame className="w-4 h-4 text-retro-accent group-hover:text-white" />
              <span>Full Analytics Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 hide-scroll">
            <span className="font-vt text-sm font-bold text-retro-border uppercase flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {FILTER_TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`px-3 py-1 font-vt text-base uppercase border-2 border-retro-border transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-retro-border text-white shadow-[2px_2px_0px_#E26A59]'
                      : 'bg-white text-retro-border hover:bg-retro-border hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Themes Badges Cloud */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {filteredThemes.map((theme) => {
              return (
                <Link
                  key={theme.name}
                  href={`/search?q=${encodeURIComponent(theme.name)}`}
                  className={`group relative inline-flex items-center gap-2 px-3 py-2 bg-white border-2 border-retro-border hover:-translate-y-0.5 hover:shadow-retro transition-all ${
                    theme.highlight ? 'shadow-retro-sm border-retro-border' : 'shadow-none'
                  }`}
                >
                  <span className="font-space text-xs sm:text-sm font-bold text-retro-border group-hover:text-retro-accent transition-colors">
                    {theme.name}
                  </span>
                  
                  {theme.hyi && (
                    <span className="text-[10px] font-vt px-1.5 py-0.2 bg-retro-bg border border-retro-border text-retro-border">
                      HYI {theme.hyi}
                    </span>
                  )}

                  <span className="text-[9px] font-space font-bold px-1 py-0.2 uppercase bg-retro-border text-white">
                    {theme.paperLabel}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Footer note inside terminal */}
          <div className="mt-8 pt-4 border-t border-dashed border-retro-border flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-space text-retro-border/70 gap-2">
            <span>💡 Pro-tip: Questions with HYI &gt; 90 have appeared in at least 5 different examination cycles.</span>
            <Link href="/search?q=sustainable+development" className="text-retro-border font-bold hover:underline">
              Try searching "Sustainable Development" →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
