import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Question, SyllabusPointer, Subject } from '@/types';
import QuestionCard from '@/components/question/QuestionCard';
import { Layers, Sparkles } from 'lucide-react';
import MetaNoteEditor from './MetaNoteEditor';
import AggregatedNotesList from './AggregatedNotesList';
import { getAllNotes, NoteEntry } from '@/lib/notes';
import { getAIDeconstruction } from '@/lib/aiDeconstruction';


interface ExploreContentProps {
  paperId: string;
  questions: Question[];
  mode: 'pointer' | 'subject' | 'year';
  subject?: Subject;
  pointer?: SyllabusPointer;
  pointerIndex?: number;
  totalPointers?: number;
  year?: number;
  onBackToIndex?: () => void;
}

export default function ExploreContent({
  paperId,
  questions,
  mode,
  subject,
  pointer,
  pointerIndex,
  totalPointers,
  year,
  onBackToIndex,
}: ExploreContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'marks'>('newest');
  const [allNotes, setAllNotes] = useState<NoteEntry[]>([]);

  useEffect(() => {
    const load = () => setAllNotes(getAllNotes());
    load();
    window.addEventListener('pyq-notes-updated', load);
    return () => window.removeEventListener('pyq-notes-updated', load);
  }, []);

  const aggregatedNotes = useMemo(() => {
    if (mode === 'pointer' && pointer) {
      return allNotes.filter(n => n.pointerId === pointer.id || questions.find(q => q.id === n.questionId && q.pointerId === pointer.id));
    }
    if (mode === 'subject' && subject) {
      const subjectQuestionIds = new Set(questions.filter(q => q.subjectId === subject.id).map(q => q.id));
      return allNotes.filter(n => subjectQuestionIds.has(n.questionId));
    }
    return [];
  }, [mode, pointer, subject, allNotes, questions]);

  // Filter questions based on mode
  const filteredQs = useMemo(() => {
    let qs = questions;
    
    if (mode === 'pointer' && pointer) {
      qs = qs.filter((q) => q.pointerId === pointer.id);
    } else if (mode === 'subject' && subject) {
      qs = qs.filter((q) => q.subjectId === subject.id);
    }
    
    // Always apply year filter if it exists in the URL, regardless of mode (except if mode is strictly year, which just applies this anyway)
    if (year) {
      qs = qs.filter((q) => q.year === year);
    }

    // Sort
    return [...qs].sort((a, b) => {
      if (sortOrder === 'newest') return b.year - a.year;
      if (sortOrder === 'oldest') return a.year - b.year;
      if (sortOrder === 'marks') return b.marks - a.marks;
      return 0;
    });
  }, [questions, mode, subject, pointer, year, sortOrder]);

  const yearGroups = useMemo(() => {
    const groups: Record<number, Question[]> = {};
    filteredQs.forEach((q) => {
      if (!groups[q.year]) groups[q.year] = [];
      groups[q.year].push(q);
    });
    return groups;
  }, [filteredQs, mode]);

  // Aggregate AI micro-themes from currently filtered questions
  const activeMicroThemes = useMemo(() => {
    const counts = new Map<string, number>();
    filteredQs.forEach((q) => {
      const ai = getAIDeconstruction(q.id);
      if (ai?.taxonomy_mapping?.micro_themes) {
        ai.taxonomy_mapping.micro_themes.forEach((theme) => {
          counts.set(theme, (counts.get(theme) || 0) + 1);
        });
      }
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [filteredQs]);


  const themeBorder = () => {
    switch (paperId) {
      case 'gs1': return 'border-blue-200';
      case 'gs2': return 'border-emerald-200';
      case 'gs3': return 'border-amber-200';
      case 'gs4': return 'border-purple-200';
      case 'essay': return 'border-red-200';
      default: return 'border-gray-200';
    }
  };
  const themeText = () => {
    switch (paperId) {
      case 'gs1': return 'text-blue-600';
      case 'gs2': return 'text-emerald-600';
      case 'gs3': return 'text-amber-600';
      case 'gs4': return 'text-purple-600';
      case 'essay': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-surface custom-scrollbar relative h-full">
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        
        {/* Header */}
        <div className="retro-container p-6 relative bg-white mb-8">
          <div className="absolute -top-3 -right-3 retro-badge bg-white shadow-retro-sm">
            {filteredQs.length} Questions
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            {onBackToIndex && (
              <button
                onClick={onBackToIndex}
                className="retro-btn outline text-sm py-0 shadow-none flex items-center gap-1 hover:bg-retro-border hover:text-white"
              >
                <span>&lt;</span> Syllabus Index
              </button>
            )}
            
            {mode === 'pointer' && pointer && pointerIndex !== undefined && (
              <span className="retro-badge bg-retro-border text-white shadow-none">
                Point #{String(pointerIndex).padStart(2, '0')}
                {totalPointers ? ` of ${totalPointers}` : ''}
              </span>
            )}
            {subject && (
              <span className={`font-space text-xs font-bold uppercase tracking-widest ${themeText()}`}>
                {subject.name}
              </span>
            )}
          </div>

          <h1 className="font-space font-bold text-2xl md:text-3xl mb-4 border-l-8 border-retro-border pl-4">
            {mode === 'pointer' && pointer && pointer.label}
            {mode === 'subject' && subject && subject.name}
            {!pointer && !subject && 'Select a topic from the sidebar'}
          </h1>

          {mode === 'pointer' && pointer && (
            <blockquote className="font-space text-sm italic bg-retro-window p-3 border-2 border-retro-border mb-6">
              "{pointer.officialText}"
            </blockquote>
          )}

          {mode === 'subject' && subject && (
            <blockquote className="font-space text-sm italic bg-retro-window p-3 border-2 border-retro-border mb-6">
              {subject.description}
            </blockquote>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-dashed border-retro-border pt-4">
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 14 }, (_, i) => 2026 - i).map((y) => {
                const isActive = year === y;
                return (
                  <button
                    key={y}
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams.toString());
                      if (isActive) {
                        newParams.delete('year');
                      } else {
                        newParams.set('year', y.toString());
                      }
                      const qs = newParams.toString();
                      router.replace(qs ? `?${qs}` : window.location.pathname);
                    }}
                    className={`retro-btn text-sm py-0 px-2 shadow-none hover:bg-retro-border hover:text-white ${
                      isActive ? 'bg-retro-border text-white' : 'outline text-retro-border'
                    }`}
                  >
                    {y}
                  </button>
                );
              })}
            </div>
            
            <div className="flex items-center gap-2 font-space text-sm font-bold shrink-0">
              <span>Sort:</span>
              <select
                className="border-2 border-retro-border p-1 bg-white focus:outline-none shadow-retro-sm uppercase font-vt text-lg cursor-pointer"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="marks">Highest Marks</option>
              </select>
            </div>
          </div>

          {/* AI Micro-Themes in this Topic */}
          {activeMicroThemes.length > 0 && (
            <div className="mt-6">
              <div className="font-space text-xs font-bold uppercase mb-2 flex items-center gap-1 text-retro-accent">
                <Sparkles className="w-3.5 h-3.5" strokeWidth={3} />
                Micro-Themes:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeMicroThemes.map(([themeName, count], idx) => {
                  const bgColors = ['bg-retro-folder', 'bg-white', 'bg-[#FFD1D1]', 'bg-[#D1E8FF]', 'bg-[#D1FFD6]'];
                  const bgClass = bgColors[idx % bgColors.length];
                  
                  return (
                    <Link
                      key={themeName}
                      href={`/search?q=${encodeURIComponent(themeName)}`}
                      className={`retro-badge ${bgClass} text-retro-border shadow-[2px_2px_0px_#2A2A2A] hover:-translate-y-0.5 transition-transform cursor-pointer`}
                      title={`Search all questions on ${themeName}`}
                    >
                      {themeName} ({count})
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>


        {/* Meta Notes Section */}
        {mode === 'pointer' && pointer && (
          <>
            <MetaNoteEditor key={`meta-${pointer.id}`} id={pointer.id} type="pointer" title={pointer.label} />
            <AggregatedNotesList key={`agg-${pointer.id}`} notes={aggregatedNotes} />
          </>
        )}
        {mode === 'subject' && subject && (
          <>
            <MetaNoteEditor key={`meta-${subject.id}`} id={subject.id} type="subject" title={subject.name} />
            <AggregatedNotesList key={`agg-${subject.id}`} notes={aggregatedNotes} />
          </>
        )}

        <div className="space-y-6">
          {filteredQs.length === 0 ? (
            <div className="text-center py-12 bg-white border border-bordercolor rounded-xl">
              <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-primary">No questions found</h3>
              <p className="text-sm text-muted">Try selecting a different topic or filter.</p>
            </div>
          ) : (
            // Group by year for pointer and subject views
            Object.keys(yearGroups || {}).sort((a, b) => sortOrder === 'newest' ? Number(b) - Number(a) : Number(a) - Number(b)).map((yStr) => {
              const y = Number(yStr);
              return (
                <div key={y} className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-lg font-bold text-primary">{y}</h3>
                    <div className="h-px bg-bordercolor flex-1"></div>
                  </div>
                  <div className="space-y-5">
                    {yearGroups![y].map((q) => (
                      <QuestionCard key={q.id} question={q} />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
