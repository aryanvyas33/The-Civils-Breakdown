'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, ArrowRight, Tag } from 'lucide-react';

interface TrendingTheme {
  name: string;
  paper: 'gs1' | 'gs2' | 'gs3' | 'gs4' | 'essay' | 'all';
  paperLabel: string;
  hyi?: number;
  highlight?: boolean;
}

const TRENDING_THEMES: TrendingTheme[] = [
  { name: 'Sustainable Development', paper: 'all', paperLabel: 'ALL', hyi: 100, highlight: true },
  { name: 'Cooperative Federalism', paper: 'gs2', paperLabel: 'GS2', hyi: 95, highlight: true },
  { name: 'Climate Change & COP', paper: 'gs3', paperLabel: 'GS3', hyi: 94, highlight: true },
  { name: 'Ethics Case Studies', paper: 'gs4', paperLabel: 'GS4', hyi: 96, highlight: true },
  { name: 'Women Empowerment', paper: 'gs1', paperLabel: 'GS1', hyi: 88, highlight: true },
  { name: 'Constitutional Morality', paper: 'gs2', paperLabel: 'GS2', hyi: 91 },
  { name: 'Artificial Intelligence & Ethics', paper: 'all', paperLabel: 'ALL', hyi: 92, highlight: true },
  { name: 'Inclusive Economic Growth', paper: 'gs3', paperLabel: 'GS3', hyi: 89 },
  { name: 'Judicial Activism & PIL', paper: 'gs2', paperLabel: 'GS2', hyi: 86 },
  { name: 'Agrarian Distress & MSP', paper: 'gs3', paperLabel: 'GS3', hyi: 87 },
  { name: 'Internal Security & Cyber', paper: 'gs3', paperLabel: 'GS3', hyi: 85 },
];

export default function TrendingCarousel() {
  const getPaperBg = (paper: string) => {
    switch (paper) {
      case 'gs1': return 'bg-retro-gs1 text-white';
      case 'gs2': return 'bg-retro-gs2 text-white';
      case 'gs3': return 'bg-retro-gs3 text-white';
      case 'gs4': return 'bg-retro-gs4 text-white';
      case 'essay': return 'bg-retro-essay text-white';
      default: return 'bg-retro-border text-white';
    }
  };

  return (
    <div className="w-full px-3 mb-6">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5 font-vt text-lg uppercase tracking-wide text-retro-border font-bold">
          <Tag className="w-4 h-4 text-retro-accent" />
          <span>TRENDING MICRO-THEMES</span>
        </div>
        <span className="text-[10px] font-space text-retro-border/60">
          SWIPE →
        </span>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex gap-2.5 overflow-x-auto hide-scroll py-1.5 -mx-3 px-3 snap-x">
        {TRENDING_THEMES.map((theme) => (
          <Link
            key={theme.name}
            href={`/search?q=${encodeURIComponent(theme.name)}`}
            className="snap-start shrink-0 w-[210px] bg-white border-2 border-retro-border p-3 shadow-retro-sm hover:bg-retro-window active:translate-y-0.5 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className={`text-[9px] font-vt font-bold px-1.5 py-0.5 border border-retro-border uppercase ${getPaperBg(theme.paper)}`}>
                  {theme.paperLabel}
                </span>
                {theme.hyi && (
                  <span className="text-[9px] font-space font-bold px-1.5 py-0.2 bg-[#FFF1EE] text-retro-accent border border-retro-accent/40">
                    HYI {theme.hyi}
                  </span>
                )}
              </div>
              <div className="font-space font-bold text-xs text-retro-border line-clamp-2 group-hover:text-retro-accent transition-colors">
                {theme.name}
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-dashed border-retro-border/40 font-space text-[10px] text-retro-border/70">
              <span className="text-retro-accent font-semibold flex items-center gap-1">
                <Flame className="w-3 h-3 fill-retro-accent text-retro-accent" />
                High Surge
              </span>
              <span className="group-hover:translate-x-0.5 transition-transform font-bold text-retro-border">
                Search →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
