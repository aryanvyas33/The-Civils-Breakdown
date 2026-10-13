import Fuse, { type IFuseOptions } from 'fuse.js';
import { Question, SearchResult, FilterOptions } from '@/types';
import { getAllQuestions, getAllTags, getAllSubjects } from './data';
import { highlightQuestionKeywords } from './highlight';
import { getAllQuestionCardBadges } from './cardBadges';

export interface SearchableQuestion extends Question {
  aiMicroThemes: string[];
  aiCoreConcepts: string[];
  aiPrimaryAnchor: string;
  aiDirective: string;
  aiStakeholders: string[];
}

const fuseOptions: IFuseOptions<SearchableQuestion> = {
  keys: [
    { name: 'text', weight: 0.40 },
    { name: 'aiCoreConcepts', weight: 0.25 },
    { name: 'aiMicroThemes', weight: 0.25 },
    { name: 'tags', weight: 0.20 },
    { name: 'keywords', weight: 0.15 },
    { name: 'aiPrimaryAnchor', weight: 0.10 },
    { name: 'aiStakeholders', weight: 0.10 },
    { name: 'subjectName', weight: 0.05 },
    { name: 'aiDirective', weight: 0.05 },
  ],
  threshold: 0.35,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  useExtendedSearch: true,
  ignoreLocation: true,
};

let fuseInstance: Fuse<SearchableQuestion> | null = null;
let enrichedQuestionsCache: SearchableQuestion[] | null = null;

export function getEnrichedQuestions(): SearchableQuestion[] {
  if (enrichedQuestionsCache) return enrichedQuestionsCache;
  const questions = getAllQuestions();
  const badgeMap = getAllQuestionCardBadges();
  enrichedQuestionsCache = questions.map((q) => {
    const badge = badgeMap[q.id.toLowerCase().trim()];
    return {
      ...q,
      aiMicroThemes: badge?.microThemes || [],
      aiCoreConcepts: badge?.coreConcepts || [],
      aiPrimaryAnchor: badge?.primaryAnchor || '',
      aiDirective: badge?.directiveWord || '',
      aiStakeholders: badge?.stakeholders || [],
    };
  });
  return enrichedQuestionsCache;
}

export function getSearchEngine(): Fuse<SearchableQuestion> {
  if (!fuseInstance) {
    const questions = getEnrichedQuestions();
    fuseInstance = new Fuse(questions, fuseOptions);
  }
  return fuseInstance;
}

export interface SearchOutput {
  results: SearchResult[];
  totalResults: number;
  paperBreakdown: Record<string, number>;
  syllabusBreakdown: Record<string, number>;
  relatedKeywords: string[];
}

