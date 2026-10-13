'use client';

import React from 'react';
import type { AuthModalTab } from '@/types/auth';

interface AuthTabsProps {
  activeTab: AuthModalTab;
  onTabChange: (tab: 'login' | 'signup') => void;
}

export default function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
  return (
    <div className="flex border-b-[3px] border-retro-border bg-[#F8F5EE]">
      <button
        type="button"
        onClick={() => onTabChange('login')}
        className={`flex-1 py-2.5 px-4 font-vt text-xl text-center cursor-pointer transition-colors border-r-2 border-retro-border tracking-wider ${
          activeTab === 'login'
            ? 'bg-retro-window text-retro-border font-bold'
            : 'text-retro-border/80 hover:bg-retro-border hover:text-white'
        }`}
      >
        ▶ LOGIN
      </button>
      <button
        type="button"
        onClick={() => onTabChange('signup')}
        className={`flex-1 py-2.5 px-4 font-vt text-xl text-center cursor-pointer transition-colors tracking-wider ${
          activeTab === 'signup'
            ? 'bg-retro-window text-retro-border font-bold'
            : 'text-retro-border/80 hover:bg-retro-border hover:text-white'
        }`}
      >
        ✚ SIGN UP
      </button>
    </div>
  );
}
