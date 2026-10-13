import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import highYieldConceptsData from '@/data/high-yield-concepts.json';
import highYieldConceptsNoEssayData from '@/data/high-yield-concepts-no-essay.json';
import EssayToggle from '@/components/high-yield/EssayToggle';
import RecentMomentumExplainer from '@/components/high-yield/RecentMomentumExplainer';

const allYearsSet = new Set<number>();
const essayQuestionIds = new Set<string>();
(highYieldConceptsData as any).forEach((c: any) => {
  c.questions.forEach((q: any) => {
    allYearsSet.add(q.year);
    if (q.paperId === 'essay') essayQuestionIds.add(q.id);
  });
});
const allYears = Array.from(allYearsSet);
const maxYear = allYears.length > 0 ? Math.max(...allYears) : 2026;
const totalYears = allYears.length > 0 ? allYears.length : 14;
const sparklineYears = Array.from({ length: 5 }, (_, i) => maxYear - 4 + i);
const essayCount = essayQuestionIds.size || 112;

export const metadata: Metadata = {
  title: 'High-Yield Topics | UPSC PYQ Searcher',
  description: `Data-driven preparation prioritization based on ${totalYears}-year concept recurrence.`,
};

type YieldConcept = {
  id: string;
  display: string;
  hyi: number;
  tier: string;
  tierLevel: number;
  metrics: {
    totalMarks: number;
    yearsAppeared: number;
    papers: string[];
    recentMarksWeighted: number;
    questionCount: number;
  };
  questions: { id: string; year: number; marks: number; paperId: string }[];
};

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function HighYieldPage({ searchParams }: PageProps) {
  const isEssayExcluded = searchParams?.excludeEssay === 'true';
  const rawConcepts = isEssayExcluded ? highYieldConceptsNoEssayData : highYieldConceptsData;
  const concepts: YieldConcept[] = (rawConcepts as any) || [];

  // Filter top tiers
  const elite = concepts.filter(c => c.tierLevel === 1).slice(0, 30);
  const high = concepts.filter(c => c.tierLevel === 2).slice(0, 30);
  const cyclical = concepts.filter(c => c.tierLevel === 3).slice(0, 30);

  const renderCard = (c: YieldConcept) => (
    <Link 
      href={`/search?q=${encodeURIComponent(c.display)}`} 
      key={c.id} 
      className="retro-container relative pt-4 pb-4 px-4 hover:shadow-retro-lg transition-shadow cursor-pointer block focus:outline-none"
    >
      <div className={`absolute -top-3 -right-3 retro-badge text-retro-border text-lg font-vt uppercase tracking-wider px-2 py-0 border-4 ${
        c.tierLevel === 1 ? 'bg-[#50E3C2]' : c.tierLevel === 2 ? 'bg-[#4A90E2] text-white' : 'bg-[#F5A623]'
      }`}>
        HYI {c.hyi}
      </div>
      <h3 className="font-space font-bold text-lg leading-tight uppercase mb-4 pr-12 text-retro-border">{c.display}</h3>
      
      <div className="flex gap-2 mb-4">
        <span className="retro-badge shadow-none bg-[#FFD1D1] text-retro-accent border-retro-accent">{c.metrics.totalMarks} MARKS</span>
        <span className="retro-badge shadow-none bg-retro-folder">{c.metrics.yearsAppeared} YEARS</span>
      </div>
      
      <div className="text-[10px] font-space font-bold text-gray-500 mb-4 tracking-widest uppercase">
        {c.metrics.papers.join(' . ')}
      </div>
      
      <div className="border-t-2 border-dashed border-retro-border pt-2 mt-auto">
        <div className="text-[10px] font-space font-bold text-retro-border mb-1 uppercase">Recent Momentum</div>
        <div className="flex gap-1 h-3">
          {/* Simple ASCII/block sparkline representation using last 5 years */}
          {sparklineYears.map(y => {
            const hasQ = c.questions.some(q => q.year === y);
            const opacity = hasQ ? 'bg-retro-border' : 'bg-retro-border opacity-20';
            return (
              <div key={y} className={`flex-1 ${opacity}`} title={hasQ ? `${y}: Asked` : `${y}: Not Asked`} />
            );
          })}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <header className="mb-12 space-y-6 pb-6 border-b-4 border-retro-border">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-vt uppercase text-retro-border tracking-tight mb-4 inline-block bg-retro-window px-4 py-2 border-2 border-retro-border shadow-[4px_4px_0px_#2A2A2A]">
              High-Yield Topics <span className="text-retro-accent">Matrix</span>
            </h1>
            <p className="text-lg font-space font-bold text-retro-border max-w-3xl">
              &gt; A mathematically derived preparation priority engine. The High-Yield Index (HYI) ranks core concepts based on their {totalYears}-year marks volume, consistency, recency momentum, and cross-paper versatility.
            </p>
          </div>
          <div className="shrink-0">
            <Suspense fallback={<div className="h-12 w-64 bg-retro-window border-2 border-retro-border animate-pulse" />}>
              <EssayToggle initialValue={isEssayExcluded} />
            </Suspense>
          </div>
        </div>

        {/* Scope Context Banner */}
        <div className="flex items-center gap-3 text-sm font-space font-bold text-retro-border bg-white border-2 border-retro-border shadow-retro-sm px-4 py-2.5 w-fit">
          <span className="text-retro-accent">
            {isEssayExcluded ? '[GS FOCUSED]' : '[COMPREHENSIVE]'}
          </span>
          <span>
            {isEssayExcluded 
              ? `Calibrated for GS1–GS4 core papers (${concepts.length} concepts total, ${elite.length} Elite, ${high.length} High). Excluded ${essayCount} essay questions.`
              : `Includes all ${totalYears}-year papers (${concepts.length} concepts total, ${elite.length} Elite, ${high.length} High) including 250-mark essays.`}
          </span>
        </div>
      </header>

      {/* Recent Momentum & HYI Explainer Widget */}
      <RecentMomentumExplainer sparklineYears={sparklineYears} />

      {/* TIER 1 - ELITE */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-4 h-4 border-2 border-retro-border bg-[#50E3C2]" />
          <div>
            <h2 className="font-vt text-3xl text-retro-border uppercase bg-retro-window px-2 border-2 border-retro-border shadow-retro-sm">Tier 1: Elite Yield (HYI 80+)</h2>
            <p className="font-space text-sm text-retro-border mt-2 font-bold">Core staples. High probability of appearance every 1-2 years. Must have 2-page prepared notes.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {elite.map(renderCard)}
        </div>
      </section>

      {/* TIER 2 - HIGH */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-4 h-4 border-2 border-retro-border bg-[#4A90E2]" />
          <div>
            <h2 className="font-vt text-3xl text-retro-border uppercase bg-retro-window px-2 border-2 border-retro-border shadow-retro-sm">Tier 2: High Yield (HYI 60-79)</h2>
            <p className="font-space text-sm text-retro-border mt-2 font-bold">Strong bets. Highly recurring, often driven by recent momentum or supreme court judgments.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {high.map(renderCard)}
        </div>
      </section>

    </div>
  );
}

