'use client';

import React from 'react';
import { CAPaperFilter, CATierFilter, CATopic } from '@/types';

interface CAFilterBarProps {
  paperFilter: CAPaperFilter;
  tierFilter: CATierFilter;
  onPaperChange: (paper: CAPaperFilter) => void;
  onTierChange: (tier: CATierFilter) => void;
  topics?: CATopic[];
  mobileViewMode?: 'dossier' | 'compact';
  onViewModeChange?: (mode: 'dossier' | 'compact') => void;
  statusFilter?: 'all' | 'pending' | 'done';
  onStatusFilterChange?: (status: 'all' | 'pending' | 'done') => void;
}

export default function CAFilterBar({
  paperFilter,
  tierFilter,
  onPaperChange,
  onTierChange,
  topics,
  mobileViewMode = 'dossier',
  onViewModeChange,
  statusFilter = 'all',
  onStatusFilterChange,
}: CAFilterBarProps) {
  const total = topics ? topics.length : 94;
  const gs1Count = topics ? topics.filter((t) => t.papers.includes('GS1')).length : 16;
  const gs2Count = topics ? topics.filter((t) => t.primaryPaper === 'GS2').length : 42;
  const gs3Count = topics ? topics.filter((t) => t.primaryPaper === 'GS3').length : 32;
  const gs4Count = topics ? topics.filter((t) => t.papers.includes('GS4')).length : 38;
  const bandACount = topics ? topics.filter((t) => t.band === 'bandA').length : 52;
  const quickCount = topics ? topics.filter((t) => t.band !== 'bandA').length : 42;
  const updatesCount = topics ? topics.filter((t) => Boolean(t.recentUpdate)).length : 2;
  const newCount = topics
    ? topics.filter((t) => t.isNew || (t.month && t.month.toLowerCase().includes('oct'))).length
    : 18;

  return (
    <section className="bg-white border-[3px] border-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A] p-2.5 sm:p-3.5 mb-6">
      {/* Desktop Multi-Row Layout (Preserved 100% Unchanged) */}
      <div className="hidden sm:flex flex-col gap-3">
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
          <button
            type="button"
            onClick={() => onTierChange('new')}
            className={`font-vt text-lg px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer flex items-center gap-1.5 ${
              tierFilter === 'new'
                ? 'bg-[#E26A59] text-white shadow-none'
                : 'bg-[#FFF0ED] text-[#E26A59] hover:bg-[#FFE3DC] shadow-[2px_2px_0px_#2A2A2A]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#E26A59] animate-ping" />
            ★ OCT 2026 NEW ({newCount})
          </button>
        </div>
      </div>

      {/* Mobile-Only Dual Horizontal Snap Pill Trays & View Controls */}
      <div className="sm:hidden flex flex-col gap-2.5">
        {/* Mobile View Mode & Status Filter Row */}
        <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-[#2A2A2A]/20">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-[#F4F1E1] p-0.5 border border-[#2A2A2A]">
            <button
              type="button"
              onClick={() => onViewModeChange?.('dossier')}
              className={`font-mono text-[10px] font-bold px-2 py-1 transition-all cursor-pointer ${
                mobileViewMode === 'dossier'
                  ? 'bg-[#2A2A2A] text-white shadow-none'
                  : 'text-[#666] hover:text-[#2A2A2A]'
              }`}
            >
              📋 DOSSIER
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange?.('compact')}
              className={`font-mono text-[10px] font-bold px-2 py-1 transition-all cursor-pointer ${
                mobileViewMode === 'compact'
                  ? 'bg-[#2A2A2A] text-white shadow-none'
                  : 'text-[#666] hover:text-[#2A2A2A]'
              }`}
            >
              📑 LIST
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1">
            {(['all', 'pending', 'done'] as const).map((st) => {
              const isActive = statusFilter === st;
              const label = st === 'all' ? 'ALL' : st === 'pending' ? '⏳ PENDING' : '✔ DONE';
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => onStatusFilterChange?.(st)}
                  className={`font-mono text-[10px] font-bold px-2 py-1 border border-[#2A2A2A] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#50E3C2] text-[#2A2A2A] shadow-none font-black'
                      : 'bg-white text-[#666] hover:bg-[#F0ECE0]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* GS Paper Snap Tray */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-[#666] font-bold uppercase mb-1">
            <span>📚 GS PAPER ANGLE:</span>
            <span className="text-[10px] text-retro-accent font-vt uppercase">SWIPE ➔</span>
          </div>
          <div className="smart-tag-tray py-0.5">
            <button
              type="button"
              onClick={() => onPaperChange('all')}
              className={`shrink-0 font-vt text-base px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer whitespace-nowrap min-h-[34px] flex items-center ${
                paperFilter === 'all'
                  ? 'bg-[#2A2A2A] text-white shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-[#F4F1E1] text-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A]'
              }`}
            >
              ALL ({total})
            </button>
            <button
              type="button"
              onClick={() => onPaperChange('GS1')}
              className={`shrink-0 font-vt text-base px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer whitespace-nowrap min-h-[34px] flex items-center ${
                paperFilter === 'GS1'
                  ? 'bg-[#D97706] text-white shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-[#F4F1E1] text-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A]'
              }`}
            >
              GS1 ({gs1Count})
            </button>
            <button
              type="button"
              onClick={() => onPaperChange('GS2')}
              className={`shrink-0 font-vt text-base px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer whitespace-nowrap min-h-[34px] flex items-center ${
                paperFilter === 'GS2'
                  ? 'bg-[#2563EB] text-white shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-[#F4F1E1] text-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A]'
              }`}
            >
              GS2 ({gs2Count})
            </button>
            <button
              type="button"
              onClick={() => onPaperChange('GS3')}
              className={`shrink-0 font-vt text-base px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer whitespace-nowrap min-h-[34px] flex items-center ${
                paperFilter === 'GS3'
                  ? 'bg-[#059669] text-white shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-[#F4F1E1] text-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A]'
              }`}
            >
              GS3 ({gs3Count})
            </button>
            <button
              type="button"
              onClick={() => onPaperChange('GS4')}
              className={`shrink-0 font-vt text-base px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer whitespace-nowrap min-h-[34px] flex items-center ${
                paperFilter === 'GS4'
                  ? 'bg-[#7C3AED] text-white shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-[#F4F1E1] text-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A]'
              }`}
            >
              GS4 ({gs4Count})
            </button>
          </div>
        </div>

        {/* Priority Tier Snap Tray */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-[#666] font-bold uppercase mb-1">
            <span>⚖️ PRIORITY TIER:</span>
            <span className="text-[10px] text-retro-accent font-vt uppercase">SWIPE ➔</span>
          </div>
          <div className="smart-tag-tray py-0.5">
            <button
              type="button"
              onClick={() => onTierChange('all')}
              className={`shrink-0 font-vt text-base px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer whitespace-nowrap min-h-[34px] flex items-center ${
                tierFilter === 'all'
                  ? 'bg-[#2A2A2A] text-white shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-[#F4F1E1] text-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A]'
              }`}
            >
              ALL TIERS ({total})
            </button>
            <button
              type="button"
              onClick={() => onTierChange('bandA')}
              className={`shrink-0 font-vt text-base px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer whitespace-nowrap min-h-[34px] flex items-center ${
                tierFilter === 'bandA'
                  ? 'bg-[#0D9488] text-white shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-[#F4F1E1] text-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A]'
              }`}
            >
              ★ MUST-COVER ({bandACount})
            </button>
            <button
              type="button"
              onClick={() => onTierChange('quickReads')}
              className={`shrink-0 font-vt text-base px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer whitespace-nowrap min-h-[34px] flex items-center ${
                tierFilter === 'quickReads'
                  ? 'bg-[#4A90E2] text-white shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-[#F4F1E1] text-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A]'
              }`}
            >
              📖 QUICK READS ({quickCount})
            </button>
            <button
              type="button"
              onClick={() => onTierChange('hasUpdates')}
              className={`shrink-0 font-vt text-base px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer whitespace-nowrap min-h-[34px] flex items-center ${
                tierFilter === 'hasUpdates'
                  ? 'bg-[#F5A623] text-[#2A2A2A] font-bold shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-[#F4F1E1] text-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A]'
              }`}
            >
              ⚡ HAS UPDATES ({updatesCount})
            </button>
            <button
              type="button"
              onClick={() => onTierChange('new')}
              className={`shrink-0 font-vt text-base px-3 py-1 border-2 border-[#2A2A2A] transition-all cursor-pointer whitespace-nowrap min-h-[34px] flex items-center gap-1.5 ${
                tierFilter === 'new'
                  ? 'bg-[#E26A59] text-white shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-[#FFF0ED] text-[#E26A59] shadow-[2px_2px_0px_#2A2A2A]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E26A59] animate-ping" />
              ★ OCT NEW ({newCount})
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
