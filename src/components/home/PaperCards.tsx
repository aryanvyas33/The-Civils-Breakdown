import React from 'react';
import Link from 'next/link';
import { getStats } from '@/lib/data';
import { Folder, ArrowRight, Sparkles } from 'lucide-react';

interface PaperConfig {
  id: string;
  code: string;
  name: string;
  shortDesc: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  domains: string[];
}

const PAPERS_CONFIG: PaperConfig[] = [
  {
    id: 'gs1',
    code: 'GS-1',
    name: 'General Studies I',
    shortDesc: 'History, Heritage, Society & Physical/Human Geography',
    bgColor: 'bg-retro-gs1',
    textColor: 'text-retro-gs1',
    borderColor: 'border-retro-gs1',
    badgeBg: 'bg-[#7C8B71]/15',
    badgeText: 'text-[#47573d]',
    domains: ['Modern History', 'Art & Culture', 'World History', 'Indian Society', 'Geography'],
  },
  {
    id: 'gs2',
    code: 'GS-2',
    name: 'General Studies II',
    shortDesc: 'Constitution, Governance, Polity, Social Justice & IR',
    bgColor: 'bg-retro-gs2',
    textColor: 'text-retro-gs2',
    borderColor: 'border-retro-gs2',
    badgeBg: 'bg-[#E09F71]/15',
    badgeText: 'text-[#a15f30]',
    domains: ['Constitution', 'Parliament', 'Federalism', 'Social Justice', 'Foreign Policy'],
  },
  {
    id: 'gs3',
    code: 'GS-3',
    name: 'General Studies III',
    shortDesc: 'Economy, Sci-Tech, Bio-diversity, Security & Disaster Mgmt',
    bgColor: 'bg-retro-gs3',
    textColor: 'text-retro-gs3',
    borderColor: 'border-retro-gs3',
    badgeBg: 'bg-[#6C91BF]/15',
    badgeText: 'text-[#365985]',
    domains: ['Indian Economy', 'Agriculture', 'Sci & Tech', 'Environment', 'Internal Security'],
  },
  {
    id: 'gs4',
    code: 'GS-4',
    name: 'General Studies IV',
    shortDesc: 'Ethics, Integrity, Aptitude & Administrative Case Studies',
    bgColor: 'bg-retro-gs4',
    textColor: 'text-retro-gs4',
    borderColor: 'border-retro-gs4',
    badgeBg: 'bg-[#C47B89]/15',
    badgeText: 'text-[#8b4352]',
    domains: ['Ethics Theory', 'Human Values', 'Moral Philosophers', 'Probity', 'Case Studies'],
  },
  {
    id: 'essay',
    code: 'ESSAY',
    name: 'Essay Paper',
    shortDesc: 'Philosophical, Abstract, Socio-Economic & Contemporary Themes',
    bgColor: 'bg-retro-essay',
    textColor: 'text-retro-essay',
    borderColor: 'border-retro-essay',
    badgeBg: 'bg-[#D35400]/15',
    badgeText: 'text-[#9c3e00]',
    domains: ['Philosophical Ideas', 'Socio-Economic', 'Democracy & Justice', 'Science & Ethics'],
  },
];

