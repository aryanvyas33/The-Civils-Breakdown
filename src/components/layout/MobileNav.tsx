'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Zap, Flame, Menu } from 'lucide-react';
import MoreSheet from './MoreSheet';
import { getBookmarkedIds } from '@/lib/bookmarks';
import { getAllNotes } from '@/lib/notes';

export default function MobileNav() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [savedCount, setSavedCount] = useState<number>(0);

  useEffect(() => {
    const updateSaved = () => {
      try {
        const bks = getBookmarkedIds?.()?.length || 0;
        const nts = getAllNotes?.()?.length || 0;
        setSavedCount(bks + nts);
      } catch (e) {
        // Safe fallback
      }
    };
    updateSaved();
    window.addEventListener('pyq-bookmarks-updated', updateSaved);
    window.addEventListener('pyq-notes-updated', updateSaved);
    return () => {
      window.removeEventListener('pyq-bookmarks-updated', updateSaved);
      window.removeEventListener('pyq-notes-updated', updateSaved);
    };
  }, []);

  const isHomeActive = !isMoreOpen && pathname === '/';
  const isCAActive = !isMoreOpen && pathname.startsWith('/current-affairs');
  const isSearchActive = !isMoreOpen && pathname.startsWith('/search');
  const isHYActive = !isMoreOpen && pathname.startsWith('/high-yield');
  const isMoreActive = isMoreOpen || (!isHomeActive && !isCAActive && !isSearchActive && !isHYActive);

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 bg-retro-window/98 backdrop-blur-md border-t-3 border-retro-border px-1 pt-1.5 pb-2.5 flex justify-around items-center z-40 shadow-[0_-3px_0px_rgba(42,42,42,0.12)]"
        aria-label="Mobile Navigation"
      >
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center py-1 px-2 transition-all focus:outline-none ${
            isHomeActive
              ? 'text-retro-accent font-bold scale-105'
              : 'text-retro-border/70 hover:text-retro-border'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${isHomeActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="font-vt text-[13px] tracking-wide uppercase leading-none">Home</span>
        </Link>

        {/* 2. CA Tracker (Spotlighted with pulsing dot) */}
        <Link
          href="/current-affairs"
          className={`relative flex flex-col items-center py-1 px-2 transition-all focus:outline-none ${
            isCAActive
              ? 'text-[#0D9488] font-bold scale-105'
              : 'text-retro-border/70 hover:text-retro-border'
          }`}
        >
          {/* Pulsing Live Dot Badge */}
          <span className="absolute top-0.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D9488] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D9488]"></span>
          </span>
          <Zap className={`w-5 h-5 mb-0.5 ${isCAActive ? 'stroke-[2.5px] fill-[#0D9488]/20' : 'stroke-2'}`} />
          <span className="font-vt text-[13px] tracking-wide uppercase leading-none">CA 2027</span>
        </Link>

        {/* 3. Search */}
        <Link
          href="/search"
          className={`flex flex-col items-center py-1 px-2 transition-all focus:outline-none ${
            isSearchActive
              ? 'text-retro-accent font-bold scale-105'
              : 'text-retro-border/70 hover:text-retro-border'
          }`}
        >
          <Search className={`w-5 h-5 mb-0.5 ${isSearchActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="font-vt text-[13px] tracking-wide uppercase leading-none">Search</span>
        </Link>

        {/* 4. High Yield (Spotlighted with flame) */}
        <Link
          href="/high-yield"
          className={`relative flex flex-col items-center py-1 px-2 transition-all focus:outline-none ${
            isHYActive
              ? 'text-retro-accent font-bold scale-105'
              : 'text-retro-border/70 hover:text-retro-border'
          }`}
        >
          <span className="absolute top-0.5 right-2 flex h-1.5 w-1.5">
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-retro-accent"></span>
          </span>
          <Flame className={`w-5 h-5 mb-0.5 ${isHYActive ? 'stroke-[2.5px] fill-retro-accent/20' : 'stroke-2'}`} />
          <span className="font-vt text-[13px] tracking-wide uppercase leading-none">High Yield</span>
        </Link>

        {/* 5. More (Bottom Drawer) */}
        <button
          type="button"
          onClick={() => setIsMoreOpen(true)}
          className={`relative flex flex-col items-center py-1 px-2 transition-all focus:outline-none cursor-pointer ${
            isMoreActive
              ? 'text-retro-border font-bold'
              : 'text-retro-border/70 hover:text-retro-border'
          }`}
          aria-label="Open more navigation options"
        >
          {savedCount > 0 && (
            <span className="absolute top-0 right-1 px-1 bg-retro-accent text-white font-space text-[9px] font-bold rounded-full">
              {savedCount}
            </span>
          )}
          <Menu className={`w-5 h-5 mb-0.5 ${isMoreActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="font-vt text-[13px] tracking-wide uppercase leading-none">More</span>
        </button>
      </nav>

      {/* Slide-Up Drawer */}
      <MoreSheet
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        savedCount={savedCount}
      />
    </>
  );
}
