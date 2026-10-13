'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Mail } from 'lucide-react';
import { getBookmarkedIds } from '@/lib/bookmarks';
import { getAllNotes } from '@/lib/notes';
import { useAuth } from '@/hooks/useAuth';
import UserMenuDropdown from '@/components/auth/UserMenuDropdown';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedCount, setSavedCount] = useState<number>(0);
  const { isAuthenticated, openAuthModal, profile, signOut } = useAuth();

  useEffect(() => {
    const updateSaved = () => {
      setSavedCount(getBookmarkedIds().length + getAllNotes().length);
    };
    updateSaved();
    window.addEventListener('pyq-bookmarks-updated', updateSaved);
    window.addEventListener('pyq-notes-updated', updateSaved);
    return () => {
      window.removeEventListener('pyq-bookmarks-updated', updateSaved);
      window.removeEventListener('pyq-notes-updated', updateSaved);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Search', href: '/search' },
    { name: 'High Yield', href: '/high-yield' },
    { name: 'Current Affairs', href: '/current-affairs', badgeText: 'NEW' },
    { name: 'My Vault', href: '/saved', badge: savedCount > 0 ? savedCount : null },
    { name: 'Contact', href: '#contact', isContact: true },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '#contact') return false;
    if (href === '/explore') {
      return pathname.startsWith('/explore') || pathname.startsWith('/papers') || pathname.startsWith('/syllabus');
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-retro-window border-b-4 border-retro-border py-2 px-4 sm:px-6 flex justify-between items-center font-vt text-lg sticky top-0 z-50 shadow-[0px_4px_0px_rgba(42,42,42,0.12)]">
      
      <div className="flex items-center gap-4 md:gap-8 text-retro-border">
        
        {/* Brand with Prism Logo Mark */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-95 transition-all focus:outline-none group"
        >
          <img
            src="/prism_logo_mark.png"
            alt="The UPSC Breakdown"
            className="h-9 sm:h-10 w-auto object-contain filter drop-shadow-[2px_2px_0px_rgba(42,42,42,0.35)] group-hover:scale-105 transition-transform"
          />
          <span className="text-xl sm:text-2xl tracking-wide uppercase font-vt text-retro-border font-bold">
            THE_UPSC_BREAKDOWN
          </span>
        </Link>

        {/* Main Navigation Links */}
        <div className="hidden sm:flex gap-1 text-xl items-center">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link 
                key={link.name}
                href={link.href}
                className={`cursor-pointer px-3 py-0.5 transition-colors flex items-center gap-2 focus:outline-none ${
                  link.isContact
                    ? 'border border-dashed border-retro-border hover:bg-retro-border hover:text-white ml-2 text-base font-space'
                    : active 
                      ? 'bg-retro-border text-white font-bold' 
                      : 'hover:bg-retro-border hover:text-white'
                }`}
              >
                {link.isContact && <Mail className="w-3.5 h-3.5 inline" />}
                <span>{link.name}</span>
                {link.badge !== null && link.badge !== undefined && (
                  <span className="bg-retro-accent text-white text-xs px-1.5 py-0.5 leading-none font-sans font-bold border border-transparent shadow-[1px_1px_0px_#2A2A2A]">
                    {link.badge}
                  </span>
                )}
                {link.badgeText && (
                  <span className="bg-retro-accent text-white text-xs px-1.5 py-0.5 leading-none font-sans font-bold border border-transparent shadow-[1px_1px_0px_#2A2A2A]">
                    {link.badgeText}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right Side System Tray & Mobile Menu */}
      <div className="flex items-center gap-3 sm:gap-4 text-retro-border font-bold text-xl">
        <div className="hidden md:flex gap-2 items-center">
          <div className="w-3.5 h-3.5 border-2 border-retro-border bg-white" title="Archive Database Online"></div>
          <div className="w-3.5 h-3.5 border-2 border-retro-border bg-retro-accent" title="Indexed Questions: 1,131"></div>
        </div>
        <div className="hidden sm:block text-xs font-space font-medium text-retro-border/80">LIVE 2013-2026</div>

        {/* Auth CTA or User Menu */}
        {isAuthenticated ? (
          <UserMenuDropdown />
        ) : (
          <button
            type="button"
            onClick={() => openAuthModal('login')}
            className="hidden sm:inline-flex items-center bg-retro-border text-white border-2 border-retro-border py-1 px-3 font-vt text-lg tracking-wider shadow-retro-sm hover:bg-retro-accent hover:border-retro-accent hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer select-none"
          >
            LOGIN / SIGNUP
          </button>
        )}
        
        {/* Mobile Hamburger */}
        <button
          className="sm:hidden p-1 hover:bg-retro-border hover:text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-retro-window border-b-4 border-retro-border shadow-retro-lg flex flex-col p-3 z-50 divide-y divide-retro-border/20">
          {isAuthenticated ? (
            <div className="flex items-center justify-between p-2 mb-2 bg-white border-2 border-retro-border">
              <div className="truncate pr-2">
                <div className="font-vt text-xl font-bold truncate">{profile?.display_name || 'Aspirant'}</div>
                <div className="font-space text-[10px] text-retro-border/70 truncate">{profile?.email}</div>
              </div>
              <button
                type="button"
                onClick={() => { signOut(); setMobileMenuOpen(false); }}
                className="font-vt text-base text-retro-accent border border-retro-accent px-2 py-0.5 shrink-0"
              >
                SIGN OUT
              </button>
            </div>
          ) : (
            <div className="p-1 mb-2">
              <button
                type="button"
                onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                className="w-full bg-retro-accent text-white border-2 border-retro-accent py-2 font-vt text-xl tracking-wider text-center shadow-retro-sm cursor-pointer"
              >
                LOGIN / SIGNUP
              </button>
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2 text-xl font-bold uppercase ${
                isActive(link.href)
                  ? 'bg-retro-border text-white'
                  : 'text-retro-border hover:bg-retro-border hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                {link.isContact && <Mail className="w-4 h-4" />}
                {link.name}
              </span>
              {link.badge !== null && link.badge !== undefined && (
                <span className="bg-retro-accent text-white text-xs px-2 py-1 leading-none font-sans font-bold border border-transparent">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
