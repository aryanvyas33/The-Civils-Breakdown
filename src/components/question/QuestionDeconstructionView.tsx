'use client';

import React, { useState } from 'react';
import { DeconstructionData } from '@/lib/questionDeconstruction';
import { AIDeconstructionItem } from '@/types/deconstruction';
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  Compass,
  CheckCircle2,
  Users,
  Link2,
  Layers,
  Target,
  Lightbulb,
} from 'lucide-react';

interface QuestionDeconstructionViewProps {
  deconstruction: DeconstructionData;
  aiData?: AIDeconstructionItem | null;
  source?: 'curated' | 'ai_generated' | 'computed' | 'synthesized';
}

export default function QuestionDeconstructionView({
  deconstruction,
  aiData,
  source = 'ai_generated',
}: QuestionDeconstructionViewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'directive' | 'entities' | 'limits' | 'demands' | 'notes'>('directive');

  const directiveWord = aiData?.deconstruction?.directive?.word || deconstruction.directives[0]?.phrase || 'EXAMINE';
  const directiveDemand = aiData?.deconstruction?.directive?.demand_of_the_question || deconstruction.directives[0]?.task;
  const dimensionsAsked = aiData?.deconstruction?.dimensions_asked?.length
    ? aiData.deconstruction.dimensions_asked
    : deconstruction.whatIsAsked;
  const noteDimensions = aiData?.note_making_dimensions || [];
  const stakeholders = aiData?.stakeholders || [];
  const relatabilityHooks = aiData?.relatability_hooks || [];
  const taxonomy = aiData?.taxonomy_mapping;

  return (
    <div className="retro-container p-0 overflow-hidden bg-white">
      {/* Header bar with toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-retro-window transition-colors cursor-pointer border-b-2 border-retro-border"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 border-2 border-retro-border bg-retro-folder flex items-center justify-center shrink-0 shadow-retro-sm">
            <BookOpen className="w-5 h-5 text-retro-border" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-space font-bold text-lg text-retro-border">
                UPSC Question Anatomy Framework
              </h3>
              {source === 'curated' && (
                <span className="retro-badge bg-retro-gs2 text-retro-border shadow-none py-0.5">
                  Curated CSE Blueprint
                </span>
              )}
            </div>
            <p className="font-space text-xs text-retro-border/80">
              Structural analysis of directives, primary entities, core demands, and note-making dimensions
            </p>
          </div>
        </div>
        <div className="retro-btn text-xs py-1 px-3 shadow-none flex items-center gap-2 shrink-0 bg-white">
          <span>{isOpen ? 'Collapse Anatomy' : 'View Full Anatomy'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expandable Body */}
      {isOpen && (
        <div className="p-4 sm:p-6 space-y-5">
          {/* ========================================================= */}
          {/* MOBILE TABBED VIEW (sm:hidden) — Focused, Low-Overwhelm   */}
          {/* ========================================================= */}
          <div className="sm:hidden space-y-4">
            {/* Micro-Taxonomy & Syllabus Anchors Bar (Mobile Compact) */}
            {taxonomy && (
              <div className="bg-retro-window p-3 border-2 border-retro-border shadow-retro-sm font-space text-xs">
                <div className="flex items-center gap-1.5 font-bold text-retro-border mb-1">
                  <Target className="w-3.5 h-3.5 text-retro-accent shrink-0" />
                  <span className="truncate">Anchor: {taxonomy.primary_anchor}</span>
                </div>
                {taxonomy.micro_themes && taxonomy.micro_themes.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {taxonomy.micro_themes.map((theme, idx) => (
                      <span
                        key={idx}
                        className="retro-tag bg-[#FFD1D1] text-retro-accent border-retro-accent py-0.2 text-[10px]"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Directive Demand Banner (Mobile Compact) */}
            {directiveDemand && (
              <div className="bg-retro-gs1/10 p-3 border-2 border-retro-border shadow-retro-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.2 border border-retro-border bg-retro-gs1 text-white">
                    {directiveWord}
                  </span>
                  <span className="text-[10px] font-space font-bold text-retro-border uppercase">
                    Directive Demand
                  </span>
                </div>
                <p className="font-space text-xs text-retro-border font-bold leading-relaxed">
                  {directiveDemand}
                </p>
              </div>
            )}

            {/* Tab Selector Strip */}
            <div className="flex gap-1 overflow-x-auto hide-scroll pb-1 border-b-2 border-retro-border font-space text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setMobileTab('directive')}
                className={`px-2.5 py-1.5 border-2 border-retro-border shrink-0 transition-all ${
                  mobileTab === 'directive'
                    ? 'bg-retro-border text-white shadow-none'
                    : 'bg-white text-retro-border shadow-[1px_1px_0px_#2A2A2A]'
                }`}
              >
                Directives ({deconstruction.directives?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setMobileTab('entities')}
                className={`px-2.5 py-1.5 border-2 border-retro-border shrink-0 transition-all ${
                  mobileTab === 'entities'
                    ? 'bg-retro-border text-white shadow-none'
                    : 'bg-white text-retro-border shadow-[1px_1px_0px_#2A2A2A]'
                }`}
              >
                Entities ({deconstruction.primaryEntities?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setMobileTab('limits')}
                className={`px-2.5 py-1.5 border-2 border-retro-border shrink-0 transition-all ${
                  mobileTab === 'limits'
                    ? 'bg-retro-border text-white shadow-none'
                    : 'bg-white text-retro-border shadow-[1px_1px_0px_#2A2A2A]'
                }`}
              >
                Limits ({deconstruction.scopeLimiters?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setMobileTab('demands')}
                className={`px-2.5 py-1.5 border-2 border-retro-border shrink-0 transition-all ${
                  mobileTab === 'demands'
                    ? 'bg-retro-border text-white shadow-none'
                    : 'bg-white text-retro-border shadow-[1px_1px_0px_#2A2A2A]'
                }`}
              >
                Demands ({dimensionsAsked?.length || 0})
              </button>
              {(noteDimensions?.length || 0) > 0 && (
                <button
                  type="button"
                  onClick={() => setMobileTab('notes')}
                  className={`px-2.5 py-1.5 border-2 border-retro-border shrink-0 transition-all ${
                    mobileTab === 'notes'
                      ? 'bg-retro-border text-white shadow-none'
                      : 'bg-white text-retro-border shadow-[1px_1px_0px_#2A2A2A]'
                  }`}
                >
                  Notes ({noteDimensions.length})
                </button>
              )}
            </div>

            {/* Tab 1: Directives */}
            {mobileTab === 'directive' && (
              <div className="bg-white p-3.5 border-3 border-retro-border shadow-retro-sm space-y-2">
                <div className="text-xs font-bold text-retro-border uppercase font-space flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-retro-gs3 border border-retro-border" />
                  <span>Directive Extractions</span>
                </div>
                {deconstruction.directives.map((d, i) => (
                  <div key={i} className="text-xs bg-retro-gs3/10 p-2.5 border-2 border-retro-gs3">
                    <span className="font-bold text-retro-gs3 font-space uppercase bg-retro-gs3/20 px-1">
                      &ldquo;{d.phrase}&rdquo;
                    </span>
                    <p className="text-retro-border font-space mt-1 font-bold leading-relaxed">
                      {d.task}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Entities */}
            {mobileTab === 'entities' && (
              <div className="bg-white p-3.5 border-3 border-retro-border shadow-retro-sm space-y-2">
                <div className="text-xs font-bold text-retro-border uppercase font-space flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-retro-gs2 border border-retro-border" />
                  <span>Primary Entities &amp; Concepts</span>
                </div>
                {deconstruction.primaryEntities.map((e, i) => (
                  <div key={i} className="text-xs bg-retro-gs2/10 p-2 border-2 border-retro-gs2 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-retro-border uppercase font-space tracking-wider">
                      {e.role}
                    </span>
                    <span className="inline-block font-bold px-2 py-0.5 border-2 border-retro-gs2 text-retro-gs2 bg-white text-[11px] w-fit font-space">
                      {e.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Limits */}
            {mobileTab === 'limits' && (
              <div className="bg-white p-3.5 border-3 border-retro-border shadow-retro-sm space-y-2">
                <div className="text-xs font-bold text-retro-border uppercase font-space flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-retro-gs1 border border-retro-border" />
                  <span>Scope Limiters &amp; Constraints</span>
                </div>
                {deconstruction.scopeLimiters.map((s, i) => (
                  <div key={i} className="text-xs bg-retro-gs1/10 p-2.5 border-2 border-retro-gs1">
                    <span className="font-bold text-retro-gs1 font-space uppercase bg-retro-gs1/20 px-1">
                      &ldquo;{s.phrase}&rdquo;
                    </span>
                    <p className="text-retro-border font-space mt-1 font-bold leading-relaxed">
                      {s.constraint}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: Demands */}
            {mobileTab === 'demands' && (
              <div className="bg-white p-3.5 border-3 border-retro-border shadow-retro-sm space-y-2">
                <div className="text-xs font-bold text-retro-border uppercase font-space flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-retro-gs1" />
                  <span>Core Demands of the Question</span>
                </div>
                <ul className="space-y-2">
                  {dimensionsAsked.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-retro-border flex items-start gap-2 bg-retro-gs2/10 p-2 border-2 border-retro-gs2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-retro-gs2 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-space font-bold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tab 5: Notes & Hooks */}
            {mobileTab === 'notes' && (
              <div className="bg-white p-3.5 border-3 border-retro-border shadow-retro-sm space-y-3">
                <div className="text-xs font-bold text-retro-border uppercase font-space flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-retro-accent" />
                  <span>Note-Making Dimensions</span>
                </div>
                <div className="space-y-2.5">
                  {noteDimensions.map((dim, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 border-2 border-retro-border bg-retro-window shadow-[1px_1px_0px_#2A2A2A]"
                    >
                      <h5 className="text-[11px] font-bold text-retro-border uppercase font-space mb-1.5">
                        {dim.dimension_type}
                      </h5>
                      <ul className="space-y-1 pl-2 border-l-2 border-dashed border-retro-border">
                        {dim.extraction.map((point, pIdx) => (
                          <li key={pIdx} className="text-[11px] text-retro-border font-space leading-snug flex items-start gap-1">
                            <span className="text-retro-accent font-black">&gt;</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {stakeholders.length > 0 && (
                  <div className="pt-2 border-t border-dashed border-retro-border">
                    <span className="text-[10px] font-space font-bold uppercase text-retro-border block mb-1">
                      Stakeholders:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {stakeholders.map((s, idx) => (
                        <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-retro-gs3 text-white border border-retro-border font-space font-bold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* DESKTOP VIEW (hidden sm:block) — Full 3-Pillar Blueprint  */}
          {/* ========================================================= */}
          <div className="hidden sm:block space-y-6">
            {/* Micro-Taxonomy & Syllabus Anchors Bar */}
            {taxonomy && (
              <div className="bg-retro-window p-4 border-2 border-retro-border shadow-retro-sm flex flex-wrap items-center justify-between gap-3 font-space text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-retro-border flex items-center gap-1">
                    <Target className="w-4 h-4 text-retro-accent" />
                    <span>Primary Anchor:</span>
                  </span>
                  <span className="retro-badge bg-white shadow-none border-dashed py-0.5">
                    {taxonomy.primary_anchor}
                  </span>
                  {taxonomy.secondary_anchors && taxonomy.secondary_anchors.length > 0 && (
                    <>
                      <span className="text-retro-border font-bold ml-1">Secondary:</span>
                      {taxonomy.secondary_anchors.map((sec, idx) => (
                        <span
                          key={idx}
                          className="retro-badge bg-white shadow-none py-0.5 border-dashed"
                        >
                          {sec}
                        </span>
                      ))}
                    </>
                  )}
                </div>

                {taxonomy.micro_themes && taxonomy.micro_themes.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-retro-border font-bold">Micro-Themes:</span>
                    {taxonomy.micro_themes.map((theme, idx) => (
                      <span
                        key={idx}
                        className="retro-tag bg-[#FFD1D1] text-retro-accent border-retro-accent py-0.5"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Directive & Explicit Question Demand Spotlight */}
            {directiveDemand && (
              <div className="bg-retro-gs1/10 p-4 border-2 border-retro-border shadow-retro-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 border-2 border-retro-border bg-white text-retro-gs1 shrink-0 shadow-retro-sm">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-space">
                      <span className="text-xs font-bold text-retro-border uppercase tracking-wide">
                        Directive Demands:
                      </span>
                      <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 border-2 border-retro-border bg-retro-gs1 text-white shadow-retro-sm">
                        {directiveWord}
                      </span>
                    </div>
                    <p className="font-space text-xs text-retro-border leading-relaxed font-bold">
                      {directiveDemand}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Top 3-Pillar Parsing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pillar 1: Directives */}
              <div className="bg-white p-4 border-4 border-retro-border shadow-retro-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-retro-border uppercase tracking-widest mb-3 font-space">
                  <span className="w-3 h-3 bg-retro-gs3 border-2 border-retro-border shadow-[2px_2px_0px_#2A2A2A]" />
                  <span>1. [DIRECTIVE] Extraction</span>
                </div>
                <div className="space-y-2">
                  {deconstruction.directives.map((d, i) => (
                    <div key={i} className="text-xs bg-retro-gs3/10 p-2.5 border-2 border-retro-gs3">
                      <span className="font-bold text-retro-gs3 font-space uppercase bg-retro-gs3/20 px-1">&ldquo;{d.phrase}&rdquo;</span>
                      <p className="text-retro-border font-space mt-1 font-bold">{d.task}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pillar 2: Primary Entities & Concepts */}
              <div className="bg-white p-4 border-4 border-retro-border shadow-retro-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-retro-border uppercase tracking-widest mb-3 font-space">
                  <span className="w-3 h-3 bg-retro-gs2 border-2 border-retro-border shadow-[2px_2px_0px_#2A2A2A]" />
                  <span>2. [PRIMARY_ENTITY] Extraction</span>
                </div>
                <div className="space-y-2">
                  {deconstruction.primaryEntities.map((e, i) => (
                    <div key={i} className="text-xs bg-retro-gs2/10 p-2 border-2 border-retro-gs2 flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-retro-border uppercase font-space tracking-wider">{e.role}</span>
                      <span className={`inline-block font-bold px-2 py-0.5 border-2 border-retro-gs2 text-retro-gs2 bg-white text-[11px] w-fit font-space`}>
                        {e.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pillar 3: Scope Limiters */}
              <div className="bg-white p-4 border-4 border-retro-border shadow-retro-sm">
                <div className="flex items-center gap-1.5 text-xs font-bold text-retro-border uppercase tracking-widest mb-3 font-space">
                  <span className="w-3 h-3 bg-retro-gs1 border-2 border-retro-border shadow-[2px_2px_0px_#2A2A2A]" />
                  <span>3. [SCOPE_LIMITER] Extraction</span>
                </div>
                <div className="space-y-2">
                  {deconstruction.scopeLimiters.map((s, i) => (
                    <div key={i} className="text-xs bg-retro-gs1/10 p-2.5 border-2 border-retro-gs1">
                      <span className="font-bold text-retro-gs1 font-space uppercase bg-retro-gs1/20 px-1">&ldquo;{s.phrase}&rdquo;</span>
                      <p className="text-retro-border font-space mt-1 font-bold leading-relaxed">{s.constraint}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section: Core Demands / Dimensions Asked */}
            <div className="bg-white p-5 border-4 border-retro-border shadow-[4px_4px_0px_#2A2A2A]">
              <h4 className="text-xs font-bold text-retro-border uppercase tracking-widest mb-4 flex items-center gap-1.5 font-space">
                <Compass className="w-4 h-4 text-retro-gs1" />
                <span>Core Demands of the Question (What is Asked?)</span>
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dimensionsAsked.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-retro-border flex items-start gap-2 bg-retro-gs2/10 p-2.5 border-2 border-retro-gs2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-retro-gs2 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-space font-bold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section: Structured Note-Making Dimensions */}
            {noteDimensions.length > 0 && (
              <div className="bg-white p-5 border-4 border-retro-border shadow-[4px_4px_0px_#2A2A2A] space-y-4 mt-4">
                <div className="flex items-center justify-between border-b-2 border-dashed border-retro-border pb-3">
                  <h4 className="text-xs font-bold text-retro-border uppercase tracking-widest flex items-center gap-1.5 font-space">
                    <Layers className="w-4 h-4 text-retro-accent" />
                    <span>Curated Note-Making Dimensions &amp; Thematic Arguments</span>
                  </h4>
                  <span className="font-space text-[11px] font-bold text-retro-border bg-retro-window px-2 py-0.5 border-2 border-retro-border shadow-none">
                    {noteDimensions.length} Key Dimensions
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {noteDimensions.map((dim, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 border-2 border-retro-border bg-white hover:bg-retro-window transition-colors shadow-[2px_2px_0px_#2A2A2A]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-retro-accent border-retro-border border-2 shadow-none" />
                        <h5 className="text-xs font-bold text-retro-border uppercase font-space tracking-widest">{dim.dimension_type}</h5>
                      </div>
                      <ul className="space-y-1.5 pl-3 border-l-2 border-dashed border-retro-border">
                        {dim.extraction.map((point, pIdx) => (
                          <li key={pIdx} className="text-xs text-retro-border font-space font-bold leading-relaxed flex items-start gap-1.5">
                            <span className="text-retro-accent text-[10px] mt-0.5 font-black">&gt;</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section: Stakeholders & Cross-Syllabus Relatability Hooks */}
            {(stakeholders.length > 0 || relatabilityHooks.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Stakeholders Card */}
                {stakeholders.length > 0 && (
                  <div className="bg-white p-4 border-4 border-retro-border shadow-[4px_4px_0px_#2A2A2A] space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-retro-border uppercase tracking-widest font-space">
                      <Users className="w-4 h-4 text-retro-gs3" />
                      <span className="bg-retro-gs3 text-white px-1">Key Stakeholders &amp; Institutional Actors</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stakeholders.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-retro-gs3 text-white border-2 border-retro-border font-bold font-space shadow-[2px_2px_0px_#2A2A2A] hover:-translate-y-0.5 transition-transform"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Relatability Hooks Card */}
                {relatabilityHooks.length > 0 && (
                  <div className="bg-white p-4 border-4 border-retro-border shadow-[4px_4px_0px_#2A2A2A] space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-retro-border uppercase tracking-widest font-space">
                      <Link2 className="w-4 h-4 text-retro-gs2" />
                      <span>Cross-Syllabus Relatability Hooks</span>
                    </div>
                    <ul className="space-y-2">
                      {relatabilityHooks.map((hook, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-retro-border flex items-start gap-1.5 bg-white p-2 border-2 border-dashed border-retro-gs2"
                        >
                          <span className="text-retro-gs2 font-black mt-0.5">&gt;</span>
                          <span className="leading-relaxed font-space font-bold">{hook}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
