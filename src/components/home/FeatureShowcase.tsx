'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface SlideData {
  number: string;
  isSoon?: boolean;
  title: string;
  desc: string;
  points: string[];
  terminalTitle: string;
}

const SLIDES: SlideData[] = [
  {
    number: '01',
    title: 'Keyword Search Across 14 Years',
    desc: 'Search any concept, scheme, or constitutional term. Instantly surface every time UPSC tested it, complete with examiner directives (Discuss, Critically Examine) highlighted.',
    points: [
      'Instant full-text indexing across 1,100+ questions',
      'Auto-highlights directives, key institutions, & years',
      'Filter down to specific GS papers with 1 click',
    ],
    terminalTitle: 'TERMINAL://SEARCH_ENGINE.EXE — KEYWORD SEARCH',
  },
  {
    number: '02',
    title: 'High-Yield Topic Heatmaps',
    desc: "Stop guessing what's important. Our frequency engine calculates the exact historical recurrence of syllabus micro-topics so you prioritize high-probability areas first.",
    points: [
      'Visual frequency heatmaps per GS paper',
      'Identifies 14-year trend surges vs dormant topics',
      'Saves 40+ hours of manual PYQ sorting',
    ],
    terminalTitle: 'TERMINAL://HEATMAP_ENGINE.EXE — HIGH-YIELD FREQUENCY',
  },
  {
    number: '03',
    title: 'Official Syllabus Hierarchy Browse',
    desc: 'Navigate the syllabus as a structured tree. Click any official UPSC syllabus pointer to see every real question mapped directly to that exact line.',
    points: [
      'Organized strictly according to UPSC CSE notifications',
      'Sub-topic branches with question count badges',
      'Zero unmapped or orphaned questions',
    ],
    terminalTitle: 'TERMINAL://SYLLABUS_TREE.EXE — SYLLABUS MAPPING',
  },
  {
    number: '04',
    title: 'My Vault: Question Bookmarking',
    desc: 'Pin difficult or recurring questions to your personal Vault. Persists locally in your browser so you have your customized revision deck ready anytime without signing in.',
    points: [
      'Instant 1-click bookmarking from search results',
      'Offline persistence in local browser storage',
      'Direct export to print-friendly revision sheets',
    ],
    terminalTitle: 'TERMINAL://MY_VAULT.EXE — SAVED QUESTIONS',
  },
  {
    number: '05',
    title: 'Current Affairs Priority Engine (Mains 2027)',
    desc: 'Cut through monthly current affairs noise. 59 shortlisted contemporary dossiers scored against 14 years of past papers across 8 calibrated parameters to calculate the exact probability P(asked in Mains 2027).',
    points: [
      '8-parameter predictive scoring model with logistic probability calibration',
      'Actionable triage bands: Band A (Must-Cover Deep Dives) vs Band B/C (Quick Reads)',
      'Multi-paper cross-linking (GS1–GS4) with live persistence boost and XP tracking',
    ],
    terminalTitle: 'TERMINAL://CA_PRIORITY_TRACKER.SYS — MAINS 2027 DOSSIER',
  },
  {
    number: '06',
    isSoon: true,
    title: 'Integrated Note-Making Tool',
    desc: 'Attach structured frameworks directly to PYQs. Formulate your introduction, body dimensions (PESTLE), case laws, and conclusion right next to the question.',
    points: [
      'Directly link notes to individual UPSC questions',
      'Pre-built answer structuring templates (intro/body/way forward)',
      'Export your synthesized vault notes into revision booklets',
    ],
    terminalTitle: 'TERMINAL://NOTE_MAKER.EXE — NOTEMAKING TOOL [COMING SOON]',
  },
];

const SLIDE_DURATION = 5000; // 5 seconds per slide
const TICK_INTERVAL = 50;

