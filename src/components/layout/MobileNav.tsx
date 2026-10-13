'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, LayoutGrid, Bookmark, BookOpen, Compass } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();

  const links = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Explore', href: '/explore', icon: Compass },
    { label: 'Search', href: '/search', icon: Search },
    { label: 'My Vault', href: '/saved', icon: Bookmark },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-bordercolor px-6 pt-2.5 pb-4 flex justify-around items-center z-40 shadow-lg">
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
            className={`flex flex-col items-center py-1 transition-colors ${
              active ? 'text-accent font-semibold' : 'text-muted hover:text-primary'
            }`}
          >
            <Icon className={`w-5 h-5 mb-1 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[10px] tracking-tight">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
