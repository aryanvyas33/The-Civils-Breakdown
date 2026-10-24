'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { getQuestionById, getQuestionsByPaper, getAllQuestions, getSubjectById } from '@/lib/data';
import { RelatedQuestion } from '@/types';
import QuestionCard from '@/components/question/QuestionCard';
import QuestionNoteEditor from '@/components/question/QuestionNoteEditor';
import QuestionDeconstructionView from '@/components/question/QuestionDeconstructionView';
import { fetchFullDeconstruction, DeconstructionData } from '@/lib/questionDeconstruction';
import { AIDeconstructionItem } from '@/types/deconstruction';
import { isBookmarked, toggleBookmark } from '@/lib/bookmarks';

import { highlightQuestionKeywords } from '@/lib/highlight';
import {
  Copy,
  Check,
  Share2,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface CachedQuestionSearch {
  id: string;
  year: number;
  tagsLowerJoined: string;
  textLower: string;
  staticCoreLower: string[];
}

let cachedSearchCorpus: CachedQuestionSearch[] | null = null;

function getSearchCorpus(): CachedQuestionSearch[] {
  if (cachedSearchCorpus) return cachedSearchCorpus;
  const allQs = getAllQuestions();
  cachedSearchCorpus = allQs.map((q) => ({
    id: q.id,
    year: q.year,
    tagsLowerJoined: q.tags.map((t) => t.toLowerCase()).join(' '),
    textLower: q.text.toLowerCase(),
    staticCoreLower: (q.staticCore || []).map((sc) => sc.toLowerCase()),
  }));
  return cachedSearchCorpus;
}

function QuestionDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const questionId = (params.questionId as string)?.toLowerCase();
  const queryParam = searchParams.get('q') || searchParams.get('hl') || '';

  const question = useMemo(() => {
    return questionId ? getQuestionById(questionId) : undefined;
  }, [questionId]);

  const subject = useMemo(() => {
    return question ? getSubjectById(question.subjectId) : null;
  }, [question]);

  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [highlightKeywords, setHighlightKeywords] = useState(true);
  const [deconstruction, setDeconstruction] = useState<DeconstructionData | null>(null);
  const [aiData, setAiData] = useState<AIDeconstructionItem | null>(null);
  const [deconstructionSource, setDeconstructionSource] = useState<'curated' | 'ai_generated' | 'computed' | 'synthesized'>('ai_generated');

  const copyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const shareTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      if (shareTimerRef.current) clearTimeout(shareTimerRef.current);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (question) {
      fetchFullDeconstruction(question.id, question)
        .then((res) => {
          if (isMounted && res) {
            setDeconstruction(res.deconstruction);
            setAiData(res.data || null);
            setDeconstructionSource(res.source);
          }
        })
        .catch((err) => {
          console.error('[QuestionDetail] Failed to load deconstruction:', err);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [question]);


  useEffect(() => {
    if (questionId) {
      setBookmarked(isBookmarked(questionId));
    }
    const updateHandler = () => {
      if (questionId) setBookmarked(isBookmarked(questionId));
    };
    window.addEventListener('pyq-bookmarks-updated', updateHandler);
    return () => window.removeEventListener('pyq-bookmarks-updated', updateHandler);
  }, [questionId]);

  const highlightedQuestionText = useMemo(() => {
    if (!question) return '';
    return highlightQuestionKeywords(
      question.text,
      question.tags,
      question.keywords,
      queryParam ? [queryParam] : []
    );
  }, [question, queryParam]);

  const [related, setRelated] = useState<RelatedQuestion[]>([]);

  useEffect(() => {
    if (!questionId) return;
    let isMounted = true;
    fetch(`/api/related/${encodeURIComponent(questionId)}?limit=8`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (isMounted) setRelated(data);
      })
      .catch((err) => console.error('[RelatedQuestions] Fetch error:', err));
    return () => {
      isMounted = false;
    };
  }, [questionId]);

  // Topic trend data: distribution across 2013-2026 (14 years) for question's primary tags
  // Core concept / main keyword extraction for the trend graph
  const coreConceptInfo = useMemo(() => {
    if (!question) return { label: '', conceptPhrases: [] as string[] };

    // 1. Determine primary core concept label (prefer timeless static core, then primary substantive tag)
    const label =
      (question.staticCore && question.staticCore.length > 0 ? question.staticCore[0] : null) ||
      question.tags[0] ||
      question.subjectName;

    // 2. Gather specific substantive multi-word concept phrases (doctrines, schemes, institutions)
    const phraseSet = new Set<string>();

    if (question.staticCore) {
      question.staticCore.forEach((sc) => phraseSet.add(sc.toLowerCase().trim()));
    }

    question.tags.forEach((tag) => {
      const cleanTag = tag.toLowerCase().trim();
      if (cleanTag.length > 4) {
        phraseSet.add(cleanTag);
      }
    });

    // Add multi-word keywords
    question.keywords.forEach((kw) => {
      const cleanKw = kw.toLowerCase().trim();
      if (cleanKw.includes(' ') && cleanKw.length > 5) {
        phraseSet.add(cleanKw);
      }
    });

    return {
      label,
      conceptPhrases: Array.from(phraseSet),
    };
  }, [question]);

  // Concept Frequency Trend: counts questions across 2013-2026 testing this core concept/doctrine (O(N) zero-allocation pass)
  const topicTrend = useMemo(() => {
    if (!question) return [];
    const corpus = getSearchCorpus();
    const { label, conceptPhrases } = coreConceptInfo;
    const labelLower = label.toLowerCase();
    const years = Array.from({ length: 14 }, (_, i) => 2013 + i);
    const countsByYear: Record<number, number> = {};

    for (const q of corpus) {
      let isMatch = false;
      if (q.id === question.id) {
        isMatch = true;
      } else {
        if (labelLower && (q.tagsLowerJoined.includes(labelLower) || q.textLower.includes(labelLower))) {
          isMatch = true;
        } else if (q.staticCoreLower.some((sc) => sc.includes(labelLower) || labelLower.includes(sc))) {
          isMatch = true;
        } else if (conceptPhrases.some((phrase) => phrase.length > 5 && (q.tagsLowerJoined.includes(phrase) || q.textLower.includes(phrase)))) {
          isMatch = true;
        }
      }

      if (isMatch) {
        countsByYear[q.year] = (countsByYear[q.year] || 0) + 1;
      }
    }

    return years.map((yr) => ({ year: yr, count: countsByYear[yr] || 0 }));
  }, [question, coreConceptInfo]);

  // Previous and Next questions in the same paper
  const { prevQ, nextQ } = useMemo(() => {
    if (!question) return { prevQ: null, nextQ: null };
    const paperQuestions = getQuestionsByPaper(question.paperId);
    const index = paperQuestions.findIndex((q) => q.id === question.id);
    return {
      prevQ: index > 0 ? paperQuestions[index - 1] : null,
      nextQ: index < paperQuestions.length - 1 ? paperQuestions[index + 1] : null,
    };
  }, [question]);

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-primary mb-3">Question Not Found</h1>
        <p className="text-muted mb-6">The requested UPSC question could not be found.</p>
        <Link href="/papers" className="px-5 py-2.5 bg-accent text-white rounded-lg font-semibold">
          Browse All Papers
        </Link>
      </div>
    );
  }

  const handleBookmarkToggle = () => {
    const updated = toggleBookmark(question.id);
    setBookmarked(updated);
  };

  const handleCopyText = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(question.text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = question.text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('[QuestionDetail] Copy failed:', err);
    }
  };

  const handleShare = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: `UPSC PYQ ${question.year} (${question.paperId.toUpperCase()})`,
          text: question.text,
          url: window.location.href,
        });
      } else if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        if (shareTimerRef.current) clearTimeout(shareTimerRef.current);
        shareTimerRef.current = setTimeout(() => setShared(false), 2000);
      }
    } catch (err) {
      // User dismissed share dialog or browser blocked share
    }
  };

  // Paper styling
  const getPaperColorBar = (paperId: string) => {
    switch (paperId) {
      case 'gs1': return 'bg-gs1';
      case 'gs2': return 'bg-gs2';
      case 'gs3': return 'bg-gs3';
      case 'gs4': return 'bg-gs4';
      case 'essay': return 'bg-essay';
      default: return 'bg-accent';
    }
  };

  const getPaperBadgeColor = (paperId: string) => {
    switch (paperId) {
      case 'gs1': return 'bg-blue-50 text-gs1 border-blue-100';
      case 'gs2': return 'bg-emerald-50 text-gs2 border-emerald-100';
      case 'gs3': return 'bg-amber-50 text-gs3 border-amber-100';
      case 'gs4': return 'bg-purple-50 text-gs4 border-purple-100';
      case 'essay': return 'bg-red-50 text-essay border-red-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const directlyRelated = related.filter((r) => r.relevanceLevel === 'directly_related');
  const highRelated = related.filter((r) => r.relevanceLevel === 'high');
  const moderateRelated = related.filter((r) => r.relevanceLevel === 'moderate');
  const lowRelated = related.filter((r) => r.relevanceLevel === 'low');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 w-full space-y-8">
      {/* 1. Breadcrumb navigation */}
      <nav className="text-sm font-medium text-muted flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href={`/papers/${question.paperId}`} className="hover:text-primary transition-colors">
          {question.paperId === 'essay' ? 'Essay Paper' : `GS Paper ${question.paperNumber}`}
        </Link>
        <span>/</span>
        <Link
          href={`/explore/${question.paperId}?subject=${question.subjectId}`}
          className="hover:text-primary transition-colors"
        >
          {question.subjectName}
        </Link>
        <span>/</span>
        <span className="text-primary font-bold">{question.year}</span>
      </nav>

      {/* 2. Main Question Card */}
      <section className="retro-container relative bg-white">
        {/* Fake Window Header */}
        <div className={`window-header ${getPaperColorBar(question.paperId)} relative z-10 pointer-events-none`}>
          <span>C:\UPSC\{question.paperId.toUpperCase()}\{question.year}\Q-{question.questionNumber}.txt</span>
          <div className="window-controls pointer-events-auto">
            <div className="window-btn"></div>
            <div className="window-btn"></div>
            <div className="window-btn close"></div>
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-4 relative z-10">
          {/* Metadata Badges Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`retro-badge font-vt text-[1.15rem] leading-none bg-retro-folder text-retro-border uppercase tracking-widest`}
              >
                {question.subjectName}
              </span>
              <span className="retro-badge uppercase tracking-widest bg-[#FFD1D1] text-retro-accent border-retro-accent font-vt text-[1.1rem] leading-none">
                {aiData?.deconstruction?.directive?.word || deconstruction?.directives?.[0]?.phrase || 'EXAMINE'}
              </span>
              <span className="retro-badge font-bold text-xs bg-retro-window">
                Year {question.year}
              </span>
              <span className="retro-badge font-bold text-xs bg-retro-window">
                {question.paperId === 'essay' ? `Sec ${question.section || 'A'} | 125 Marks` : `${question.marks} Marks`}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Keyword Highlight Toggle */}
              <button
                onClick={() => setHighlightKeywords(!highlightKeywords)}
                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  highlightKeywords
                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                    : 'bg-surface text-muted border-bordercolor hover:text-primary'
                }`}
                title="Toggle keyword highlighting in question statement"
              >
                <span>Keywords {highlightKeywords ? 'Highlighted' : 'Off'}</span>
              </button>

              {/* Color Legend when highlighting is enabled */}
              {highlightKeywords && (
                <div
                  className="flex flex-wrap items-center gap-2.5 px-3 py-1 bg-surface/90 border border-bordercolor rounded-full text-xs transition-opacity duration-200 shadow-2xs"
                  title="Highlight Types: Amber for Concepts/Statutes, Blue for Directives, Green for Institutions/Stakeholders"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600/40 shadow-2xs shrink-0" />
                    <span className="font-semibold text-primary text-[11px]">Concept / Statute</span>
                  </span>
                  <span className="text-bordercolor font-light">•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 border border-blue-700/40 shadow-2xs shrink-0" />
                    <span className="font-bold text-blue-900 text-[11px]">Directive</span>
                  </span>
                  <span className="text-bordercolor font-light">•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-700/40 shadow-2xs shrink-0" />
                    <span className="font-bold text-emerald-900 text-[11px]">Institution / Stakeholder</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Full Question Text with highlighted keywords */}
          {highlightKeywords ? (
            <h1
              className={`text-xl md:text-2xl text-retro-border font-space font-bold leading-relaxed mb-6 ${
                question.paperId === 'essay' ? 'italic' : ''
              }`}
              dangerouslySetInnerHTML={{
                __html: question.paperId === 'essay' ? `&ldquo;${highlightedQuestionText}&rdquo;` : highlightedQuestionText,
              }}
            />
          ) : (
            <h1
              className={`text-xl md:text-2xl text-retro-border font-space font-bold leading-relaxed mb-6 ${
                question.paperId === 'essay' ? 'italic' : ''
              }`}
            >
              {question.paperId === 'essay' ? `"${question.text}"` : question.text}
            </h1>
          )}

          {/* Subject & Tags */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col gap-3">
              {subject && (
                <div className="text-sm bg-retro-window p-4 border-4 border-retro-border shadow-[4px_4px_0px_#2A2A2A]">
                  <span className="text-retro-border font-bold flex items-center gap-1.5 mb-1.5 font-space uppercase">
                    <Layers className="w-4 h-4 text-retro-accent" />
                    Exact Syllabus Pointer
                  </span>
                  <p className="text-retro-border leading-relaxed font-bold font-space">
                    {subject.description}
                  </p>
                </div>
              )}

              {question.currentAffairsContext && (
                <div className="text-sm bg-[#FFD1D1]/30 p-4 border-4 border-retro-accent shadow-[4px_4px_0px_#FF2A2A]">
                  <div className="flex items-center gap-2 text-retro-accent font-bold mb-1.5 font-space uppercase">
                    <span className="w-2 h-2 rounded-full bg-retro-accent animate-pulse" />
                    <span>Current Affairs Peg & Static Core</span>
                  </div>
                  <div className="text-xs text-retro-border space-y-1.5 leading-relaxed font-space font-bold">
                    <p>
                      <strong className="text-retro-accent">Contemporary Trigger:</strong> {question.currentAffairsContext}
                    </p>
                    {question.staticCore && question.staticCore.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                        <span className="font-semibold text-retro-accent">Underlying Static Themes:</span>
                        {question.staticCore.map((theme) => (
                          <span key={theme} className="bg-white border-2 border-retro-accent text-retro-accent px-2 py-0.5 shadow-none text-[11px] font-bold">
                            {theme}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t-2 border-dashed border-retro-border mt-4">
              <span className="text-retro-border text-sm font-bold font-space uppercase">Syllabus Tags:</span>
              {question.tags.map((t, i) => {
                const colors = ['bg-retro-gs4 text-white', 'bg-retro-gs1', 'bg-[#FFD1D1] text-retro-accent border-retro-accent'];
                return (
                <Link
                  key={t}
                  href={`/search?q=${encodeURIComponent(t)}`}
                  className={`retro-tag hover:-translate-y-1 hover:shadow-[2px_2px_0px_#2A2A2A] transition-transform cursor-pointer ${colors[i % colors.length]}`}
                >
                  {t}
                </Link>
                );
              })}
            </div>

            {/* AI Taxonomy Mapping Anchors & Micro-themes */}
            {aiData?.taxonomy_mapping?.primary_anchor && (
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-retro-border text-sm font-bold font-space uppercase">Syllabus Anchor:</span>
                <span className="retro-badge bg-white py-0.5">
                  {aiData.taxonomy_mapping.primary_anchor}
                </span>
                {aiData.taxonomy_mapping.micro_themes?.slice(0, 3).map((theme) => (
                  <span
                    key={theme}
                    className="retro-badge bg-retro-folder py-0.5"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons: Copy, Share, Bookmark */}
          <div className="flex items-center gap-6 pt-6 border-t-2 border-dashed border-retro-border mt-2">
            <button
              onClick={handleCopyText}
              className="retro-btn shadow-none bg-white hover:bg-retro-window hover:-translate-y-1 hover:shadow-[2px_2px_0px_#2A2A2A] flex items-center gap-1.5 text-xs font-bold transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>

            <button
              onClick={handleShare}
              className="retro-btn shadow-none bg-white hover:bg-retro-window hover:-translate-y-1 hover:shadow-[2px_2px_0px_#2A2A2A] flex items-center gap-1.5 text-xs font-bold transition-all"
            >
              {shared ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
              <span>{shared ? 'SHARED' : 'SHARE'}</span>
            </button>

            <button
              onClick={handleBookmarkToggle}
              className={`retro-btn hover:-translate-y-1 hover:shadow-[2px_2px_0px_#2A2A2A] flex items-center gap-1.5 text-xs font-bold transition-all ${
                bookmarked ? 'bg-retro-accent text-white shadow-none' : 'shadow-none bg-white hover:bg-retro-window'
              }`}
            >
              {bookmarked ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              <span>{bookmarked ? 'SAVED' : 'SAVE'}</span>
            </button>
          </div>
        </div>
        <QuestionNoteEditor questionId={question.id} pointerId={question.pointerId} />
      </section>

      {/* 2b. UPSC Question Anatomy Framework */}
      {deconstruction && (
        <QuestionDeconstructionView
          deconstruction={deconstruction}
          aiData={aiData}
          source={deconstructionSource}
        />
      )}


      {/* 3. Connected Questions Across Papers */}
      <section className="retro-container bg-white p-6 space-y-6">
        <div className="border-b-4 border-retro-border pb-4">
          <h2 className="text-2xl font-vt font-bold text-retro-border flex items-center gap-2 mb-2 uppercase tracking-widest">
            <span>Connected Questions Across All Papers</span>
          </h2>
          <p className="font-space text-sm text-retro-border font-bold">
            Discovered through overlapping concepts:{' '}
            <span className="retro-badge bg-retro-window shadow-none border-dashed">{question.tags.slice(0, 3).join(', ')}</span>
          </p>
        </div>

        {/* Directly Related Grid - exact concept, entity, and static syllabus core matches */}
        {directlyRelated.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-retro-border flex items-center gap-2 uppercase tracking-wide font-space">
              <span className="w-3 h-3 border-2 border-retro-border bg-retro-gs2 animate-pulse shadow-[2px_2px_0px_#2A2A2A]" />
              <span className="bg-white px-2 py-0.5 border-2 border-retro-border shadow-[2px_2px_0px_#2A2A2A]">Priority 1: Directly Related - Exact Concept &amp; Doctrine Matches</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {directlyRelated.map((rel) => (
                <QuestionCard
                  key={rel.question.id}
                  question={rel.question}
                  variant="related"
                  relevanceLevel={rel.relevanceLevel}
                  matchingTags={rel.matchingTags}
                  matchReason={rel.matchReason}
                />
              ))}
            </div>
          </div>
        )}

        {/* Highly Related Grid - concept overlap + shared syllabus pointer */}
        {highRelated.length > 0 && (
          <div className="space-y-3 pt-1">
            <h3 className="text-xs font-bold text-retro-border flex items-center gap-2 uppercase tracking-wide font-space">
              <span className="w-3 h-3 border-2 border-retro-border bg-retro-gs3 shadow-[2px_2px_0px_#2A2A2A]" />
              <span className="bg-white px-2 py-0.5 border-2 border-retro-border shadow-[2px_2px_0px_#2A2A2A]">Priority 2: Highly Related - Overlapping Themes &amp; Syllabus Area</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {highRelated.map((rel) => (
                <QuestionCard
                  key={rel.question.id}
                  question={rel.question}
                  variant="related"
                  relevanceLevel={rel.relevanceLevel}
                  matchingTags={rel.matchingTags}
                  matchReason={rel.matchReason}
                />
              ))}
            </div>
          </div>
        )}

        {/* Low Relevance Grid */}
        {lowRelated.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-retro-border flex items-center gap-2 uppercase tracking-wide font-space">
              <span className="w-3 h-3 border-2 border-retro-border bg-gray-400 shadow-[2px_2px_0px_#2A2A2A]" />
              <span className="bg-white px-2 py-0.5 border-2 border-retro-border shadow-[2px_2px_0px_#2A2A2A]">Priority 4: Contextual - Broad Thematic &amp; Cross-Paper Resonance</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowRelated.map((rel) => (
                <QuestionCard
                  key={rel.question.id}
                  question={rel.question}
                  variant="related"
                  relevanceLevel={rel.relevanceLevel}
                  matchingTags={rel.matchingTags}
                  matchReason={rel.matchReason}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 4. Core Concept / Keyword Frequency Trend */}
      <section className="retro-container p-6 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 border-b-2 border-dashed border-retro-border pb-4">
          <h3 className="text-lg font-bold text-retro-border uppercase tracking-widest flex items-center gap-2 font-space">
            <TrendingUp className="w-5 h-5 text-retro-accent" />
            <span>Recurring Theme Trend: &ldquo;{coreConceptInfo.label}&rdquo;</span>
          </h3>
          <span className="retro-badge bg-retro-window shadow-none border-retro-border">
            {topicTrend.reduce((sum, t) => sum + t.count, 0)} questions across 14 yrs
          </span>
        </div>
        <p className="text-xs text-retro-border font-space font-bold mb-6">
          Frequency of UPSC CSE Mains questions testing this core concept, landmark doctrine, or foundational syllabus theme (2013-2026)
        </p>

        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 text-center">
          {topicTrend.map((t) => (
            <div key={t.year} className="flex flex-col items-center">
              <div className="h-24 w-full flex items-end justify-center pb-2">
                <div
                  className="w-full max-w-[20px] bg-retro-gs1 border-2 border-retro-border shadow-[2px_2px_0px_#2A2A2A] hover:bg-retro-accent transition-all duration-300"
                  style={{
                    height: `${Math.max(12, t.count * 24)}px`,
                  }}
                  title={`${t.year}: ${t.count} question(s)`}
                />
              </div>
              <span className="font-space text-[10px] font-bold text-retro-border mt-1 border-t-2 border-retro-border w-full pt-1">{t.year}</span>
              <span className="font-vt text-[14px] font-bold text-retro-accent mt-0.5">{t.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Previous / Next Question Navigation */}
      <div className="flex justify-between items-center pt-8">
        {prevQ ? (
          <Link
            href={`/question/${prevQ.id}`}
            className="retro-btn bg-white hover:bg-retro-window shadow-[4px_4px_0px_#2A2A2A] hover:-translate-y-1 inline-flex items-center gap-2 text-xs font-bold font-space uppercase transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>
              Previous _ Q.{prevQ.questionNumber} ({prevQ.year})
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextQ ? (
          <Link
            href={`/question/${nextQ.id}`}
            className="retro-btn bg-white hover:bg-retro-window shadow-[4px_4px_0px_#2A2A2A] hover:-translate-y-1 inline-flex items-center gap-2 text-xs font-bold font-space uppercase transition-all"
          >
            <span>
              Next _ Q.{nextQ.questionNumber} ({nextQ.year})
            </span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default function QuestionDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-20 text-center text-muted">
          Loading question details...
        </div>
      }
    >
      <QuestionDetailContent />
    </Suspense>
  );
}

