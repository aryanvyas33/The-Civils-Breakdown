'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { User, Archive, LogOut, RefreshCw, Cloud } from 'lucide-react';

export default function UserMenuDropdown() {
  const { profile, signOut, isSyncing, lastSyncedAt, syncStatus } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = profile?.display_name || 'Aspirant';
  const initial = displayName.charAt(0).toUpperCase();

  const formatLastSync = () => {
    if (syncStatus === 'error') return 'Sync error (tap force sync)';
    if (!lastSyncedAt) return 'Ready to sync';
    const minsAgo = Math.floor((Date.now() - new Date(lastSyncedAt).getTime()) / 60000);
    if (minsAgo < 1) return 'Synced just now';
    if (minsAgo === 1) return 'Synced 1m ago';
    return `Synced ${minsAgo}m ago`;
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 bg-[#0D9488] text-white border-2 border-retro-border font-vt text-lg flex items-center justify-center cursor-pointer shadow-retro-sm hover:shadow-retro hover:-translate-y-0.5 active:translate-y-0.5 transition-all select-none"
        title={displayName}
        aria-label="User profile menu"
      >
        {initial}
      </button>

      {/* Retro Dropdown Window */}
      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] right-0 w-64 bg-retro-window border-3 border-retro-border shadow-retro-lg z-50 text-retro-border font-space animate-fadeIn select-none">
          {/* Header */}
          <div className="p-3 border-b-2 border-retro-border bg-white">
            <div className="font-vt text-xl text-retro-border font-bold leading-tight truncate">
              {displayName}
            </div>
            {profile?.email && (
              <div className="text-[10px] text-retro-border/70 truncate font-mono mt-0.5">
                {profile.email}
              </div>
            )}
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#EDF7F5] border border-[#0D9488] text-[#0D9488] text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-pulse" />
              <span>{isSyncing ? 'Syncing vault...' : formatLastSync()}</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-1 divide-y divide-retro-border/20">
            <Link
              href="/saved"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold hover:bg-retro-border hover:text-white transition-colors cursor-pointer"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Personal Vault</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new Event('pyq-vault-sync-trigger'));
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold hover:bg-retro-border hover:text-white transition-colors cursor-pointer text-left"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Force Sync Cloud</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-retro-accent hover:bg-retro-accent hover:text-white transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
