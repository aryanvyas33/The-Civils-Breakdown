'use client';

import React, { useState } from 'react';
import { CAProgressMetrics } from '@/types';

interface StickyProgressBarProps {
  metrics: CAProgressMetrics;
  isAccelerating?: boolean;
}

export default function StickyProgressBar({
  metrics,
  isAccelerating = false,
}: StickyProgressBarProps) {
  const [showStatsModal, setShowStatsModal] = useState(false);

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
    <>
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
          {/* Mobile-only Stats popover button */}
          <button
            type="button"
            onClick={() => setShowStatsModal(true)}
            className="sm:hidden bg-[#2A2A2A] text-white px-1.5 py-0.5 text-[9px] font-mono font-bold cursor-pointer hover:bg-[#444]"
          >
            STATS
          </button>
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

      {/* Mobile Progress Breakdown Modal */}
      {showStatsModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[250] bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-3"
          onClick={() => setShowStatsModal(false)}
        >
          <div
            className="bg-[#FAF8F2] border-[3px] border-[#2A2A2A] shadow-[6px_6px_0px_#2A2A2A] w-full max-w-sm p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b-2 border-[#2A2A2A] pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-vt text-2xl text-[#2A2A2A] leading-none">
                  🏆 PREP STATUS BREAKDOWN
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowStatsModal(false)}
                className="font-vt text-2xl text-[#2A2A2A] hover:text-[#E26A59] px-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Metrics Breakdown Rows */}
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center bg-white p-2.5 border border-[#2A2A2A]">
                <span className="text-[#555]">🎯 Band A Must-Cover:</span>
                <span className="font-bold text-[#0D9488]">
                  {bandADone} / {bandATotal} ({Math.round((bandADone / (bandATotal || 1)) * 100)}%)
                </span>
              </div>

              <div className="flex justify-between items-center bg-white p-2.5 border border-[#2A2A2A]">
                <span className="text-[#555]">📖 Band B/C Quick Reads:</span>
                <span className="font-bold text-[#4A90E2]">
                  {quickDone} / {quickTotal} ({Math.round((quickDone / (quickTotal || 1)) * 100)}%)
                </span>
              </div>

              {updatesTotal > 0 && (
                <div className="flex justify-between items-center bg-white p-2.5 border border-[#2A2A2A]">
                  <span className="text-[#555]">⚡ Delta Updates:</span>
                  <span className="font-bold text-[#D97706]">
                    {updatesDone} / {updatesTotal} Reviewed
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center bg-[#D1FAF0] p-2.5 border border-[#0D9488] font-bold">
                <span className="text-[#0D9488]">Total Completion:</span>
                <span className="text-[#2A2A2A]">
                  {pts.toFixed(1)} / {maxPts.toFixed(1)} pts ({pct}%)
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowStatsModal(false)}
              className="mt-4 w-full py-2 bg-[#2A2A2A] text-white font-vt text-lg cursor-pointer hover:bg-[#444] transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
