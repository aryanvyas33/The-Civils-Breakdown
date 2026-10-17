'use client';

import React from 'react';
import { CAProgressMetrics } from '@/types';

interface StickyProgressBarProps {
  metrics: CAProgressMetrics;
  isAccelerating?: boolean;
}

export default function StickyProgressBar({
  metrics,
  isAccelerating = false,
}: StickyProgressBarProps) {
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
  } = metrics;

  return (
    <aside
      aria-label="Current affairs preparation progress"
      className="sticky-bar"
    >
      <span className="sticky-label text-base sm:text-xl font-vt text-[#2A2A2A]">
        <span className="hidden sm:inline">CA PROGRESS:</span>
        <span className="sm:hidden">CA:</span>
      </span>

      <div className="sticky-rail">
        <div
          className={`sticky-fill ${isAccelerating ? 'accelerating' : ''}`}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>

      <div className="sticky-pct text-[11px] sm:text-sm font-mono flex flex-wrap items-center gap-1 sm:gap-2 shrink-0">
        <span className="font-bold text-[#2A2A2A]">
          {pts.toFixed(1)} / {maxPts.toFixed(1)} pts ({pct}%)
        </span>
        <span className="hidden md:inline text-[#888]">•</span>
        <span className="hidden md:inline text-[#555]">
          {bandADone}/{bandATotal} Must-Cover
        </span>
        <span className="hidden lg:inline text-[#888]">•</span>
        <span className="hidden lg:inline text-[#555]">
          {quickDone}/{quickTotal} Quick Reads
        </span>
        {updatesTotal > 0 && updatesDone > 0 && (
          <>
            <span className="hidden xl:inline text-[#888]">•</span>
            <span className="hidden xl:inline text-[#D97706] font-bold">
              ⚡ {updatesDone}/{updatesTotal} Updates Reviewed
            </span>
          </>
        )}
      </div>
    </aside>
  );
}
