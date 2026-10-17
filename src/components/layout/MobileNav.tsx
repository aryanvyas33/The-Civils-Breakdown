'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Bookmark, Compass, Flame } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();

  const links = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Explore', href: '/explore', icon: Compass },
    { label: 'Search', href: '/search', icon: Search },
    { label: 'High Yield', href: '/high-yield', icon: Flame },
    { label: 'My Vault', href: '/saved', icon: Bookmark },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-retro-window/98 backdrop-blur-md border-t-3 border-retro-border px-2 pt-2 pb-3.5 flex justify-around items-center z-40 shadow-[0_-3px_0px_rgba(42,42,42,0.12)]">
      {links.map((link) => {
        const Icon = link.icon;
        const active = link.href === '/' 
          ? pathname === '/' 
          : link.href === '/explore'
            ? pathname.startsWith('/explore') || pathname.startsWith('/papers') || pathname.startsWith('/syllabus')
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.label}
            href={link.href}
            className={`flex flex-col items-center py-1 transition-all focus:outline-none ${
              active ? 'text-retro-accent font-bold scale-105' : 'text-retro-border/70 hover:text-retro-border'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="font-vt text-[13px] tracking-wide uppercase leading-none">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
