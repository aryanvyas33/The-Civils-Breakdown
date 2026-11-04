'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import caTopicsData from '@/data/ca-topics.json';

export default function CASpotlightCard() {
  const allTopics = caTopicsData as any[];
  const totalCount = allTopics.length || 94;
  const bandACount = allTopics.filter((t) => t.band === 'bandA').length || 52;
  const quickReadsCount = allTopics.filter((t) => t.band !== 'bandA').length || 42;
  const topTopic = allTopics[0] || {
    title: 'Fiscal federalism after the 16th Finance Commission (2026-31)',
    prob: '81.8%',
    papers: ['GS2', 'GS3'],
    rank: 1,
  };

  return (
    <div className="w-full px-3 mb-3">
      <div className="retro-container bg-[#0D9488] border-3 border-retro-border p-0 overflow-hidden shadow-retro">
        
        {/* Top Header Bar */}
        <div className="px-3.5 py-2 flex items-center justify-between border-b-2 border-retro-border bg-[#0B7D72] text-white">
          <div className="flex items-center gap-2">
            <span className="font-vt text-lg sm:text-xl tracking-wider uppercase text-white flex items-center gap-1">
              <Zap className="w-4 h-4 text-[#FFD25A] fill-[#FFD25A]" />
              MAINS 2027
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] bg-white text-[#0D9488] px-1.5 py-0.5 font-space font-bold border border-retro-border shadow-[1px_1px_0px_#2A2A2A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-ping" />
              LIVE
            </span>
          </div>
          <span className="text-[10px] text-white/90 font-space font-bold uppercase tracking-wider">
            {totalCount} DOSSIERS
          </span>
        </div>

        {/* Content Card Body */}
        <div className="bg-[#F8FAF9] p-3.5 flex flex-col gap-2.5">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-space font-bold text-sm text-retro-border leading-tight">
                Current Affairs Priority Tracker
              </h3>
              <span className="text-[10px] font-space font-bold px-2 py-0.5 bg-[#D1FAF0] border border-[#0D9488] text-[#0D9488]">
                8-Param Model
              </span>
            </div>
            <p className="font-sans text-[11px] text-retro-border/80 leading-snug mt-1">
              Prioritize what matters. Every theme mathematically weighted by syllabus alignment, static recurrence, and committee milestones.
            </p>
          </div>

          {/* Band Badges */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-space font-bold px-2 py-0.5 bg-[#0D9488] text-white border border-retro-border shadow-[1px_1px_0px_#2A2A2A]">
              <ShieldCheck className="w-3 h-3 text-[#FFD25A]" />
              BAND A: {bandACount} MUST-COVER
            </span>
            <span className="inline-flex items-center text-[10px] font-space font-bold px-2 py-0.5 bg-[#FFD25A] text-retro-border border border-retro-border shadow-[1px_1px_0px_#2A2A2A]">
              BAND B: {quickReadsCount} QUICK READS
            </span>
          </div>

          {/* #1 Top Dossier Snippet */}
          <Link
            href={`/current-affairs#topic-${topTopic.id || 2}`}
            className="group block bg-white border-2 border-retro-border p-2.5 shadow-[2px_2px_0px_#2A2A2A] hover:bg-retro-window transition-all cursor-pointer active:translate-y-0.5"
          >
            <div className="flex items-start gap-2">
              <div className="bg-[#0D9488] text-white text-[10px] font-vt font-bold px-1.5 py-0.5 border border-retro-border shrink-0 mt-0.5">
                #1 RANK
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-space font-bold text-retro-border line-clamp-1 group-hover:text-retro-accent transition-colors">
                  {topTopic.title}
                </div>
                <div className="flex items-center gap-2 mt-0.5 font-space text-[10px] text-retro-border/70">
                  <span className="text-[#0D9488] font-bold">P(asked): {topTopic.prob || '81.8%'}</span>
                  <span>·</span>
                  <span>{(topTopic.papers || ['GS2', 'GS3']).join(' & ')}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-retro-border shrink-0 self-center group-hover:translate-x-1 group-hover:text-retro-accent transition-all" />
            </div>
          </Link>

          {/* Primary Action Button */}
          <Link
            href="/current-affairs"
            className="w-full bg-retro-border text-white text-center py-2 px-3 font-vt text-base tracking-wider hover:bg-[#0D9488] transition-colors border-2 border-retro-border shadow-[2px_2px_0px_#2A2A2A] active:translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>OPEN CA PRIORITY TRACKER</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
