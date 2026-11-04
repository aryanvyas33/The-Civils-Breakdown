'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, FolderArchive, Bookmark, Edit3, ArrowRight } from 'lucide-react';
import { getBookmarkedIds } from '@/lib/bookmarks';
import { getAllNotes } from '@/lib/notes';

export default function QuickAccessGrid() {
  const [savedCount, setSavedCount] = useState<number>(0);

  useEffect(() => {
    const updateSaved = () => {
      try {
        const bks = getBookmarkedIds?.()?.length || 0;
        const nts = getAllNotes?.()?.length || 0;
        setSavedCount(bks + nts);
      } catch (e) {
        // Safe fallback in SSR or if storage is blocked
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

  const items = [
    {
      title: 'Syllabus Tree',
      subtitle: 'Line-by-line mapping',
      href: '/explore/gs1',
      icon: BookOpen,
      iconBg: 'bg-retro-gs1',
      badge: 'GS1-4',
    },
    {
      title: 'Papers Archive',
      subtitle: '14 Years (2013-26)',
      href: '/explore',
      icon: FolderArchive,
      iconBg: 'bg-retro-gs2',
      badge: '5 Papers',
    },
    {
      title: 'My Vault',
      subtitle: 'Bookmarks & Notes',
      href: '/saved',
      icon: Bookmark,
      iconBg: 'bg-retro-folder',
      badge: savedCount > 0 ? `${savedCount} Saved` : '0 Saved',
    },
    {
      title: 'Note-Making',
      subtitle: 'Structured Blueprints',
      href: '/saved?tab=notes',
      icon: Edit3,
      iconBg: 'bg-retro-gs4',
      badge: 'BETA',
    },
  ];

  return (
    <div className="w-full px-3 mb-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="font-vt text-lg uppercase tracking-wide text-retro-border font-bold">
          QUICK PATHWAYS
        </span>
        <span className="text-[10px] font-space text-retro-border/70 font-semibold">
          TARGETED STUDY
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="bg-white border-2 border-retro-border p-2.5 shadow-retro-sm hover:bg-retro-window active:translate-y-0.5 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between mb-1.5">
                <div className={`w-8 h-8 ${item.iconBg} border-2 border-retro-border flex items-center justify-center text-white shadow-[1px_1px_0px_#2A2A2A] group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-[9px] font-space font-bold px-1.5 py-0.2 bg-retro-window border border-retro-border text-retro-border">
                  {item.badge}
                </span>
              </div>
              <div>
                <div className="font-space font-bold text-xs text-retro-border group-hover:text-retro-accent transition-colors">
                  {item.title}
                </div>
                <div className="font-sans text-[10px] text-retro-border/70 leading-tight mt-0.5">
                  {item.subtitle}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
