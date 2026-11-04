'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  Compass,
  Bookmark,
  BookOpen,
  Search,
  Zap,
  Flame,
  Mail,
  LogIn,
  LogOut,
  User,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface MoreSheetProps {
  isOpen: boolean;
  onClose: () => void;
  savedCount: number;
}

export default function MoreSheet({ isOpen, onClose, savedCount }: MoreSheetProps) {
  const pathname = usePathname();
  const { isAuthenticated, profile, signOut, openAuthModal, isLoading } = useAuth();

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling while sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navItems = [
    {
      name: 'Explore Papers & Subjects',
      desc: 'Browse GS1–GS4 and Essay by year or topic',
      href: '/explore',
      icon: Compass,
      iconBg: 'bg-retro-gs2',
    },
    {
      name: 'My Vault',
      desc: 'Bookmarked questions & structured notes',
      href: '/saved',
      icon: Bookmark,
      iconBg: 'bg-retro-folder',
      badge: savedCount > 0 ? `${savedCount}` : null,
    },
    {
      name: 'Syllabus Hierarchy Tree',
      desc: 'Line-by-line official UPSC syllabus breakdown',
      href: '/explore/gs1',
      icon: BookOpen,
      iconBg: 'bg-retro-gs1',
    },
    {
      name: 'Comprehensive Search Engine',
      desc: 'Search 1,131+ questions with directive filters',
      href: '/search',
      icon: Search,
      iconBg: 'bg-retro-gs3',
    },
    {
      name: 'Current Affairs Priority Tracker',
      desc: '94 Mains 2027 dossiers ranked by P(asked)',
      href: '/current-affairs',
      icon: Zap,
      iconBg: 'bg-retro-mint',
      badge: 'LIVE',
    },
    {
      name: 'High-Yield Recurrence Heatmaps',
      desc: '14-year micro-theme frequency rankings',
      href: '/high-yield',
      icon: Flame,
      iconBg: 'bg-retro-accent',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2A2A2A]/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-Up Sheet */}
      <div className="relative w-full max-h-[85vh] overflow-y-auto bg-retro-window border-t-4 border-x-4 border-retro-border rounded-t-xl shadow-retro-lg z-10 flex flex-col animate-in slide-in-from-bottom duration-200">
        
        {/* Sheet Window Header */}
        <div className="sticky top-0 bg-retro-border text-white px-4 py-2.5 flex items-center justify-between font-vt text-lg border-b-2 border-retro-border z-20">
          <div className="flex items-center gap-2">
            <span>C:\SYSTEM\NAV_DRAWER.EXE</span>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 bg-retro-accent text-white border-2 border-white flex items-center justify-center font-sans font-bold text-xs hover:opacity-90 active:scale-95 transition-transform"
            aria-label="Close drawer"
          >
            ×
          </button>
        </div>

        {/* Auth Ribbon */}
        <div className="p-3 bg-white border-b-2 border-retro-border">
          {isLoading ? (
            <div className="p-2 bg-retro-window border border-retro-border text-center font-vt text-sm">
              CONNECTING...
            </div>
          ) : isAuthenticated ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-full border-2 border-retro-border bg-retro-folder flex items-center justify-center font-vt font-bold text-sm shrink-0">
                  {profile?.display_name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="min-w-0">
                  <div className="font-space font-bold text-xs text-retro-border truncate">
                    {profile?.display_name || 'Aspirant'}
                  </div>
                  <div className="font-sans text-[10px] text-retro-border/60 truncate">
                    {profile?.email}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  signOut();
                  onClose();
                }}
                className="text-xs font-vt text-retro-accent border border-retro-accent px-2 py-1 hover:bg-retro-accent hover:text-white transition-colors shrink-0"
              >
                SIGN OUT
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onClose();
                openAuthModal('login');
              }}
              className="w-full bg-retro-accent text-white border-2 border-retro-border py-2 px-3 font-vt text-base tracking-wider shadow-retro-sm hover:bg-[#c95444] transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>LOGIN / SIGNUP TO SYNC NOTES</span>
            </button>
          )}
        </div>

        {/* Navigation Grid / List */}
        <div className="p-3 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isExploreSpecial = item.href === '/explore';
            const active = isExploreSpecial
              ? (pathname === '/explore' || pathname === '/papers' || (pathname.startsWith('/papers/') && !pathname.includes('gs') && !pathname.includes('essay')))
              : pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between p-2.5 border-2 border-retro-border transition-all active:translate-y-0.5 ${
                  active
                    ? 'bg-retro-border text-white shadow-none'
                    : 'bg-white hover:bg-retro-window shadow-retro-sm text-retro-border'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 ${item.iconBg} border-2 border-retro-border flex items-center justify-center text-white shrink-0 shadow-[1px_1px_0px_#2A2A2A]`}>
                    <Icon className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-space font-bold text-xs truncate">
                      {item.name}
                    </div>
                    <div className={`font-sans text-[10px] truncate ${active ? 'text-white/80' : 'text-retro-border/70'}`}>
                      {item.desc}
                    </div>
                  </div>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-space font-bold px-2 py-0.5 border shrink-0 ml-2 ${
                    active
                      ? 'bg-retro-accent text-white border-white'
                      : 'bg-retro-accent text-white border-retro-border shadow-[1px_1px_0px_#2A2A2A]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Contact & Support Section */}
          <div className="pt-2">
            <a
              href="mailto:theupscbreakdown@gmail.com"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 bg-[#FFF9E6] border-2 border-dashed border-retro-border text-retro-border hover:bg-retro-window transition-colors"
            >
              <div className="flex items-center gap-2 font-space text-xs font-bold">
                <Mail className="w-4 h-4 text-retro-accent" />
                <span>Contact Team & Feedback</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-retro-border/60" />
            </a>
          </div>
        </div>

        {/* Footer padding for safe area */}
        <div className="h-6" />
      </div>
    </div>
  );
}
