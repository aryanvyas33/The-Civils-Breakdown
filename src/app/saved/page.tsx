'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { getBookmarkedIds } from '@/lib/bookmarks';
import { getAllNotes, getAllMetaNotes, NoteEntry, MetaNoteEntry } from '@/lib/notes';
import { getAllQuestions, getAllSubjects } from '@/lib/data';
import { getAllSyllabusPointers } from '@/lib/syllabus';
import QuestionCard from '@/components/question/QuestionCard';
import { Bookmark, Trash2, Edit3, Archive, ChevronRight, FileText, Cloud } from 'lucide-react';
import MetaNoteEditor from '@/components/explore/MetaNoteEditor';
import AggregatedNotesList from '@/components/explore/AggregatedNotesList';
import { useAuth } from '@/hooks/useAuth';
import SyncNudgeBanner from '@/components/auth/SyncNudgeBanner';

export default function SavedQuestionsPage() {
  const { isAuthenticated, lastSyncedAt, isSyncing } = useAuth();
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [notes, setNotes] = useState<NoteEntry[]>([]);
  const [metaNotes, setMetaNotes] = useState<MetaNoteEntry[]>([]);
  const [selectedPaper, setSelectedPaper] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'notes'>('bookmarks');
  const [notesViewMode, setNotesViewMode] = useState<'questions' | 'topics' | 'subjects'>('questions');
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const updateData = () => {
    setBookmarkedIds(getBookmarkedIds());
    setNotes(getAllNotes());
    setMetaNotes(getAllMetaNotes());
  };

  useEffect(() => {
    updateData();
    window.addEventListener('pyq-bookmarks-updated', updateData);
    window.addEventListener('pyq-notes-updated', updateData);
    window.addEventListener('pyq-meta-notes-updated', updateData);
    return () => {
      window.removeEventListener('pyq-bookmarks-updated', updateData);
      window.removeEventListener('pyq-notes-updated', updateData);
      window.removeEventListener('pyq-meta-notes-updated', updateData);
    };
  }, []);

  const allQuestions = useMemo(() => {
    return getAllQuestions();
  }, []);

  const savedQuestions = useMemo(() => {
    return allQuestions.filter((q) => bookmarkedIds.includes(q.id));
  }, [allQuestions, bookmarkedIds]);

  const notedQuestionIds = useMemo(() => notes.map((n) => n.questionId), [notes]);
  const notedQuestions = useMemo(() => {
    return allQuestions.filter((q) => notedQuestionIds.includes(q.id));
  }, [allQuestions, notedQuestionIds]);

  const activeQuestions = activeTab === 'bookmarks' ? savedQuestions : notedQuestions;

  const filteredQuestions = useMemo(() => {
    if (selectedPaper === 'all') return activeQuestions;
    return activeQuestions.filter((q) => q.paperId.toLowerCase() === selectedPaper.toLowerCase());
  }, [activeQuestions, selectedPaper]);

  const paperCounts = useMemo(() => {
    const counts: Record<string, number> = { all: activeQuestions.length, gs1: 0, gs2: 0, gs3: 0, gs4: 0, essay: 0 };
    activeQuestions.forEach((q) => {
      counts[q.paperId] = (counts[q.paperId] || 0) + 1;
    });
    return counts;
  }, [activeQuestions]);

  const handleClearAll = () => {
    if (activeTab === 'bookmarks') {
      if (confirm('Are you sure you want to clear all your saved bookmarks?')) {
        localStorage.removeItem('pyq_vault_bookmarked_ids');
        window.dispatchEvent(new Event('pyq-bookmarks-updated'));
      }
    } else {
      if (confirm('Are you sure you want to delete ALL your personal notes and meta notes? This cannot be undone.')) {
        localStorage.removeItem('pyq_vault_notes');
        localStorage.removeItem('pyq_vault_meta_notes');
        window.dispatchEvent(new Event('pyq-notes-updated'));
        window.dispatchEvent(new Event('pyq-meta-notes-updated'));
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 w-full min-h-[70vh]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 pb-6 border-b-4 border-dashed border-retro-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-retro-folder text-retro-border text-[10px] font-space font-bold uppercase tracking-wider mb-3 border-2 border-retro-border shadow-retro-sm">
            <Archive className="w-3.5 h-3.5" />
            <span>Personal Revision Vault</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-vt uppercase text-retro-border tracking-tight mb-2 bg-white inline-block px-4 py-1 border-2 border-retro-border shadow-[4px_4px_0px_#2A2A2A]">
            Saved Data
          </h1>
          <p className="text-sm font-space text-retro-border mt-2 font-bold max-w-lg">
            {isAuthenticated
              ? "Questions you've pinned and notes you've taken. Synced across all your devices."
              : "Questions you've pinned and notes you've taken. Stored securely on your device."}
          </p>
        </div>

        {activeQuestions.length > 0 && (
          <button
            onClick={handleClearAll}
            className="retro-btn text-sm bg-[#FFD1D1] text-retro-accent border-retro-accent hover:bg-retro-accent hover:text-white flex items-center gap-2 self-start sm:self-auto shadow-none"
          >
            <Trash2 className="w-4 h-4" />
            <span>CLEAR ALL {activeTab === 'bookmarks' ? 'BOOKMARKS' : 'NOTES'}</span>
          </button>
        )}
      </div>

      {/* Cloud Sync Status (Authenticated) or Nudge (Guest) */}
      {isAuthenticated ? (
        <div className="mb-6 bg-[#EDF7F5] border-2 border-[#0D9488] p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-space text-xs text-[#0D9488] shadow-retro-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488] animate-pulse" />
            <span className="font-bold">
              Cloud sync active —{' '}
              {isSyncing
                ? 'Syncing vault...'
                : lastSyncedAt
                ? `Last synced ${new Date(lastSyncedAt).toLocaleTimeString()}`
                : 'Connected to cloud'}
            </span>
            <span className="text-retro-border/60">
              ({savedQuestions.length} bookmarks, {notes.length} notes)
            </span>
          </div>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('pyq-vault-sync-trigger'))}
            className="underline font-bold hover:text-retro-border cursor-pointer self-start sm:self-auto"
          >
            Sync now
          </button>
        </div>
      ) : (
        <SyncNudgeBanner itemCount={bookmarkedIds.length + notes.length} />
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => { setActiveTab('bookmarks'); setSelectedPaper('all'); }}
          className={`retro-btn flex items-center gap-2 ${
            activeTab === 'bookmarks' ? 'bg-retro-accent text-white shadow-[4px_4px_0px_#2A2A2A]' : 'bg-white shadow-none hover:shadow-retro-sm text-retro-border'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          Bookmarks ({savedQuestions.length})
        </button>
        <button
          onClick={() => { setActiveTab('notes'); setSelectedPaper('all'); }}
          className={`retro-btn flex items-center gap-2 ${
            activeTab === 'notes' ? 'bg-retro-gs3 text-white shadow-[4px_4px_0px_#2A2A2A]' : 'bg-white shadow-none hover:shadow-retro-sm text-retro-border'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          My Notes ({notes.length})
        </button>
      </div>

      {activeQuestions.length === 0 ? (
        <div className="retro-container max-w-2xl mx-auto my-12">
          <div className="window-header">
            <span>C:\\VAULT\\EMPTY_STATE.EXE</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 border-2 border-retro-border bg-white"></div>
              <div className="w-4 h-4 border-2 border-retro-border bg-white"></div>
              <div className="w-4 h-4 border-2 border-retro-border bg-retro-accent"></div>
            </div>
          </div>
          <div className="p-10 flex flex-col items-center text-center bg-retro-window">
            <div className="w-16 h-16 border-4 border-retro-border bg-retro-folder flex items-center justify-center mb-6 shadow-retro">
              {activeTab === 'bookmarks' ? (
                <Bookmark className="w-8 h-8 text-retro-border" strokeWidth={3} />
              ) : (
                <Edit3 className="w-8 h-8 text-retro-border" strokeWidth={3} />
              )}
            </div>
            <h3 className="font-vt text-4xl mb-4 uppercase text-retro-border">
              No {activeTab === 'bookmarks' ? 'Saved Questions' : 'Notes'} Yet
            </h3>
            <p className="font-space font-bold text-sm mb-8 max-w-md text-retro-border leading-relaxed border-l-4 border-retro-accent pl-4 text-left">
              {activeTab === 'bookmarks' 
                ? '> Click the bookmark icon on any question while browsing papers or searching to save it here for targeted revision and answer writing practice.'
                : '> Add your personal notes to any question while browsing papers or syllabus pointers. Your notes will appear here.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/syllabus" className="retro-btn text-base inline-block">
                Browse Syllabus
              </Link>
              <Link href="/search" className="retro-btn bg-white text-base inline-block shadow-none hover:shadow-retro-sm">
                Search Topics
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Paper Filter Bar */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: `ALL ${activeTab === 'bookmarks' ? 'SAVED' : 'NOTES'}` },
                { id: 'gs1', label: 'GS1' },
                { id: 'gs2', label: 'GS2' },
                { id: 'gs3', label: 'GS3' },
                { id: 'gs4', label: 'GS4' },
                { id: 'essay', label: 'ESSAY' },
              ].map((p) => {
                const count = paperCounts[p.id] || 0;
                const isSelected = selectedPaper === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPaper(p.id)}
                    className={`retro-badge transition-all cursor-pointer font-space font-bold text-xs uppercase px-2 py-1 ${
                      isSelected
                        ? 'bg-retro-border text-white shadow-none'
                        : 'bg-white text-retro-border shadow-retro-sm hover:-translate-y-0.5'
                    }`}
                  >
                    {p.label} ({count})
                  </button>
                );
              })}
            </div>

            {activeTab === 'notes' && (
              <div className="flex bg-retro-window border-2 border-retro-border p-1 shrink-0 shadow-retro-sm">
                <button
                  onClick={() => setNotesViewMode('questions')}
                  className={`px-3 py-1 font-space font-bold text-xs uppercase transition-colors ${
                    notesViewMode === 'questions' ? 'bg-white border-2 border-retro-border text-retro-border shadow-none' : 'text-retro-border hover:bg-white/50 border-2 border-transparent'
                  }`}
                >
                  By Question
                </button>
                <button
                  onClick={() => setNotesViewMode('topics')}
                  className={`px-3 py-1 font-space font-bold text-xs uppercase transition-colors ${
                    notesViewMode === 'topics' ? 'bg-white border-2 border-retro-border text-retro-border shadow-none' : 'text-retro-border hover:bg-white/50 border-2 border-transparent'
                  }`}
                >
                  By Topic
                </button>
              </div>
            )}
          </div>

          {/* Content Grid */}
          <div className="space-y-4">
            {activeTab === 'bookmarks' || notesViewMode === 'questions' ? (
              filteredQuestions.map((q) => (
                <QuestionCard key={q.id} question={q} variant="search-result" />
              ))
            ) : notesViewMode === 'topics' ? (
              (() => {
                const pointers = getAllSyllabusPointers();
                // Find pointers that either have a meta note, or have question notes
                const activePointerIds = new Set<string>();
                metaNotes.filter(m => m.type === 'pointer').forEach(m => activePointerIds.add(m.id));
                notes.forEach(n => {
                  if (n.pointerId) activePointerIds.add(n.pointerId);
                  else {
                    const q = allQuestions.find(q => q.id === n.questionId);
                    if (q?.pointerId) activePointerIds.add(q.pointerId);
                  }
                });

                let activePointersList = Array.from(activePointerIds).map(id => pointers.find(p => p.id === id)).filter(Boolean) as any[];
                if (selectedPaper !== 'all') {
                  activePointersList = activePointersList.filter(p => p.paperId.toLowerCase() === selectedPaper.toLowerCase());
                }

                if (activePointersList.length === 0) {
                  return <div className="text-center py-10 text-muted text-sm">No topic notes found.</div>;
                }

                return activePointersList.map(pointer => {
                  const isExpanded = expandedTopics[pointer.id];
                  const pointerNotes = notes.filter(n => n.pointerId === pointer.id || allQuestions.find(q => q.id === n.questionId)?.pointerId === pointer.id);
                  return (
                    <div key={pointer.id} className="border border-bordercolor rounded-xl overflow-hidden bg-white">
                      <div 
                        onClick={() => setExpandedTopics(prev => ({...prev, [pointer.id]: !prev[pointer.id]}))}
                        className="px-4 py-3 bg-surface hover:bg-gray-50 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-accent" />
                          <span className="font-bold text-primary text-sm">{pointer.label}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-muted transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                      {isExpanded && (
                        <div className="p-4 border-t border-bordercolor bg-gray-50/30">
                          <MetaNoteEditor id={pointer.id} type="pointer" title={pointer.label} />
                          <AggregatedNotesList notes={pointerNotes} />
                        </div>
                      )}
                    </div>
                  );
                });
              })()
            ) : (
              (() => {
                const subjects = getAllSubjects();
                const activeSubjectIds = new Set<string>();
                metaNotes.filter(m => m.type === 'subject').forEach(m => activeSubjectIds.add(m.id));
                notes.forEach(n => {
                  const q = allQuestions.find(q => q.id === n.questionId);
                  if (q?.subjectId) activeSubjectIds.add(q.subjectId);
                });

                let activeSubjectsList = Array.from(activeSubjectIds).map(id => subjects.find(s => s.id === id)).filter(Boolean) as any[];
                if (selectedPaper !== 'all') {
                  activeSubjectsList = activeSubjectsList.filter(s => s.paperId.toLowerCase() === selectedPaper.toLowerCase());
                }

                if (activeSubjectsList.length === 0) {
                  return <div className="text-center py-10 text-muted text-sm">No subject notes found.</div>;
                }

                return activeSubjectsList.map(subject => {
                  const isExpanded = expandedTopics[subject.id];
                  const subjectNotes = notes.filter(n => allQuestions.find(q => q.id === n.questionId)?.subjectId === subject.id);
                  return (
                    <div key={subject.id} className="border border-bordercolor rounded-xl overflow-hidden bg-white">
                      <div 
                        onClick={() => setExpandedTopics(prev => ({...prev, [subject.id]: !prev[subject.id]}))}
                        className="px-4 py-3 bg-surface hover:bg-gray-50 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-accent" />
                          <span className="font-bold text-primary text-sm">{subject.name}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-muted transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                      {isExpanded && (
                        <div className="p-4 border-t border-bordercolor bg-gray-50/30">
                          <MetaNoteEditor id={subject.id} type="subject" title={subject.name} />
                          <AggregatedNotesList notes={subjectNotes} />
                        </div>
                      )}
                    </div>
                  );
                });
              })()
            )}
          </div>
        </div>
      )}
    </div>
  );
}
