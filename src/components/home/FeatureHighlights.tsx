import React from 'react';
import Link from 'next/link';
import { Cpu, GitBranch, Bookmark, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const FEATURES = [
  {
    icon: Cpu,
    title: 'AI Question Deconstruction',
    tag: 'INTELLIGENCE',
    color: 'bg-retro-accent',
    description: 'Every question is deconstructed into its Core Demand, Directives (Critically Examine, Discuss, Elucidate), and a structured 150/250-word answer framework with introductory hooks and concluding points.',
    badge: 'AI-Powered',
  },
  {
    icon: GitBranch,
    title: 'Cross-Paper Continuity Graph',
    tag: 'INTERCONNECTION',
    color: 'bg-retro-gs3',
    description: 'Discover how topics like Climate Change, AI, or Federalism transcend multiple papers—linking GS1 geography to GS2 governance, GS3 economics, and philosophical Essay angles.',
    badge: 'Taxonomy Graph',
  },
  {
    icon: CheckCircle2,
    title: 'Official Syllabus Micro-Mapping',
    tag: 'ALIGNMENT',
    color: 'bg-retro-gs1',
    description: '100% of questions are tagged to the UPSC syllabus subtopic and pointer. Zero guessing where a question belongs—study topic-by-topic with full coverage confidence.',
    badge: '100% Mapped',
  },
  {
    icon: Bookmark,
    title: 'Local-First Personal Vault',
    tag: 'PRIVACY & OFFLINE',
    color: 'bg-retro-gs2',
    description: 'Save questions, jot down private preparation notes with rich markdown, and build your custom revision queues—stored directly in your browser with instant local persistence.',
    badge: 'No Login Required',
  },
];

export default function FeatureHighlights() {
  return (
    <section className="bg-retro-bg/80 py-12 md:py-20 border-t-4 border-retro-border w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b-2 border-retro-border gap-4">
          <div>
            <span className="retro-tag text-[11px] mb-2 inline-block">SYSTEM CAPABILITIES</span>
            <h2 className="font-vt text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-retro-border">
              Engineered for Serious Aspirants
            </h2>
            <p className="font-space text-xs sm:text-sm text-retro-border/80 mt-1 max-w-xl">
              Why PYQ Vault is more than just a PDF question bank.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto font-space text-xs text-retro-border">
            <ShieldCheck className="w-4 h-4 text-retro-accent" />
            <span className="font-bold">100% Free & Open-Access</span>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="retro-container bg-retro-window border-4 p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 border-2 border-retro-border ${feature.color} text-white flex items-center justify-center shadow-retro-sm`}>
                        <Icon className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <span className="retro-tag text-[10px]">{feature.tag}</span>
                    </div>
                    <span className="text-xs font-vt bg-white border border-retro-border px-2 py-0.5 font-bold text-retro-border">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-space font-bold text-lg sm:text-xl text-retro-border mb-3">
                    {feature.title}
                  </h3>

                  <p className="font-space text-xs sm:text-sm text-retro-border/85 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-dashed border-retro-border">
                  <span className="font-vt text-sm font-bold text-retro-border flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-retro-accent" />
                    <span>{feature.badge}</span>
                  </span>

                  <Link
                    href={idx === 0 ? '/explore/gs2' : idx === 1 ? '/high-yield' : idx === 2 ? '/explore' : '/saved'}
                    className="font-space text-xs font-bold text-retro-border hover:text-retro-accent underline"
                  >
                    Try Feature →
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
