'use client';

import React, { useState } from 'react';
import { Zap, ChevronDown, ChevronUp, Flame, Snowflake, HelpCircle, CheckCircle2, TrendingUp, Compass } from 'lucide-react';

interface RecentMomentumExplainerProps {
  sparklineYears?: number[];
}

export default function RecentMomentumExplainer({
  sparklineYears = [2022, 2023, 2024, 2025, 2026],
}: RecentMomentumExplainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  const startYear = sparklineYears[0] || 2022;
  const endYear = sparklineYears[sparklineYears.length - 1] || 2026;
  const recentTwoYears = sparklineYears.slice(-2);
  const midThreeYears = sparklineYears.slice(0, 3);

  // Demo active bars for the interactive sample in Col 1 (e.g. index 2 and 4 active)
  const demoActiveIndices = new Set([2, 4]);

  return (
    <section className="retro-container bg-retro-window border-3 border-retro-border shadow-retro-md mb-8 overflow-hidden transition-all duration-200">
      
      {/* 1. Titlebar */}
      <div className="bg-retro-border text-white px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-b-2 border-retro-border">
        <div className="flex items-center gap-2 font-vt text-lg sm:text-xl tracking-wider">
          <Zap className="w-4 h-4 text-retro-folder fill-retro-folder shrink-0" />
          <span>C:\SYSTEM\MOMENTUM_DECODER.SYS</span>
          <span className="font-space text-[10px] uppercase font-bold px-1.5 py-0.5 bg-retro-accent text-white border border-white/20">
            20% HYI WEIGHT
          </span>
          <span className="hidden md:inline font-space text-[10px] text-white/70">
            (40% Vol · 30% Strike · 20% Mom · 10% Vers)
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 font-vt text-sm sm:text-base bg-retro-window text-retro-border border border-retro-border hover:bg-white hover:text-retro-accent transition-colors shadow-[1px_1px_0px_#000]"
          title="Toggle deep dive diagnostics and examples"
        >
          {isOpen ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Hide Deep Dive</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Deep Dive</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Compact 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 p-3.5 sm:p-4 bg-white border-b-2 border-retro-border">
        
        {/* Column 1: Visual Sparkline Timeline */}
        <div className="bg-[#FAF8F2] border-2 border-retro-border p-3 flex flex-col justify-between shadow-[1px_1px_0px_#2A2A2A]">
          <div>
            <div className="flex items-center justify-between border-b border-dashed border-retro-border pb-1.5 mb-2 font-vt text-base uppercase text-retro-border">
              <span className="font-bold flex items-center gap-1.5">
                <span>[1] Visual Timeline</span>
              </span>
              <span className="font-space text-[10px] font-bold text-retro-accent truncate max-w-[120px]">
                {hoveredYear || 'Hover a bar'}
              </span>
            </div>

            {/* 5-Bar Mini Sparkline */}
            <div className="flex gap-1.5 h-6 mb-1">
              {sparklineYears.map((yr, idx) => {
                const isAsked = demoActiveIndices.has(idx);
                const shortYr = yr.toString().slice(-2);
                return (
                  <div
                    key={yr}
                    onMouseEnter={() => setHoveredYear(`${yr}: ${isAsked ? 'Asked (Sample)' : 'Skipped (0 Qs)'}`)}
                    onMouseLeave={() => setHoveredYear(null)}
                    className={`flex-1 flex items-center justify-center font-vt text-sm font-bold border border-retro-border transition-transform hover:-translate-y-0.5 cursor-pointer select-none ${
                      isAsked
                        ? 'bg-retro-border text-white'
                        : 'bg-[#E5E1D4] text-retro-border/60 border-dashed'
                    }`}
                    title={`${yr}: ${isAsked ? 'Asked' : 'Skipped'}`}
                  >
                    {shortYr}
                  </div>
                );
              })}
            </div>

            {/* Timeline Labels */}
            <div className="flex gap-1.5 text-[9px] font-space font-bold text-center text-retro-border/70 mb-2">
              <span className="flex-1">(T-4)</span>
              <span className="flex-1">(T-3)</span>
              <span className="flex-1">(T-2)</span>
              <span className="flex-1">(T-1)</span>
              <span className="flex-1 text-retro-accent">NOW</span>
            </div>
          </div>

          {/* Mini Legend */}
          <div className="flex items-center gap-3 text-[10px] font-space font-bold border-t border-retro-border/20 pt-1.5 text-retro-border/80">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-retro-border border border-retro-border inline-block" />
              <span>Solid: Asked</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-[#E5E1D4] border border-dashed border-retro-border inline-block" />
              <span>Light: Skipped</span>
            </div>
          </div>
        </div>

        {/* Column 2: Recency Rolling Multipliers */}
        <div className="bg-[#FAF8F2] border-2 border-retro-border p-3 flex flex-col justify-between shadow-[1px_1px_0px_#2A2A2A]">
          <div className="flex items-center justify-between border-b border-dashed border-retro-border pb-1.5 mb-2 font-vt text-base uppercase text-retro-border">
            <span className="font-bold">[2] Rolling Multipliers</span>
            <span className="font-space text-[10px] text-retro-border/70 font-bold">Window Rules</span>
          </div>

          <div className="flex flex-col gap-1.5 font-space text-[11px]">
            <div className="flex items-center justify-between bg-white border border-retro-accent px-2 py-1 bg-[#FFF5F4]">
              <span className="font-bold text-retro-border">
                {recentTwoYears.join('–')} (Latest): <span className="text-retro-accent">Active Surge</span>
              </span>
              <span className="font-vt text-base font-bold px-1.5 bg-retro-accent text-white border border-retro-border">
                1.5×
              </span>
            </div>

            <div className="flex items-center justify-between bg-white border border-retro-border px-2 py-1">
              <span className="text-retro-border font-bold">
                {midThreeYears[0]}–{midThreeYears[midThreeYears.length - 1]}: Medium-Term Staple
              </span>
              <span className="font-vt text-base font-bold px-1.5 bg-retro-window border border-retro-border text-retro-border">
                1.0×
              </span>
            </div>

            <div className="flex items-center justify-between bg-white border border-retro-border/50 px-2 py-1 opacity-75">
              <span className="text-retro-border/80 font-medium">
                Older than 5 Years: Legacy Discount
              </span>
              <span className="font-vt text-base font-bold px-1.5 bg-gray-100 border border-retro-border text-retro-border">
                0.5×
              </span>
            </div>
          </div>
        </div>

        {/* Column 3: Aspirant's Crystal Clear Action Rule */}
        <div className="bg-[#FAF8F2] border-2 border-retro-border p-3 flex flex-col justify-between shadow-[1px_1px_0px_#2A2A2A]">
          <div className="flex items-center justify-between border-b border-dashed border-retro-border pb-1.5 mb-2 font-vt text-base uppercase text-retro-border">
            <span className="font-bold">[3] Aspirant's Action Rule</span>
            <span className="font-space text-[9px] font-bold px-1.5 py-0.2 bg-retro-accent text-white uppercase">
              Study Decision
            </span>
          </div>

          <div className="flex flex-col gap-2 font-space">
            {/* Rule 1: Right Bars Solid */}
            <div className="bg-[#FFF9F8] border border-retro-border border-l-4 border-l-retro-accent p-1.5 shadow-[1px_1px_0px_#2A2A2A]">
              <div className="flex items-center gap-1 text-[10px] font-bold text-retro-accent uppercase">
                <Flame className="w-3 h-3 shrink-0" />
                <span>Right Bars Solid ({recentTwoYears.join('–')})</span>
              </div>
              <p className="font-sans text-[11px] text-retro-border/90 leading-tight mt-0.5">
                <b className="font-bold text-retro-border">MUST-HAVE 2-PAGE FRAMEWORK:</b> Active Commission focus. Prepare definitions, committee citations & ready conclusions.
              </p>
            </div>

            {/* Rule 2: Right Bars Blank */}
            <div className="bg-gray-50 border border-retro-border border-l-4 border-l-gray-500 p-1.5 opacity-90 shadow-[1px_1px_0px_#2A2A2A]">
              <div className="flex items-center gap-1 text-[10px] font-bold text-gray-700 uppercase">
                <Snowflake className="w-3 h-3 shrink-0" />
                <span>Right Bars Blank (Skipped)</span>
              </div>
              <p className="font-sans text-[11px] text-retro-border/80 leading-tight mt-0.5">
                <b className="font-bold text-retro-border">STICK TO BASICS ONLY:</b> Trend has cooled off. Do not waste preparation weeks memorizing 10-year-old spikes.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Expandable Deep Dive Drawer */}
      {isOpen && (
        <div className="p-4 bg-retro-window border-t-2 border-dashed border-retro-border animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-retro-border">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-retro-accent" />
              <h4 className="font-vt text-xl uppercase font-bold text-retro-border">
                Diagnostic Case Studies: 3 Real Patterns in the Database
              </h4>
            </div>
            <span className="font-space text-xs text-retro-border/70 font-medium">
              Click any card below to see momentum in action
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Scenario 1 */}
            <div className="bg-white border-2 border-retro-accent p-3 shadow-retro-sm">
              <div className="flex items-center justify-between font-space text-xs font-bold mb-1">
                <span className="text-retro-accent flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> SURGING
                </span>
                <span className="font-vt text-base bg-[#50E3C2] px-1.5 border border-retro-border text-retro-border">
                  HYI 92
                </span>
              </div>
              <h5 className="font-space font-bold text-xs uppercase text-retro-border mb-1">
                Artificial Intelligence & Ethics
              </h5>
              <div className="flex gap-1 h-2 mb-2">
                <span className="flex-1 bg-gray-200 border border-retro-border/40" />
                <span className="flex-1 bg-gray-200 border border-retro-border/40" />
                <span className="flex-1 bg-retro-border" />
                <span className="flex-1 bg-retro-border" />
                <span className="flex-1 bg-retro-border" />
              </div>
              <p className="font-sans text-xs text-retro-border/80 leading-relaxed">
                Zero questions from 2013–2020. However, the 1.5× multiplier on 2025/2026 catapults it into <b>Tier 1 Elite</b>.
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="bg-white border-2 border-retro-border p-3 shadow-retro-sm">
              <div className="flex items-center justify-between font-space text-xs font-bold mb-1">
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> STAPLE
                </span>
                <span className="font-vt text-base bg-[#50E3C2] px-1.5 border border-retro-border text-retro-border">
                  HYI 95
                </span>
              </div>
              <h5 className="font-space font-bold text-xs uppercase text-retro-border mb-1">
                Cooperative Federalism
              </h5>
              <div className="flex gap-1 h-2 mb-2">
                <span className="flex-1 bg-retro-border" />
                <span className="flex-1 bg-retro-border" />
                <span className="flex-1 bg-retro-border" />
                <span className="flex-1 bg-gray-200 border border-retro-border/40" />
                <span className="flex-1 bg-retro-border" />
              </div>
              <p className="font-sans text-xs text-retro-border/80 leading-relaxed">
                High 14-year marks volume + solid bars in almost every cycle. Unshakeable core foundation.
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="bg-white border-2 border-gray-400 p-3 shadow-retro-sm opacity-85">
              <div className="flex items-center justify-between font-space text-xs font-bold mb-1">
                <span className="text-gray-600 flex items-center gap-1">
                  <Snowflake className="w-3.5 h-3.5" /> DORMANT
                </span>
                <span className="font-vt text-base bg-[#F5A623] px-1.5 border border-retro-border text-retro-border">
                  HYI 44
                </span>
              </div>
              <h5 className="font-space font-bold text-xs uppercase text-retro-border mb-1">
                Colonial Land Tenures
              </h5>
              <div className="flex gap-1 h-2 mb-2">
                <span className="flex-1 bg-gray-200 border border-retro-border/40" />
                <span className="flex-1 bg-gray-200 border border-retro-border/40" />
                <span className="flex-1 bg-gray-200 border border-retro-border/40" />
                <span className="flex-1 bg-gray-200 border border-retro-border/40" />
                <span className="flex-1 bg-gray-200 border border-retro-border/40" />
              </div>
              <p className="font-sans text-xs text-retro-border/80 leading-relaxed">
                Frequently asked in 2013–2016, but 0 questions recently. 0.5× discount demotes it to <b>Tier 3 Cyclical</b>.
              </p>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
