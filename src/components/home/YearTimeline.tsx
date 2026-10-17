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
  const hudRef = useRef<HTMLDivElement>(null);
  const hudYearRef = useRef<HTMLSpanElement>(null);
  const hudCountRef = useRef<HTMLSpanElement>(null);
  const hudTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastHapticIndexRef = useRef<number>(-1);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isGridModalOpen, setIsGridModalOpen] = useState(false);
  const [activeEra, setActiveEra] = useState<'all' | 'recent' | 'foundation'>('recent');

  useEffect(() => {
    if (!isGridModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsGridModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGridModalOpen]);

  const showHud = () => {
    if (hudRef.current) {
      if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
      hudRef.current.classList.add('visible');
    }
  };

  const hideHudDelayed = (delay = 500) => {
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    hudTimerRef.current = setTimeout(() => {
      hudRef.current?.classList.remove('visible');
      hudRef.current?.classList.remove('mobile-elevated');
    }, delay);
  };

  const triggerHaptic = (type: 'tick' | 'lock' = 'tick') => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        if (type === 'tick') {
          navigator.vibrate(6);
        } else {
          navigator.vibrate([8, 16, 8]);
        }
      } catch {}
    }
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    const trackEl = trackRef.current;
    const thumbEl = thumbRef.current;
    const tailEl = tailRef.current;
    const glowEl = glowRef.current;
    const hudEl = hudRef.current;
    const hudYearEl = hudYearRef.current;
    const hudCountEl = hudCountRef.current;
    if (!scrollEl || !trackEl || !thumbEl) return;

    let lastScrollLeft = scrollEl.scrollLeft;
    let tailTimer: NodeJS.Timeout;

    const updateScrollbar = () => {
      const maxScrollLeft = scrollEl.scrollWidth - scrollEl.clientWidth;
      const scrollPercentage = maxScrollLeft > 0 ? scrollEl.scrollLeft / maxScrollLeft : 0;
      
      const thumbW = thumbEl.offsetWidth || 28;
      const travel = trackEl.clientWidth - thumbW;
      const x = Math.max(0, Math.min(scrollPercentage * travel, travel));
      
      thumbEl.style.transform = `translateY(-50%) translateX(${x}px)`;

      // Identify active year from current scroll position
      const closestIndex = Math.max(0, Math.min(years.length - 1, Math.round(scrollPercentage * (years.length - 1))));
      const activeYear = years[closestIndex] || latestYear;

      // Update Floating HUD Pill position & content
      if (hudEl && hudYearEl && hudCountEl) {
        const thumbCenter = x + thumbW / 2;
        const pillHalfW = (hudEl.offsetWidth || 78) / 2;
        const trackW = trackEl.clientWidth;
        const clampedX = Math.max(pillHalfW, Math.min(thumbCenter, trackW - pillHalfW));
        
        hudEl.style.left = `${clampedX}px`;
        hudYearEl.textContent = String(activeYear);
        hudCountEl.textContent = `${yearCounts[activeYear] || 88} Qs`;
      }

      // Update Stardust Milestone Pips
      const pips = trackEl.querySelectorAll('.comet-pip');
      pips.forEach((pip, idx) => {
        if (idx === closestIndex) {
          pip.classList.add('active');
        } else {
          pip.classList.remove('active');
        }
      });

      // Synchronize active year highlight in timeline node row
      const nodes = scrollEl.querySelectorAll('[data-year-node]');
      nodes.forEach((node) => {
        const nodeYear = Number(node.getAttribute('data-year-node'));
        if (nodeYear === activeYear) {
          node.classList.add('timeline-node-active');
        } else {
          node.classList.remove('timeline-node-active');
        }
      });

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

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateScrollbar();
      });
      resizeObserver.observe(scrollEl);
      resizeObserver.observe(trackEl);
    }

    updateScrollbar();

    const handleWheel = (e: WheelEvent) => {
      if (e.shiftKey) return;
      if (e.deltaY !== 0) {
        e.preventDefault();
        scrollEl.scrollLeft += e.deltaY;
        showHud();
        hideHudDelayed(600);
      }
    };
    scrollEl.addEventListener('wheel', handleWheel, { passive: false });
    trackEl.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollEl.removeEventListener('scroll', updateScrollbar);
      window.removeEventListener('resize', updateScrollbar);
      scrollEl.removeEventListener('wheel', handleWheel);
      trackEl.removeEventListener('wheel', handleWheel);
      resizeObserver?.disconnect();
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

  const onTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (!scrollRef.current || !trackRef.current || !thumbRef.current) return;

    const track = trackRef.current;
    const scrollEl = scrollRef.current;
    const thumb = thumbRef.current;

    e.preventDefault();
    if (e.pointerType === 'touch') {
      hudRef.current?.classList.add('mobile-elevated');
    } else {
      hudRef.current?.classList.remove('mobile-elevated');
    }
    showHud();

    // Disable CSS transition for 1:1 finger tracking during dragging
    thumb.style.transition = 'none';

    const rect = track.getBoundingClientRect();
    const thumbW = thumb.offsetWidth || 28;
    const travel = track.clientWidth - thumbW;
    const maxScroll = Math.max(0, scrollEl.scrollWidth - scrollEl.clientWidth);

    // Current position of the thumb in track
    const currentScrollPct = maxScroll > 0 ? scrollEl.scrollLeft / maxScroll : 0;
    const currentThumbX = currentScrollPct * travel;

    const touchXInTrack = e.clientX - rect.left;
    let grabOffset = 0;

    // If starting interaction on or directly beside thumb, preserve grab offset to avoid jumping
    if (touchXInTrack >= currentThumbX - 8 && touchXInTrack <= currentThumbX + thumbW + 8) {
      grabOffset = touchXInTrack - (currentThumbX + thumbW / 2);
    }

    const updateFromClientX = (clientX: number) => {
      const currentRect = track.getBoundingClientRect();
      const currentTravel = track.clientWidth - thumbW;
      if (currentTravel <= 0) return;

      const x = clientX - currentRect.left;
      const boundedX = Math.max(0, Math.min(x - grabOffset - thumbW / 2, currentTravel));
      const percentage = boundedX / currentTravel;
      const targetScroll = percentage * (scrollEl.scrollWidth - scrollEl.clientWidth);
      scrollEl.scrollLeft = targetScroll;

      // Haptic tick when crossing year boundary
      const currentYearIdx = Math.max(0, Math.min(years.length - 1, Math.round(percentage * (years.length - 1))));
      if (currentYearIdx !== lastHapticIndexRef.current) {
        lastHapticIndexRef.current = currentYearIdx;
        const isBoundary = currentYearIdx === 0 || currentYearIdx === years.length - 1;
        triggerHaptic(isBoundary ? 'lock' : 'tick');
      }
    };

    updateFromClientX(e.clientX);

    const pointerId = e.pointerId;
    const targetElement = e.currentTarget;

    try {
      targetElement.setPointerCapture(pointerId);
    } catch {}

    // Velocity tracking for flick momentum
    let lastX = e.clientX;
    let lastTime = performance.now();
    let velocity = 0;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (moveEvent.pointerId !== pointerId) return;
      moveEvent.preventDefault();

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 8) {
        velocity = (moveEvent.clientX - lastX) / dt;
        lastX = moveEvent.clientX;
        lastTime = now;
      }

      showHud();
      updateFromClientX(moveEvent.clientX);
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      if (upEvent.pointerId !== pointerId) return;
      try {
        targetElement.releasePointerCapture(pointerId);
      } catch {}
      thumb.style.transition = '';
      hideHudDelayed(400);

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);

      // Flick Momentum or Magnetic Snap to Year
      const currentTravel = track.clientWidth - thumbW;
      const scrollMax = Math.max(0, scrollEl.scrollWidth - scrollEl.clientWidth);
      const currentPct = scrollMax > 0 ? scrollEl.scrollLeft / scrollMax : 0;

      if (Math.abs(velocity) > 0.35 && currentTravel > 0) {
        // High-velocity flick: project ahead by 180ms of momentum
        const flickThrow = velocity * 180;
        const currentX = currentPct * currentTravel;
        const projectedX = currentX + flickThrow;
        const projectedPct = Math.max(0, Math.min(1, projectedX / currentTravel));
        const targetIdx = Math.round(projectedPct * (years.length - 1));
        scrollToYear(years[targetIdx]);
      } else {
        // Normal release: magnetically snap to nearest year
        const nearestIdx = Math.round(currentPct * (years.length - 1));
        scrollToYear(years[nearestIdx]);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!scrollRef.current) return;
    showHud();
    hideHudDelayed(800);
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByDelta(-150);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByDelta(150);
    } else if (e.key === 'Home') {
      e.preventDefault();
      scrollToYear(years[0] || 2013);
    } else if (e.key === 'End') {
      e.preventDefault();
      scrollToYear(latestYear);
    }
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
      showHud();
      hideHudDelayed(800);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full">
      <div className="retro-container bg-retro-window border-4">
        
        {/* Window Header */}
        <div className="window-header bg-retro-border">
          <div className="window-title font-vt text-lg text-white">
            <History className="w-4 h-4 text-retro-folder shrink-0" />
            <span className="hidden sm:inline">C:\TIMELINE\2013_2026_ARCHIVE.EXE</span>
            <span className="sm:hidden">TIMELINE\2013-26.EXE</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-vt uppercase text-white/80 hidden sm:inline">
              14 Annual Exam Cycles
            </span>
            <button
              type="button"
              onClick={() => setIsGridModalOpen(true)}
              className="retro-badge text-[11px] font-vt uppercase bg-retro-folder text-retro-border sm:hidden hover:opacity-90 cursor-pointer"
              title="Open full year grid"
            >
              ▦ Grid
            </button>
            <div className="window-btn bg-white"></div>
            <div className="window-btn close"></div>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          
          {/* Timeline Title & Jump Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b-2 border-retro-border gap-4">
            <div>
              <span className="retro-tag text-[11px] mb-2 inline-block">CHRONOLOGICAL VAULT</span>
              <h2 className="font-vt text-3xl sm:text-4xl uppercase text-retro-border flex items-center gap-2">
                <span>Browse Question Papers by Year</span>
              </h2>
              <p className="font-sans text-xs sm:text-sm text-retro-border/90 mt-1 max-w-xl leading-relaxed">
                Observe paper evolution and syllabus trend shifts from 2013 revamps to 2026 recent examinations.
              </p>
            </div>

            {/* Quick Year Jump Buttons & Scroll Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-vt text-sm uppercase text-retro-border/70 hidden lg:inline mr-1">
                Jump to:
              </span>
              <button
                type="button"
                onClick={() => {
                  scrollToYear(latestYear);
                  setActiveEra('recent');
                }}
                className="retro-badge bg-retro-accent text-white text-xs font-vt uppercase hover:opacity-90 cursor-pointer"
              >
                Latest (2026)
              </button>
              <button
                type="button"
                onClick={() => {
                  scrollToYear(2020);
                  setActiveEra('recent');
                }}
                className="retro-badge bg-white text-retro-border text-xs font-vt uppercase hover:bg-retro-window cursor-pointer"
              >
                2020
              </button>
              <button
                type="button"
                onClick={() => {
                  scrollToYear(2013);
                  setActiveEra('foundation');
                }}
                className="retro-badge bg-white text-retro-border text-xs font-vt uppercase hover:bg-retro-window cursor-pointer"
              >
                2013 Start
              </button>

              <button
                type="button"
                onClick={() => setIsGridModalOpen(true)}
                className="inline-flex items-center gap-1 retro-badge bg-retro-folder text-retro-border text-xs font-vt uppercase hover:opacity-90 cursor-pointer"
                title="Open 4x4 Year Grid"
              >
                <span>▦ Grid</span>
              </button>

              <div className="flex items-center gap-1 ml-1 border-l-2 border-retro-border pl-2">
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

          {/* Era Quick Segmented Switcher for 6-inch Mobile & Library Readers */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="inline-flex bg-[#EAE6D6] border-2 border-retro-border p-1 gap-1 rounded w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setActiveEra('recent');
                  scrollToYear(latestYear);
                }}
                className={`flex-1 sm:flex-initial px-3 py-1 font-vt text-sm sm:text-base uppercase transition-all cursor-pointer ${
                  activeEra === 'recent'
                    ? 'bg-retro-border text-white shadow-[1px_1px_0px_rgba(0,0,0,0.2)] font-bold'
                    : 'text-retro-border hover:bg-white/60'
                }`}
              >
                Recent (2020–26)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveEra('foundation');
                  scrollToYear(2013);
                }}
                className={`flex-1 sm:flex-initial px-3 py-1 font-vt text-sm sm:text-base uppercase transition-all cursor-pointer ${
                  activeEra === 'foundation'
                    ? 'bg-retro-border text-white shadow-[1px_1px_0px_rgba(0,0,0,0.2)] font-bold'
                    : 'text-retro-border hover:bg-white/60'
                }`}
              >
                Foundations (2013–19)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveEra('all');
                  scrollToYear(2020);
                }}
                className={`hidden sm:inline-block px-3 py-1 font-vt text-sm sm:text-base uppercase transition-all cursor-pointer ${
                  activeEra === 'all'
                    ? 'bg-retro-border text-white shadow-[1px_1px_0px_rgba(0,0,0,0.2)] font-bold'
                    : 'text-retro-border hover:bg-white/60'
                }`}
              >
                All (14Y)
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-xs font-space text-retro-border/70">
              <span className="w-2 h-2 rounded-full bg-retro-accent animate-pulse" />
              <span>14 Years Indexed</span>
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
              className="relative w-full overflow-x-auto hide-scroll py-8 cursor-grab active:cursor-grabbing select-none snap-x snap-mandatory scroll-p-6"
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
                          data-year-node={year}
                          href={`/search?year=${year}`}
                          onClick={(e) => {
                            if (isDragging) e.preventDefault();
                          }}
                          onDragStart={(e) => e.preventDefault()}
                          className="group flex flex-col items-center cursor-pointer select-none snap-center min-w-[68px] sm:min-w-0"
                        >
                          {/* Year Label */}
                          <span
                            className={`timeline-node-year font-vt text-lg md:text-xl mb-2 transition-colors ${
                              isLatest
                                ? 'bg-retro-accent !text-white px-2 py-0.5 border-2 border-retro-border font-bold shadow-retro-sm'
                                : 'text-retro-border group-hover:text-retro-accent font-bold'
                            }`}
                          >
                            {year}
                          </span>

                          {/* Node Circle */}
                          <div
                            className={`timeline-node-dot w-6 h-6 border-3 border-retro-border transition-all z-10 flex items-center justify-center ${
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
            <div className="flex items-center justify-between text-[11px] font-space text-retro-border/70 mb-1">
              <span className="flex items-center gap-1 font-bold">
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Drag slider or use mouse wheel to scroll timeline:</span>
                <span className="sm:hidden">Drag slider or scroll timeline:</span>
              </span>
              <span className="font-vt text-sm">2013 ➔ 2026</span>
            </div>

            {/* Mobile touch-expanded hit container (52px tall touch area, touch-action: none) */}
            <div 
              className="relative py-3 touch-none select-none cursor-pointer sm:cursor-grab active:cursor-grabbing outline-none focus-visible:ring-2 focus-visible:ring-retro-accent rounded-full"
              style={{ touchAction: 'none' }}
              onPointerDown={onTrackPointerDown}
              role="slider"
              tabIndex={0}
              aria-label="Timeline year scrubber"
              aria-valuemin={years[0] || 2013}
              aria-valuemax={latestYear}
              onKeyDown={onKeyDown}
            >
              {/* Floating Retro HUD Tooltip Pill */}
              <div ref={hudRef} className="comet-hud-pill">
                <div className="comet-hud-inner">
                  <span ref={hudYearRef} className="font-vt text-base text-retro-accent font-bold">2026</span>
                  <span className="text-[10px] text-white/40">|</span>
                  <span ref={hudCountRef} className="font-space text-[11px] text-white font-medium">88 Qs</span>
                </div>
                <div className="comet-hud-arrow"></div>
              </div>

              <div 
                className="comet-track border-2 border-retro-border shadow-retro-sm pointer-events-none" 
                ref={trackRef}
              >
                <div className="star-field"></div>
                
                {/* Stardust Milestone Pips */}
                <div className="comet-pip-container">
                  {years.map((year, idx) => {
                    const isMilestone = year === 2013 || year === 2020 || year === latestYear;
                    return (
                      <div 
                        key={year}
                        data-year-index={idx}
                        className={`comet-pip ${isMilestone ? 'milestone' : ''}`}
                      />
                    );
                  })}
                </div>

                <div className="comet-head" ref={thumbRef}>
                  <div className="comet-glow" ref={glowRef}></div>
                  <div className="comet-tail" ref={tailRef}></div>
                  <div className="comet-nucleus"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4x4 Year Grid Modal Drawer for Instant Mobile Year Jumps */}
      {isGridModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsGridModalOpen(false)}
        >
          <div 
            className="retro-container bg-retro-window border-4 max-w-sm w-full p-0 shadow-retro-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="window-header bg-retro-border flex justify-between items-center text-white">
              <span className="font-vt text-lg">C:\YEARS\QUICK_JUMP_GRID.EXE</span>
              <button
                type="button"
                onClick={() => setIsGridModalOpen(false)}
                className="window-btn close cursor-pointer"
                aria-label="Close year grid"
              />
            </div>
            <div className="p-4">
              <div className="text-xs font-sans text-retro-border/90 mb-3 font-medium">
                Select an exam cycle to navigate instantly without scrubbing:
              </div>
              <div className="grid grid-cols-4 gap-2">
                {years.map((year) => {
                  const isLatest = year === latestYear;
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => {
                        scrollToYear(year);
                        setIsGridModalOpen(false);
                      }}
                      className={`p-2 border-2 border-retro-border flex flex-col items-center gap-0.5 transition-all cursor-pointer ${
                        isLatest
                          ? 'bg-retro-accent text-white shadow-retro-sm font-bold'
                          : 'bg-white hover:bg-retro-folder text-retro-border shadow-[1px_1px_0px_#2A2A2A]'
                      }`}
                    >
                      <span className="font-vt text-lg leading-none">{year}</span>
                      <span className="font-space text-[9px] opacity-80">{yearCounts[year] || 88}Q</span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setIsGridModalOpen(false)}
                className="w-full mt-4 retro-btn bg-white text-center text-sm py-1.5 hover:bg-retro-border hover:text-white"
              >
                CLOSE WINDOW [ESC]
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
