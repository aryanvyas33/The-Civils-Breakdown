'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Paper, SyllabusPointer, Subject, Question, SearchResult } from '@/types';
import { Search, BookOpen, X, HelpCircle } from 'lucide-react';
import QuestionCard from '@/components/question/QuestionCard';
import { searchQuestions, getAutocompleteSuggestions } from '@/lib/search';
import { getQuestionCardBadges } from '@/lib/cardBadges';

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
  const [activeTab, setActiveTab] = useState<'questions' | 'topics'>('questions');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Dynamic paper-aware placeholder
  const placeholderText = useMemo(() => {
    switch (paper.id) {
      case 'gs1':
        return "> Search GS1 topics, keywords (e.g. 'art & culture', 'monsoon', 'freedom struggle')...";
      case 'gs2':
        return "> Search GS2 topics, keywords (e.g. 'judiciary', 'elections', 'federalism')...";
      case 'gs3':
        return "> Search GS3 topics, keywords (e.g. 'agriculture', 'inflation', 'cybersecurity')...";
      case 'gs4':
        return "> Search GS4 topics, keywords (e.g. 'ethics', 'integrity', 'emotional intelligence')...";
      case 'essay':
        return "> Search essay topics, themes (e.g. 'education', 'technology', 'philosophy')...";
      default:
        return '> Search syllabus topics, keywords...';
    }
  }, [paper.id]);

  // Precompute paper vocabulary for predictive suggestions
  const paperVocabulary = useMemo(() => {
    const vocab = new Set<string>();
    pointers.forEach((p) => {
      vocab.add(p.label);
      p.keywords.forEach((k) => vocab.add(k));
    });
    subjects.forEach((s) => vocab.add(s.name));
    questions.forEach((q) => {
      q.tags.forEach((t) => vocab.add(t));
      if (q.keywords) q.keywords.forEach((k) => vocab.add(k));
      const badge = getQuestionCardBadges(q.id);
      if (badge) {
        badge.microThemes?.forEach((m) => vocab.add(m));
        badge.coreConcepts?.forEach((c) => vocab.add(c));
      }
    });
    return Array.from(vocab);
  }, [pointers, subjects, questions]);

  // Predictive suggestions list with case-insensitive deduplication
  const suggestions = useMemo(() => {
    const clean = searchQuery.trim().toLowerCase();
    if (clean.length < 2) return [];

    const matches: string[] = [];
    const seenLower = new Set<string>();

    const addTerm = (term: string) => {
      const lower = term.toLowerCase().trim();
      if (!lower || lower === clean || seenLower.has(lower)) return;
      seenLower.add(lower);
      matches.push(term);
    };

    // 1. Prefix matches from this paper's vocabulary
    for (const term of paperVocabulary) {
      if (term.toLowerCase().startsWith(clean)) {
        addTerm(term);
        if (matches.length >= 6) return matches;
      }
    }

    // 2. Contains matches from this paper's vocabulary
    if (matches.length < 6) {
      for (const term of paperVocabulary) {
        if (term.toLowerCase().includes(clean)) {
          addTerm(term);
          if (matches.length >= 6) return matches;
        }
      }
    }

    // 3. Fallback to general search suggestions
    if (matches.length < 6) {
      const general = getAutocompleteSuggestions(clean, 10);
      for (const g of general) {
        addTerm(g);
        if (matches.length >= 6) return matches;
      }
    }

    return matches;
  }, [searchQuery, paperVocabulary]);

  // Top predictive completion (for inline ghost text)
  const ghostSuggestion = useMemo(() => {
    const raw = searchQuery;
    if (!raw || raw.trim().length < 2) return '';
    const trimmed = raw.trimStart();
    const prefix = trimmed.toLowerCase();
    const match = suggestions.find((s) => s.toLowerCase().startsWith(prefix));
    if (match && match.toLowerCase() !== prefix) {
      // Keep user's exact case for the typed prefix, append rest of suggestion
      return raw + match.slice(trimmed.length);
    }
    return '';
  }, [searchQuery, suggestions]);

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

  // Search questions in this paper + cross-paper count
  const questionSearchResults = useMemo(() => {
    const clean = searchQuery.trim();
    if (!clean) {
      return {
        results: [] as SearchResult[],
        totalResults: 0,
        crossPaperTotal: 0,
      };
    }

    const paperSearch = searchQuestions(clean, { paper: paper.id });
    const allSearch = searchQuestions(clean);

    return {
      results: paperSearch.results,
      totalResults: paperSearch.totalResults,
      crossPaperTotal: allSearch.totalResults,
    };
  }, [searchQuery, paper.id]);

  // Automatically adjust default active tab when searching
  useEffect(() => {
    if (searchQuery.trim()) {
      if (questionSearchResults.totalResults > 0 && filteredPointers.length === 0) {
        setActiveTab('questions');
      } else if (filteredPointers.length > 0 && questionSearchResults.totalResults === 0) {
        setActiveTab('topics');
      }
    }
  }, [searchQuery, questionSearchResults.totalResults, filteredPointers.length]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
        setSelectedSuggestionIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const applySuggestion = (val: string) => {
    setSearchQuery(val);
    setIsDropdownOpen(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Tab or Right Arrow accepts inline predictive ghost text
    if (
      (e.key === 'Tab' || (e.key === 'ArrowRight' && inputRef.current?.selectionStart === searchQuery.length)) &&
      ghostSuggestion
    ) {
      e.preventDefault();
      applySuggestion(ghostSuggestion);
      return;
    }

    if (isDropdownOpen && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        return;
      }
      if (e.key === 'Enter') {
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
          e.preventDefault();
          applySuggestion(suggestions[selectedSuggestionIndex]);
          return;
        }
        // Do not force ghost completion on Enter; execute user's actual typed query
        setIsDropdownOpen(false);
        setSelectedSuggestionIndex(-1);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsDropdownOpen(false);
        setSelectedSuggestionIndex(-1);
        return;
      }
    }

    if (e.key === 'Enter') {
      setIsDropdownOpen(false);
      setSelectedSuggestionIndex(-1);
    }
  };

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
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="flex-1 overflow-y-auto bg-surface custom-scrollbar relative h-full">
      <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-8">
        {/* Header Card */}
        <div className="retro-container p-6 relative bg-white !overflow-visible z-20">
          <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <div
                className={`font-space font-bold text-xs uppercase tracking-widest mb-1 ${theme.accent}`}
              >
                Official UPSC CSE Mains Syllabus
              </div>
              <h1 className="font-space font-bold text-3xl md:text-4xl flex items-center gap-3">
                <div className="w-10 h-10 border-4 border-retro-border bg-white flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6" strokeWidth={3} />
                </div>
                <span>
                  {paper.id === 'essay'
                    ? 'Essay Paper'
                    : `General Studies Paper ${paper.id.replace('gs', '')}`}{' '}
                  Index
                </span>
              </h1>
            </div>

            {/* Badges */}
            <div className="flex flex-row sm:flex-col gap-1.5 items-start sm:items-end shrink-0 pt-0.5">
              <span
                className={`retro-badge shadow-retro-sm text-xs py-0.5 px-2.5 font-bold ${theme.badge}`}
              >
                {pointers.length} Official Topics
              </span>
              <span className="retro-badge bg-white shadow-retro-sm text-xs py-0.5 px-2.5 font-bold border-2 border-retro-border">
                {totalQuestions} Questions
              </span>
            </div>
          </div>

          <p
            className={`font-space text-sm max-w-2xl leading-relaxed mb-6 border-l-4 pl-4 ${theme.accent.replace('text', 'border')}`}
          >
            {paper.description}
          </p>

          {/* Search Box with Predictive Ghost Text & Autocomplete Dropdown */}
          <div className="relative z-30" ref={containerRef}>
            <div className="relative border-4 border-retro-border bg-white focus-within:bg-retro-window shadow-[4px_4px_0px_#2A2A2A] transition-colors">
              {/* Predictive Inline Ghost Text (behind transparent input) */}
              {isInputFocused && ghostSuggestion && (
                <div
                  className="absolute inset-0 px-3 py-3 font-space text-sm pointer-events-none text-gray-400 select-none overflow-hidden whitespace-pre flex items-center z-0"
                  aria-hidden="true"
                >
                  <span className="opacity-0">{searchQuery}</span>
                  <span>{ghostSuggestion.slice(searchQuery.length)}</span>
                  <span className="ml-2 text-[10px] font-vt uppercase tracking-wider bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded border border-gray-300">
                    Tab ⇥
                  </span>
                </div>
              )}

              <input
                ref={inputRef}
                type="text"
                placeholder={placeholderText}
                value={searchQuery}
                onFocus={() => {
                  setIsInputFocused(true);
                  if (searchQuery.trim().length >= 2) setIsDropdownOpen(true);
                }}
                onBlur={(e) => {
                  setIsInputFocused(false);
                  if (!containerRef.current?.contains(e.relatedTarget as Node)) {
                    setIsDropdownOpen(false);
                    setSelectedSuggestionIndex(-1);
                  }
                }}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  setIsDropdownOpen(val.trim().length >= 2);
                  setSelectedSuggestionIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                className="w-full relative z-10 bg-transparent p-3 pr-20 font-space text-sm focus:outline-none"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsDropdownOpen(false);
                    setSelectedSuggestionIndex(-1);
                    inputRef.current?.focus();
                  }}
                  className="absolute right-4 top-3.5 z-20 text-xs font-vt uppercase font-bold hover:text-retro-accent cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Predictive Autocomplete Dropdown */}
            {isDropdownOpen && suggestions.length > 0 && (
              <div
                role="listbox"
                className="absolute left-0 right-0 top-full mt-2 bg-retro-window border-4 border-retro-border shadow-[6px_6px_0px_#2A2A2A] z-50 py-1 max-h-72 overflow-y-auto custom-scrollbar"
              >
                <div className="px-3 py-1.5 text-[10px] font-space font-bold uppercase text-retro-border/60 border-b-2 border-retro-border/20 flex justify-between items-center sticky top-0 bg-retro-window z-10">
                  <span>
                    Predictive Topics &amp; Keywords ({paper.id.toUpperCase()})
                  </span>
                  <span className="font-vt text-xs tracking-wider">
                    ↑↓ Navigate • Tab/Enter select • Esc
                  </span>
                </div>
                {suggestions.map((item, idx) => {
                  const isSelected = idx === selectedSuggestionIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onPointerDown={(e) => {
                        e.preventDefault();
                        applySuggestion(item);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs font-space font-bold flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-retro-border text-white'
                          : 'hover:bg-retro-border hover:text-white text-retro-border'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Search
                          className={`w-3.5 h-3.5 ${
                            isSelected ? 'text-white' : 'text-retro-border'
                          }`}
                        />
                        <span>{item}</span>
                      </div>
                      <span className="text-[10px] font-vt uppercase opacity-75">
                        {isSelected ? 'Press Enter' : 'Select'}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Search Results / Directory Section */}
        <div>
          {isSearching ? (
            /* Search Mode: Dual Tabs (Matching PYQs vs Syllabus Topics) */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-dashed border-retro-border pb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('questions')}
                    className={`font-space font-bold text-xs uppercase px-3 py-1.5 border-2 border-retro-border transition-all flex items-center gap-2 ${
                      activeTab === 'questions'
                        ? 'bg-retro-border text-white shadow-[2px_2px_0px_#2A2A2A]'
                        : 'bg-white hover:bg-retro-window text-retro-border'
                    }`}
                  >
                    <span>Matching PYQs</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded ${
                        activeTab === 'questions'
                          ? 'bg-retro-accent text-white'
                          : 'bg-retro-window text-retro-border border border-retro-border'
                      }`}
                    >
                      {questionSearchResults.totalResults}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('topics')}
                    className={`font-space font-bold text-xs uppercase px-3 py-1.5 border-2 border-retro-border transition-all flex items-center gap-2 ${
                      activeTab === 'topics'
                        ? 'bg-retro-border text-white shadow-[2px_2px_0px_#2A2A2A]'
                        : 'bg-white hover:bg-retro-window text-retro-border'
                    }`}
                  >
                    <span>Syllabus Topics</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded ${
                        activeTab === 'topics'
                          ? 'bg-retro-accent text-white'
                          : 'bg-retro-window text-retro-border border border-retro-border'
                      }`}
                    >
                      {filteredPointers.length}
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-vt text-sm text-retro-border">
                    Query: &ldquo;{searchQuery}&rdquo;
                  </span>
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}&paper=${paper.id}`}
                    className="text-xs font-space font-bold text-retro-accent hover:underline flex items-center gap-1"
                  >
                    Full Search Page &rarr;
                  </Link>
                </div>
              </div>

              {/* Cross-paper helper if 0 questions in this paper but matches exist elsewhere */}
              {questionSearchResults.totalResults === 0 &&
                questionSearchResults.crossPaperTotal > 0 && (
                  <div className="retro-container p-4 bg-[#FFF9E6] border-amber-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-space font-bold text-xs uppercase text-amber-900 block">
                        Found in Other Papers
                      </span>
                      <p className="font-space text-xs text-amber-800">
                        &ldquo;{searchQuery}&rdquo; returned 0 questions in{' '}
                        {paper.id.toUpperCase()}, but has{' '}
                        <strong>{questionSearchResults.crossPaperTotal} questions</strong> across
                        other papers.
                      </p>
                    </div>
                    <Link
                      href={`/search?q=${encodeURIComponent(searchQuery)}`}
                      className="retro-btn text-xs py-1.5 px-3 bg-retro-border text-white whitespace-nowrap shadow-none hover:shadow-retro-sm"
                    >
                      Search All Papers &rarr;
                    </Link>
                  </div>
                )}

              {/* Tab 1: Questions Content */}
              {activeTab === 'questions' && (
                <div className="space-y-4">
                  {questionSearchResults.totalResults === 0 ? (
                    <div className="retro-container p-12 text-center bg-retro-window">
                      <h3 className="font-vt text-2xl font-bold mb-1 text-retro-border">
                        NO QUESTIONS MATCHED &ldquo;{searchQuery.toUpperCase()}&rdquo; IN{' '}
                        {paper.id.toUpperCase()}
                      </h3>
                      <p className="font-space text-sm text-retro-border mb-4">
                        Try searching by a broader keyword, check the Syllabus Topics tab, or search across all papers.
                      </p>
                      <div className="flex justify-center gap-3">
                        {filteredPointers.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setActiveTab('topics')}
                            className="retro-btn text-xs py-1.5 px-3 bg-white"
                          >
                            View {filteredPointers.length} Matching Syllabus Topics
                          </button>
                        )}
                        <Link
                          href={`/search?q=${encodeURIComponent(searchQuery)}`}
                          className="retro-btn text-xs py-1.5 px-3 bg-retro-border text-white"
                        >
                          Search All Papers &rarr;
                        </Link>
                      </div>
                    </div>
                  ) : (
                    questionSearchResults.results.map((res) => (
                      <QuestionCard
                        key={res.question.id}
                        question={res.question}
                        variant="search-result"
                        highlightedText={res.highlightedText}
                        searchQuery={searchQuery}
                        showNotes={true}
                      />
                    ))
                  )}
                </div>
              )}

              {/* Tab 2: Syllabus Topics Content */}
              {activeTab === 'topics' && (
                <div className="space-y-4">
                  {filteredPointers.length === 0 ? (
                    <div className="retro-container p-12 text-center bg-retro-window">
                      <h3 className="font-vt text-2xl font-bold mb-1 text-retro-border">
                        NO SYLLABUS TOPIC MATCHED
                      </h3>
                      <p className="font-space text-sm text-retro-border mb-4">
                        Try a different search term or check matching PYQs.
                      </p>
                      {questionSearchResults.totalResults > 0 && (
                        <button
                          type="button"
                          onClick={() => setActiveTab('questions')}
                          className="retro-btn text-xs py-1.5 px-3 bg-retro-border text-white"
                        >
                          View {questionSearchResults.totalResults} Matching PYQ Questions
                        </button>
                      )}
                    </div>
                  ) : (
                    filteredPointers.map((pointer) => {
                      const originalIndex =
                        pointers.findIndex((p) => p.id === pointer.id) + 1;
                      const formattedIndex = String(originalIndex).padStart(2, '0');
                      const stats = pointerStats[pointer.id] || {
                        count: 0,
                        marks: 0,
                        recentYears: [],
                      };
                      const subject = subjectMap.get(pointer.subjectId);

                      return (
                        <div
                          key={pointer.id}
                          onClick={() => onSelectPointer(pointer.id)}
                          className="retro-container p-0 flex flex-col md:flex-row group hover:shadow-retro-lg transition-shadow cursor-pointer"
                        >
                          <div
                            className={`w-full md:w-20 ${theme.iconBg} border-b-4 md:border-b-0 md:border-r-4 border-retro-border flex md:flex-col items-center justify-center p-2`}
                          >
                            <span className="font-space font-bold text-[10px] uppercase">
                              Point
                            </span>
                            <span className="font-space font-bold text-3xl">
                              {formattedIndex}
                            </span>
                          </div>
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex flex-wrap gap-2 font-space text-[10px] font-bold uppercase text-retro-border mb-2 items-center">
                                {subject && (
                                  <span
                                    className={`retro-badge shadow-none border-2 py-0 ${theme.badge}`}
                                  >
                                    {subject.name}
                                  </span>
                                )}
                                <span className="retro-tag bg-retro-window">
                                  {stats.count} Questions Asked
                                </span>
                                {stats.marks > 0 && (
                                  <span className="retro-tag bg-[#FFD1D1] text-retro-accent border-retro-accent">
                                    {stats.marks} Marks
                                  </span>
                                )}
                              </div>
                              <h3 className="font-space font-bold text-xl mb-2 group-hover:text-retro-accent transition-colors">
                                {pointer.label}
                              </h3>
                              <p className="font-space text-xs italic text-gray-600 mb-4 border-l-2 border-gray-300 pl-2">
                                &ldquo;{pointer.officialText}&rdquo;
                              </p>
                            </div>
                            <div className="flex justify-between items-end">
                              {stats.recentYears.length > 0 ? (
                                <div className="font-space text-[10px] font-bold uppercase flex gap-1 items-center">
                                  <span className="text-gray-500">Recent:</span>
                                  {stats.recentYears.map((yr, idx) => (
                                    <span
                                      key={yr}
                                      className={
                                        idx === 0
                                          ? 'bg-retro-border text-white px-1'
                                          : 'border border-retro-border px-1'
                                      }
                                    >
                                      {yr}
                                    </span>
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
              )}
            </div>
          ) : (
            /* Default Mode: Official Syllabus Directory */
            <div>
              <div className="flex justify-between items-end mb-4 border-b-2 border-dashed border-retro-border pb-2">
                <h2 className="font-space font-bold text-sm uppercase">
                  Official Syllabus Directory ({filteredPointers.length} Topics)
                </h2>
                <span className="font-vt text-lg uppercase hidden sm:inline-block">
                  2013-2026 Archive
                </span>
              </div>

              <div className="space-y-4">
                {filteredPointers.map((pointer) => {
                  const originalIndex =
                    pointers.findIndex((p) => p.id === pointer.id) + 1;
                  const formattedIndex = String(originalIndex).padStart(2, '0');
                  const stats = pointerStats[pointer.id] || {
                    count: 0,
                    marks: 0,
                    recentYears: [],
                  };
                  const subject = subjectMap.get(pointer.subjectId);

                  return (
                    <div
                      key={pointer.id}
                      onClick={() => onSelectPointer(pointer.id)}
                      className="retro-container p-0 flex flex-col md:flex-row group hover:shadow-retro-lg transition-shadow cursor-pointer"
                    >
                      <div
                        className={`w-full md:w-20 ${theme.iconBg} border-b-4 md:border-b-0 md:border-r-4 border-retro-border flex md:flex-col items-center justify-center p-2`}
                      >
                        <span className="font-space font-bold text-[10px] uppercase">
                          Point
                        </span>
                        <span className="font-space font-bold text-3xl">
                          {formattedIndex}
                        </span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap gap-2 font-space text-[10px] font-bold uppercase text-retro-border mb-2 items-center">
                            {subject && (
                              <span
                                className={`retro-badge shadow-none border-2 py-0 ${theme.badge}`}
                              >
                                {subject.name}
                              </span>
                            )}
                            <span className="retro-tag bg-retro-window">
                              {stats.count} Questions Asked
                            </span>
                            {stats.marks > 0 && (
                              <span className="retro-tag bg-[#FFD1D1] text-retro-accent border-retro-accent">
                                {stats.marks} Marks
                              </span>
                            )}
                          </div>
                          <h3 className="font-space font-bold text-xl mb-2 group-hover:text-retro-accent transition-colors">
                            {pointer.label}
                          </h3>
                          <p className="font-space text-xs italic text-gray-600 mb-4 border-l-2 border-gray-300 pl-2">
                            &ldquo;{pointer.officialText}&rdquo;
                          </p>
                        </div>
                        <div className="flex justify-between items-end">
                          {stats.recentYears.length > 0 ? (
                            <div className="font-space text-[10px] font-bold uppercase flex gap-1 items-center">
                              <span className="text-gray-500">Recent:</span>
                              {stats.recentYears.map((yr, idx) => (
                                <span
                                  key={yr}
                                  className={
                                    idx === 0
                                      ? 'bg-retro-border text-white px-1'
                                      : 'border border-retro-border px-1'
                                  }
                                >
                                  {yr}
                                </span>
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
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
