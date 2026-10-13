import React from 'react';
import Link from 'next/link';
import SearchBar from '@/components/search/SearchBar';
import MarqueeTicker from '@/components/home/MarqueeTicker';
import FeatureShowcase from '@/components/home/FeatureShowcase';
import StudyPathCards from '@/components/home/StudyPathCards';
import YearTimeline from '@/components/home/YearTimeline';
import { getStats } from '@/lib/data';
import { Terminal, Zap } from 'lucide-react';

const QUICK_SEARCH_PROMPTS = [
  'Federalism',
  '16th Finance Commission',
  'Climate Change',
  'Ethics Case Studies',
  'Artificial Intelligence',
  'Judicial Activism',
];

export default function HomePage() {
  const stats = getStats();
  const totalQuestions = stats.totalQuestions || 1131;

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          
          {/* Left Side: 60% Copy & Search */}
          <div className="w-full lg:w-[60%] flex flex-col items-start space-y-5">

            {/* Primary H1: Swapped Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-vt uppercase leading-[0.92] tracking-tighter text-retro-border">
              DON'T OUTSOURCE YOUR<br />
              INTELLECT TO AI.<br />
              <span className="text-retro-accent underline decoration-4 underline-offset-4">STRUCTURE IT.</span>
            </h1>

            {/* Sub-Tagline Bar */}
            <div className="inline-flex items-center gap-2 bg-white border-3 border-retro-border px-3.5 py-1.5 shadow-retro-sm text-xs sm:text-sm font-space font-bold text-retro-border">
              <Zap className="w-4 h-4 text-retro-accent shrink-0 fill-retro-accent" />
              <span>EVERY QUESTION. EVERY YEAR. ONE SEARCH.</span>
            </div>

            {/* Value Proposition Description */}
            <p className="text-sm sm:text-base text-retro-border/90 leading-relaxed max-w-2xl bg-white/80 p-3 border-2 border-dashed border-retro-border font-medium shadow-[2px_2px_0px_#2A2A2A]">
              Generative AI outputs generic prose. UPSC rewards <b>framework-driven thinking</b>. Search 14 years of past papers across GS1–GS4 and Essay, identify recurring micro-themes, and build mental models to tackle unpredictable mains questions with absolute clarity.
            </p>

            {/* Main Interactive Search */}
            <div className="w-full max-w-2xl pt-1">
              <SearchBar size="hero" />

              {/* Quick Search Prompts / Suggestion Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5">
                <span className="text-xs font-vt uppercase text-retro-border font-bold flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-retro-accent" />
                  Try Prompt:
                </span>
                {QUICK_SEARCH_PROMPTS.map((prompt) => (
                  <Link
                    key={prompt}
                    href={`/search?q=${encodeURIComponent(prompt)}`}
                    className="text-xs font-space font-bold px-2 py-0.5 bg-white border border-retro-border text-retro-border hover:bg-retro-accent hover:text-white transition-colors shadow-[1px_1px_0px_#2A2A2A]"
                  >
                    "{prompt}"
                  </Link>
                ))}
              </div>

              {/* Stats Chips */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-5">
                <Link
                  href="/current-affairs"
                  className="inline-flex items-center px-2.5 py-1 bg-[#D1FAF0] border-2 border-retro-border text-xs sm:text-sm font-bold text-retro-border shadow-retro-sm hover:bg-[#50E3C2] transition-colors group cursor-pointer"
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-retro-border bg-[#0D9488] mr-2 group-hover:scale-110 transition-transform" />
                  <span>59 Mains 2027 CA Dossiers</span>
                  <span className="ml-1.5 text-[10px] bg-[#0D9488] text-white px-1.5 py-0.2 font-space uppercase">NEW</span>
                </Link>
                <span className="inline-flex items-center px-2.5 py-1 bg-white border-2 border-retro-border text-xs sm:text-sm font-bold text-retro-border shadow-retro-sm">
                  <span className="w-2.5 h-2.5 rounded-full border border-retro-border bg-retro-gs1 mr-2" />
                  {totalQuestions.toLocaleString()}+ Verified Qs
                </span>
                <span className="inline-flex items-center px-2.5 py-1 bg-white border-2 border-retro-border text-xs sm:text-sm font-bold text-retro-border shadow-retro-sm">
                  <span className="w-2.5 h-2.5 rounded-full border border-retro-border bg-retro-gs2 mr-2" />
                  5 Papers
                </span>
                <span className="inline-flex items-center px-2.5 py-1 bg-white border-2 border-retro-border text-xs sm:text-sm font-bold text-retro-border shadow-retro-sm">
                  <span className="w-2.5 h-2.5 rounded-full border border-retro-border bg-retro-gs3 mr-2" />
                  14 Years (2013-2026)
                </span>
                <span className="inline-flex items-center px-2.5 py-1 bg-white border-2 border-retro-border text-xs sm:text-sm font-bold text-retro-border shadow-retro-sm">
                  <span className="w-2.5 h-2.5 rounded-full border border-retro-border bg-retro-folder mr-2" />
                  35+ Syllabus Pointers
                </span>
                <span className="inline-flex items-center px-2.5 py-1 bg-[#FFF9E6] border-2 border-retro-border text-xs sm:text-sm font-bold text-retro-border shadow-retro-sm">
                  <span className="w-2.5 h-2.5 rounded-full border border-retro-border bg-retro-accent mr-2" />
                  Note-Making [Coming Soon]
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: 40% Interactive Retro OS Papers Window */}
          <div className="w-full lg:w-[40%] justify-center lg:justify-end hidden md:flex">
            <div className="relative p-9 bg-retro-window border-4 border-retro-border shadow-retro-lg grid grid-cols-2 grid-rows-2 gap-7 transform -rotate-1.5 hover:rotate-0 transition-transform duration-300 w-full max-w-[380px]">
              
              {/* Window Header */}
              <div className="absolute -top-[22px] left-[-4px] right-[-4px] bg-retro-border text-white font-vt text-xl px-3 py-1 flex justify-between items-center">
                <span>C:\UPSC_SYSTEM\PAPERS</span>
                <div className="flex gap-1.5">
                  <div className="w-3.5 h-3.5 bg-retro-window border-2 border-retro-border"></div>
                  <div className="w-3.5 h-3.5 bg-retro-accent border-2 border-retro-border flex items-center justify-center leading-none text-xs text-white">×</div>
                </div>
              </div>

              {/* Folder: GS1 */}
              <Link href="/explore/gs1" className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none">
                <div className="w-16 h-12 relative bg-retro-gs1 border-4 border-retro-border rounded shadow-[inset_-5px_-5px_0px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform">
                  <div className="absolute -top-3 -left-1 w-7 h-3 bg-retro-gs1 border-4 border-retro-border border-b-0 rounded-t"></div>
                  <div className="absolute bottom-1.5 left-2 right-2 h-1 bg-white/50"></div>
                </div>
                <span className="font-vt text-2xl bg-white px-2 border-2 border-retro-border text-retro-border font-bold group-hover:bg-retro-gs1 group-hover:text-white transition-colors">
                  GS1
                </span>
                <span className="font-space text-[10px] text-retro-border/80 font-bold">280 Questions</span>
              </Link>

              {/* Folder: GS2 */}
              <Link href="/explore/gs2" className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none">
                <div className="w-16 h-12 relative bg-retro-gs2 border-4 border-retro-border rounded shadow-[inset_-5px_-5px_0px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform">
                  <div className="absolute -top-3 -left-1 w-7 h-3 bg-retro-gs2 border-4 border-retro-border border-b-0 rounded-t"></div>
                  <div className="absolute bottom-1.5 left-2 right-2 h-1 bg-white/50"></div>
                </div>
                <span className="font-vt text-2xl bg-white px-2 border-2 border-retro-border text-retro-border font-bold group-hover:bg-retro-gs2 group-hover:text-white transition-colors">
                  GS2
                </span>
                <span className="font-space text-[10px] text-retro-border/80 font-bold">280 Questions</span>
              </Link>

              {/* Folder: GS3 */}
              <Link href="/explore/gs3" className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none">
                <div className="w-16 h-12 relative bg-retro-gs3 border-4 border-retro-border rounded shadow-[inset_-5px_-5px_0px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform">
                  <div className="absolute -top-3 -left-1 w-7 h-3 bg-retro-gs3 border-4 border-retro-border border-b-0 rounded-t"></div>
                  <div className="absolute bottom-1.5 left-2 right-2 h-1 bg-white/50"></div>
                </div>
                <span className="font-vt text-2xl bg-white px-2 border-2 border-retro-border text-retro-border font-bold group-hover:bg-retro-gs3 group-hover:text-white transition-colors">
                  GS3
                </span>
                <span className="font-space text-[10px] text-retro-border/80 font-bold">280 Questions</span>
              </Link>

              {/* Folder: GS4 */}
              <Link href="/explore/gs4" className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none">
                <div className="w-16 h-12 relative bg-retro-gs4 border-4 border-retro-border rounded shadow-[inset_-5px_-5px_0px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform">
                  <div className="absolute -top-3 -left-1 w-7 h-3 bg-retro-gs4 border-4 border-retro-border border-b-0 rounded-t"></div>
                  <div className="absolute bottom-1.5 left-2 right-2 h-1 bg-white/50"></div>
                </div>
                <span className="font-vt text-2xl bg-white px-2 border-2 border-retro-border text-retro-border font-bold group-hover:bg-retro-gs4 group-hover:text-white transition-colors">
                  GS4
                </span>
                <span className="font-space text-[10px] text-retro-border/80 font-bold">179 Questions</span>
              </Link>

              {/* Central Essay Floppy Disk Badge */}
              <Link
                href="/explore/essay"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-retro-border p-3 shadow-retro flex flex-col items-center gap-1 z-10 hover:bg-retro-folder transition-colors group cursor-pointer focus:outline-none"
              >
                <div className="w-8 h-8 bg-retro-essay border-2 border-retro-border relative flex items-center justify-center">
                  <div className="absolute top-0 left-1 w-4 h-2 bg-white border-b-2 border-l-2 border-r-2 border-retro-border"></div>
                </div>
                <span className="font-vt text-lg font-bold text-retro-border">
                  ESSAY
                </span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Infinite Marquee Ticker */}
      <MarqueeTicker />

      {/* 3. The Interactive Feature Showcase Slideshow */}
      <FeatureShowcase />

      {/* 4. Choose Your Study Approach */}
      <StudyPathCards />

      {/* 5. Chronological Year Timeline Archive (2013-2026) */}
      <YearTimeline />

    </div>
  );
}
