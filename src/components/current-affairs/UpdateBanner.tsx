'use client';

import React from 'react';
import { CATopicUpdate } from '@/types';

interface UpdateBannerProps {
  topicId: number;
  update: CATopicUpdate;
  isReviewed: boolean;
  onToggleReview: (e: React.MouseEvent) => void;
}

export default function UpdateBanner({
  topicId,
  update,
  isReviewed,
  onToggleReview,
}: UpdateBannerProps) {
  return (
    <div
      className={`border-2 p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-colors ${
        isReviewed
          ? 'bg-[#D1FAF0] border-[#0D9488]'
          : 'bg-[#FFF8E7] border-[#F5A623]'
      }`}
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-mono text-[0.68rem] font-bold bg-[#F5A623] text-[#2A2A2A] px-1.5 py-0.5 border border-[#2A2A2A]">
            ⚡ NEW DEVELOPMENT: {update.month.toUpperCase()}
          </span>
          <span className="font-mono text-xs font-semibold text-[#666]">
            {update.tag}
          </span>
        </div>
        <div className="text-xs sm:text-sm text-[#333] font-sans leading-relaxed">
          {update.text}
        </div>
      </div>

      <div className="flex sm:flex-col items-center justify-center gap-1 shrink-0 self-end sm:self-center pl-0 sm:pl-3 sm:border-l sm:border-dashed sm:border-[#D3D0C5]">
        <button
          type="button"
          onClick={onToggleReview}
          title="Mark this subsequent development as reviewed"
          className={`w-8 h-8 border-2 border-[#2A2A2A] font-vt text-xl flex items-center justify-center cursor-pointer transition-colors shadow-[1.5px_1.5px_0px_#2A2A2A] ${
            isReviewed
              ? 'bg-[#50E3C2] text-[#2A2A2A]'
              : 'bg-white hover:bg-[#E0FFF8]'
          }`}
        >
          {isReviewed ? '✔' : '☐'}
        </button>
        <span className="font-mono text-[0.58rem] font-bold text-[#666] uppercase whitespace-nowrap">
          {isReviewed ? 'REVIEWED' : 'MARK REVIEWED'}
        </span>
      </div>
    </div>
  );
}
