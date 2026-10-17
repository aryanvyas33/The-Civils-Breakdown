'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Question } from '@/types';
import { Bookmark, BookmarkCheck, ArrowRight, Share2, Copy, Check } from 'lucide-react';
import { isBookmarked, toggleBookmark } from '@/lib/bookmarks';
import { highlightQuestionKeywords } from '@/lib/highlight';
import QuestionNoteEditor from './QuestionNoteEditor';
import eliteTagsRaw from '@/data/elite-yield-tags.json';
import { getQuestionCardBadges } from '@/lib/cardBadges';

const eliteTags = new Set(eliteTagsRaw.map((t: string) => t.toLowerCase()));

interface QuestionCardProps {
  question: Question;
  variant?: 'accordion' | 'search-result' | 'related' | 'detail';
  highlightedText?: string;
  matchingTags?: string[];
  relevanceLevel?: 'directly_related' | 'high' | 'moderate' | 'low';
  searchQuery?: string;
  matchReason?: string;
  showNotes?: boolean;
}

export default function QuestionCard({
  question,
  variant = 'accordion',
  highlightedText,
  matchingTags,
  relevanceLevel,
  searchQuery,
  matchReason,
  showNotes,
}: QuestionCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const badgeData = React.useMemo(() => getQuestionCardBadges(question.id), [question.id]);
  const directiveWord = badgeData?.directiveWord;
  const primaryAnchor = badgeData?.primaryAnchor;
  const microThemes = badgeData?.microThemes || [];

  const shouldShowNotes = showNotes !== undefined ? showNotes : variant !== 'related';

  const questionUrl = searchQuery
    ? `/question/${question.id}?q=${encodeURIComponent(searchQuery)}`
    : `/question/${question.id}`;


  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setBookmarked(isBookmarked(question.id));
    const handleUpdate = () => setBookmarked(isBookmarked(question.id));
    window.addEventListener('pyq-bookmarks-updated', handleUpdate);
    return () => window.removeEventListener('pyq-bookmarks-updated', handleUpdate);
  }, [question.id]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const state = toggleBookmark(question.id);
    setBookmarked(state);
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
      console.error('[QuestionCard] Copy failed:', err);
    }
  };

  // Helper for border color by paper
  const getPaperBorderClass = (paperId: string) => {
    switch (paperId.toLowerCase()) {
      case 'gs1': return 'gs1-border';
      case 'gs2': return 'gs2-border';
      case 'gs3': return 'gs3-border';
      case 'gs4': return 'gs4-border';
      case 'essay': return 'essay-border';
      default: return 'border-l-4 border-gray-400';
    }
  };

  // Helper for paper badge
  const getPaperBadge = (paperId: string) => {
    switch (paperId.toLowerCase()) {
      case 'gs1': return { text: 'GS1', bg: 'bg-blue-50 text-gs1 border-blue-100' };
      case 'gs2': return { text: 'GS2', bg: 'bg-emerald-50 text-gs2 border-emerald-100' };
      case 'gs3': return { text: 'GS3', bg: 'bg-amber-50 text-gs3 border-amber-100' };
      case 'gs4': return { text: 'GS4', bg: 'bg-purple-50 text-gs4 border-purple-100' };
      case 'essay': return { text: 'ESSAY', bg: 'bg-red-50 text-essay border-red-100' };
      default: return { text: paperId.toUpperCase(), bg: 'bg-gray-50 text-gray-700 border-gray-200' };
    }
  };

  const badge = getPaperBadge(question.paperId);

  // Variant: RELATED QUESTION CARD
  if (variant === 'related') {
    const isDirect = relevanceLevel === 'directly_related';
    const isHigh = relevanceLevel === 'high';
    const isModerate = relevanceLevel === 'moderate';

    let headerBgClass = 'bg-retro-border';
    let badgeText = 'Priority 4 • Contextual';

    if (isDirect) {
      headerBgClass = 'bg-retro-gs2'; // Greenish
      badgeText = 'Priority 1 • Directly Related';
    } else if (isHigh) {
      headerBgClass = 'bg-retro-gs3'; // Blueish
      badgeText = 'Priority 2 • Highly Related';
    } else if (isModerate) {
      headerBgClass = 'bg-retro-gs1'; // Yellowish/Orangeish
      badgeText = 'Priority 3 • Moderate';
    }

    const isEssay = question.paperId === 'essay';
    const highlighted = highlightQuestionKeywords(
      question.text,
      matchingTags && matchingTags.length > 0 ? matchingTags : question.tags,
      question.keywords,
      matchingTags
    );

    return (
      <div className="retro-container relative group/card flex flex-col h-full bg-white">
        <Link href={questionUrl} className="absolute inset-0 z-0 focus:outline-none" aria-label="View related question" />
        
        {/* Fake Window Header */}
        <div className={`window-header ${headerBgClass} relative z-10 pointer-events-none`}>
          <div className="window-title font-vt text-lg">
            <span className="hidden sm:inline">C:\UPSC\{question.paperId.toUpperCase()}\{question.year}\RELATED.txt</span>
            <span className="sm:hidden">{question.paperId.toUpperCase()}&apos;{String(question.year).slice(-2)} // RELATED</span>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow relative z-10 pointer-events-none">
          <div className="flex justify-between items-start mb-3 gap-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-retro-border">
              <span className="retro-badge uppercase">{badgeText}</span>
              {directiveWord && (
                <span className="retro-badge uppercase tracking-widest bg-retro-window font-vt">
                  {directiveWord}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 shrink-0 pointer-events-auto">
              <span className="retro-badge">
                {question.marks}m
              </span>
            </div>
          </div>

          <p
            className="text-[14px] sm:text-sm font-sans font-medium text-retro-border line-clamp-3 mb-4 flex-grow leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: isEssay ? `&ldquo;${highlighted}&rdquo;` : highlighted,
            }}
          />

          {matchReason && (
            <div className="mb-3 text-xs text-retro-border flex items-center gap-1.5 line-clamp-1 retro-tag font-space bg-retro-window px-2.5 py-1">
              <span className="font-bold line-clamp-1">&gt; {matchReason}</span>
            </div>
          )}

          <div className="flex items-center justify-between mt-auto pt-3 border-t-2 border-retro-border border-dashed relative z-20 pointer-events-auto overflow-hidden gap-2">
            <div className="flex gap-1.5 overflow-x-auto hide-scroll snap-x pb-1">
              {microThemes.length > 0 && (
                <span className="retro-tag bg-retro-folder">
                  💡 {microThemes[0]}
                </span>
              )}
              {(matchingTags && matchingTags.length > 0 ? matchingTags : question.tags.slice(0, 2)).map((t, i) => {
                const colors = ['bg-retro-gs4 text-white', 'bg-retro-gs1', 'bg-[#FFD1D1] text-retro-accent border-retro-accent'];
                return (
                <span key={t} className={`retro-tag ${eliteTags.has(t.toLowerCase()) ? 'bg-retro-accent text-white' : colors[i % colors.length]}`}>
                  {eliteTags.has(t.toLowerCase()) ? '🔥 ' : ''}{t}
                </span>
                );
              })}
            </div>

            <Link
              href={questionUrl}
              className="retro-btn text-xs px-2 py-1 whitespace-nowrap shrink-0 group hover:bg-retro-accent hover:text-white"
            >
              READ FILE _
            </Link>
          </div>
          {shouldShowNotes && (
            <div className="relative z-20 pointer-events-auto mt-2">
               <QuestionNoteEditor questionId={question.id} pointerId={question.pointerId} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Variant: SEARCH RESULT CARD
  if (variant === 'search-result') {
    const isEssay = question.paperId === 'essay';
    const headerBgClass = 
      question.paperId.toLowerCase() === 'gs1' ? 'bg-retro-gs1' :
      question.paperId.toLowerCase() === 'gs2' ? 'bg-retro-gs2' :
      question.paperId.toLowerCase() === 'gs3' ? 'bg-retro-gs3' :
      question.paperId.toLowerCase() === 'gs4' ? 'bg-retro-gs4' :
      question.paperId.toLowerCase() === 'essay' ? 'bg-retro-essay' : 'bg-retro-border';

    return (
      <div className="retro-container group/card relative">
        <Link href={questionUrl} className="absolute inset-0 z-0 focus:outline-none" aria-label="View search result details" />
        
        {/* Fake Window Header */}
        <div className={`window-header ${headerBgClass} relative z-10 pointer-events-none`}>
          <div className="window-title font-vt text-lg">
            <span className="hidden sm:inline">C:\UPSC\{question.paperId.toUpperCase()}\{question.year}\Q-{question.questionNumber}.txt</span>
            <span className="sm:hidden">{question.paperId.toUpperCase()}&apos;{String(question.year).slice(-2)} // Q.{question.questionNumber}</span>
          </div>
          <div className="window-controls pointer-events-auto shrink-0">
            <div className="window-btn"></div>
            <div className="window-btn"></div>
            <div className="window-btn close"></div>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-3 relative z-10 pointer-events-none">
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-retro-border tracking-wide uppercase">
              <span className="font-vt text-[1.15rem] leading-none retro-badge bg-retro-folder">{question.subjectName}</span>
              {directiveWord && (
                <span className="retro-badge uppercase tracking-widest bg-[#FFD1D1] text-retro-accent border-retro-accent font-vt text-[1.1rem] leading-none">
                  {directiveWord}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 pointer-events-auto">
              <span className="retro-badge font-bold text-xs bg-retro-window">
                {isEssay ? `Sec ${question.section || 'A'} | ${question.marks}m` : `${question.marks} Marks`}
              </span>
              <button
                onClick={handleBookmark}
                className="retro-badge hover:bg-retro-folder transition-colors cursor-pointer px-1.5"
                title={bookmarked ? 'Bookmarked' : 'Bookmark this question'}
              >
                {bookmarked ? <BookmarkCheck className="w-4 h-4 text-retro-accent" /> : <Bookmark className="w-4 h-4 text-retro-border" />}
              </button>
            </div>
          </div>

          <div className="group relative">
            {(() => {
              const effectiveHighlight =
                highlightedText || highlightQuestionKeywords(question.text, question.tags, question.keywords);
              return (
                <h3
                  className={`text-[15px] sm:text-base md:text-lg font-sans font-medium text-retro-border leading-relaxed tracking-normal group-hover/card:text-retro-accent transition-colors ${
                    isEssay ? 'italic' : ''
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: isEssay ? `&ldquo;${effectiveHighlight}&rdquo;` : effectiveHighlight,
                  }}
                />
              );
            })()}
          </div>

          <div className="flex items-center justify-between mt-2 pt-3 border-t-2 border-dashed border-retro-border relative z-20 pointer-events-auto overflow-hidden gap-2">
            <div className="flex-1 min-w-0 overflow-x-auto hide-scroll flex items-center gap-1.5 pb-1">
              {primaryAnchor && (
                <span className="retro-tag bg-retro-window shrink-0">
                  {primaryAnchor}
                </span>
              )}
              {microThemes.length > 0 && (
                <span className="retro-tag bg-retro-folder shrink-0">
                  💡 {microThemes[0]}
                </span>
              )}
              {question.tags.slice(0, 3).map((tag, i) => {
                const colors = ['bg-retro-gs4 text-white', 'bg-retro-gs1', 'bg-[#FFD1D1] text-retro-accent border-retro-accent'];
                return (
                <span key={tag} className={`retro-tag shrink-0 ${eliteTags.has(tag.toLowerCase()) ? 'bg-retro-accent text-white' : colors[i % colors.length]}`}>
                  {eliteTags.has(tag.toLowerCase()) ? '🔥 Elite: ' : ''}{tag}
                </span>
                );
              })}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleCopy}
                className="text-xs font-vt text-retro-border hover:text-retro-accent flex items-center gap-1 transition-colors uppercase tracking-widest text-[1.1rem]"
                title="Copy Question"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>

              <Link
                href={questionUrl}
                className="retro-btn text-xs px-2 py-1 flex items-center gap-1 group whitespace-nowrap hover:bg-retro-accent hover:text-white"
              >
                <span>READ FILE _</span>
              </Link>
            </div>
          </div>
          {shouldShowNotes && (
            <div className="relative z-20 pointer-events-auto mt-2">
              <QuestionNoteEditor questionId={question.id} pointerId={question.pointerId} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Variant: ACCORDION CARD (Default in Paper Listing)
  return (
    <div className="retro-container bg-white group/q relative">
      <Link href={questionUrl} className="absolute inset-0 z-0 focus:outline-none" aria-label="View question details" />
      
      <div className="p-4 flex flex-col gap-3 relative z-10 pointer-events-none">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span className="retro-badge font-bold text-xs text-retro-border bg-retro-folder">
              {question.marks}m
            </span>
            <span className="retro-badge text-xs text-retro-border font-space bg-retro-window border-retro-border">
              Q.{question.questionNumber}
            </span>
            {directiveWord && (
              <span className="retro-badge font-vt tracking-widest uppercase bg-[#FFD1D1] text-retro-accent border-retro-accent">
                {directiveWord}
              </span>
            )}
            {question.tags && question.tags[0] && (
              <span className="retro-tag bg-white shadow-[2px_2px_0px_#2A2A2A]">
                {question.tags[0]}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={handleCopy}
              className="retro-badge hover:bg-retro-folder transition-colors cursor-pointer px-1.5"
              title="Copy question text"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-retro-border" />}
            </button>
            <button
              onClick={handleBookmark}
              className="retro-badge hover:bg-retro-folder transition-colors cursor-pointer px-1.5"
              title={bookmarked ? 'Saved to bookmarks' : 'Bookmark question'}
            >
              {bookmarked ? <BookmarkCheck className="w-4 h-4 text-retro-accent" /> : <Bookmark className="w-4 h-4 text-retro-border" />}
            </button>
          </div>
        </div>

        <div className="block">
          {(() => {
            const isEssay = question.paperId === 'essay';
            const effectiveHighlight =
              highlightedText || highlightQuestionKeywords(question.text, question.tags, question.keywords);
            return (
              <p
                className={`font-sans font-medium leading-relaxed text-[15px] sm:text-base text-retro-border group-hover/q:text-retro-accent transition-colors ${
                  isEssay ? 'italic' : ''
                }`}
                dangerouslySetInnerHTML={{
                  __html: isEssay ? `&ldquo;${effectiveHighlight}&rdquo;` : effectiveHighlight,
                }}
              />
            );
          })()}
        </div>

        <div className="flex items-center justify-between pt-3 border-t-2 border-dashed border-retro-border relative z-20 pointer-events-auto overflow-hidden gap-2">
          <div className="flex-1 min-w-0 overflow-x-auto hide-scroll flex items-center gap-1.5 pb-1">
            {microThemes.length > 0 && (
              <span className="retro-tag bg-retro-folder shrink-0">
                💡 {microThemes[0]}
              </span>
            )}
            {question.tags.slice(1, 3).map((tag, i) => {
              const colors = ['bg-retro-gs4 text-white', 'bg-retro-gs1', 'bg-[#FFD1D1] text-retro-accent border-retro-accent'];
              return (
              <span key={tag} className={`retro-tag shrink-0 ${eliteTags.has(tag.toLowerCase()) ? 'bg-retro-accent text-white' : colors[i % colors.length]}`}>
                {eliteTags.has(tag.toLowerCase()) ? '🔥 Elite: ' : ''}{tag}
              </span>
              );
            })}
          </div>
          <Link
            href={questionUrl}
            className="retro-btn text-xs px-2 py-1 flex items-center gap-1 group whitespace-nowrap hover:bg-retro-accent hover:text-white shrink-0"
          >
            <span>READ FILE _</span>
          </Link>
        </div>
        {shouldShowNotes && (
          <div className="relative z-20 pointer-events-auto mt-2">
            <QuestionNoteEditor questionId={question.id} pointerId={question.pointerId} />
          </div>
        )}
      </div>
    </div>
  );
}
