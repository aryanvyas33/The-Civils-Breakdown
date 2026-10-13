'use client';

import React, { useState } from 'react';

export default function CAModelExplainer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mb-6 bg-white border-[3px] border-[#2A2A2A] shadow-[4px_4px_0px_#2A2A2A] overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3.5 px-4 bg-[#F4F1E1] border-none text-[#2A2A2A] font-vt text-xl flex justify-between items-center cursor-pointer hover:bg-[#EAE6D6] transition-colors"
      >
        <span className="flex items-center gap-2 text-left">
          💡 HOW DOES OUR PRIORITY MODEL WORK?
          <span className="font-space text-[0.62rem] font-bold bg-[#FFD25A] text-[#2A2A2A] px-1.5 py-0.5 border border-[#2A2A2A]">
            1-MIN READ
          </span>
        </span>
        <span className="font-space text-xs font-bold text-[#666]">
          {isOpen ? '▲ CLICK TO COLLAPSE' : '▼ CLICK TO EXPAND'}
        </span>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-5 border-t-[2px] border-dashed border-[#2A2A2A] bg-white">
          <div className="mb-4">
            <p className="text-sm sm:text-base text-[#333] font-sans leading-relaxed">
              Our model evaluates every shortlisted monthly current affairs theme against{' '}
              <strong>8 calibrated parameters</strong> (each scored <strong>0 = absent, 1 = partial, 2 = strong</strong>).
              The weighted sum produces a <strong>Priority Index (0–100)</strong>, which is calibrated through a logistic
              probability curve to estimate <strong>P(asked in Mains 2027)</strong>.
            </p>
          </div>

          <div className="font-vt text-xl sm:text-2xl text-[#2A2A2A] mb-2 uppercase">
            // THE 8 SCORING PARAMETERS &amp; WEIGHTS (SUM = 100%):
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
            {/* 1. PYQ Recurrence */}
            <div className="bg-[#FAF8F2] border-[1.5px] border-[#2A2A2A] p-3 text-sm flex flex-col justify-between border-l-[4px] border-l-[#50E3C2]">
              <div>
                <div className="font-bold flex justify-between items-center mb-1 text-sm font-space">
                  <span>🎯 1. PYQ Recurrence</span>
                  <span className="text-[0.68rem] bg-[#50E3C2] text-[#2A2A2A] px-1.5 py-0.5 font-bold border border-[#2A2A2A]">
                    26% WEIGHT
                  </span>
                </div>
                <p className="text-xs text-[#444] font-sans leading-relaxed mb-2">
                  <strong>Strongest predictor:</strong> Has the same theme or a close variant been asked in Mains over the last 8–10 years? UPSC frequently re-tests foundational themes under contemporary framing.
                </p>
              </div>
              <div className="text-[0.68rem] font-mono text-[#666] border-t border-[#DDD] pt-1">
                0 = Absent | 1 = Partial variant | 2 = High recurrence in PYQ Vault
              </div>
            </div>

            {/* 2. Govt Priority & India's Stake */}
            <div className="bg-[#FAF8F2] border-[1.5px] border-[#2A2A2A] p-3 text-sm flex flex-col justify-between">
              <div>
                <div className="font-bold flex justify-between items-center mb-1 text-sm font-space">
                  <span>🇮🇳 2. Govt Priority &amp; India&apos;s Stake</span>
                  <span className="text-[0.68rem] bg-[#EAE6D6] text-[#2A2A2A] px-1.5 py-0.5 font-bold border border-[#2A2A2A]">
                    14% WEIGHT
                  </span>
                </div>
                <p className="text-xs text-[#444] font-sans leading-relaxed mb-2">
                  Themes at the core of national strategy: Viksit Bharat 2047 pillars, national security doctrines, critical technologies, and major socioeconomic schemes.
                </p>
              </div>
              <div className="text-[0.68rem] font-mono text-[#666] border-t border-[#DDD] pt-1">
                0 = Low stake | 1 = Moderate priority | 2 = Top national strategic priority
              </div>
            </div>

            {/* 3. Persistence */}
            <div className="bg-[#FAF8F2] border-[1.5px] border-[#2A2A2A] p-3 text-sm flex flex-col justify-between">
              <div>
                <div className="font-bold flex justify-between items-center mb-1 text-sm font-space">
                  <span>⏳ 3. Persistence</span>
                  <span className="text-[0.68rem] bg-[#EAE6D6] text-[#2A2A2A] px-1.5 py-0.5 font-bold border border-[#2A2A2A]">
                    14% WEIGHT
                  </span>
                </div>
                <p className="text-xs text-[#444] font-sans leading-relaxed mb-2">
                  Structural issues that remain active in the news over months/years versus single-day flash events. Ongoing debates give paper setters adequate time to frame questions.
                </p>
              </div>
              <div className="text-[0.68rem] font-mono text-[#666] border-t border-[#DDD] pt-1">
                0 = One-off event | 1 = Active for weeks | 2 = Structural & recurring over months
              </div>
            </div>

            {/* 4. Institutional / Legal Footprint */}
            <div className="bg-[#FAF8F2] border-[1.5px] border-[#2A2A2A] p-3 text-sm flex flex-col justify-between">
              <div>
                <div className="font-bold flex justify-between items-center mb-1 text-sm font-space">
                  <span>🏛️ 4. Institutional / Legal Footprint</span>
                  <span className="text-[0.68rem] bg-[#EAE6D6] text-[#2A2A2A] px-1.5 py-0.5 font-bold border border-[#2A2A2A]">
                    12% WEIGHT
                  </span>
                </div>
                <p className="text-xs text-[#444] font-sans leading-relaxed mb-2">
                  Enacted Acts, Supreme Court constitutional bench rulings, official committee reports, or regulatory rules that supply concrete factual substance for question stems.
                </p>
              </div>
              <div className="text-[0.68rem] font-mono text-[#666] border-t border-[#DDD] pt-1">
                0 = No formal anchor | 1 = Policy draft/debate | 2 = New Act, SC verdict, or official report
              </div>
            </div>

            {/* 5. Multidimensionality */}
            <div className="bg-[#FAF8F2] border-[1.5px] border-[#2A2A2A] p-3 text-sm flex flex-col justify-between">
              <div>
                <div className="font-bold flex justify-between items-center mb-1 text-sm font-space">
                  <span>🌐 5. Multidimensionality</span>
                  <span className="text-[0.68rem] bg-[#EAE6D6] text-[#2A2A2A] px-1.5 py-0.5 font-bold border border-[#2A2A2A]">
                    10% WEIGHT
                  </span>
                </div>
                <p className="text-xs text-[#444] font-sans leading-relaxed mb-2">
                  Does the topic span multiple dimensions (social, economic, political, environmental, ethical, technological, security)? Themes with 4+ angles allow cross-paper framing.
                </p>
              </div>
              <div className="text-[0.68rem] font-mono text-[#666] border-t border-[#DDD] pt-1">
                0 = Narrow single angle | 1 = 2-3 angles | 2 = 4+ distinct angles
              </div>
            </div>

            {/* 6. Contestability */}
            <div className="bg-[#FAF8F2] border-[1.5px] border-[#2A2A2A] p-3 text-sm flex flex-col justify-between">
              <div>
                <div className="font-bold flex justify-between items-center mb-1 text-sm font-space">
                  <span>⚖️ 6. Contestability</span>
                  <span className="text-[0.68rem] bg-[#EAE6D6] text-[#2A2A2A] px-1.5 py-0.5 font-bold border border-[#2A2A2A]">
                    10% WEIGHT
                  </span>
                </div>
                <p className="text-xs text-[#444] font-sans leading-relaxed mb-2">
                  Genuine two-sided debate suitable for directive words like <em>&apos;Critically examine&apos;</em>, <em>&apos;Evaluate&apos;</em>, or <em>&apos;Discuss&apos;</em>, requiring balanced arguments.
                </p>
              </div>
              <div className="text-[0.68rem] font-mono text-[#666] border-t border-[#DDD] pt-1">
                0 = One-sided consensus | 1 = Mild differences | 2 = Sharp, balanced policy debate
              </div>
            </div>

            {/* 7. Syllabus Anchor */}
            <div className="bg-[#FAF8F2] border-[1.5px] border-[#2A2A2A] p-3 text-sm flex flex-col justify-between">
              <div>
                <div className="font-bold flex justify-between items-center mb-1 text-sm font-space">
                  <span>📌 7. Syllabus Anchor</span>
                  <span className="text-[0.68rem] bg-[#EAE6D6] text-[#2A2A2A] px-1.5 py-0.5 font-bold border border-[#2A2A2A]">
                    8% WEIGHT
                  </span>
                </div>
                <p className="text-xs text-[#444] font-sans leading-relaxed mb-2">
                  Direct mapping to an explicit heading in the official UPSC GS syllabus, ensuring alignment with the prescribed syllabus framework.
                </p>
              </div>
              <div className="text-[0.68rem] font-mono text-[#666] border-t border-[#DDD] pt-1">
                0 = Fringes of syllabus | 1 = Implicit link | 2 = Direct mapping to syllabus line
              </div>
            </div>

            {/* 8. Usable Evidence */}
            <div className="bg-[#FAF8F2] border-[1.5px] border-[#2A2A2A] p-3 text-sm flex flex-col justify-between">
              <div>
                <div className="font-bold flex justify-between items-center mb-1 text-sm font-space">
                  <span>📊 8. Usable Evidence</span>
                  <span className="text-[0.68rem] bg-[#EAE6D6] text-[#2A2A2A] px-1.5 py-0.5 font-bold border border-[#2A2A2A]">
                    6% WEIGHT
                  </span>
                </div>
                <p className="text-xs text-[#444] font-sans leading-relaxed mb-2">
                  Concrete statistical indices, committee recommendations, official survey findings, case studies, or constitutional articles ready to quote in answer writing.
                </p>
              </div>
              <div className="text-[0.68rem] font-mono text-[#666] border-t border-[#DDD] pt-1">
                0 = Opinion only | 1 = General statistics | 2 = Concrete data, reports & articles
              </div>
            </div>
          </div>

          {/* Formula & Policy Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Box 1: Calculation */}
            <div className="bg-[#FAF8F2] border-[1.5px] border-[#2A2A2A] p-3.5 text-xs font-sans">
              <div className="font-vt text-xl text-[#2A2A2A] mb-1.5">
                // HOW THE PROBABILITY MODEL CALCULATES PRIORITY
              </div>
              <div className="font-mono text-[0.72rem] bg-white border border-[#2A2A2A] p-1.5 mb-2">
                Priority Index (0–100) = Σ(Score / 2 × Weight) × 100
              </div>
              <p className="text-[#555] leading-relaxed">
                • <strong>Objective Weighted Sum:</strong> Calculated from the 8 parameters (rated 0–2) multiplied by their respective weights (sum = 100%).<br />
                • <strong>Logistic Calibration:</strong> Converts index to estimated probability <em>P(asked)</em> via logistic calibration (Index 50 → 18%, Index 75 → 50%, Index 100 → 82%).
              </p>
            </div>

            {/* Box 2: Bands */}
            <div className="bg-[#FAF8F2] border-[1.5px] border-[#2A2A2A] p-3.5 text-xs font-sans">
              <div className="font-vt text-xl text-[#2A2A2A] mb-1.5">
                // ACTIONABLE PREPARATION BANDS
              </div>
              <div className="flex flex-col gap-1.5 mt-1.5">
                <div className="bg-[#D1FAF0] border-l-4 border-l-[#0D9488] p-1.5 text-xs">
                  <strong className="text-[#0D9488]">BAND A (P ≥ 50% // Must Cover):</strong>
                  <div className="text-[#333] text-[0.72rem]">Prepare full 250-word note + 2 practised answers + memorise key facts.</div>
                </div>
                <div className="bg-[#DCEEFF] border-l-4 border-l-[#4A90E2] p-1.5 text-xs">
                  <strong className="text-[#4A90E2]">BAND B (25% ≤ P &lt; 50% // Quick Reads):</strong>
                  <div className="text-[#333] text-[0.72rem]">1-page concise summary note + 1 practised 10-marker answer is sufficient.</div>
                </div>
                <div className="bg-[#FFF3D0] border-l-4 border-l-[#F5A623] p-1.5 text-xs">
                  <strong className="text-[#946700]">BAND C (P &lt; 25% // Headline Awareness):</strong>
                  <div className="text-[#333] text-[0.72rem]">Scan headline awareness only. Do not allocate full note-making hours.</div>
                </div>
              </div>
            </div>

            {/* Box 3: Handling Multi-Month Developments */}
            <div className="bg-[#FAF8F2] border-[1.5px] border-[#2A2A2A] p-3.5 text-xs font-sans">
              <div className="font-vt text-xl text-[#2A2A2A] mb-1.5">
                // 🔄 WHAT IF A TOPIC HAS NEW DEVELOPMENTS IN LATER MONTHS?
              </div>
              <p className="text-[#444] leading-relaxed mb-2">
                In UPSC Mains, current affairs issues are <strong>thematic dossiers</strong>, not isolated daily news flashes. When an existing theme has a major new judgment, statute, or report:
              </p>
              <ul className="text-[#444] pl-4 list-disc space-y-1">
                <li><strong>Single Master Dossier:</strong> We do NOT create duplicate cards. The original topic card is updated in place.</li>
                <li><strong>Persistence Parameter Boost:</strong> Parameter 3 (<em>Persistence</em>) and Parameter 4 (<em>Legal Footprint</em>) increase, naturally maintaining or climbing the topic&apos;s priority rank.</li>
                <li><strong>Delta Update Alert:</strong> The card gets an orange <span className="bg-[#FFF3D0] border border-[#F5A623] text-[#946700] font-mono px-1 py-0.5 text-[0.65rem] font-bold">⚡ NEW DEVELOPMENT</span> callout with a separate review check button!</li>
              </ul>
            </div>

            {/* Box 4: Weighted Progress Model */}
            <div className="bg-[#FAF8F2] border-[1.5px] border-[#2A2A2A] p-3.5 text-xs font-sans">
              <div className="font-vt text-xl text-[#2A2A2A] mb-1.5">
                // ⚖️ WEIGHTED CA PROGRESS FORMULA (60.5 TOTAL PTS)
              </div>
              <p className="text-[#444] leading-relaxed mb-2">
                Quick Reads are directly included in your progress bar, calibrated by their study investment:
              </p>
              <div className="flex flex-col gap-1.5">
                <div className="bg-white border border-[#2A2A2A] p-1.5 flex justify-between items-center font-mono text-[0.72rem]">
                  <span><strong>★ Band A (Must-Cover):</strong> 45 Topics × 1.0x</span>
                  <span className="text-[#0D9488] font-bold">45.0 PTS MAX</span>
                </div>
                <div className="bg-white border border-[#2A2A2A] p-1.5 flex justify-between items-center font-mono text-[0.72rem]">
                  <span><strong>📖 Quick Reads (Band B/C):</strong> 31 Topics × 0.5x</span>
                  <span className="text-[#4A90E2] font-bold">15.5 PTS MAX</span>
                </div>
              </div>
              <div className="mt-2 font-mono text-[0.68rem] text-[#666]">
                Σ Total Score = 60.5 Points (100% Mains Coverage). Completing a Quick Read gives +0.5 pts, rewarding reading without diluting Band A mastery.
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