export default function PaperCards() {
  const stats = getStats();
  const paperCounts = stats.paperCounts || {};

  return (
    <section className="bg-retro-bg/60 py-12 md:py-18 border-y-4 border-retro-border w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b-2 border-retro-border gap-4">
          <div>
            <span className="retro-tag text-[11px] mb-2 inline-block">EXAM TAXONOMY</span>
            <h2 className="font-vt text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-retro-border">
              The 5 Core Question Papers
            </h2>
            <p className="font-space text-xs sm:text-sm text-retro-border/80 mt-1 max-w-xl">
              1,131 official questions mapped to syllabus pointers, weightage marks, and micro-themes.
            </p>
          </div>

          <Link
            href="/explore"
            className="retro-btn inline-flex items-center gap-2 self-start sm:self-auto hover:bg-retro-border hover:text-white transition-colors"
          >
            <span>Open Master Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* First Row: 3 GS Papers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {PAPERS_CONFIG.slice(0, 3).map((paper) => {
            const count = paperCounts[paper.id] || 280;
            return (
              <div
                key={paper.id}
                className="retro-container bg-retro-window border-4 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-200 group"
              >
                {/* Window Header */}
                <div className={`window-header ${paper.bgColor}`}>
                  <div className="flex items-center gap-2 font-vt text-lg text-white">
                    <Folder className="w-4 h-4 fill-white/80" />
                    <span>C:\{paper.code}\ARCHIVE</span>
                  </div>
                  <span className="bg-white/20 px-2 py-0.5 text-xs font-space font-bold border border-white/40">
                    {count} Qs
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-space font-bold text-lg sm:text-xl text-retro-border group-hover:text-retro-accent transition-colors">
                        {paper.name}
                      </h3>
                      <span className={`px-2 py-0.5 font-vt text-sm border-2 border-retro-border ${paper.bgColor} text-white font-bold`}>
                        {paper.code}
                      </span>
                    </div>

                    <p className="font-space text-xs text-retro-border/80 leading-relaxed mb-5 min-h-[38px]">
                      {paper.shortDesc}
                    </p>

                    <div className="mb-6">
                      <div className="text-[10px] font-space font-bold text-retro-border/70 uppercase mb-2 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-retro-border" />
                        <span>Syllabus Domains</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {paper.domains.map((domain) => (
                          <span
                            key={domain}
                            className="text-[11px] font-space font-bold px-2 py-0.5 bg-white border border-retro-border text-retro-border shadow-[1px_1px_0px_#2A2A2A]"
                          >
                            {domain}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/explore/${paper.id}`}
                    className="retro-btn block w-full text-center text-sm font-space font-bold uppercase hover:bg-retro-border hover:text-white transition-colors"
                  >
                    Explore {paper.code} Questions ({count}) →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Second Row: GS4 and Essay in 2 balanced columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {PAPERS_CONFIG.slice(3, 5).map((paper) => {
            const count = paperCounts[paper.id] || (paper.id === 'gs4' ? 179 : 112);
            return (
              <div
                key={paper.id}
                className="retro-container bg-retro-window border-4 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-200 group"
              >
                {/* Window Header */}
                <div className={`window-header ${paper.bgColor}`}>
                  <div className="flex items-center gap-2 font-vt text-lg text-white">
                    <Folder className="w-4 h-4 fill-white/80" />
                    <span>C:\{paper.code}\ARCHIVE</span>
                  </div>
                  <span className="bg-white/20 px-2 py-0.5 text-xs font-space font-bold border border-white/40">
                    {count} Qs
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-space font-bold text-lg sm:text-xl text-retro-border group-hover:text-retro-accent transition-colors">
                        {paper.name}
                      </h3>
                      <span className={`px-2 py-0.5 font-vt text-sm border-2 border-retro-border ${paper.bgColor} text-white font-bold`}>
                        {paper.code}
                      </span>
                    </div>

                    <p className="font-space text-xs text-retro-border/80 leading-relaxed mb-5 min-h-[38px]">
                      {paper.shortDesc}
                    </p>

                    <div className="mb-6">
                      <div className="text-[10px] font-space font-bold text-retro-border/70 uppercase mb-2 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-retro-border" />
                        <span>Syllabus Domains</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {paper.domains.map((domain) => (
                          <span
                            key={domain}
                            className="text-[11px] font-space font-bold px-2 py-0.5 bg-white border border-retro-border text-retro-border shadow-[1px_1px_0px_#2A2A2A]"
                          >
                            {domain}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/explore/${paper.id}`}
                    className="retro-btn block w-full text-center text-sm font-space font-bold uppercase hover:bg-retro-border hover:text-white transition-colors"
                  >
                    Explore {paper.code} Questions ({count}) →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
