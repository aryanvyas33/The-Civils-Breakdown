import React, { useState } from 'react';
import { Subject, SyllabusPointer } from '@/types';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ExploreSidebarProps {
  paperId: string;
  subjects: Subject[];
  pointers: SyllabusPointer[];
  questionsByPointer: Record<string, number>;
  questionsBySubject: Record<string, number>;
  selectedSubjectId: string | null;
  selectedPointerId: string | null;
  viewMode: 'syllabus' | 'subject';
  isIndexActive?: boolean;
  onSelect: (type: 'subject' | 'pointer' | 'index', id: string) => void;
  onViewModeChange: (mode: 'syllabus' | 'subject') => void;
}

export default function ExploreSidebar({
  paperId,
  subjects,
  pointers,
  questionsByPointer,
  questionsBySubject,
  selectedSubjectId,
  selectedPointerId,
  viewMode,
  isIndexActive = false,
  onSelect,
  onViewModeChange,
}: ExploreSidebarProps) {
  // We keep local state for which subjects are expanded in the accordion
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>(() => {
    // Expand the subject that contains the selected pointer, or the selected subject
    const pointerSubjectId = selectedPointerId
      ? pointers.find((p) => p.id === selectedPointerId)?.subjectId
      : null;
    return subjects.reduce(
      (acc, s) => ({
        ...acc,
        [s.id]: s.id === selectedSubjectId || s.id === pointerSubjectId || (!selectedPointerId && !selectedSubjectId && s === subjects[0]),
      }),
      {}
    );
  });

  const toggleSubject = (subjectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSubjects((prev) => ({ ...prev, [subjectId]: !prev[subjectId] }));
    if (viewMode === 'subject') {
      onSelect('subject', subjectId);
    }
  };

  const getHeaderColorClass = () => {
    switch (paperId) {
      case 'gs1': return 'bg-blue-50/30';
      case 'gs2': return 'bg-emerald-50/30';
      case 'gs3': return 'bg-amber-50/30';
      case 'gs4': return 'bg-purple-50/30';
      case 'essay': return 'bg-red-50/30';
      default: return 'bg-gray-50/30';
    }
  };

  const getDotColorClass = () => {
    switch (paperId) {
      case 'gs1': return 'bg-blue-500';
      case 'gs2': return 'bg-emerald-500';
      case 'gs3': return 'bg-amber-500';
      case 'gs4': return 'bg-purple-500';
      case 'essay': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getThemeColors = () => {
    switch (paperId) {
      case 'gs1': return { border: 'border-blue-200', bgOpen: 'bg-blue-50/20', bgHeader: 'bg-blue-100/50', textOpen: 'text-blue-900', textCount: 'text-blue-700' };
      case 'gs2': return { border: 'border-emerald-200', bgOpen: 'bg-emerald-50/20', bgHeader: 'bg-emerald-100/50', textOpen: 'text-emerald-900', textCount: 'text-emerald-700' };
      case 'gs3': return { border: 'border-amber-200', bgOpen: 'bg-amber-50/20', bgHeader: 'bg-amber-100/50', textOpen: 'text-amber-900', textCount: 'text-amber-700' };
      case 'gs4': return { border: 'border-purple-200', bgOpen: 'bg-purple-50/20', bgHeader: 'bg-purple-100/50', textOpen: 'text-purple-900', textCount: 'text-purple-700' };
      case 'essay': return { border: 'border-red-200', bgOpen: 'bg-red-50/20', bgHeader: 'bg-red-100/50', textOpen: 'text-red-900', textCount: 'text-red-700' };
      default: return { border: 'border-gray-200', bgOpen: 'bg-gray-50/20', bgHeader: 'bg-gray-100/50', textOpen: 'text-gray-900', textCount: 'text-gray-700' };
    }
  };

  const theme = getThemeColors();
  const isSyllabusView = viewMode === 'syllabus';

  return (
    <div className="w-full md:w-80 bg-white border-r-4 border-retro-border flex flex-col shrink-0 h-full">
      {/* Header */}
      <div className="p-4 border-b-4 border-retro-border bg-white">
        <h2 className="font-space font-bold text-xl flex items-center gap-2">
          <span className={`w-3 h-3 rounded-none border-2 border-retro-border ${getDotColorClass()}`}></span>
          {paperId === 'essay' ? 'Essay Paper' : `GS Paper ${paperId.replace('gs', '')}`}
        </h2>

        {/* Master Syllabus Index Button */}
        <button
          onClick={() => onSelect('index', '')}
          className={`w-full mt-4 py-2 px-3 text-sm font-space font-bold flex items-center justify-between border-2 transition-all ${
            isIndexActive
              ? 'bg-retro-border text-white border-retro-border shadow-retro-sm'
              : 'bg-white hover:bg-retro-window text-retro-border border-retro-border shadow-none hover:shadow-retro-sm'
          }`}
        >
          <span className="flex items-center gap-2 uppercase">
            <span className="text-base font-vt">📋</span>
            <span>Master Syllabus Index</span>
          </span>
          <span
            className={`text-[10px] px-1 border border-current ${
              isIndexActive ? 'bg-retro-border text-white' : 'bg-white text-retro-border'
            }`}
          >
            {pointers.length} Topics
          </span>
        </button>
      </div>

      {/* Accordion List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-4">
        {subjects.map((subject) => {
          const isExpanded = expandedSubjects[subject.id];
          const isActiveSubject = selectedSubjectId === subject.id && !isSyllabusView;
          const subjectPointers = pointers.filter((p) => p.subjectId === subject.id);
          const subjectQs = questionsBySubject[subject.id] || 0;

          // Determine the paper color class based on paperId
          let subjectColorBgClass = 'bg-retro-border';
          if (paperId === 'gs1') subjectColorBgClass = 'bg-retro-gs1';
          else if (paperId === 'gs2') subjectColorBgClass = 'bg-retro-gs2';
          else if (paperId === 'gs3') subjectColorBgClass = 'bg-retro-gs3';
          else if (paperId === 'gs4') subjectColorBgClass = 'bg-retro-gs4';
          else if (paperId === 'essay') subjectColorBgClass = 'bg-retro-accent';

          return (
            <div
              key={subject.id}
              className={`retro-container p-0 overflow-hidden ${
                isExpanded || isActiveSubject ? 'shadow-retro-sm' : 'shadow-none hover:shadow-retro-sm transition-all'
              }`}
            >
              <div
                onClick={(e) => toggleSubject(subject.id, e)}
                className={`border-b-2 border-retro-border p-2 flex justify-between items-center font-space font-bold text-xs uppercase cursor-pointer ${
                  isExpanded || isActiveSubject ? `${subjectColorBgClass} ${paperId !== 'gs2' && paperId !== 'gs3' ? 'text-white' : 'text-retro-border'} hover:brightness-95` : 'bg-white hover:bg-retro-window text-retro-border'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-vt text-sm">{isExpanded ? 'v' : '>'}</span>
                  <span>{subject.name}</span>
                </div>
                <span className={`bg-white px-1 border border-retro-border ${isExpanded || isActiveSubject ? 'text-retro-border' : ''}`}>
                  {subjectQs} Qs
                </span>
              </div>

              {isExpanded && isSyllabusView && (
                <div className="bg-white">
                  {subjectPointers.map((pointer) => {
                    const qsCount = questionsByPointer[pointer.id] || 0;
                    const isSelected = selectedPointerId === pointer.id;
                    const originalIndex = pointers.findIndex((p) => p.id === pointer.id) + 1;
                    const formattedIndex = String(originalIndex).padStart(2, '0');

                    return (
                      <div
                        key={pointer.id}
                        onClick={() => onSelect('pointer', pointer.id)}
                        className={`p-2 border-b border-retro-border flex gap-2 font-space text-[10px] cursor-pointer last:border-b-0 ${
                          isSelected ? 'bg-retro-border text-white' : 'hover:bg-retro-window text-retro-border'
                        }`}
                      >
                        <span className="font-bold">{formattedIndex}</span>
                        <span className="flex-1 font-bold leading-tight line-clamp-2">
                          {pointer.label}
                        </span>
                        <span className={`font-bold ${isSelected ? 'text-retro-accent' : 'text-retro-gs2'}`}>
                          {qsCount}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
