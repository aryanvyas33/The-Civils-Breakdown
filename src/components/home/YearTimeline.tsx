'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { getStats } from '@/lib/data';
import { History, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

export default function YearTimeline() {
  const stats = getStats();
  const yearCounts = stats.yearCounts || {};
  const years = Object.keys(yearCounts).map(Number).sort((a, b) => a - b);
  const latestYear = years[years.length - 1] || 2026;

  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const tailRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    const trackEl = trackRef.current;
    const thumbEl = thumbRef.current;
    const tailEl = tailRef.current;
    const glowEl = glowRef.current;
    if (!scrollEl || !trackEl || !thumbEl) return;

    let lastScrollLeft = scrollEl.scrollLeft;
    let tailTimer: NodeJS.Timeout;

    const updateScrollbar = () => {
      const maxScrollLeft = scrollEl.scrollWidth - scrollEl.clientWidth;
      const scrollPercentage = maxScrollLeft > 0 ? scrollEl.scrollLeft / maxScrollLeft : 0;
      
      const thumbW = thumbEl.offsetWidth || 28;
      const travel = trackEl.clientWidth - thumbW;
      const x = scrollPercentage * travel;
      
      thumbEl.style.transform = `translateY(-50%) translateX(${x}px)`;

      if (tailEl && glowEl) {
        const delta = scrollEl.scrollLeft - lastScrollLeft;
        const speed = Math.abs(delta);
        const tailLen = Math.max(0, Math.min(160, speed * 5));
        
        if (delta > 0) {
          tailEl.style.right = '100%';
          tailEl.style.left = 'auto';
          tailEl.style.transform = 'translateY(-50%) scaleX(1)';
          glowEl.style.right = '100%';
          glowEl.style.left = 'auto';
          glowEl.style.transform = 'translateY(-50%) scaleX(1)';
        } else if (delta < 0) {
          tailEl.style.left = '100%';
          tailEl.style.right = 'auto';
          tailEl.style.transform = 'translateY(-50%) scaleX(-1)';
          glowEl.style.left = '100%';
          glowEl.style.right = 'auto';
          glowEl.style.transform = 'translateY(-50%) scaleX(-1)';
        }

        tailEl.style.width = tailLen + 'px';
        glowEl.style.width = (tailLen * 1.5) + 'px';

        clearTimeout(tailTimer);
        tailTimer = setTimeout(() => {
          tailEl.style.width = '0px';
          glowEl.style.width = '0px';
        }, 120);
      }
      
      lastScrollLeft = scrollEl.scrollLeft;
    };

    scrollEl.addEventListener('scroll', updateScrollbar, { passive: true });
    window.addEventListener('resize', updateScrollbar);
    updateScrollbar();

    const handleWheel = (e: WheelEvent) => {
      if (e.shiftKey) return;
      if (e.deltaY !== 0) {
        e.preventDefault();
        scrollEl.scrollLeft += e.deltaY;
      }
    };
    scrollEl.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollEl.removeEventListener('scroll', updateScrollbar);
      window.removeEventListener('resize', updateScrollbar);
      scrollEl.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setIsDragging(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDown(false);
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDown(false);
    setTimeout(() => setIsDragging(false), 50);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    if (Math.abs(walk) > 5) {
      setIsDragging(true);
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const onTrackMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current || !trackRef.current || !thumbRef.current) return;
    const track = trackRef.current;
    const scrollEl = scrollRef.current;
    
    const rect = track.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const thumbW = thumbRef.current.offsetWidth || 28;
    const travel = track.clientWidth - thumbW;
    
    const boundedX = Math.max(0, Math.min(x - thumbW / 2, travel));
    const percentage = boundedX / travel;
    
    const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
    scrollEl.scrollLeft = percentage * maxScroll;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const moveX = moveEvent.clientX - rect.left;
      const boundedMoveX = Math.max(0, Math.min(moveX - thumbW / 2, travel));
      const movePercent = boundedMoveX / travel;
      scrollEl.scrollLeft = movePercent * maxScroll;
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const scrollByDelta = (delta: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };

  const scrollToYear = (year: number) => {
    const yearIndex = years.indexOf(year);
    if (yearIndex !== -1 && scrollRef.current) {
      const scrollEl = scrollRef.current;
      const targetPos = (yearIndex / (years.length - 1)) * (scrollEl.scrollWidth - scrollEl.clientWidth);
      scrollEl.scrollTo({ left: targetPos, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full">
      <div className="retro-container bg-retro-window border-4">
        
        {/* Window Header */}
        <div className="window-header bg-retro-border">
          <div className="flex items-center gap-2 font-vt text-lg text-white">
            <History className="w-4 h-4 text-retro-folder" />
            <span>C:\TIMELINE\2013_2026_ARCHIVE.EXE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-vt uppercase text-white/80 hidden sm:inline">
              14 Annual Exam Cycles
            </span>
            <div className="window-btn bg-white"></div>
            <div className="window-btn close"></div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          
          {/* Timeline Title & Jump Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b-2 border-retro-border gap-4">
            <div>
              <span className="retro-tag text-[11px] mb-2 inline-block">CHRONOLOGICAL VAULT</span>
              <h2 className="font-vt text-3xl sm:text-4xl uppercase text-retro-border flex items-center gap-2">
                <span>Browse Question Papers by Year</span>
              </h2>
              <p className="font-space text-xs sm:text-sm text-retro-border/80 mt-1 max-w-xl">
                Observe paper evolution, trend shifts from 2013 syllabus revamps to 2026 recent examinations.
              </p>
            </div>

            {/* Quick Year Jump Buttons & Scroll Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-vt text-sm uppercase text-retro-border/70 hidden lg:inline mr-1">
                Jump to:
              </span>
              <button
                type="button"
                onClick={() => scrollToYear(latestYear)}
                className="retro-badge bg-retro-accent text-white text-xs font-vt uppercase hover:opacity-90 cursor-pointer"
              >
                Latest (2026)
              </button>
              <button
                type="button"
                onClick={() => scrollToYear(2020)}
                className="retro-badge bg-white text-retro-border text-xs font-vt uppercase hover:bg-retro-window cursor-pointer"
              >
                2020
              </button>
              <button
                type="button"
                onClick={() => scrollToYear(2013)}
                className="retro-badge bg-white text-retro-border text-xs font-vt uppercase hover:bg-retro-window cursor-pointer"
              >
                2013 Start
              </button>

              <div className="flex items-center gap-1 ml-2 border-l-2 border-retro-border pl-2">
                <button
                  type="button"
                  onClick={() => scrollByDelta(-300)}
                  aria-label="Scroll timeline left"
                  className="w-8 h-8 bg-white border-2 border-retro-border flex items-center justify-center hover:bg-retro-border hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByDelta(300)}
                  aria-label="Scroll timeline right"
                  className="w-8 h-8 bg-white border-2 border-retro-border flex items-center justify-center hover:bg-retro-border hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Scroll Container */}
          <div className="relative">
            <div 
              ref={scrollRef}
              onMouseDown={onMouseDown}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              className="relative w-full overflow-x-auto hide-scroll py-8 cursor-grab active:cursor-grabbing select-none"
            >
              <div className="min-w-max px-4">
                <div className="relative flex items-center">
                  
                  {/* Connecting Axis Line */}
                  <div className="absolute left-6 right-6 h-1 bg-retro-border top-[2.5rem] z-0" />

                  {/* Year Nodes */}
                  <div className="relative z-10 flex space-x-6 sm:space-x-8 md:space-x-12 mx-auto">
                    {years.map((year) => {
                      const isLatest = year === latestYear;
                      const qCount = yearCounts[year] || 88;
                      return (
                        <Link
                          key={year}
                          href={`/search?year=${year}`}
                          onClick={(e) => {
                            if (isDragging) e.preventDefault();
                          }}
                          onDragStart={(e) => e.preventDefault()}
                          className="group flex flex-col items-center cursor-pointer select-none"
                        >
                          {/* Year Label */}
                          <span
                            className={`font-vt text-lg md:text-xl mb-2 transition-colors ${
                              isLatest
                                ? 'bg-retro-accent text-white px-2 py-0.5 border-2 border-retro-border font-bold shadow-retro-sm'
                                : 'text-retro-border group-hover:text-retro-accent font-bold'
                            }`}
                          >
                            {year}
                          </span>

                          {/* Node Circle */}
                          <div
                            className={`w-6 h-6 border-3 border-retro-border transition-all z-10 flex items-center justify-center ${
                              isLatest
                                ? 'bg-retro-accent shadow-retro-sm scale-110'
                                : 'bg-white group-hover:bg-retro-folder group-hover:scale-110'
                            }`}
                          >
                            <div className={`w-2 h-2 ${isLatest ? 'bg-white' : 'bg-retro-border'}`}></div>
                          </div>

                          {/* Question Count Tag */}
                          <span
                            className={`text-xs font-space font-bold mt-3 px-2 py-1 border-2 border-retro-border shadow-[2px_2px_0px_#2A2A2A] transition-all ${
                              isLatest
                                ? 'bg-retro-window text-retro-border'
                                : 'bg-white text-retro-border group-hover:bg-retro-border group-hover:text-white'
                            }`}
                          >
                            {qCount} Qs
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comet Scrubber Track */}
          <div className="mt-6 px-2 sm:px-6">
            <div className="flex items-center justify-between text-[11px] font-space text-retro-border/70 mb-2">
              <span className="flex items-center gap-1 font-bold">
                <Compass className="w-3.5 h-3.5" /> Drag slider or use mouse wheel to scroll timeline:
              </span>
              <span className="font-vt text-sm">2013 ➔ 2026</span>
            </div>

            <div 
              className="comet-track cursor-pointer border-2 border-retro-border shadow-retro-sm" 
              ref={trackRef}
              onMouseDown={onTrackMouseDown}
            >
              <div className="star-field"></div>
              <div className="comet-head cursor-grab active:cursor-grabbing" ref={thumbRef}>
                <div className="comet-glow" ref={glowRef}></div>
                <div className="comet-tail" ref={tailRef}></div>
                <div className="comet-nucleus"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
