'use client';

import React, { useState, useMemo } from 'react';
import { Paper, SyllabusPointer, Subject, Question } from '@/types';
import { Search, BookOpen, ArrowRight, Award, CheckCircle2, FileText } from 'lucide-react';

interface SyllabusIndexViewProps {
  paper: Paper;
  pointers: SyllabusPointer[];
  subjects: Subject[];
  questions: Question[];
  onSelectPointer: (pointerId: string) => void;
}

export default function SyllabusIndexView({
  paper,
  pointers,
  subjects,
  questions,
  onSelectPointer,
}: SyllabusIndexViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Precompute question metrics per pointer
  const pointerStats = useMemo(() => {
    const stats: Record<
      string,
      { count: number; marks: number; recentYears: number[] }
    > = {};

    pointers.forEach((p) => {
      const qList = questions.filter((q) => q.pointerId === p.id);
      stats[p.id] = {
        count: qList.length,
        marks: qList.reduce((acc, q) => acc + (q.marks || 0), 0),
        recentYears: Array.from(new Set(qList.map((q) => q.year)))
          .sort((a, b) => b - a)
          .slice(0, 4),
      };
    });

    return stats;
  }, [pointers, questions]);

  const subjectMap = useMemo(() => {
    const map = new Map<string, Subject>();
    subjects.forEach((s) => map.set(s.id, s));
    return map;
  }, [subjects]);

  // Filter pointers based on search query
  const filteredPointers = useMemo(() => {
    if (!searchQuery.trim()) return pointers;
    const query = searchQuery.toLowerCase().trim();

    return pointers.filter((p, index) => {
      const indexStr = `${index + 1}`.padStart(2, '0');
      const subjectName = subjectMap.get(p.subjectId)?.name || '';
      return (
        p.label.toLowerCase().includes(query) ||
        p.officialText.toLowerCase().includes(query) ||
        subjectName.toLowerCase().includes(query) ||
        indexStr.includes(query) ||
        p.keywords.some((k) => k.toLowerCase().includes(query))
      );
    });
  }, [pointers, searchQuery, subjectMap]);

  const getThemeColors = () => {
    switch (paper.id) {
      case 'gs1':
        return {
          accent: 'text-retro-gs1',
          badge: 'bg-retro-gs1 text-white border-retro-gs1',
          bg: 'bg-retro-gs1',
          iconBg: 'bg-retro-gs1 text-white',
        };
      case 'gs2':
        return {
          accent: 'text-retro-gs2',
          badge: 'bg-retro-gs2 text-retro-border border-retro-gs2',
          bg: 'bg-retro-gs2',
          iconBg: 'bg-retro-gs2 text-retro-border',
        };
      case 'gs3':
        return {
          accent: 'text-retro-gs3',
          badge: 'bg-retro-gs3 text-retro-border border-retro-gs3',
          bg: 'bg-retro-gs3',
          iconBg: 'bg-retro-gs3 text-retro-border',
        };
      case 'gs4':
        return {
          accent: 'text-retro-gs4',
          badge: 'bg-retro-gs4 text-white border-retro-gs4',
          bg: 'bg-retro-gs4',
          iconBg: 'bg-retro-gs4 text-white',
        };
      case 'essay':
        return {
          accent: 'text-retro-essay',
          badge: 'bg-retro-essay text-white border-retro-essay',
          bg: 'bg-retro-essay',
          iconBg: 'bg-retro-essay text-white',
        };
      default:
        return {
          accent: 'text-retro-border',
          badge: 'bg-retro-border text-white border-retro-border',
          bg: 'bg-retro-border',
          iconBg: 'bg-retro-border text-white',
        };
    }
  };

  const theme = getThemeColors();
  const totalQuestions = questions.length;
  const totalMarks = questions.reduce((acc, q) => acc + (q.marks || 0), 0);

  return (
    <div className="flex-1 overflow-y-auto bg-surface custom-scrollbar relative h-full">
      <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-8">
        
        {/* Header Card */}
        <div className="retro-container p-6 relative bg-white">
          <div className="absolute -top-3 -right-3 flex flex-col gap-1 items-end">
            <span className={`retro-badge shadow-retro-sm text-xs py-0 ${theme.badge.split(' ')[0]} ${theme.badge.split(' ')[1]}`}>{pointers.length} Official Topics</span>
            <span className="retro-badge bg-white shadow-retro-sm text-xs py-0">{totalQuestions} Questions</span>
          </div>
          
          <div className={`font-space font-bold text-xs uppercase tracking-widest mb-1 ${theme.accent}`}>Official UPSC CSE Mains Syllabus</div>
          <h1 className="font-space font-bold text-3xl md:text-4xl mb-4 flex items-center gap-3">
            <div className="w-10 h-10 border-4 border-retro-border bg-white flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" strokeWidth={3} />
            </div>
            {paper.id === 'essay' ? 'Essay Paper' : `General Studies Paper ${paper.id.replace('gs', '')}`}<br/>Index
          </h1>
          
          <p className={`font-space text-sm max-w-2xl leading-relaxed mb-6 border-l-4 pl-4 ${theme.accent.replace('text', 'border')}`}>
            {paper.description}
          </p>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="> Search syllabus topics, keywords (e.g. 'elections', 'judiciary')..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-4 border-retro-border p-3 font-space text-sm focus:outline-none focus:bg-retro-window shadow-[4px_4px_0px_#2A2A2A] mb-2" 
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-xs font-vt uppercase font-bold hover:text-retro-accent cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        
        {/* Directory List */}
        <div>
          <div className="flex justify-between items-end mb-4 border-b-2 border-dashed border-retro-border pb-2">
            <h2 className="font-space font-bold text-sm uppercase">Official Syllabus Directory ({filteredPointers.length} Topics)</h2>
            <span className="font-vt text-lg uppercase hidden sm:inline-block">2013-2026 Archive</span>
          </div>
          
          <div className="space-y-4">
            {filteredPointers.length === 0 ? (
              <div className="retro-container p-12 text-center bg-retro-window">
                <h3 className="font-vt text-2xl font-bold mb-1 text-retro-border">NO SYLLABUS TOPIC MATCHED</h3>
                <p className="font-space text-sm text-retro-border">Try a different search term or clear the filter.</p>
              </div>
            ) : (
              filteredPointers.map((pointer) => {
                const originalIndex = pointers.findIndex((p) => p.id === pointer.id) + 1;
                const formattedIndex = String(originalIndex).padStart(2, '0');
                const stats = pointerStats[pointer.id] || { count: 0, marks: 0, recentYears: [] };
                const subject = subjectMap.get(pointer.subjectId);

                return (
                  <div key={pointer.id} onClick={() => onSelectPointer(pointer.id)} className="retro-container p-0 flex flex-col md:flex-row group hover:shadow-retro-lg transition-shadow cursor-pointer">
                    <div className={`w-full md:w-20 ${theme.iconBg} border-b-4 md:border-b-0 md:border-r-4 border-retro-border flex md:flex-col items-center justify-center p-2`}>
                      <span className="font-space font-bold text-[10px] uppercase">Point</span>
                      <span className="font-space font-bold text-3xl">{formattedIndex}</span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap gap-2 font-space text-[10px] font-bold uppercase text-retro-border mb-2 items-center">
                          {subject && <span className={`retro-badge shadow-none border-2 py-0 ${theme.badge}`}>{subject.name}</span>}
                          <span className="retro-tag bg-retro-window">{stats.count} Questions Asked</span>
                          {stats.marks > 0 && <span className="retro-tag bg-[#FFD1D1] text-retro-accent border-retro-accent">{stats.marks} Marks</span>}
                        </div>
                        <h3 className="font-space font-bold text-xl mb-2 group-hover:text-retro-accent transition-colors">{pointer.label}</h3>
                        <p className="font-space text-xs italic text-gray-600 mb-4 border-l-2 border-gray-300 pl-2">
                          "{pointer.officialText}"
                        </p>
                      </div>
                      <div className="flex justify-between items-end">
                        {stats.recentYears.length > 0 ? (
                          <div className="font-space text-[10px] font-bold uppercase flex gap-1 items-center">
                            <span className="text-gray-500">Recent:</span>
                            {stats.recentYears.map((yr, idx) => (
                              <span key={yr} className={idx === 0 ? "bg-retro-border text-white px-1" : "border border-retro-border px-1"}>{yr}</span>
                            ))}
                          </div>
                        ) : (
                          <div></div>
                        )}
                        <button className="retro-btn text-base py-1 px-3 shadow-none bg-[#2A2A2A] text-white group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0px_#2A2A2A]">
                          Explore PYQs -&gt;
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
