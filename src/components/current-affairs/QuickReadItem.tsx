'use client';

import React from 'react';
import { CATopic } from '@/types';

interface QuickReadItemProps {
  topic: CATopic;
  isDone: boolean;
  onToggleDone: (e: React.MouseEvent) => void;
}

export default function QuickReadItem({
  topic,
  isDone,
  onToggleDone,
}: QuickReadItemProps) {
  const isBandC = topic.band === 'bandC';

  return (
    <div
      className={`bg-white border-2 border-[#2A2A2A] shadow-[2px_2px_0px_#2A2A2A] p-3 flex justify-between items-center gap-3 transition-all ${
        isDone ? 'opacity-65 bg-[#FAF9F5]' : 'hover:-translate-y-0.5'
      }`}
    >
      {/* Desktop Content Area (Preserved Unchanged) */}
      <div className="hidden sm:flex flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-vt text-xl text-[#2A2A2A] font-bold">
            #{topic.rank}
          </span>
          <span className="font-mono text-[0.68rem] font-bold bg-[#E8F4FD] text-[#1D4ED8] px-1.5 py-0.5 border border-[#3B82F6]">
            {topic.primaryPaper}
          </span>
          <span className="font-mono text-[0.65rem] font-bold bg-[#EEE] text-[#333] px-1.5 py-0.5 border border-[#CCC]">
            {topic.month}
          </span>
          <span
            className={`font-sans font-bold text-sm text-[#2A2A2A] ${
              isDone ? 'line-through text-[#666]' : ''
            }`}
          >
            {topic.title}
          </span>
          <span className="font-mono text-[0.65rem] text-[#666]">
            P: {topic.prob}
          </span>
          <span
            className={`font-mono text-[0.62rem] font-bold px-1.5 py-0.5 border ${
              isBandC
                ? 'bg-[#FFF3D0] text-[#946700] border-[#F5A623]'
                : 'bg-[#DCEEFF] text-[#4A90E2] border-[#4A90E2]'
            }`}
          >
            {isBandC ? 'HEADLINE' : 'QUICK READ'}
          </span>
        </div>

        <div className="text-xs text-[#555] font-sans">
          <strong>Mains Focus / Static Core:</strong> {topic.staticCore} —{' '}
          <em className="text-[#666]">{topic.prepDepth}</em>
        </div>
      </div>

      {/* Mobile-Only Structured Content Area */}
      <div className="sm:hidden flex-1 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-vt text-lg text-[#2A2A2A] font-bold">
            #{topic.rank}
          </span>
          <span className="font-mono text-[10px] font-bold bg-[#E8F4FD] text-[#1D4ED8] px-1 py-0.5 border border-[#3B82F6]">
            {topic.primaryPaper}
          </span>
          <span className="font-mono text-[10px] font-bold bg-[#EEE] text-[#333] px-1 py-0.5 border border-[#CCC]">
            {topic.month}
          </span>
          <span className="font-mono text-[10px] text-[#666]">
            P: {topic.prob}
          </span>
          <span
            className={`font-mono text-[9px] font-bold px-1 py-0.5 border ${
              isBandC
                ? 'bg-[#FFF3D0] text-[#946700] border-[#F5A623]'
                : 'bg-[#DCEEFF] text-[#4A90E2] border-[#4A90E2]'
            }`}
          >
            {isBandC ? 'HEADLINE' : 'QUICK'}
          </span>
        </div>

        <div
          className={`font-sans font-bold text-[13px] text-[#2A2A2A] leading-snug ${
            isDone ? 'line-through text-[#666]' : ''
          }`}
        >
          {topic.title}
        </div>

        <div className="text-[11px] text-[#555] font-sans leading-tight">
          <strong>Static Core:</strong> {topic.staticCore}
        </div>
      </div>

      {/* Right-Side Action Column */}
      <div className="flex flex-col items-center justify-center gap-0.5 pl-3 border-l-[1.5px] border-dashed border-[#D3D0C5] shrink-0">
        <button
          type="button"
          onClick={onToggleDone}
          title={isDone ? 'Mark as not done' : 'Mark Quick Read as done (+50 XP)'}
          className={`w-8 h-8 border-2 border-[#2A2A2A] font-vt text-xl flex items-center justify-center cursor-pointer transition-colors shadow-[1.5px_1.5px_0px_#2A2A2A] ${
            isDone
              ? 'bg-[#50E3C2] text-[#2A2A2A]'
              : 'bg-white text-[#2A2A2A] hover:bg-[#E0FFF8]'
          }`}
        >
          {isDone ? '✔' : '☐'}
        </button>
        <span className="font-mono text-[0.58rem] font-bold text-[#666] uppercase whitespace-nowrap">
          {isDone ? 'DONE' : 'MARK DONE'}
        </span>
      </div>
    </div>
  );
}
