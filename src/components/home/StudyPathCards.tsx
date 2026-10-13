import React from 'react';
import Link from 'next/link';
import { BookOpen, Flame, ArrowUpRight, Zap } from 'lucide-react';

export default function StudyPathCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-3 border-b-2 border-retro-border gap-3">
        <div>
          <span className="retro-tag text-[11px] mb-2 inline-block">METHODOLOGY</span>
          <h2 className="font-vt text-3xl sm:text-4xl uppercase tracking-wide text-retro-border flex items-center gap-2">
            <span>Choose Your Study Approach</span>
          </h2>
        </div>
        <p className="font-space text-xs sm:text-sm text-retro-border/80 max-w-md">
          Targeted entry points tailored to your current revision phase.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 max-w-7xl mx-auto">
        
        {/* Path 1: Syllabus Explorer */}
        <div className="retro-container p-6 sm:p-7 hover:-translate-y-1.5 transition-all duration-200 group flex flex-col justify-between bg-retro-window border-4">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 border-3 border-retro-border bg-retro-gs1 text-white flex items-center justify-center shadow-retro-sm group-hover:rotate-3 transition-transform">
                <BookOpen className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="font-vt text-sm px-2 py-0.5 bg-white border-2 border-retro-border text-retro-border font-bold">
                PATH 01
              </span>
            </div>

            <h3 className="font-space font-bold text-lg sm:text-xl mb-2.5 uppercase text-retro-border flex items-center justify-between">
              <span>Syllabus Explorer</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-y-0.5 transition-all text-retro-border" />
            </h3>

            <p className="font-space text-xs sm:text-sm text-retro-border/85 leading-relaxed mb-6">
              Deconstruct the official UPSC syllabus line-by-line. Inspect what has been asked from every single syllabus pointer and subtopic across GS1–4 and Essay.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
              <Link href="/explore/gs1" className="retro-badge bg-retro-gs1 text-white hover:opacity-90 text-[11px]">GS1</Link>
              <Link href="/explore/gs2" className="retro-badge bg-retro-gs2 text-white hover:opacity-90 text-[11px]">GS2</Link>
              <Link href="/explore/gs3" className="retro-badge bg-retro-gs3 text-white hover:opacity-90 text-[11px]">GS3</Link>
              <Link href="/explore/gs4" className="retro-badge bg-retro-gs4 text-white hover:opacity-90 text-[11px]">GS4</Link>
              <Link href="/explore/essay" className="retro-badge bg-retro-essay text-white hover:opacity-90 text-[11px]">ESSAY</Link>
            </div>

            <Link
              href="/explore/gs1"
              className="retro-btn w-full block text-center uppercase text-base hover:bg-retro-gs1 hover:text-white transition-colors"
            >
              Open Syllabus Tree →
            </Link>
          </div>
        </div>

        {/* Path 2: High-Yield & Repeated Trends */}
        <div className="retro-container p-6 sm:p-7 hover:-translate-y-1.5 transition-all duration-200 group flex flex-col justify-between bg-retro-window border-4">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 border-3 border-retro-border bg-retro-accent text-white flex items-center justify-center shadow-retro-sm group-hover:rotate-3 transition-transform">
                <Flame className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="font-vt text-sm px-2 py-0.5 bg-white border-2 border-retro-border text-retro-border font-bold">
                PATH 02
              </span>
            </div>

            <h3 className="font-space font-bold text-lg sm:text-xl mb-2.5 uppercase text-retro-border flex items-center justify-between">
              <span>High-Yield Trends</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-y-0.5 transition-all text-retro-border" />
            </h3>

            <p className="font-space text-xs sm:text-sm text-retro-border/85 leading-relaxed mb-6">
              Spot repeated themes across a 14-year horizon. Leverage syllabus micro-themes, directives, and recurring structural templates for maximum marks return.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
              <Link href="/search?q=Sustainable+development" className="retro-badge bg-[#FFD1D1] text-retro-accent border-retro-accent text-[11px]">SUSTAINABILITY</Link>
              <Link href="/search?q=Federalism" className="retro-badge bg-[#FFD1D1] text-retro-accent border-retro-accent text-[11px]">FEDERALISM</Link>
              <Link href="/search?q=Climate+change" className="retro-badge bg-[#FFD1D1] text-retro-accent border-retro-accent text-[11px]">CLIMATE</Link>
              <Link href="/search?q=Ethics" className="retro-badge bg-[#FFD1D1] text-retro-accent border-retro-accent text-[11px]">ETHICS</Link>
            </div>

            <Link
              href="/high-yield"
              className="retro-btn w-full block text-center uppercase text-base hover:bg-retro-accent hover:text-white transition-colors"
            >
              Analyze High-Yield Tags →
            </Link>
          </div>
        </div>

        {/* Path 3: Current Affairs Priority Tracker */}
        <div className="retro-container p-6 sm:p-7 hover:-translate-y-1.5 transition-all duration-200 group flex flex-col justify-between bg-retro-window border-4">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 border-3 border-retro-border bg-[#0D9488] text-white flex items-center justify-center shadow-retro-sm group-hover:rotate-3 transition-transform">
                <Zap className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-vt text-xs px-1.5 py-0.5 bg-[#FFD25A] border-2 border-retro-border text-retro-border font-bold">
                  MAINS 2027
                </span>
                <span className="font-vt text-sm px-2 py-0.5 bg-white border-2 border-retro-border text-retro-border font-bold">
                  PATH 03
                </span>
              </div>
            </div>

            <h3 className="font-space font-bold text-lg sm:text-xl mb-2.5 uppercase text-retro-border flex items-center justify-between">
              <span>Current Affairs Tracker</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-y-0.5 transition-all text-retro-border" />
            </h3>

            <p className="font-space text-xs sm:text-sm text-retro-border/85 leading-relaxed mb-6">
              Cut through monthly magazine bloat. 59 contemporary themes ranked by an 8-parameter probability model. Focus on Band A must-covers and cross-paper linkages.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
              <Link href="/current-affairs" className="retro-badge bg-[#D1FAF0] text-[#0D9488] border-[#0D9488] text-[11px]">BAND A (MUST-COVER)</Link>
              <Link href="/current-affairs" className="retro-badge bg-[#D1FAF0] text-[#0D9488] border-[#0D9488] text-[11px]">16TH FC</Link>
              <Link href="/current-affairs" className="retro-badge bg-[#D1FAF0] text-[#0D9488] border-[#0D9488] text-[11px]">NDC 2035</Link>
              <Link href="/current-affairs" className="retro-badge bg-[#D1FAF0] text-[#0D9488] border-[#0D9488] text-[11px]">AI ETHICS</Link>
            </div>

            <Link
              href="/current-affairs"
              className="retro-btn w-full block text-center uppercase text-base hover:bg-[#0D9488] hover:text-white transition-colors"
            >
              Launch Priority Tracker →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
