'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/search/SearchBar';
import { useAuth } from '@/hooks/useAuth';
import { Zap, Terminal, Sparkles, BookOpen, Layers } from 'lucide-react';

const QUICK_SEARCH_PROMPTS = [
  'Federalism',
  '16th Finance Commission',
  'Climate Change',
  'Ethics Case Studies',
  'Artificial Intelligence',
  'Judicial Activism',
  'Urbanization',
  'Food Security',
];

interface MobileHomeHeroProps {
  totalQuestions: number;
}

export default function MobileHomeHero({ totalQuestions = 1131 }: MobileHomeHeroProps) {
  const { profile, isAuthenticated } = useAuth();
  const [greeting, setGreeting] = useState('GOOD DAY');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('GOOD MORNING');
    else if (hour < 17) setGreeting('GOOD AFTERNOON');
    else setGreeting('GOOD EVENING');
  }, []);

  const aspirantName = (mounted && isAuthenticated && profile?.display_name)
    ? profile.display_name.toUpperCase()
    : 'ASPIRANT';

  return (
    <div className="w-full pt-4 pb-2 px-3">
      {/* 1. Header Greeting & Status Badge */}
      <div className="flex items-center justify-between mb-3 bg-retro-window border-2 border-retro-border p-2.5 shadow-retro-sm">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-vt text-lg sm:text-xl text-retro-border font-bold tracking-wide">
            <Zap className="w-4 h-4 text-retro-accent fill-retro-accent shrink-0 animate-pulse" />
            <span>{greeting}, {aspirantName}</span>
          </div>
          <div className="font-space text-[10px] text-retro-border/80 flex items-center gap-1 mt-0.5">
            <span>UPSC MAINS REPOSITORY</span>
            <span>·</span>
            <span className="text-retro-accent font-bold">LIVE 2013-2026</span>
          </div>
        </div>
        <div className="w-9 h-9 border-2 border-retro-border bg-retro-folder flex items-center justify-center font-vt text-base shadow-[1px_1px_0px_#2A2A2A] shrink-0 font-bold">
          CSE
        </div>
      </div>

      {/* 2. Interactive Search Box */}
      <div className="mb-2.5">
        <SearchBar size="compact" />
      </div>

      {/* 3. Horizontally Scrollable Search Pills (No wrapping clutter) */}
      <div className="relative mb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto hide-scroll py-1 -mx-1 px-1 snap-x">
          <span className="text-[10px] font-vt uppercase text-retro-border font-bold flex items-center gap-1 shrink-0 bg-retro-window border border-retro-border px-1.5 py-0.5">
            <Terminal className="w-3 h-3 text-retro-accent" />
            TRY:
          </span>
          {QUICK_SEARCH_PROMPTS.map((prompt) => (
            <Link
              key={prompt}
              href={`/search?q=${encodeURIComponent(prompt)}`}
              className="text-[10px] font-space font-bold px-2 py-0.5 bg-white border border-retro-border text-retro-border hover:bg-retro-accent hover:text-white transition-colors shadow-[1px_1px_0px_#2A2A2A] shrink-0 whitespace-nowrap snap-start active:scale-95"
            >
              &quot;{prompt}&quot;
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Compact 3-Column Stats Ribbon */}
      <div className="grid grid-cols-3 gap-1.5 text-center font-space mb-2">
        <div className="bg-white border-2 border-retro-border py-1.5 px-1 shadow-[1px_1px_0px_#2A2A2A]">
          <div className="font-vt text-lg font-bold text-retro-border leading-none">
            {totalQuestions.toLocaleString()}+
          </div>
          <div className="text-[9px] text-retro-border/70 uppercase tracking-tight mt-0.5">Questions</div>
        </div>
        <div className="bg-white border-2 border-retro-border py-1.5 px-1 shadow-[1px_1px_0px_#2A2A2A]">
          <div className="font-vt text-lg font-bold text-retro-border leading-none">
            14 YEARS
          </div>
          <div className="text-[9px] text-retro-border/70 uppercase tracking-tight mt-0.5">2013-2026</div>
        </div>
        <div className="bg-white border-2 border-retro-border py-1.5 px-1 shadow-[1px_1px_0px_#2A2A2A]">
          <div className="font-vt text-lg font-bold text-retro-border leading-none">
            5 PAPERS
          </div>
          <div className="text-[9px] text-retro-border/70 uppercase tracking-tight mt-0.5">GS1-4 + Essay</div>
        </div>
      </div>
    </div>
  );
}
