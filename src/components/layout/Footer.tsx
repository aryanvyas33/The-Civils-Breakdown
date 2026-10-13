'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Check, Copy } from 'lucide-react';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const contactEmail = 'theupscbreakdown@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <footer id="contact" className="border-t-4 border-retro-border pt-10 mt-16 bg-white p-6 shadow-retro pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tagline Banner: UNIQUE TAGLINE (No Duplication) */}
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="bg-[#181B1D] border-3 border-retro-border text-retro-folder px-6 sm:px-10 py-3.5 font-vt text-xl sm:text-2xl tracking-wide shadow-retro-sm max-w-3xl w-full">
            "WE BREAK DOWN THE QUESTIONS. YOU BUILD THE INTELLECT."
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b-2 border-retro-border">
          
          {/* Col 1: Brand & Description */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-3 group">
              <img
                src="/prism_logo_mark.png"
                alt="The UPSC Breakdown"
                className="h-10 w-auto object-contain filter drop-shadow-[2px_2px_0px_rgba(42,42,42,0.3)] group-hover:scale-105 transition-transform"
              />
              <span className="font-vt font-bold text-2xl uppercase text-retro-border tracking-wide">
                THE_UPSC_BREAKDOWN
              </span>
            </Link>
            <p className="font-space text-xs text-retro-border/80 max-w-sm leading-relaxed mb-4">
              An open, framework-driven repository of UPSC Civil Services Mains questions (2013–2026). Designed to sharpen independent critical thinking and structural answer writing.
            </p>
            <span className="retro-badge bg-retro-folder text-retro-border text-xs font-vt font-bold shadow-none">
              1,131 VERIFIED QUESTIONS · 14 YEARS
            </span>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col">
            <span className="font-vt text-lg uppercase font-bold text-retro-border mb-3 border-b border-retro-border pb-1">
              Papers & Exploration
            </span>
            <div className="grid grid-cols-2 gap-2 font-vt text-lg uppercase text-retro-border">
              <Link href="/explore/gs1" className="hover:text-retro-accent hover:underline">GS Paper 1</Link>
              <Link href="/explore/gs2" className="hover:text-retro-accent hover:underline">GS Paper 2</Link>
              <Link href="/explore/gs3" className="hover:text-retro-accent hover:underline">GS Paper 3</Link>
              <Link href="/explore/gs4" className="hover:text-retro-accent hover:underline">GS Paper 4</Link>
              <Link href="/explore/essay" className="hover:text-retro-accent hover:underline">Essay Paper</Link>
              <Link href="/high-yield" className="hover:text-retro-accent hover:underline">High Yield</Link>
              <Link href="/current-affairs" className="hover:text-retro-accent hover:underline">Current Affairs</Link>
              <Link href="/search" className="hover:text-retro-accent hover:underline">Search Engine</Link>
              <Link href="/saved" className="hover:text-retro-accent hover:underline">My Vault</Link>
            </div>
          </div>

          {/* Col 3: Official Contact Panel */}
          <div className="flex flex-col bg-retro-window border-3 border-retro-border p-5 shadow-retro-sm">
            <div className="flex items-center gap-2 mb-2 font-vt text-xl text-retro-border font-bold">
              <Mail className="w-5 h-5 text-retro-accent" />
              <span>OFFICIAL CONTACT SUPPORT</span>
            </div>
            
            <p className="font-space text-xs text-retro-border/80 leading-relaxed mb-4">
              Have PYQ questions, syllabus mapping corrections, or feedback on our upcoming Note-Making tool? Reach out to our team directly:
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <a
                href={`mailto:${contactEmail}`}
                className="font-space text-xs font-bold bg-white border-2 border-retro-border px-3 py-2 text-retro-border hover:bg-retro-border hover:text-white transition-colors truncate flex-1"
                title="Send email"
              >
                {contactEmail}
              </a>
              
              <button
                type="button"
                onClick={handleCopyEmail}
                className="retro-btn text-xs font-vt uppercase flex items-center justify-center gap-1.5 whitespace-nowrap bg-white hover:bg-retro-folder"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-700" />
                    <span>✓ COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Meta Row */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-xs font-space text-gray-500 gap-4">
          <div className="shrink-0">
            © {new Date().getFullYear()} The UPSC Breakdown (theupscbreakdown.com) · All rights reserved.
          </div>
          <div className="text-[11px] max-w-xl text-center md:text-right leading-relaxed">
            The UPSC Breakdown is an independent educational platform and is not affiliated with, authorized, or endorsed by the Union Public Service Commission.
          </div>
        </div>

      </div>
    </footer>
  );
}
