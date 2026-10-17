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

  // Filtered Lists
  const bandATopics = topics.filter((t) => {
    if (t.band !== 'bandA') return false;
    if (tierFilter === 'quickReads') return false;
    if (tierFilter === 'hasUpdates' && !t.recentUpdate) return false;
    if (paperFilter !== 'all' && !t.papers.includes(paperFilter)) return false;
    return true;
  });

  const quickTopics = topics.filter((t) => {
    if (t.band === 'bandA') return false;
    if (tierFilter === 'bandA') return false;
    if (tierFilter === 'hasUpdates' && !t.recentUpdate) return false;
    if (paperFilter !== 'all' && !t.papers.includes(paperFilter)) return false;
    return true;
  });

  return (
    <div className="min-h-screen pb-28 pt-4 px-3 sm:px-6 max-w-6xl mx-auto">
      {/* 1. Hero Header */}
      <header className="mb-6">
        <div className="update-status-pill">
          <div className="pulse-dot" />
          <span className="font-bold text-[11px] sm:text-xs">
            MODEL UPDATED TILL: <strong>SEPTEMBER 2026</strong> (LIVE 2027 MAINS COHORT)
          </span>
        </div>

        <h1 className="font-vt text-3xl sm:text-4xl md:text-5xl text-[#2A2A2A] tracking-wide leading-none mb-2 mt-2">
          THIS CYCLE&apos;S <span className="text-[#E26A59]">MUST-COVER</span> TOPICS{' '}
          <span className="text-base sm:text-xl md:text-2xl text-[#666] font-mono block sm:inline mt-1 sm:mt-0">// JAN–SEP 2026</span>
        </h1>

        <p className="text-xs sm:text-base text-[#444] font-sans max-w-3xl leading-relaxed mb-3 sm:mb-4">
          Our probability engine has evaluated <strong>{topics.length} current affairs themes</strong> across 9
          months (January – September 2026) for Mains 2027. We&apos;ve done the scoring — just master
          them in order.
        </p>

        {/* Desktop Metadata Chips Bar (Preserved 100% Unchanged) */}
        <div className="hidden sm:flex flex-wrap gap-2 text-xs font-mono">
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
            📅 Cycle: January 2026 – September 2026 ({topics.length} Total)
          </span>
          <span className="bg-white text-[#2A2A2A] border border-[#2A2A2A] px-2 py-1 font-medium shadow-[1px_1px_0px_#2A2A2A]">
            ↻ Next Refresh: October 2026 Digest
          </span>
        </div>

        {/* Mobile-Only Swipeable Metadata Chips Tray */}
        <div className="sm:hidden smart-tag-tray py-1">
          <span className="shrink-0 bg-[#D1FAF0] text-[#0D9488] border border-[#0D9488] px-2.5 py-1 text-[11px] font-mono font-bold shadow-[1px_1px_0px_#2A2A2A]">
            ★ {bandATotal} Must-Cover (Band A)
          </span>
          <span className="shrink-0 bg-white text-[#2A2A2A] border border-[#2A2A2A] px-2.5 py-1 text-[11px] font-mono font-medium shadow-[1px_1px_0px_#2A2A2A]">
            📖 {topics.filter((t) => t.band !== 'bandA').length} Quick Reads (Band B/C)
          </span>
          <span className="shrink-0 bg-white text-[#2A2A2A] border border-[#2A2A2A] px-2.5 py-1 text-[11px] font-mono font-medium shadow-[1px_1px_0px_#2A2A2A]">
            📅 Jan–Sep 2026 ({topics.length} Total)
          </span>
          <span className="shrink-0 bg-white text-[#2A2A2A] border border-[#2A2A2A] px-2.5 py-1 text-[11px] font-mono font-medium shadow-[1px_1px_0px_#2A2A2A]">
            ↻ Next: Oct 2026
          </span>
        </div>
      </header>

      {/* 2. 8-Parameter Model Explainer Accordion */}
      <CAModelExplainer />

      {/* 3. Multi-Paper & Tier Filter Bar */}
      <CAFilterBar
        paperFilter={paperFilter}
        tierFilter={tierFilter}
        onPaperChange={setPaperFilter}
        onTierChange={setTierFilter}
        topics={topics}
      />

      {/* 4. Must-Cover Topics Section (Band A) */}
      {tierFilter !== 'quickReads' && (
        <section className="mb-10">
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
            <div className="bg-white border-2 border-dashed border-[#2A2A2A] p-8 text-center text-sm font-mono text-[#666]">
              No Band A topics match the selected paper filter.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
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
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* 5. Quick Reads Section (Band B & C) */}
      {tierFilter !== 'bandA' && (
        <section className="mt-8">
          <button
            type="button"
            onClick={() => setQuickReadsOpen(!quickReadsOpen)}
            className="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-[#F4F1E1] border-[3px] border-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A] sm:shadow-[3px_3px_0px_#2A2A2A] font-vt text-lg sm:text-xl flex justify-between items-center cursor-pointer hover:bg-[#EAE6D6] transition-colors"
          >
            <span className="text-left">
              <span className="hidden sm:inline">
                📖 QUICK READS (BAND B &amp; C) — {quickTopics.length} Secondary Topics (1-Page Note Only)
              </span>
              <span className="sm:hidden">
                📖 QUICK READS (BAND B &amp; C) — {quickTopics.length} Topics
              </span>
            </span>
            <span className="font-space text-xs font-bold text-[#666] shrink-0 ml-2">
              {quickReadsOpen ? '▲ COLLAPSE' : '▼ SHOW LIST'}
            </span>
          </button>

          {quickReadsOpen && (
            <div className="mt-3 flex flex-col gap-3">
              <div className="bg-[#EDF5FF] border-2 border-[#4A90E2] p-3 text-xs sm:text-sm text-[#1E40AF] font-sans">
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