export function searchQuestions(
  query: string,
  filters?: FilterOptions
): SearchOutput {
  const allEnrichedQuestions = getEnrichedQuestions();

  const matchesDirective = (q: SearchableQuestion, directiveFilter?: string | null) => {
    if (!directiveFilter || directiveFilter === 'all') return true;
    const filterLower = directiveFilter.toLowerCase().trim();
    const qDirective = q.aiDirective.toLowerCase().trim();
    return qDirective.includes(filterLower) || filterLower.includes(qDirective);
  };

  if (!query || query.trim() === '') {
    // If no query, calculate paper breakdown across questions matching year, subject, and directive filters
    const baseForBreakdown = allEnrichedQuestions.filter((q) => {
      if (filters?.year && q.year !== filters.year) return false;
      if (filters?.subject && q.subjectId.toLowerCase() !== filters.subject.toLowerCase()) return false;
      if (!matchesDirective(q, filters?.directive)) return false;
      return true;
    });

    const paperBreakdown: Record<string, number> = {
      all: baseForBreakdown.length,
      gs1: 0,
      gs2: 0,
      gs3: 0,
      gs4: 0,
      essay: 0,
    };
    baseForBreakdown.forEach((q) => {
      const pid = q.paperId.toLowerCase();
      paperBreakdown[pid] = (paperBreakdown[pid] || 0) + 1;
    });

    let paperFiltered = baseForBreakdown;
    if (filters?.paper && filters.paper !== 'all') {
      paperFiltered = paperFiltered.filter((q) => q.paperId.toLowerCase() === filters.paper?.toLowerCase());
    }

    const syllabusBreakdown: Record<string, number> = {};
    paperFiltered.forEach((q) => {
      if (q.pointerId) {
        syllabusBreakdown[q.pointerId] = (syllabusBreakdown[q.pointerId] || 0) + 1;
      }
    });

    let filtered = paperFiltered;
    if (filters?.pointerId && filters.pointerId !== 'all') {
      filtered = filtered.filter((q) => q.pointerId?.toLowerCase() === filters.pointerId?.toLowerCase());
    }

    if (filters?.sortBy === 'year-asc') {
      filtered.sort((a, b) => a.year - b.year || a.questionNumber - b.questionNumber);
    } else if (filters?.sortBy === 'marks-desc') {
      filtered.sort((a, b) => b.marks - a.marks);
    } else {
      filtered.sort((a, b) => b.year - a.year || a.questionNumber - b.questionNumber);
    }

    return {
      results: filtered.map((q) => ({
        question: q,
        relevanceScore: 1,
        matchedKeywords: [],
        highlightedText: highlightQuestionKeywords(q.text, q.tags, q.keywords),
      })),
      totalResults: filtered.length,
      paperBreakdown,
      syllabusBreakdown,
      relatedKeywords: [],
    };
  }

  const fuse = getSearchEngine();
  const rawResults = fuse.search(query.trim());

  // Extract query terms for highlight matching
  const searchTerms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 2);

  const mappedResults: SearchResult[] = [];
  const paperBreakdown: Record<string, number> = {
    all: 0,
    gs1: 0,
    gs2: 0,
    gs3: 0,
    gs4: 0,
    essay: 0,
  };
  const syllabusBreakdown: Record<string, number> = {};

  // Tag frequency accumulator for related keywords
  const tagCounts = new Map<string, number>();

  for (const item of rawResults) {
    const q = item.item;
    const pid = q.paperId.toLowerCase();

    // Check directive filter before incrementing breakdown
    if (!matchesDirective(q, filters?.directive)) {
      continue;
    }

    paperBreakdown[pid] = (paperBreakdown[pid] || 0) + 1;
    paperBreakdown.all += 1;

    // Apply paper filter
    if (filters?.paper && filters.paper !== 'all' && pid !== filters.paper.toLowerCase()) {
      continue;
    }
    // Apply year filter
    if (filters?.year && q.year !== filters.year) {
      continue;
    }
    // Apply subject filter
    if (filters?.subject && q.subjectId.toLowerCase() !== filters.subject.toLowerCase()) {
      continue;
    }

    // Collect related tags after year & subject scope are constrained
    for (const tag of q.tags) {
      if (!searchTerms.some((st) => tag.toLowerCase().includes(st))) {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      }
    }

    // Accumulate syllabusBreakdown before pointerId filter
    if (q.pointerId) {
      syllabusBreakdown[q.pointerId] = (syllabusBreakdown[q.pointerId] || 0) + 1;
    }

    // Apply pointerId filter
    if (filters?.pointerId && filters.pointerId !== 'all' && q.pointerId?.toLowerCase() !== filters.pointerId.toLowerCase()) {
      continue;
    }

    // Keyword highlighting: highlight both searchTerms and core syllabus concepts
    const highlighted = highlightQuestionKeywords(q.text, q.tags, q.keywords, searchTerms);

    mappedResults.push({
      question: q,
      relevanceScore: 1 - (item.score || 0),
      matchedKeywords: searchTerms,
      highlightedText: highlighted,
    });
  }

  // Sort
  if (filters?.sortBy === 'year-desc') {
    mappedResults.sort((a, b) => b.question.year - a.question.year || a.question.questionNumber - b.question.questionNumber);
  } else if (filters?.sortBy === 'year-asc') {
    mappedResults.sort((a, b) => a.question.year - b.question.year || a.question.questionNumber - b.question.questionNumber);
  } else {
    // Default relevance
    mappedResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  const sortedTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map((e) => e[0]);

  return {
    results: mappedResults,
    totalResults: mappedResults.length,
    paperBreakdown,
    syllabusBreakdown,
    relatedKeywords: sortedTags,
  };
}

export function highlightKeywords(text: string, terms: string[]): string {
  if (!terms || terms.length === 0) return text;
  return highlightQuestionKeywords(text, [], [], terms);
}

export function getAutocompleteSuggestions(query: string, limit: number = 6): string[] {
  if (!query || query.trim().length < 2) return [];
  const qLower = query.toLowerCase().trim();

  const results: string[] = [];
  const seen = new Set<string>();

  const add = (term: string) => {
    const clean = term.trim();
    const lower = clean.toLowerCase();
    if (!clean || lower === qLower || seen.has(lower)) return;
    seen.add(lower);
    results.push(clean);
  };

  const pool: string[] = [];

  // Tags
  const allTags = getAllTags();
  for (const item of allTags) {
    pool.push(item.tag);
  }

  // Micro-themes and core concepts
  const badgeMap = getAllQuestionCardBadges();
  for (const item of Object.values(badgeMap)) {
    if (item.microThemes) pool.push(...item.microThemes);
    if (item.coreConcepts) pool.push(...item.coreConcepts);
  }

  // Subject names
  const allSubjects = getAllSubjects();
  for (const sub of allSubjects) {
    pool.push(sub.name);
  }

  // 1. Prefix matches first
  for (const term of pool) {
    if (term.toLowerCase().startsWith(qLower)) {
      add(term);
      if (results.length >= limit) return results;
    }
  }

  // 2. Contains matches second
  for (const term of pool) {
    if (term.toLowerCase().includes(qLower)) {
      add(term);
      if (results.length >= limit) return results;
    }
  }

  return results;
}
