'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchQuestions, getAutocompleteSuggestions } from '@/lib/search';
import QuestionCard from '@/components/question/QuestionCard';
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BarChart3,
  Calendar,
  X,
  Layers,
  ArrowLeft,
} from 'lucide-react';
import { getSyllabusPointersByPaper, getSyllabusPointerById, getAllSyllabusPointers } from '@/lib/syllabus';
import { getAllTags, getAllSubjects } from '@/lib/data';
import { getAllQuestionCardBadges } from '@/lib/cardBadges';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryParam = searchParams.get('q') || '';
  const paperParam = searchParams.get('paper') || 'all';
  const pointerParam = searchParams.get('pointer') || 'all';
  const yearParam = searchParams.get('year') ? parseInt(searchParams.get('year')!, 10) : null;
  const directiveParam = searchParams.get('directive') || 'all';
  const sortParam = (searchParams.get('sort') as any) || 'relevance';

  const [inputVal, setInputVal] = useState(queryParam);
  const [selectedPaper, setSelectedPaper] = useState<string>(paperParam);
  const [selectedPointer, setSelectedPointer] = useState<string>(pointerParam);
  const [selectedYear, setSelectedYear] = useState<number | null>(yearParam);
  const [selectedDirective, setSelectedDirective] = useState<string>(directiveParam);
  const [sortBy, setSortBy] = useState<'relevance' | 'year-desc' | 'year-asc'>(sortParam);
  const [showAllPointers, setShowAllPointers] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    setInputVal(queryParam);
    setSelectedPaper(paperParam);
    setSelectedPointer(pointerParam);
    setSelectedYear(yearParam);
    setSelectedDirective(directiveParam);
    setSortBy(sortParam);
  }, [queryParam, paperParam, pointerParam, yearParam, directiveParam, sortParam]);

  const searchData = useMemo(() => {
    return searchQuestions(queryParam, {
      paper: selectedPaper !== 'all' ? selectedPaper : null,
      pointerId: selectedPointer !== 'all' ? selectedPointer : null,
      year: selectedYear,
      directive: selectedDirective !== 'all' ? selectedDirective : null,
      sortBy: sortBy,
    });
  }, [queryParam, selectedPaper, selectedPointer, selectedYear, selectedDirective, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (inputVal.trim()) params.set('q', inputVal.trim());
    if (selectedPaper && selectedPaper !== 'all') params.set('paper', selectedPaper);
    if (selectedPointer && selectedPointer !== 'all') params.set('pointer', selectedPointer);
    if (selectedYear) params.set('year', selectedYear.toString());
    if (selectedDirective && selectedDirective !== 'all') params.set('directive', selectedDirective);
    if (sortBy && sortBy !== 'relevance') params.set('sort', sortBy);
    router.push(`/search?${params.toString()}`);
  };

  const setPaperFilter = (paper: string) => {
    setSelectedPaper(paper);
    setSelectedPointer('all');
    setShowAllPointers(false);
    const params = new URLSearchParams(searchParams.toString());
    if (paper === 'all') params.delete('paper');
    else params.set('paper', paper);
    params.delete('pointer');
    router.push(`/search?${params.toString()}`);
  };

  const setPointerFilter = (pointerId: string) => {
    const next = selectedPointer === pointerId ? 'all' : pointerId;
    setSelectedPointer(next);
    const params = new URLSearchParams(searchParams.toString());
    if (next === 'all') params.delete('pointer');
    else params.set('pointer', next);
    router.push(`/search?${params.toString()}`);
  };

  const handleKeywordClick = (kw: string) => {
    setInputVal(kw);
    router.push(`/search?q=${encodeURIComponent(kw)}`);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Vocabulary for predictive suggestions
  const searchVocabulary = useMemo(() => {
    const vocab = new Set<string>();
    // Tags
    getAllTags().forEach((t) => vocab.add(t.tag));
    // Question badge micro-themes and core concepts
    const badges = getAllQuestionCardBadges();
    Object.values(badges).forEach((b) => {
      b.microThemes?.forEach((m) => vocab.add(m));
      b.coreConcepts?.forEach((c) => vocab.add(c));
    });
    // Syllabus pointers
    getAllSyllabusPointers().forEach((p) => {
      vocab.add(p.label);
      p.keywords.forEach((k) => vocab.add(k));
    });
    // Subjects
    getAllSubjects().forEach((s) => vocab.add(s.name));
    return Array.from(vocab);
  }, []);

  // Suggestions with prefix matches prioritized and case-insensitive deduplication
  const suggestions = useMemo(() => {
    const clean = inputVal.trim().toLowerCase();
    if (clean.length < 2) return [];

    const matches: string[] = [];
    const seenLower = new Set<string>();

    const addTerm = (term: string) => {
      const lower = term.toLowerCase().trim();
      if (!lower || lower === clean || seenLower.has(lower)) return;
      seenLower.add(lower);
      matches.push(term);
    };

    // 1. Prefix matches first
    for (const term of searchVocabulary) {
      if (term.toLowerCase().startsWith(clean)) {
        addTerm(term);
        if (matches.length >= 6) return matches;
      }
    }

    // 2. Contains matches second
    if (matches.length < 6) {
      for (const term of searchVocabulary) {
        if (term.toLowerCase().includes(clean)) {
          addTerm(term);
          if (matches.length >= 6) return matches;
        }
      }
    }

    // 3. Fallback to general autocomplete
    if (matches.length < 6) {
      const general = getAutocompleteSuggestions(clean, 10);
      for (const g of general) {
        addTerm(g);
        if (matches.length >= 6) return matches;
      }
    }

    return matches;
  }, [inputVal, searchVocabulary]);

  // Top predictive completion (for inline ghost text)
  const ghostSuggestion = useMemo(() => {
    const raw = inputVal;
    if (!raw || raw.trim().length < 2) return '';
    const trimmed = raw.trimStart();
    const prefix = trimmed.toLowerCase();
    const match = suggestions.find((s) => s.toLowerCase().startsWith(prefix));
    if (match && match.toLowerCase() !== prefix) {
      return raw + match.slice(trimmed.length);
    }
    return '';
  }, [inputVal, suggestions]);

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
    setInputVal(val);
    setIsDropdownOpen(false);
    setSelectedSuggestionIndex(-1);

    const params = new URLSearchParams(searchParams.toString());
    params.set('q', val.trim());
    if (selectedPaper && selectedPaper !== 'all') params.set('paper', selectedPaper);
    if (selectedPointer && selectedPointer !== 'all') params.set('pointer', selectedPointer);
    if (selectedYear) params.set('year', selectedYear.toString());
    if (selectedDirective && selectedDirective !== 'all') params.set('directive', selectedDirective);
    if (sortBy && sortBy !== 'relevance') params.set('sort', sortBy);
    router.push(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === 'Tab' || (e.key === 'ArrowRight' && inputRef.current?.selectionStart === inputVal.length)) &&
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
        // Do not force ghost completion on Enter; submit user's actual typed query
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

  // Paper filter button styling helper
  const getFilterBtnClass = (paperKey: string) => {
    const isSelected = selectedPaper.toLowerCase() === paperKey.toLowerCase();
    const base = 'px-3 py-1.5 border-2 border-retro-border font-space text-xs md:text-sm font-bold uppercase cursor-pointer transition-transform shadow-retro-sm hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-none';

    if (!isSelected) {
      return `${base} bg-white text-retro-border hover:bg-retro-window`;
    }

    switch (paperKey) {
      case 'gs1': return `${base} bg-retro-gs1 text-retro-border shadow-none translate-y-[2px] translate-x-[2px]`;
      case 'gs2': return `${base} bg-retro-gs2 text-retro-border shadow-none translate-y-[2px] translate-x-[2px]`;
      case 'gs3': return `${base} bg-retro-gs3 text-retro-border shadow-none translate-y-[2px] translate-x-[2px]`;
      case 'gs4': return `${base} bg-retro-gs4 text-retro-border shadow-none translate-y-[2px] translate-x-[2px]`;
      case 'essay': return `${base} bg-retro-essay text-retro-border shadow-none translate-y-[2px] translate-x-[2px]`;
      default: return `${base} bg-retro-folder text-retro-border shadow-none translate-y-[2px] translate-x-[2px]`;
    }
  };

  const getPaperBarColor = (paperKey: string) => {
    switch (paperKey.toLowerCase()) {
      case 'gs1': return 'bg-gs1';
      case 'gs2': return 'bg-gs2';
      case 'gs3': return 'bg-gs3';
      case 'gs4': return 'bg-gs4';
      case 'essay': return 'bg-essay';
      default: return 'bg-accent';
    }
  };

  const syllabusPointers = useMemo(() => {
    if (selectedPaper === 'all') return [];
    return getSyllabusPointersByPaper(selectedPaper);
  }, [selectedPaper]);

  const rankedSyllabusPointers = useMemo(() => {
    if (selectedPaper === 'all') return [];
    return syllabusPointers
      .map((ptr) => ({
        ...ptr,
        count: searchData.syllabusBreakdown[ptr.id] || 0,
      }))
      .sort((a, b) => b.count - a.count);
  }, [syllabusPointers, searchData.syllabusBreakdown]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Search Bar & Filter Banner matching wireframe 03 */}
      <section className="w-full bg-retro-window border-b-4 border-retro-border py-8 px-4 md:px-8 shadow-[0px_4px_0px_rgba(42,42,42,1)] relative z-30">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          {/* Main Search Input with Predictive Ghost Text & Autocomplete Dropdown */}
          <div className="relative w-full max-w-3xl z-40" ref={containerRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative border-4 border-retro-border bg-white focus-within:bg-retro-window shadow-retro focus-within:shadow-[4px_4px_0px_#2A2A2A] rounded transition-all">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-retro-border z-10">
                  <Search className="w-5 h-5" />
                </div>

                {/* Predictive Inline Ghost Text (behind transparent input) */}
                {isInputFocused && ghostSuggestion && (
                  <div
                    className="absolute inset-0 pl-12 pr-32 md:pr-[140px] py-4 font-space font-bold text-base md:text-lg pointer-events-none text-gray-400 select-none overflow-hidden whitespace-pre flex items-center z-0"
                    aria-hidden="true"
                  >
                    <span className="opacity-0">{inputVal}</span>
                    <span>{ghostSuggestion.slice(inputVal.length)}</span>
                    <span className="ml-2 text-xs font-vt uppercase tracking-wider bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded border border-gray-300">
                      Tab ⇥
                    </span>
                  </div>
                )}

                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onFocus={() => {
                    setIsInputFocused(true);
                    if (inputVal.trim().length >= 2) setIsDropdownOpen(true);
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
                    setInputVal(val);
                    setIsDropdownOpen(val.trim().length >= 2);
                    setSelectedSuggestionIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="C:\> search query..."
                  className="w-full pl-12 pr-32 md:pr-[140px] py-4 bg-transparent outline-none font-space font-bold text-base md:text-lg text-retro-border relative z-10"
                />

                {inputVal && (
                  <button
                    type="button"
                    onClick={() => {
                      setInputVal('');
                      setIsDropdownOpen(false);
                      setSelectedSuggestionIndex(-1);
                      inputRef.current?.focus();
                    }}
                    className="absolute right-[100px] md:right-[120px] top-[1.15rem] z-20 text-retro-border hover:text-retro-accent p-1 bg-white border-2 border-retro-border shadow-[2px_2px_0px_#2A2A2A]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute inset-y-2.5 right-2.5 px-4 md:px-6 bg-retro-border hover:bg-retro-accent text-white font-vt text-xl rounded-sm transition-colors shadow-none hover:shadow-none uppercase z-20 cursor-pointer"
                >
                  EXECUTE
                </button>
              </div>
            </form>

            {/* Predictive Autocomplete Dropdown */}
            {isDropdownOpen && suggestions.length > 0 && (
              <div
                role="listbox"
                className="absolute left-0 right-0 top-full mt-2 bg-retro-window border-4 border-retro-border shadow-[6px_6px_0px_#2A2A2A] z-50 py-1 max-h-72 overflow-y-auto custom-scrollbar"
              >
                <div className="px-3 py-1.5 text-[10px] font-space font-bold uppercase text-retro-border/60 border-b-2 border-retro-border/20 flex justify-between items-center sticky top-0 bg-retro-window z-10">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-retro-accent" />
                    Predictive Topics &amp; Keywords
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
                      className={`w-full px-4 py-2.5 text-left text-sm font-space font-bold flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-retro-border text-white'
                          : 'hover:bg-retro-border hover:text-white text-retro-border'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Search
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? 'text-white' : 'text-retro-border'
                          }`}
                        />
                        <span>{item}</span>
                      </div>
                      <span className="text-xs font-vt uppercase opacity-75">
                        {isSelected ? 'Press Enter' : 'Select'}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Micro-Theme Exploration Chips */}
          <div className="flex flex-wrap items-center gap-2 -mt-2 text-xs">
            <span className="text-retro-border font-space font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-retro-accent" />
              <span>Explore Micro-Themes:</span>
            </span>
            {[
              'Ashokan Inscriptions',
              'Judicial Legislation',
              'Digital Rupee',
              'Federalism',
              'Inclusive Growth',
              'Ethics in AI',
            ].map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => handleKeywordClick(theme)}
                className="retro-tag bg-retro-window hover:bg-retro-accent hover:text-white cursor-pointer"
              >
                {theme}
              </button>
            ))}
          </div>

          {/* Meta line & Filter pills */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
            <p className="text-retro-border font-space text-sm">
              <span className="font-bold">{searchData.totalResults} results</span>{' '}
              {queryParam ? (
                <>
                  for &ldquo;<span className="font-bold">{queryParam}</span>&rdquo;
                </>
              ) : (
                'in complete repository'
              )}{' '}
              {selectedPaper === 'all' ? (
                'across 5 papers'
              ) : (
                <>
                  in <span className="font-bold">{selectedPaper.toUpperCase()}</span>
                </>
              )}
            </p>

            <div className="flex flex-col items-start lg:items-center lg:flex-row gap-4 w-full lg:w-auto">
              {/* Primary Filters (Always visible on mobile) */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                {/* Filter Pills */}
                <div className="flex flex-wrap gap-3 flex-grow p-2 bg-retro-window border-2 border-retro-border shadow-retro-sm">
                  <button
                    type="button"
                    onClick={() => setPaperFilter('all')}
                    className={getFilterBtnClass('all')}
                  >
                    ALL ({searchData.paperBreakdown.all || searchData.totalResults})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaperFilter('gs1')}
                    className={getFilterBtnClass('gs1')}
                  >
                    GS1 ({searchData.paperBreakdown.gs1 || 0})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaperFilter('gs2')}
                    className={getFilterBtnClass('gs2')}
                  >
                    GS2 ({searchData.paperBreakdown.gs2 || 0})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaperFilter('gs3')}
                    className={getFilterBtnClass('gs3')}
                  >
                    GS3 ({searchData.paperBreakdown.gs3 || 0})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaperFilter('gs4')}
                    className={getFilterBtnClass('gs4')}
                  >
                    GS4 ({searchData.paperBreakdown.gs4 || 0})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaperFilter('essay')}
                    className={getFilterBtnClass('essay')}
                  >
                    ESSAY ({searchData.paperBreakdown.essay || 0})
                  </button>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 border-2 border-retro-border bg-white text-xs font-vt uppercase tracking-widest text-retro-border shadow-retro-sm w-full justify-center"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters</span>
                  {isMobileFilterOpen ? <ChevronUp className="w-3.5 h-3.5 ml-auto" /> : <ChevronDown className="w-3.5 h-3.5 ml-auto" />}
                </button>
              </div>

              {/* Advanced Filters (Hidden on mobile by default) */}
              <div className={`${isMobileFilterOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto p-2 bg-retro-window border-2 border-retro-border shadow-retro-sm`}>
                {/* Directive Dropdown */}
                <div className="relative w-full sm:w-auto">
                  <select
                    value={selectedDirective}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedDirective(val);
                      const params = new URLSearchParams(searchParams.toString());
                      if (val === 'all') params.delete('directive');
                      else params.set('directive', val);
                      router.push(`/search?${params.toString()}`);
                    }}
                    className="appearance-none w-full bg-white border-2 border-retro-border text-retro-border font-space text-xs md:text-sm pl-3 pr-8 py-2 focus:outline-none focus:shadow-retro-sm cursor-pointer"
                  >
                    <option value="all">ALL DIRECTIVES</option>
                    <option value="analyze">Analyze</option>
                    <option value="discuss">Discuss</option>
                    <option value="examine">Examine</option>
                    <option value="critically">Critically Examine/Evaluate</option>
                    <option value="evaluate">Evaluate</option>
                    <option value="explain">Explain</option>
                    <option value="comment">Comment</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-retro-border">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div className="relative w-full sm:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="appearance-none w-full bg-white border-2 border-retro-border text-retro-border font-space text-xs md:text-sm pl-3 pr-8 py-2 focus:outline-none focus:shadow-retro-sm cursor-pointer"
                  >
                    <option value="relevance">SORT: RELEVANCE</option>
                    <option value="year-desc">SORT: YEAR (NEWEST)</option>
                    <option value="year-asc">SORT: YEAR (OLDEST)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-retro-border">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Results Layout: 70% Results, 30% Analytics Sidebar */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT COLUMN: Search Results (70%) */}
        <div className="w-full lg:w-[70%] flex flex-col gap-5">
          {/* Active pointer/topic banner if filtered */}
          {selectedPointer !== 'all' && (
            <div className="flex items-center justify-between bg-amber-50/90 border border-amber-200/90 px-4 py-2.5 rounded-xl text-xs shadow-2xs">
              <div className="flex items-center gap-2 text-primary font-medium">
                <span className="text-amber-800 font-bold uppercase text-[10px] tracking-wider bg-amber-100/80 px-2 py-0.5 rounded">
                  Topic Filter
                </span>
                <span className="font-semibold text-secondary">
                  {getSyllabusPointerById(selectedPointer)?.label || selectedPointer}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPointerFilter(selectedPointer)}
                className="text-muted hover:text-primary flex items-center gap-1 font-semibold text-xs cursor-pointer"
                title="Clear topic filter"
              >
                <span>Clear</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {searchData.results.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-bordercolor shadow-xs">
              <Search className="w-12 h-12 text-muted mx-auto mb-3 opacity-40" />
              <h2 className="text-xl font-bold text-primary mb-2">No Matching Questions Found</h2>
              <p className="text-sm text-muted max-w-md mx-auto mb-6">
                Try searching for related keywords like &ldquo;climate change&rdquo;, &ldquo;governance&rdquo;, &ldquo;judiciary&rdquo;, or reset your filters.
              </p>
              <button
                onClick={() => {
                  setInputVal('');
                  setSelectedPaper('all');
                  setSelectedPointer('all');
                  setSelectedYear(null);
                  router.push('/search');
                }}
                className="px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            searchData.results.map((item) => (
              <QuestionCard
                key={item.question.id}
                question={item.question}
                variant="search-result"
                highlightedText={item.highlightedText}
                searchQuery={queryParam}
              />
            ))
          )}
        </div>

        {/* RIGHT COLUMN: Sidebar (30%) */}
        <div className="w-full lg:w-[30%] space-y-6">
          {/* Related Keywords Card */}
          {searchData.relatedKeywords.length > 0 && (
            <div className="retro-container p-5 bg-retro-window border-4 border-retro-border">
              <h3 className="font-vt text-xl font-bold text-retro-border uppercase tracking-widest mb-4 flex items-center gap-2 border-b-2 border-dashed border-retro-border pb-2">
                <Sparkles className="w-5 h-5 text-retro-accent" />
                <span>Related Keywords</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {searchData.relatedKeywords.map((kw, i) => {
                  const colors = ['bg-retro-gs1', 'bg-retro-gs2', 'bg-retro-gs3', 'bg-[#FFD1D1] text-retro-accent border-retro-accent', 'bg-retro-folder'];
                  const colorClass = colors[i % colors.length];
                  return (
                    <button
                      key={kw}
                      onClick={() => handleKeywordClick(kw)}
                      className={`retro-tag cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0px_#2A2A2A] transition-transform ${colorClass}`}
                    >
                      {kw}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Paper Distribution OR Syllabus Frequency Breakdown Card */}
          <div className="retro-container p-6 bg-white">
            {selectedPaper === 'all' ? (
              /* Mode A: Global Paper Distribution */
              <>
                <div className="flex justify-between items-end mb-6 border-b-4 border-retro-border pb-2">
                  <h3 className="font-vt text-2xl uppercase font-bold flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-retro-border" strokeWidth={3} />
                    <span>Paper Distribution</span>
                  </h3>
                  <span className="font-space text-xs text-retro-accent font-bold">click to filter</span>
                </div>
                <div className="space-y-6 font-space text-sm font-bold">
                  {(() => {
                    const totalAcrossPapers =
                      searchData.paperBreakdown.all ||
                      Object.entries(searchData.paperBreakdown)
                        .filter(([k]) => k !== 'all')
                        .reduce((acc, [, v]) => acc + v, 0) ||
                      1;

                    const maxCount = Math.max(
                      searchData.paperBreakdown.gs1 || 0,
                      searchData.paperBreakdown.gs2 || 0,
                      searchData.paperBreakdown.gs3 || 0,
                      searchData.paperBreakdown.gs4 || 0,
                      searchData.paperBreakdown.essay || 0,
                      1
                    );

                    const papersList = [
                      { id: 'gs1', label: 'GS1 (History & Geo)', count: searchData.paperBreakdown.gs1 || 0, color: 'bg-retro-gs1' },
                      { id: 'gs2', label: 'GS2 (Polity & Governance)', count: searchData.paperBreakdown.gs2 || 0, color: 'bg-retro-gs2' },
                      { id: 'gs3', label: 'GS3 (Economy & Tech)', count: searchData.paperBreakdown.gs3 || 0, color: 'bg-retro-gs3' },
                      { id: 'gs4', label: 'GS4 (Ethics & Case Studies)', count: searchData.paperBreakdown.gs4 || 0, color: 'bg-retro-gs4' },
                      { id: 'essay', label: 'Essay Paper', count: searchData.paperBreakdown.essay || 0, color: 'bg-retro-accent' },
                    ];

                    return papersList.map((p) => {
                      const barWidthPct = Math.min(100, Math.round((p.count / maxCount) * 100));
                      const sharePct = ((p.count / totalAcrossPapers) * 100).toFixed(1);

                      return (
                        <div
                          key={p.id}
                          onClick={() => setPaperFilter(p.id)}
                          className="cursor-pointer group"
                          title={`Click to filter by ${p.label}`}
                        >
                          <div className="flex justify-between mb-1 text-retro-border">
                            <span className="group-hover:text-retro-accent transition-colors">{p.label}</span>
                            <span>{p.count} <span className="text-gray-500">({sharePct}%)</span></span>
                          </div>
                          <div className="h-3 border-2 border-retro-border bg-white w-full">
                            <div
                              className={`h-full ${p.color} transition-all duration-500`}
                              style={{ width: `${barWidthPct}%` }}
                            />
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </>
            ) : (
              /* Mode B: Syllabus Pointer Frequency for Selected Paper */
              <>
                <div className="flex justify-between items-end mb-6 border-b-4 border-retro-border pb-2">
                  <h3 className="font-vt text-2xl uppercase font-bold flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-retro-border" strokeWidth={3} />
                    <span>{selectedPaper.toUpperCase()} Topic Frequency</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setPaperFilter('all')}
                    className="font-space text-[10px] text-retro-accent hover:underline flex items-center gap-1 cursor-pointer font-bold"
                    title="Switch back to all papers"
                  >
                    <ArrowLeft className="w-3 h-3" strokeWidth={3} />
                    <span>All Papers</span>
                  </button>
                </div>

                <div className="space-y-6 font-space text-sm font-bold">
                  {rankedSyllabusPointers.length === 0 ? (
                    <p className="text-retro-border text-xs py-2">No syllabus topics matching current filters.</p>
                  ) : (
                    (() => {
                      const maxPointerCount = Math.max(...rankedSyllabusPointers.map((p) => p.count), 1);
                      const paperTotal = searchData.paperBreakdown[selectedPaper.toLowerCase()] || 1;
                      const displayedList = showAllPointers
                        ? rankedSyllabusPointers
                        : rankedSyllabusPointers.slice(0, 7);

                      // helper for pointer bar color
                      const ptrBarColor = 
                        selectedPaper === 'gs1' ? 'bg-retro-gs1' :
                        selectedPaper === 'gs2' ? 'bg-retro-gs2' :
                        selectedPaper === 'gs3' ? 'bg-retro-gs3' :
                        selectedPaper === 'gs4' ? 'bg-retro-gs4' : 'bg-retro-accent';

                      return (
                        <>
                          {displayedList.map((ptr) => {
                            const barWidthPct =
                              ptr.count > 0 ? Math.min(100, Math.round((ptr.count / maxPointerCount) * 100)) : 0;
                            const sharePct = ((ptr.count / paperTotal) * 100).toFixed(0);
                            const isSelected = selectedPointer.toLowerCase() === ptr.id.toLowerCase();

                            return (
                              <div
                                key={ptr.id}
                                onClick={() => setPointerFilter(ptr.id)}
                                className={`cursor-pointer group ${
                                  isSelected ? 'text-retro-accent' : 'text-retro-border'
                                }`}
                                title={`${ptr.label}: ${ptr.officialText}`}
                              >
                                <div className="flex justify-between mb-1">
                                  <span className="truncate group-hover:text-retro-accent transition-colors mr-2">
                                    {ptr.label}
                                  </span>
                                  <div className="flex items-center shrink-0">
                                    <span>{ptr.count}</span>
                                    {ptr.count > 0 && (
                                      <span className="text-gray-500 ml-1">({sharePct}%)</span>
                                    )}
                                  </div>
                                </div>
                                <div className="h-3 border-2 border-retro-border bg-white w-full">
                                  <div
                                    className={`h-full ${ptrBarColor} transition-all duration-500`}
                                    style={{ width: `${barWidthPct}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}

                          {rankedSyllabusPointers.length > 7 && (
                            <button
                              type="button"
                              onClick={() => setShowAllPointers(!showAllPointers)}
                              className="w-full mt-6 pt-2 text-center text-xs font-bold text-retro-accent hover:underline flex items-center justify-center gap-1 transition-colors cursor-pointer uppercase font-space"
                            >
                              <span>
                                {showAllPointers
                                  ? 'Show Top 7 Topics'
                                  : `Show all ${rankedSyllabusPointers.length} topics`}
                              </span>
                              {showAllPointers ? (
                                <ChevronUp className="w-3.5 h-3.5" strokeWidth={3} />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" strokeWidth={3} />
                              )}
                            </button>
                          )}
                        </>
                      );
                    })()
                  )}
                </div>
              </>
            )}
          </div>

          {/* Quick Year Jump */}
          <div className="retro-container p-6 bg-white">
            <h3 className="font-vt text-2xl uppercase font-bold flex items-center gap-2 mb-6 border-b-4 border-retro-border pb-2">
              <Calendar className="w-5 h-5 text-retro-border" strokeWidth={3} />
              <span>Filter by Year</span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013].map((yr) => {
                const isSelected = selectedYear === yr;
                return (
                  <button
                    key={yr}
                    onClick={() => {
                      const newYr = isSelected ? null : yr;
                      setSelectedYear(newYr);
                      const params = new URLSearchParams(searchParams.toString());
                      if (newYr) params.set('year', newYr.toString());
                      else params.delete('year');
                      router.push(`/search?${params.toString()}`);
                    }}
                    className={`retro-btn text-base sm:text-lg py-1 px-0 shadow-none ${
                      isSelected
                        ? 'bg-retro-border text-white'
                        : 'outline hover:bg-retro-border hover:text-white'
                    }`}
                  >
                    {yr}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto py-20 text-center text-muted">
          Loading UPSC Search Engine...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
