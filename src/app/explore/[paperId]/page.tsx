'use client';

import React, { useMemo, useState } from 'react';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import ExploreSidebar from '@/components/explore/ExploreSidebar';
import ExploreContent from '@/components/explore/ExploreContent';
import SyllabusIndexView from '@/components/explore/SyllabusIndexView';
import PaperSwitcher from '@/components/explore/PaperSwitcher';
import { getPaperById, getAllSubjects, getQuestionsByPaper } from '@/lib/data';
import { getSyllabusPointersByPaper } from '@/lib/syllabus';
import { Question } from '@/types';
import { BookOpen, X } from 'lucide-react';

export default function ExplorePaperPage({ params }: { params: { paperId: string } }) {
  const paper = getPaperById(params.paperId);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!paper) {
    notFound();
  }

  // Get data for the paper
  const subjects = useMemo(() => getAllSubjects().filter(s => s.paperId === paper.id), [paper.id]);
  const pointers = useMemo(() => getSyllabusPointersByPaper(paper.id), [paper.id]);
  const questions = useMemo(() => getQuestionsByPaper(paper.id), [paper.id]);

  // Compute stats for the sidebar
  const questionsBySubject = useMemo(() => {
    const counts: Record<string, number> = {};
    questions.forEach(q => {
      counts[q.subjectId] = (counts[q.subjectId] || 0) + 1;
    });
    return counts;
  }, [questions]);

  const questionsByPointer = useMemo(() => {
    const counts: Record<string, number> = {};
    questions.forEach(q => {
      if (q.pointerId) {
        counts[q.pointerId] = (counts[q.pointerId] || 0) + 1;
      }
    });
    return counts;
  }, [questions]);

  // Parse state from URL
  const viewModeParam = searchParams.get('view') as 'syllabus' | 'subject' | 'year' | 'index' | null;
  const subjectParam = searchParams.get('subject');
  const pointerParam = searchParams.get('pointer');
  const yearParam = searchParams.get('year');
  
  // Determine sidebar view mode
  const viewMode = viewModeParam === 'subject' ? 'subject' : 'syllabus';
  
  // Determine mode for Content: default to 'index' if no specific pointer/subject/year is requested
  let contentMode: 'index' | 'pointer' | 'subject' | 'year' = 'index';
  if (viewModeParam === 'year' || (yearParam && !pointerParam && !subjectParam)) {
    contentMode = 'year';
  } else if (pointerParam) {
    contentMode = 'pointer';
  } else if (subjectParam || (viewModeParam === 'subject' && !pointerParam)) {
    contentMode = 'subject';
  } else if (viewModeParam === 'index') {
    contentMode = 'index';
  } else {
    // Default when entering /explore/[paperId] or "Browse Official Syllabus": Master Syllabus Index!
    contentMode = 'index';
  }

  // Determine active elements
  const activeSubject = subjectParam 
    ? subjects.find(s => s.id === subjectParam) 
    : (pointerParam 
        ? subjects.find(s => s.id === pointers.find(p => p.id === pointerParam)?.subjectId)
        : subjects[0]);
  
  const activePointer = pointerParam ? pointers.find(p => p.id === pointerParam) : undefined;
  const activeYear = yearParam ? parseInt(yearParam, 10) : (viewModeParam === 'year' ? 2026 : undefined);

  const pointerIndex = activePointer ? pointers.findIndex(p => p.id === activePointer.id) + 1 : undefined;
  const totalPointers = pointers.length;

  // Handlers for updating URL
  const handleSelect = (type: 'subject' | 'pointer' | 'index', id: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('subject');
    newParams.delete('pointer');
    newParams.delete('year');
    newParams.delete('view');
    
    if (type === 'index') {
      newParams.set('view', 'index');
    } else {
      newParams.set(type, id);
    }

    router.replace(`/explore/${paper.id}?${newParams.toString()}`);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsDrawerOpen(false);
    }
  };

  const handleViewModeChange = (mode: 'syllabus' | 'subject') => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('view', mode);
    
    if (mode === 'subject' && !newParams.has('subject')) {
      newParams.delete('pointer');
      if (activeSubject) newParams.set('subject', activeSubject.id);
    }
    
    router.replace(`/explore/${paper.id}?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Navbar Paper Switcher (Sticky top strip) */}
      <div className="px-6 pt-3 flex items-center shrink-0 border-b-4 border-retro-border z-20">
        <PaperSwitcher currentPaperId={paper.id} />
      </div>

      <div className="flex flex-1 overflow-hidden relative border-t-0">
        {/* Mobile Sidebar Drawer */}
        <div
          className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
            isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={() => setIsDrawerOpen(false)}
        />
        <div
          className={`fixed inset-x-0 bottom-0 z-50 transform bg-white transition-transform duration-300 ease-out md:static md:translate-y-0 md:h-full md:block shrink-0 rounded-t-2xl md:rounded-none overflow-hidden h-[85vh] md:h-auto ${
            isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="md:hidden flex justify-center items-center py-2 bg-gray-50 border-b border-bordercolor">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-1" />
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="absolute right-4 p-1 rounded-md text-muted hover:bg-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-full overflow-hidden flex flex-col pb-10 md:pb-0">
            <ExploreSidebar
              paperId={paper.id}
              subjects={subjects}
              pointers={pointers}
              questionsByPointer={questionsByPointer}
              questionsBySubject={questionsBySubject}
              selectedSubjectId={activeSubject?.id || null}
              selectedPointerId={activePointer?.id || null}
              viewMode={viewMode}
              isIndexActive={contentMode === 'index'}
              onSelect={handleSelect}
              onViewModeChange={handleViewModeChange}
            />
          </div>
        </div>

        {contentMode === 'index' ? (
          <SyllabusIndexView
            paper={paper}
            pointers={pointers}
            subjects={subjects}
            questions={questions as Question[]}
            onSelectPointer={(pointerId) => handleSelect('pointer', pointerId)}
          />
        ) : (
          <ExploreContent
            paperId={paper.id}
            questions={questions as Question[]}
            mode={contentMode}
            subject={activeSubject}
            pointer={activePointer}
            pointerIndex={pointerIndex}
            totalPointers={totalPointers}
            year={activeYear}
            onBackToIndex={() => handleSelect('index', '')}
          />
        )}
        
        {/* Floating Syllabus Button for Mobile */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="md:hidden fixed bottom-20 left-4 z-30 bg-primary text-white shadow-lg rounded-full px-5 py-3 flex items-center gap-2 font-bold text-sm border-2 border-white/20 hover:scale-105 transition-transform"
        >
          <BookOpen className="w-5 h-5" />
          Syllabus
        </button>
      </div>
    </div>
  );
}
