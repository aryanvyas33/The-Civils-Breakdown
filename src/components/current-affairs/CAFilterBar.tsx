'use client';

import React from 'react';
import { CAPaperFilter, CATierFilter, CATopic } from '@/types';

interface CAFilterBarProps {
  paperFilter: CAPaperFilter;
  tierFilter: CATierFilter;
  onPaperChange: (paper: CAPaperFilter) => void;
  onTierChange: (tier: CATierFilter) => void;
  topics?: CATopic[];
}

export default function CAFilterBar({
  paperFilter,
  tierFilter,
  onPaperChange,
  onTierChange,
  topics,
}: CAFilterBarProps) {
  const total = topics ? topics.length : 76;
  const gs1Count = topics ? topics.filter((t) => t.papers.includes('GS1')).length : 16;
  const gs2Count = topics ? topics.filter((t) => t.primaryPaper === 'GS2').length : 42;
  const gs3Count = topics ? topics.filter((t) => t.primaryPaper === 'GS3').length : 32;
  const gs4Count = topics ? topics.filter((t) => t.papers.includes('GS4')).length : 38;
  const bandACount = topics ? topics.filter((t) => t.band === 'bandA').length : 45;
  const quickCount = topics ? topics.filter((t) => t.band !== 'bandA').length : 31;
  const updatesCount = topics ? topics.filter((t) => Boolean(t.recentUpdate)).length : 2;

  return (
    <section className="bg-white border-[3px] border-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A] p-3.5 mb-6 flex flex-col gap-3">
      {/* Row 1: GS Paper Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs font-bold text-[#666] uppercase mr-1">
          📚 SELECT GS PAPER:
        </span>
        <button
          type="button"
          onClick={() => onPaperChange('all')}
          className={`font-vt text-lg px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer ${
            paperFilter === 'all'
              ? 'bg-[#2A2A2A] text-white shadow-none'
              : 'bg-[#F4F1E1] text-[#2A2A2A] hover:bg-[#EAE6D6] shadow-[2px_2px_0px_#2A2A2A]'
          }`}
        >
          ALL PAPERS ({total})
        </button>
        <button
          type="button"
          onClick={() => onPaperChange('GS1')}
          className={`font-vt text-lg px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer ${
            paperFilter === 'GS1'
              ? 'bg-[#D97706] text-white shadow-none'
              : 'bg-[#F4F1E1] text-[#2A2A2A] hover:bg-[#EAE6D6] shadow-[2px_2px_0px_#2A2A2A]'
          }`}
        >
          GS1 ({gs1Count} LINKED)
        </button>
        <button
          type="button"
          onClick={() => onPaperChange('GS2')}
          className={`font-vt text-lg px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer ${
            paperFilter === 'GS2'
              ? 'bg-[#2563EB] text-white shadow-none'
              : 'bg-[#F4F1E1] text-[#2A2A2A] hover:bg-[#EAE6D6] shadow-[2px_2px_0px_#2A2A2A]'
          }`}
        >
          GS2 ({gs2Count} PRIMARY)
        </button>
        <button
          type="button"
          onClick={() => onPaperChange('GS3')}
          className={`font-vt text-lg px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer ${
            paperFilter === 'GS3'
              ? 'bg-[#059669] text-white shadow-none'
              : 'bg-[#F4F1E1] text-[#2A2A2A] hover:bg-[#EAE6D6] shadow-[2px_2px_0px_#2A2A2A]'
          }`}
        >
          GS3 ({gs3Count} PRIMARY)
        </button>
        <button
          type="button"
          onClick={() => onPaperChange('GS4')}
          className={`font-vt text-lg px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer ${
            paperFilter === 'GS4'
              ? 'bg-[#7C3AED] text-white shadow-none'
              : 'bg-[#F4F1E1] text-[#2A2A2A] hover:bg-[#EAE6D6] shadow-[2px_2px_0px_#2A2A2A]'
          }`}
        >
          GS4 / ETHICS ({gs4Count} LINKED)
        </button>
      </div>

      {/* Row 2: Priority Band Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs font-bold text-[#666] uppercase mr-1">
          ⚖️ PRIORITY TIER:
        </span>
        <button
          type="button"
          onClick={() => onTierChange('all')}
          className={`font-vt text-lg px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer ${
            tierFilter === 'all'
              ? 'bg-[#2A2A2A] text-white shadow-none'
              : 'bg-[#F4F1E1] text-[#2A2A2A] hover:bg-[#EAE6D6] shadow-[2px_2px_0px_#2A2A2A]'
          }`}
        >
          ALL TIERS ({total})
        </button>
        <button
          type="button"
          onClick={() => onTierChange('bandA')}
          className={`font-vt text-lg px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer ${
            tierFilter === 'bandA'
              ? 'bg-[#0D9488] text-white shadow-none'
              : 'bg-[#F4F1E1] text-[#2A2A2A] hover:bg-[#EAE6D6] shadow-[2px_2px_0px_#2A2A2A]'
          }`}
        >
          ★ MUST-COVER ONLY ({bandACount})
        </button>
        <button
          type="button"
          onClick={() => onTierChange('quickReads')}
          className={`font-vt text-lg px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer ${
            tierFilter === 'quickReads'
              ? 'bg-[#4A90E2] text-white shadow-none'
              : 'bg-[#F4F1E1] text-[#2A2A2A] hover:bg-[#EAE6D6] shadow-[2px_2px_0px_#2A2A2A]'
          }`}
        >
          📖 QUICK READS ({quickCount})
        </button>
        <button
          type="button"
          onClick={() => onTierChange('hasUpdates')}
          className={`font-vt text-lg px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer ${
            tierFilter === 'hasUpdates'
              ? 'bg-[#F5A623] text-[#2A2A2A] font-bold shadow-none'
              : 'bg-[#F4F1E1] text-[#2A2A2A] hover:bg-[#EAE6D6] shadow-[2px_2px_0px_#2A2A2A]'
          }`}
        >
          ⚡ HAS DELTA UPDATES ({updatesCount})
        </button>
      </div>
    </section>
  );
}
