'use client';

import React from 'react';
import { CATopic, GSPaper } from '@/types';
import UpdateBanner from './UpdateBanner';

interface TopicCardProps {
  topic: CATopic;
  isDone: boolean;
  isUpdateDone: boolean;
  selectedPaper: GSPaper;
  onSelectPaper: (paper: GSPaper) => void;
  onToggleDone: (e: React.MouseEvent) => void;
  onToggleUpdateDone: (e: React.MouseEvent) => void;
}

const PAPER_COLORS: Record<GSPaper, { bg: string; text: string; activeBg: string }> = {
  GS1: { bg: '#FFF5E5', text: '#946700', activeBg: '#D97706' },
  GS2: { bg: '#E8F4FD', text: '#1D4ED8', activeBg: '#2563EB' },
  GS3: { bg: '#EDFBF7', text: '#047857', activeBg: '#059669' },
  GS4: { bg: '#F3E8FF', text: '#6D28D9', activeBg: '#7C3AED' },
};

export default function TopicCard({
  topic,
  isDone,
  isUpdateDone,
  selectedPaper,
  onSelectPaper,
  onToggleDone,
  onToggleUpdateDone,
}: TopicCardProps) {
  const activePaper = selectedPaper || topic.primaryPaper;
  const syllabusText =
    topic.syllabusPointers[activePaper] ||
    topic.syllabusPointers[topic.primaryPaper] ||
    'Syllabus mapping aligned with contemporary Mains trends.';
  const angleText =
    topic.paperAngles[activePaper] ||
    topic.paperAngles[topic.primaryPaper] ||
    'Focus on core conceptual dimensions, institutional frameworks, and policy impacts.';

  return (
    <div
      className={`bg-white border-[3px] border-[#2A2A2A] shadow-[4px_4px_0px_#2A2A2A] rounded-sm grid grid-cols-[52px_1fr_auto] sm:grid-cols-[64px_1fr_auto] transition-all overflow-hidden ${
        isDone ? 'opacity-65 bg-[#FAF9F5]' : 'hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#2A2A2A]'
      }`}
    >
      {/* 1. Left Rank Column */}
      <div className="bg-[#F4F1E1] border-r-2 border-[#2A2A2A] flex flex-col items-center justify-center p-2 sm:p-4 text-center">
        <span
          className={`font-vt text-2xl sm:text-3xl leading-none ${
            topic.rank <= 3 ? 'text-[#E26A59]' : 'text-[#2A2A2A]'
          }`}
        >
          #{topic.rank}
        </span>
        <span className="font-mono text-[0.58rem] sm:text-[0.62rem] text-[#777] mt-1 font-bold">
          RANK
        </span>
        <span className="font-mono text-[0.55rem] sm:text-[0.58rem] bg-[#2A2A2A] text-white px-1 sm:px-1.5 py-0.5 mt-2 rounded-xs font-bold">
          {topic.monthShort}
        </span>
      </div>

      {/* 2. Middle Content Body */}
      <div className="p-3 sm:p-4 flex flex-col gap-2.5">
        {/* Top Tags Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Paper Switcher Group */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[0.65rem] sm:text-[0.68rem] text-[#666] font-bold uppercase mr-1">
              Select Paper Angle:
            </span>
            {topic.papers.map((p) => {
              const isActive = p === activePaper;
              const isPrimary = p === topic.primaryPaper;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => onSelectPaper(p)}
                  className={`font-mono text-[0.7rem] sm:text-xs font-bold px-2 py-0.5 border-[1.5px] border-[#2A2A2A] transition-all cursor-pointer ${
                    isActive
                      ? 'text-white shadow-none'
                      : 'bg-white text-[#2A2A2A] hover:bg-[#F0ECE0] shadow-[1px_1px_0px_#2A2A2A]'
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: PAPER_COLORS[p]?.activeBg || '#2A2A2A' }
                      : {}
                  }
                >
                  {p}
                  {isPrimary ? ' (Primary)' : ''}
                </button>
              );
            })}
          </div>

          {/* Metric info & effort badge */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[0.62rem] sm:text-[0.68rem] text-[#555] font-bold">
              Index: {topic.index} | P: {topic.prob}
            </span>
            <span className="font-mono text-[0.65rem] sm:text-[0.7rem] font-bold px-2 py-0.5 bg-[#D1FAF0] text-[#0D9488] border-[1.5px] border-[#0D9488] shadow-[1px_1px_0px_#2A2A2A]">
              ★ {topic.effort}
            </span>
          </div>
        </div>

        {/* Topic Title */}
        <h3
          className={`font-sans text-base sm:text-lg font-bold text-[#2A2A2A] leading-snug ${
            isDone ? 'line-through text-[#666]' : ''
          }`}
        >
          {topic.title}
        </h3>

        {/* Syllabus Pointer Box */}
        <div className="bg-[#FAF8F2] border-[1.5px] border-[#2A2A2A] border-l-4 border-l-[#FFD25A] p-2 sm:p-2.5 text-xs">
          <div className="font-mono text-[0.65rem] sm:text-[0.68rem] font-bold text-[#555] uppercase mb-1 flex justify-between items-center">
            <span>OFFICIAL SYLLABUS POINTER // {activePaper}</span>
            <span className="text-[0.62rem] text-[#888] font-normal hidden sm:inline">
              Matches official UPSC syllabus
            </span>
          </div>
          <div className="font-sans font-semibold text-[#2A2A2A] text-xs sm:text-[0.82rem] leading-relaxed">
            {syllabusText}
          </div>
        </div>

        {/* Plain English Exam Hook */}
        <div
          className="text-xs sm:text-sm text-[#444] font-sans leading-relaxed"
          dangerouslySetInnerHTML={{ __html: angleText }}
        />

        {/* Delta Update Banner (if topic received subsequent development) */}
        {topic.recentUpdate && (
          <UpdateBanner
            topicId={topic.id}
            update={topic.recentUpdate}
            isReviewed={isUpdateDone}
            onToggleReview={onToggleUpdateDone}
          />
        )}
      </div>

      {/* 3. Right Done Action Column */}
      <div className="border-l-2 border-[#2A2A2A] bg-[#F4F1E1] flex flex-col items-center justify-center p-2 sm:p-4 gap-1.5 shrink-0">
        <button
          type="button"
          onClick={onToggleDone}
          title={isDone ? 'Mark as not done' : 'Mark this topic as done (+100 XP)'}
          className={`w-9 h-9 sm:w-11 sm:h-11 border-2 border-[#2A2A2A] font-vt text-2xl sm:text-3xl flex items-center justify-center cursor-pointer transition-all shadow-[2px_2px_0px_#2A2A2A] ${
            isDone
              ? 'bg-[#50E3C2] text-[#2A2A2A]'
              : 'bg-white text-[#2A2A2A] hover:bg-[#E0FFF8]'
          }`}
        >
          {isDone ? '✔' : '☐'}
        </button>
        <span className="font-mono text-[0.58rem] sm:text-[0.65rem] font-bold text-[#666] uppercase whitespace-nowrap">
          {isDone ? 'DONE' : 'Mark Done'}
        </span>
      </div>
    </div>
  );
}
