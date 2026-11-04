'use client';

import React, { useState, useCallback } from 'react';
import { CATopic, GSPaper, CAPaperFilter, CATierFilter } from '@/types';
import { useCAProgress } from '@/hooks/useCAProgress';
import CAModelExplainer from './CAModelExplainer';
import CAFilterBar from './CAFilterBar';
import TopicCard from './TopicCard';
import QuickReadItem from './QuickReadItem';
import StickyProgressBar from './StickyProgressBar';

interface XpFloatItem {
  id: number;
  text: string;
  x: number;
  y: number;
}

interface CAPriorityTrackerProps {
  topics: CATopic[];
}

export default function CAPriorityTracker({ topics }: CAPriorityTrackerProps) {
  const {
    pts,
    maxPts,
    pct,
    bandADone,
    bandATotal,
    quickDone,
    quickTotal,
    updatesDone,
    updatesTotal,
    isDone,
    isQuickDone,
    isUpdateDone,
    toggleDone,
    toggleQuickDone,
    toggleUpdateDone,
  } = useCAProgress(topics);

  // Filter States
  const [paperFilter, setPaperFilter] = useState<CAPaperFilter>('all');
  const [tierFilter, setTierFilter] = useState<CATierFilter>('all');

  // Mobile Usability States
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileViewMode, setMobileViewMode] = useState<'dossier' | 'compact'>('dossier');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'done'>('all');
  const [activeMobileTier, setActiveMobileTier] = useState<'bandA' | 'quick'>('bandA');

  // Multi-Paper Active Angle Switcher (stored per-topic ID)
  const [selectedPapers, setSelectedPapers] = useState<Record<number, GSPaper>>(() => {
    const initial: Record<number, GSPaper> = {};
    topics.forEach((t) => {
      initial[t.id] = t.primaryPaper;
    });
    return initial;
  });

  // Quick Reads Collapsible Section State
  const [quickReadsOpen, setQuickReadsOpen] = useState(false);

  // Micro-Animations (Floating XP & Bar Surge)
  const [xpFloats, setXpFloats] = useState<XpFloatItem[]>([]);
  const [isAccelerating, setIsAccelerating] = useState(false);

  const spawnXp = useCallback((event: React.MouseEvent, text: string) => {
    const x = event.clientX || window.innerWidth / 2;
    const y = event.clientY || window.innerHeight / 2;
    const id = Date.now() + Math.random();

    setXpFloats((prev) => [...prev, { id, text, x, y }]);
    setIsAccelerating(true);

    setTimeout(() => {
      setXpFloats((prev) => prev.filter((item) => item.id !== id));
    }, 850);

    setTimeout(() => {
      setIsAccelerating(false);
    }, 900);
  }, []);

  // Handlers for topic card paper switching
  const handleSelectPaper = (topicId: number, paper: GSPaper) => {
    setSelectedPapers((prev) => ({ ...prev, [topicId]: paper }));
  };

  // Completion handlers with XP burst triggers
  const handleToggleDone = (topicId: number, e: React.MouseEvent) => {
    const newlyCompleted = toggleDone(topicId);
    if (newlyCompleted) {
      spawnXp(e, '+100 XP');
    }
  };

  const handleToggleQuickDone = (topicId: number, e: React.MouseEvent) => {
    const newlyCompleted = toggleQuickDone(topicId);
    if (newlyCompleted) {
      spawnXp(e, '+50 XP');
    }
  };

  const handleToggleUpdateDone = (topicId: number, e: React.MouseEvent) => {
    const newlyCompleted = toggleUpdateDone(topicId);
    if (newlyCompleted) {
      spawnXp(e, '+50 XP');
    }
  };

  // In-Page Search & Status Matchers
  const matchesSearch = useCallback(
    (t: CATopic) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      if (t.title.toLowerCase().includes(q)) return true;
      if (t.staticCore && t.staticCore.toLowerCase().includes(q)) return true;
      if (t.primaryPaper.toLowerCase().includes(q)) return true;
      if (t.papers.some((p) => p.toLowerCase().includes(q))) return true;
      if (
        t.syllabusPointers &&
        Object.values(t.syllabusPointers).some((val) => val.toLowerCase().includes(q))
      )
        return true;
      if (
        t.paperAngles &&
        Object.values(t.paperAngles).some((val) => val.toLowerCase().includes(q))
      )
        return true;
      return false;
    },
    [searchQuery]
  );

  const matchesStatus = useCallback(
    (topicId: number, isBandA: boolean) => {
      if (statusFilter === 'all') return true;
      const done = isBandA ? isDone(topicId) : isQuickDone(topicId);
      if (statusFilter === 'pending') return !done;
      if (statusFilter === 'done') return done;
      return true;
    },
    [statusFilter, isDone, isQuickDone]
  );

  // Filtered Lists
  const bandATopics = topics.filter((t) => {
    if (t.band !== 'bandA') return false;
    if (tierFilter === 'quickReads') return false;
    if (tierFilter === 'hasUpdates' && !t.recentUpdate) return false;
    if (tierFilter === 'new' && !t.isNew && !(t.month && t.month.toLowerCase().includes('oct'))) return false;
    if (paperFilter !== 'all' && !t.papers.includes(paperFilter)) return false;
    if (!matchesSearch(t)) return false;
    if (!matchesStatus(t.id, true)) return false;
    return true;
  });

  const quickTopics = topics.filter((t) => {
    if (t.band === 'bandA') return false;
    if (tierFilter === 'bandA') return false;
    if (tierFilter === 'hasUpdates' && !t.recentUpdate) return false;
    if (tierFilter === 'new' && !t.isNew && !(t.month && t.month.toLowerCase().includes('oct'))) return false;
    if (paperFilter !== 'all' && !t.papers.includes(paperFilter)) return false;
    if (!matchesSearch(t)) return false;
    if (!matchesStatus(t.id, false)) return false;
    return true;
  });

  return (
    <div className="min-h-screen pb-28 pt-4 px-3 sm:px-6 max-w-6xl mx-auto">
      {/* ── 1. DESKTOP HERO HEADER (Preserved 100% Unchanged) ── */}
      <header className="hidden sm:block mb-6">
        <div className="update-status-pill">
          <div className="pulse-dot" />
          <span className="font-bold text-xs">
            MODEL UPDATED TILL: <strong>OCTOBER 2026</strong> (LIVE 2027 MAINS COHORT)
          </span>
        </div>

        <h1 className="font-vt text-4xl md:text-5xl text-[#2A2A2A] tracking-wide leading-none mb-2 mt-2">
          THIS CYCLE&apos;S <span className="text-[#E26A59]">MUST-COVER</span> TOPICS{' '}
          <span className="text-xl md:text-2xl text-[#666] font-mono">// JAN–OCT 2026</span>
        </h1>

        <p className="text-base text-[#444] font-sans max-w-3xl leading-relaxed mb-4">
          Our probability engine has evaluated <strong>{topics.length} current affairs themes</strong> across 10
          months (January – October 2026) for Mains 2027. We&apos;ve done the scoring — just master
          them in order.
        </p>

        {/* Desktop Metadata Chips Bar */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="bg-[#FFF0ED] text-[#E26A59] border border-[#E26A59] px-2 py-1 font-bold shadow-[1px_1px_0px_#2A2A2A] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E26A59] animate-ping" />
            ★ 18 New October Additions
          </span>
          <span className="bg-[#D1FAF0] text-[#0D9488] border border-[#0D9488] px-2 py-1 font-bold shadow-[1px_1px_0px_#2A2A2A]">
            ★ {bandATotal} Must-Cover Topics (Band A)
          </span>
          <span className="bg-white text-[#2A2A2A] border border-[#2A2A2A] px-2 py-1 font-medium shadow-[1px_1px_0px_#2A2A2A]">
            📖 {topics.filter((t) => t.band === 'bandB').length} Quick-Read Topics (Band B)
          </span>
          <span className="bg-white text-[#2A2A2A] border border-[#2A2A2A] px-2 py-1 font-medium shadow-[1px_1px_0px_#2A2A2A]">
            👁 {topics.filter((t) => t.band === 'bandC').length} Headline Awareness (Band C)
          </span>
          <span className="bg-white text-[#2A2A2A] border border-[#2A2A2A] px-2 py-1 font-medium shadow-[1px_1px_0px_#2A2A2A]">
            📅 Cycle: January 2026 – October 2026 ({topics.length} Total)
          </span>
          <span className="bg-white text-[#2A2A2A] border border-[#2A2A2A] px-2 py-1 font-medium shadow-[1px_1px_0px_#2A2A2A]">
            ↻ Next Refresh: November 2026 Digest
          </span>
        </div>
      </header>

      {/* ── 1B. MOBILE-OPTIMIZED COMPACT HERO HEADER ── */}
      <header className="sm:hidden mb-3">
        {/* Live Cohort Status Tag */}
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-1.5 bg-white border border-[#2A2A2A] px-2 py-0.5 shadow-[1px_1px_0px_#2A2A2A]">
            <div className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
            <span className="font-mono text-[10px] font-bold text-[#2A2A2A]">
              OCT 2026 LIVE · 2027 COHORT
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#666] font-bold">
            {topics.length} THEMES EVALUATED
          </span>
        </div>

        {/* Compact Title */}
        <h1 className="font-vt text-2xl text-[#2A2A2A] tracking-wide leading-tight mb-1">
          MAINS CURRENT AFFAIRS <span className="text-[#E26A59]">PRIORITY ENGINE</span>
        </h1>
        <p className="text-xs text-[#555] font-sans leading-relaxed mb-3">
          Scored across 8 parameters. Focus on high-yield themes first.
        </p>
      </header>

      {/* ── 1C. MOBILE IN-PAGE INSTANT SEARCH BAR ── */}
      <div className="sm:hidden mb-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 94 dossiers (e.g. 16th FC, AI, Minerals)..."
            className="w-full bg-white border-2 border-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A] px-3 py-2 pl-9 font-sans text-xs text-[#2A2A2A] placeholder:text-[#888] focus:outline-none focus:border-[#E26A59]"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#666]">
            🔍
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 font-vt text-base text-[#666] hover:text-[#2A2A2A] px-1 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <div className="text-[11px] font-mono text-[#666] mt-1 px-1 flex justify-between">
            <span>Matching results:</span>
            <span className="font-bold text-[#2A2A2A]">
              {bandATopics.length + quickTopics.length} found
            </span>
          </div>
        )}
      </div>

      {/* ── 1D. MOBILE 1-TAP SEGMENTED TIER SWITCHER ── */}
      <div className="sm:hidden grid grid-cols-2 gap-2 mb-3">
        <button
          type="button"
          onClick={() => {
            setActiveMobileTier('bandA');
            if (tierFilter === 'quickReads') setTierFilter('all');
          }}
          className={`py-2 px-3 border-2 border-[#2A2A2A] font-vt text-base text-center transition-all cursor-pointer ${
            activeMobileTier === 'bandA'
              ? 'bg-[#0D9488] text-white shadow-none translate-x-[1px] translate-y-[1px]'
              : 'bg-[#F4F1E1] text-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A]'
          }`}
        >
          🎯 MUST-COVER ({bandATotal})
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveMobileTier('quick');
            if (tierFilter === 'bandA') setTierFilter('all');
          }}
          className={`py-2 px-3 border-2 border-[#2A2A2A] font-vt text-base text-center transition-all cursor-pointer ${
            activeMobileTier === 'quick'
              ? 'bg-[#4A90E2] text-white shadow-none translate-x-[1px] translate-y-[1px]'
              : 'bg-[#F4F1E1] text-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A]'
          }`}
        >
          📖 QUICK READS ({quickTotal})
        </button>
      </div>

      {/* 2. 8-Parameter Model Explainer Accordion */}
      <CAModelExplainer />

      {/* 3. Multi-Paper & Tier Filter Bar */}
      <CAFilterBar
        paperFilter={paperFilter}
        tierFilter={tierFilter}
        onPaperChange={setPaperFilter}
        onTierChange={(tier) => {
          setTierFilter(tier);
          if (tier === 'quickReads') setActiveMobileTier('quick');
          else if (tier === 'bandA') setActiveMobileTier('bandA');
        }}
        topics={topics}
        mobileViewMode={mobileViewMode}
        onViewModeChange={setMobileViewMode}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* 4. Must-Cover Topics Section (Band A) */}
      {tierFilter !== 'quickReads' && (
        <section className={`mb-10 ${activeMobileTier === 'quick' ? 'hidden sm:block' : ''}`}>
          <div className="flex items-center gap-2.5 py-2 mb-4 border-b-2 border-dashed border-[#2A2A2A]">
            <div className="w-3.5 h-3.5 bg-[#50E3C2] border-2 border-[#2A2A2A] shrink-0" />
            <h2 className="font-vt text-xl sm:text-2xl text-[#2A2A2A] uppercase tracking-wide">
              <span className="hidden sm:inline">
                BAND A: MUST-COVER TOPICS ({bandATopics.length} SHOWN / {bandATotal} TOTAL) — BUILD FULL NOTES &amp; PRACTISE ANSWERS
              </span>
              <span className="sm:hidden">
                BAND A: MUST-COVER TOPICS ({bandATopics.length}/{bandATotal})
              </span>
            </h2>
          </div>

          {bandATopics.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-[#2A2A2A] p-6 sm:p-8 text-center text-xs sm:text-sm font-mono text-[#666]">
              {searchQuery ? (
                <div className="space-y-2">
                  <p>No Must-Cover topics match &ldquo;{searchQuery}&rdquo;.</p>
                  {quickTopics.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveMobileTier('quick')}
                      className="font-mono text-xs font-bold text-[#4A90E2] underline cursor-pointer"
                    >
                      Found {quickTopics.length} matches in Quick Reads ➔ View Quick Reads
                    </button>
                  )}
                </div>
              ) : (
                'No Band A topics match the selected paper filter.'
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:gap-4">
              {bandATopics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  isDone={isDone(topic.id)}
                  isUpdateDone={isUpdateDone(topic.id)}
                  selectedPaper={selectedPapers[topic.id] || topic.primaryPaper}
                  onSelectPaper={(p) => handleSelectPaper(topic.id, p)}
                  onToggleDone={(e) => handleToggleDone(topic.id, e)}
                  onToggleUpdateDone={(e) => handleToggleUpdateDone(topic.id, e)}
                  mobileViewMode={mobileViewMode}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* 5. Quick Reads Section (Band B & C) */}
      {tierFilter !== 'bandA' && (
        <section className={`mt-8 ${activeMobileTier === 'bandA' ? 'hidden sm:block' : ''}`}>
          {/* Desktop Collapsible Trigger Button */}
          <div className="hidden sm:block">
            <button
              type="button"
              onClick={() => setQuickReadsOpen(!quickReadsOpen)}
              className="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-[#F4F1E1] border-[3px] border-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A] sm:shadow-[3px_3px_0px_#2A2A2A] font-vt text-lg sm:text-xl flex justify-between items-center cursor-pointer hover:bg-[#EAE6D6] transition-colors"
            >
              <span className="text-left">
                📖 QUICK READS (BAND B &amp; C) — {quickTopics.length} Secondary Topics (1-Page Note Only)
              </span>
              <span className="font-space text-xs font-bold text-[#666] shrink-0 ml-2">
                {quickReadsOpen ? '▲ COLLAPSE' : '▼ SHOW LIST'}
              </span>
            </button>
          </div>

          {/* Mobile Tier Header Bar */}
          <div className="sm:hidden flex items-center justify-between p-2.5 bg-[#F4F1E1] border-2 border-[#2A2A2A] mb-3">
            <span className="font-vt text-lg text-[#2A2A2A]">
              📖 QUICK READS ({quickTopics.length} SHOWN)
            </span>
            <span className="font-mono text-[10px] text-[#666] bg-white px-2 py-0.5 border border-[#2A2A2A]">
              1-PAGE NOTE
            </span>
          </div>

          {/* Desktop Content (governed by quickReadsOpen) */}
          {quickReadsOpen && (
            <div className="hidden sm:flex sm:flex-col sm:gap-3 sm:mt-3">
              <div className="bg-[#EDF5FF] border-2 border-[#4A90E2] p-3 text-sm text-[#1E40AF] font-sans">
                <strong>Study Strategy for Band B:</strong> These issues are important but less
                likely to be framed as core 15-markers. Keep notes to 1 single page with 3
                bulleted arguments and 1 statute/data point.
              </div>

              {quickTopics.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-[#2A2A2A] p-6 text-center text-sm font-mono text-[#666]">
                  No Quick Read topics match the selected filter.
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {quickTopics.map((topic) => (
                    <QuickReadItem
                      key={topic.id}
                      topic={topic}
                      isDone={isQuickDone(topic.id)}
                      onToggleDone={(e) => handleToggleQuickDone(topic.id, e)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mobile Content (always visible when activeMobileTier === 'quick') */}
          <div className="sm:hidden flex flex-col gap-3">
            <div className="bg-[#EDF5FF] border-2 border-[#4A90E2] p-2.5 text-xs text-[#1E40AF] font-sans">
              <strong>Study Strategy for Band B:</strong> These issues are important but less
              likely to be framed as core 15-markers. Keep notes to 1 single page with 3
              bulleted arguments and 1 statute/data point.
            </div>

            {quickTopics.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-[#2A2A2A] p-6 text-center text-xs font-mono text-[#666]">
                {searchQuery ? (
                  <div className="space-y-2">
                    <p>No Quick Read topics match &ldquo;{searchQuery}&rdquo;.</p>
                    {bandATopics.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setActiveMobileTier('bandA')}
                        className="font-mono text-xs font-bold text-[#0D9488] underline cursor-pointer"
                      >
                        Found {bandATopics.length} matches in Must-Cover ➔ View Must-Cover
                      </button>
                    )}
                  </div>
                ) : (
                  'No Quick Read topics match the selected filter.'
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {quickTopics.map((topic) => (
                  <QuickReadItem
                    key={topic.id}
                    topic={topic}
                    isDone={isQuickDone(topic.id)}
                    onToggleDone={(e) => handleToggleQuickDone(topic.id, e)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 6. Sole Sticky Bottom Progress Bar */}
      <StickyProgressBar
        metrics={{
          pts,
          maxPts,
          pct,
          bandADone,
          bandATotal,
          quickDone,
          quickTotal,
          updatesDone,
          updatesTotal,
        }}
        isAccelerating={isAccelerating}
      />

      {/* 7. Floating XP Micro-burst Elements */}
      {xpFloats.map((item) => (
        <div
          key={item.id}
          className="xp-float"
          style={{ left: `${item.x - 25}px`, top: `${item.y - 25}px` }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}