export default function FeatureShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TICK_INTERVAL / SLIDE_DURATION) * 100;
        if (next >= 100) {
          setCurrentSlide((curr) => (curr + 1) % SLIDES.length);
          return 0;
        }
        return next;
      });
    }, TICK_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentSlide]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((curr) => (curr - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentSlide((curr) => (curr + 1) % SLIDES.length);
    setProgress(0);
  };

  const current = SLIDES[currentSlide];

  return (
    <section className="bg-[#202428] text-[#F8F5EE] border-y-4 border-retro-border py-12 md:py-20 relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-10 pb-4 border-b-2 border-dashed border-[#4A5568] gap-4">
          <div>
            <div className="font-vt text-xl text-retro-folder tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>CORE WORKFLOW ENGINE</span>
            </div>
            <h2 className="font-vt text-3xl sm:text-5xl uppercase tracking-tight text-white mt-0.5">
              WHAT YOU CAN DO WITH THE BREAKDOWN
            </h2>
          </div>
          <div className="font-space text-xs sm:text-sm bg-[#2D3748] border-2 border-retro-folder text-retro-folder px-3 py-1 font-bold self-start sm:self-auto shadow-retro-sm">
            FEATURE {current.number} OF {String(SLIDES.length).padStart(2, '0')}
          </div>
        </div>

        {/* Showcase Grid: Info Left (45%), Demo Stage Right (55%) */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Left Column: Info Pane */}
          <div className="flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-vt text-5xl sm:text-6xl leading-none text-retro-folder font-bold">
                  {current.number}
                </span>
                <span
                  className={`text-xs font-sans font-bold px-2.5 py-1 border-2 tracking-wide uppercase ${
                    current.isSoon
                      ? 'bg-retro-accent text-white border-retro-folder'
                      : 'bg-retro-gs1 text-white border-white'
                  }`}
                >
                  {current.isSoon ? '★ COMING SOON' : '● LIVE FEATURE'}
                </span>
              </div>

              <h3 className="font-vt text-2xl sm:text-4xl uppercase text-white mb-3 tracking-wide leading-tight">
                {current.title}
              </h3>

              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-xl">
                {current.desc}
              </p>

              <ul className="space-y-2 text-xs sm:text-sm font-space text-slate-200 mb-8">
                {current.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-retro-folder mt-0.5">▶</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-dashed border-[#4A5568]">
              {/* Step Dots */}
              <div className="flex gap-2 mr-2">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`w-3.5 h-3.5 border-2 transition-all cursor-pointer ${
                      idx === currentSlide
                        ? 'bg-retro-folder border-white scale-110 shadow-[0_0_8px_#FFD25A]'
                        : 'bg-[#4A5568] border-slate-300 hover:border-white'
                    }`}
                    aria-label={`Jump to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <button
                type="button"
                onClick={prevSlide}
                className="bg-[#2D3748] text-white border-2 border-slate-300 font-vt text-lg px-3 py-0.5 hover:bg-retro-folder hover:text-retro-border hover:border-retro-border transition-colors flex items-center gap-1 shadow-retro-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREV</span>
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="bg-[#2D3748] text-white border-2 border-slate-300 font-vt text-lg px-3 py-0.5 hover:bg-retro-folder hover:text-retro-border hover:border-retro-border transition-colors flex items-center gap-1 shadow-retro-sm"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Pause / Play Toggle */}
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="bg-[#2D3748] text-white border-2 border-slate-300 font-vt text-lg px-3 py-0.5 hover:bg-retro-folder hover:text-retro-border hover:border-retro-border transition-colors ml-auto flex items-center gap-1 shadow-retro-sm"
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>PLAY</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>PAUSE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Animated Retro OS Stage Window */}
          <div className="bg-retro-window border-4 border-retro-border text-retro-border shadow-[10px_10px_0px_#000] overflow-hidden flex flex-col min-h-[440px]">
            
            {/* Stage Titlebar */}
            <div className="bg-retro-border text-white font-vt text-lg px-3 py-1.5 flex justify-between items-center tracking-wide">
              <span className="truncate pr-2">{current.terminalTitle}</span>
              <div className="flex gap-1.5 shrink-0">
                <div className="w-3 h-3 bg-retro-window border border-retro-border"></div>
                <div className="w-3 h-3 bg-retro-accent border border-retro-border"></div>
              </div>
            </div>

            {/* Dynamic Progress Bar Track */}
            <div className="h-1 bg-[#4A5568] w-full">
              <div
                className="h-full bg-retro-folder transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Stage Canvas */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-center bg-retro-window bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:18px_18px]">
              
              {/* Panel 1: Keyword Search Demo */}
              {currentSlide === 0 && (
                <div className="bg-white border-3 border-retro-border p-4 shadow-retro-sm space-y-3 animate-fadeIn">
                  <div className="border-2 border-retro-border px-3 py-2 bg-[#FDFBF7] flex justify-between items-center font-space text-xs font-bold">
                    <span>QUERY: "federalism"</span>
                    <span className="bg-retro-gs2 text-white px-2 py-0.5 text-[10px]">GS2 & ESSAY</span>
                  </div>

                  <div className="bg-white border-2 border-retro-border p-2.5 font-space text-xs leading-relaxed">
                    <span className="bg-retro-border text-white text-[10px] font-bold px-1.5 py-0.5 mr-2">2023 · GS2 · Q4</span>
                    <div>
                      "The concept of <span className="bg-yellow-200 font-bold px-1 border-b-2 border-yellow-600">cooperative federalism</span> has evolved significantly. <span className="bg-blue-200 text-blue-900 font-bold px-1 border-b-2 border-blue-600">Discuss</span> the major friction points between Union and States."
                    </div>
                  </div>

                  <div className="bg-white border-2 border-retro-border p-2.5 font-space text-xs leading-relaxed">
                    <span className="bg-retro-border text-white text-[10px] font-bold px-1.5 py-0.5 mr-2">2020 · GS2 · Q14</span>
                    <div>
                      "<span className="bg-blue-200 text-blue-900 font-bold px-1 border-b-2 border-blue-600">Examine</span> the role of Finance Commission in strengthening <span className="bg-yellow-200 font-bold px-1 border-b-2 border-yellow-600">fiscal federalism</span> in light of recent fiscal tensions."
                    </div>
                  </div>

                  <div className="bg-white border-2 border-retro-border p-2.5 font-space text-xs leading-relaxed hidden sm:block">
                    <span className="bg-retro-border text-white text-[10px] font-bold px-1.5 py-0.5 mr-2">2017 · GS2 · Q3</span>
                    <div>
                      "Does the principle of <span className="bg-yellow-200 font-bold px-1 border-b-2 border-yellow-600">competitive federalism</span> foster developmental disparity? <span className="bg-blue-200 text-blue-900 font-bold px-1 border-b-2 border-blue-600">Critically analyze</span>."
                    </div>
                  </div>
                </div>
              )}

              {/* Panel 2: High Yield Heatmap Demo */}
              {currentSlide === 1 && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="font-vt text-lg flex justify-between items-center text-retro-border font-bold">
                    <span>GS2 POLITY & GOVERNANCE FREQUENCY METRICS</span>
                    <span className="text-retro-accent">SURGE DETECTED</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    <div className="bg-white border-2 border-retro-border p-2 shadow-retro-sm flex flex-col gap-1">
                      <span className="font-space text-xs font-bold truncate">FEDERALISM</span>
                      <div className="h-2 bg-slate-200 border border-retro-border overflow-hidden">
                        <div className="h-full bg-retro-accent w-full" />
                      </div>
                      <div className="flex justify-between text-[10px] font-space font-bold text-gray-600">
                        <span>14 Qs</span>
                        <span className="text-retro-accent">CRITICAL</span>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-retro-border p-2 shadow-retro-sm flex flex-col gap-1">
                      <span className="font-space text-xs font-bold truncate">JUDICIAL REVIEW</span>
                      <div className="h-2 bg-slate-200 border border-retro-border overflow-hidden">
                        <div className="h-full bg-retro-accent w-[90%]" />
                      </div>
                      <div className="flex justify-between text-[10px] font-space font-bold text-gray-600">
                        <span>12 Qs</span>
                        <span className="text-retro-accent">HIGH</span>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-retro-border p-2 shadow-retro-sm flex flex-col gap-1">
                      <span className="font-space text-xs font-bold truncate">PANCHAYATI RAJ</span>
                      <div className="h-2 bg-slate-200 border border-retro-border overflow-hidden">
                        <div className="h-full bg-retro-folder w-[75%]" />
                      </div>
                      <div className="flex justify-between text-[10px] font-space font-bold text-gray-600">
                        <span>9 Qs</span>
                        <span>FREQ</span>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-retro-border p-2 shadow-retro-sm flex flex-col gap-1">
                      <span className="font-space text-xs font-bold truncate">PARLIAMENTARY PROC</span>
                      <div className="h-2 bg-slate-200 border border-retro-border overflow-hidden">
                        <div className="h-full bg-retro-folder w-[70%]" />
                      </div>
                      <div className="flex justify-between text-[10px] font-space font-bold text-gray-600">
                        <span>8 Qs</span>
                        <span>FREQ</span>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-retro-border p-2 shadow-retro-sm flex flex-col gap-1">
                      <span className="font-space text-xs font-bold truncate">BILATERAL TREATIES</span>
                      <div className="h-2 bg-slate-200 border border-retro-border overflow-hidden">
                        <div className="h-full bg-retro-accent w-[85%]" />
                      </div>
                      <div className="flex justify-between text-[10px] font-space font-bold text-gray-600">
                        <span>11 Qs</span>
                        <span className="text-retro-accent">HIGH</span>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-retro-border p-2 shadow-retro-sm flex flex-col gap-1">
                      <span className="font-space text-xs font-bold truncate">CONSTITUTIONAL BODIES</span>
                      <div className="h-2 bg-slate-200 border border-retro-border overflow-hidden">
                        <div className="h-full bg-retro-gs1 w-[50%]" />
                      </div>
                      <div className="flex justify-between text-[10px] font-space font-bold text-gray-600">
                        <span>6 Qs</span>
                        <span>MOD</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Panel 3: Syllabus Hierarchy Tree Demo */}
              {currentSlide === 2 && (
                <div className="bg-white border-3 border-retro-border p-4 shadow-retro-sm font-space text-xs animate-fadeIn space-y-2">
                  <div className="font-bold text-retro-gs3 flex items-center gap-2 mb-2 text-sm">
                    <span>📂</span>
                    <span>GS3: ECONOMY & SUSTAINABLE DEVELOPMENT</span>
                  </div>

                  <div className="border-l-2 border-dashed border-retro-gs3 pl-3 ml-2 space-y-2">
                    <div className="flex justify-between items-center bg-slate-50 p-1.5 border border-slate-200">
                      <span>Inclusive Growth & Issues arising from it</span>
                      <span className="bg-retro-gs3 text-white text-[10px] font-bold px-1.5 py-0.5">11 Qs Mapped</span>
                    </div>

                    <div className="flex justify-between items-center bg-yellow-50 p-1.5 border-l-3 border-l-retro-accent border border-slate-200 font-bold">
                      <span>Government Budgeting & Fiscal Policy</span>
                      <span className="bg-retro-accent text-white text-[10px] font-bold px-1.5 py-0.5">8 Qs Mapped</span>
                    </div>

                    <div className="flex justify-between items-center bg-slate-50 p-1.5 border border-slate-200">
                      <span>Cropping Patterns & Irrigation Tech</span>
                      <span className="bg-retro-gs3 text-white text-[10px] font-bold px-1.5 py-0.5">9 Qs Mapped</span>
                    </div>

                    <div className="flex justify-between items-center bg-slate-50 p-1.5 border border-slate-200">
                      <span>Infrastructure: Energy, Ports, Roads</span>
                      <span className="bg-retro-gs3 text-white text-[10px] font-bold px-1.5 py-0.5">7 Qs Mapped</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Panel 4: My Vault Demo */}
              {currentSlide === 3 && (
                <div className="space-y-2.5 animate-fadeIn">
                  <div className="font-space text-xs font-bold text-gray-600 flex justify-between items-center pb-1">
                    <span>SAVED REVISION CARDS (3 PINNED)</span>
                    <span className="text-green-700">LOCAL STORAGE READY</span>
                  </div>

                  <div className="bg-white border-2 border-retro-border p-3 shadow-retro-sm flex items-center gap-3">
                    <div className="w-3.5 h-4 bg-retro-accent shrink-0 [clip-path:polygon(0_0,100%_0,100%_80%,50%_100%,0_80%)]" />
                    <div className="font-space text-xs flex-1">
                      <b className="text-retro-border">GS2 · 2023:</b> "Cooperative federalism challenges during emergency fiscal allocation..."
                    </div>
                  </div>

                  <div className="bg-white border-2 border-retro-border p-3 shadow-retro-sm flex items-center gap-3">
                    <div className="w-3.5 h-4 bg-retro-gs3 shrink-0 [clip-path:polygon(0_0,100%_0,100%_80%,50%_100%,0_80%)]" />
                    <div className="font-space text-xs flex-1">
                      <b className="text-retro-border">GS3 · 2022:</b> "Green Hydrogen economy roadmap and energy independence by 2047..."
                    </div>
                  </div>

                  <div className="bg-white border-2 border-retro-border p-3 shadow-retro-sm flex items-center gap-3">
                    <div className="w-3.5 h-4 bg-retro-gs4 shrink-0 [clip-path:polygon(0_0,100%_0,100%_80%,50%_100%,0_80%)]" />
                    <div className="font-space text-xs flex-1">
                      <b className="text-retro-border">GS4 · 2021:</b> "Case study: Conflict of interest in environmental clearance allocation..."
                    </div>
                  </div>
                </div>
              )}

              {/* Panel 5: Current Affairs Priority Engine Demo */}
              {currentSlide === 4 && (
                <div className="bg-white border-3 border-retro-border p-3.5 sm:p-4 shadow-retro-sm space-y-2.5 animate-fadeIn font-space text-xs">
                  {/* Dossier Header Row */}
                  <div className="border-2 border-retro-border px-2.5 py-1.5 bg-[#F4FBF7] flex flex-wrap justify-between items-center gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-vt text-lg font-bold text-retro-border">DOSSIER #01</span>
                      <span className="bg-[#0D9488] text-white font-bold px-1.5 py-0.5 text-[10px] uppercase border border-retro-border">
                        ★ BAND A · P(ASKED): 81.8%
                      </span>
                    </div>
                    <span className="text-[10px] font-bold bg-[#FFD25A] text-retro-border px-2 py-0.5 border border-retro-border">
                      INDEX: 100/100
                    </span>
                  </div>

                  {/* Topic Title */}
                  <div className="font-bold text-retro-border text-xs sm:text-sm leading-snug">
                    Fiscal federalism after the 16th Finance Commission (2026–31)
                  </div>

                  {/* 8-Parameter Mini Breakdown Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] font-space">
                    <div className="bg-[#FAF8F2] border border-retro-border p-1.5 flex flex-col justify-between">
                      <span className="text-gray-600 font-bold">🎯 PYQ Recurrence</span>
                      <span className="text-[#0D9488] font-bold">26% · HIGH RECURRENCE</span>
                    </div>
                    <div className="bg-[#FAF8F2] border border-retro-border p-1.5 flex flex-col justify-between">
                      <span className="text-gray-600 font-bold">🇮🇳 Govt Priority</span>
                      <span className="text-[#0D9488] font-bold">14% · TOP STRATEGY</span>
                    </div>
                    <div className="bg-[#FAF8F2] border border-retro-border p-1.5 flex flex-col justify-between">
                      <span className="text-gray-600 font-bold">⏳ Persistence</span>
                      <span className="text-[#0D9488] font-bold">14% · MULTI-MONTH</span>
                    </div>
                    <div className="bg-[#FAF8F2] border border-retro-border p-1.5 flex flex-col justify-between">
                      <span className="text-gray-600 font-bold">🏛️ Legal Footprint</span>
                      <span className="text-[#0D9488] font-bold">12% · ART 280 / REPORT</span>
                    </div>
                  </div>

                  {/* Multi-Paper Tabs & Live Delta Update Alert */}
                  <div className="bg-[#F8F5EE] border border-retro-border p-2 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
                      <span className="text-gray-600 uppercase">Cross-Paper Angles:</span>
                      <span className="bg-retro-gs2 text-white px-1.5 py-0.5">GS2 Devolution & Cesses</span>
                      <span className="bg-retro-gs3 text-white px-1.5 py-0.5">GS3 Fiscal Budgeting</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#946700] bg-[#FFF3D0] border border-[#F5A623] px-2 py-1 font-bold">
                      <span className="shrink-0">⚡ NEW DEVELOPMENT:</span>
                      <span className="truncate">Southern States FC Conclave memo (Persistence Boosted)</span>
                    </div>
                  </div>

                  {/* Gamified XP & Action Button */}
                  <div className="flex flex-wrap justify-between items-center gap-2 pt-1 border-t border-dashed border-gray-300">
                    <div className="flex items-center gap-2 text-[10px] text-gray-700">
                      <span className="bg-retro-folder text-retro-border font-bold px-1.5 py-0.5 border border-retro-border">
                        +100 XP
                      </span>
                      <span className="font-mono font-bold">WEIGHTED TARGET: 47.0 PTS</span>
                    </div>
                    <Link
                      href="/current-affairs"
                      className="font-vt text-sm sm:text-base bg-retro-border text-white hover:bg-retro-accent px-2.5 py-0.5 font-bold transition-colors shadow-[1px_1px_0px_#000] inline-flex items-center gap-1"
                    >
                      <span>LAUNCH TRACKER (59 DOSSIERS) →</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* Panel 6: Note-Making Tool Demo (COMING SOON) */}
              {currentSlide === 5 && (
                <div className="bg-[#FFFDF0] border-3 border-retro-border shadow-retro-md relative animate-fadeIn">
                  {/* Notepad Binding */}
                  <div className="bg-retro-accent text-white px-3 py-1.5 font-vt text-lg flex justify-between items-center border-b-2 border-retro-border">
                    <span>MEMO_PAD://Q_GS2_2023_04.NOTE</span>
                    <span className="text-xs bg-white text-retro-border px-1.5 py-0 font-space font-bold">DRAFT</span>
                  </div>

                  {/* Ruled lines */}
                  <div className="p-4 space-y-3 font-sans text-xs text-slate-800 bg-[repeating-linear-gradient(transparent,transparent_23px,#E2E8F0_23px,#E2E8F0_25px)] min-h-[170px]">
                    <div className="flex items-center gap-1.5">
                      <b className="text-retro-accent font-space">INTRO:</b> Define Art 246 & 7th Schedule friction points.
                    </div>
                    <div className="flex items-center gap-1.5">
                      <b className="text-retro-accent font-space">DIMENSION 1 (FISCAL):</b> Cess/Surcharge erosion of divisible pool.
                    </div>
                    <div className="flex items-center gap-1.5">
                      <b className="text-retro-accent font-space">CASE LAW:</b> S.R. Bommai v. UOI (1994) federal basic structure.
                      <span className="notepad-cursor" />
                    </div>
                  </div>

                  {/* Stamp */}
                  <div className="absolute bottom-3 right-4 bg-retro-folder border-3 border-retro-border px-3 py-1 font-vt text-2xl font-bold shadow-retro-sm -rotate-6 text-retro-border">
                    COMING SOON
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
