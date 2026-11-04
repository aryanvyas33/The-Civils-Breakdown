'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, ArrowRight, TrendingUp, BarChart2 } from 'lucide-react';
import highYieldConceptsData from '@/data/high-yield-concepts.json';

export default function HYSpotlightCard() {
  const rawConcepts = (highYieldConceptsData as any[]) || [];
  // Grab top 3 concepts
  const topConcepts = rawConcepts.slice(0, 3);

  return (
    <div className="w-full px-3 mb-3">
      <div className="retro-container bg-retro-accent border-3 border-retro-border p-0 overflow-hidden shadow-retro">
        
        {/* Top Header Bar */}
        <div className="px-3.5 py-2 flex items-center justify-between border-b-2 border-retro-border bg-[#C95444] text-white">
          <div className="flex items-center gap-1.5 font-vt text-lg sm:text-xl tracking-wider uppercase text-white">
            <Flame className="w-4 h-4 text-white fill-white shrink-0 animate-bounce" />
            <span>HIGH-YIELD CONCEPTS</span>
          </div>
          <span className="text-[10px] text-white/95 font-space font-bold uppercase tracking-wider">
            14-YR RECURRENCE
          </span>
        </div>

        {/* Content Card Body */}
        <div className="bg-[#FFF8F6] p-3.5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-space font-bold text-sm text-retro-border leading-tight">
                Historical Frequency Engine
              </h3>
              <p className="font-sans text-[11px] text-retro-border/80 leading-snug mt-0.5">
                Concepts repeated across consecutive cycles with multi-paper crossover.
              </p>
            </div>
            <span className="text-[10px] font-space font-bold px-2 py-0.5 bg-[#FFD1D1] text-retro-accent border border-retro-accent shrink-0">
              Top Tiers
            </span>
          </div>

          {/* Top 3 Surging Concepts Mini-List */}
          <div className="space-y-1.5">
            {topConcepts.map((item, idx) => {
              const qCount = item.metrics?.questionCount || 10;
              const hyi = item.hyi || 100;
              return (
                <Link
                  key={item.id || idx}
                  href={`/search?q=${encodeURIComponent(item.display)}`}
                  className="group flex items-center justify-between bg-white border-2 border-retro-border p-2 shadow-[2px_2px_0px_#2A2A2A] hover:bg-retro-window transition-all"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="font-vt text-xs font-bold text-white bg-retro-accent px-1.5 py-0.2 border border-retro-border shrink-0">
                      #{idx + 1}
                    </span>
                    <span className="text-[11px] font-space font-bold text-retro-border truncate group-hover:text-retro-accent transition-colors">
                      {item.display}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-[10px] font-space text-retro-border/70 font-semibold">
                      {qCount} Qs
                    </span>
                    <span className="text-[10px] font-space font-bold bg-[#FFF1EE] text-retro-accent border border-retro-accent/40 px-1 py-0.2">
                      HYI {hyi}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Primary Action Button */}
          <Link
            href="/high-yield"
            className="w-full bg-retro-border text-white text-center py-2 px-3 font-vt text-base tracking-wider hover:bg-retro-accent transition-colors border-2 border-retro-border shadow-[2px_2px_0px_#2A2A2A] active:translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>EXPLORE ALL HIGH-YIELD TOPICS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
