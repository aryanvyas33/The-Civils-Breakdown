import Fuse, { type IFuseOptions } from 'fuse.js';
import { Question, SearchResult, FilterOptions } from '@/types';
import { getAllQuestions, getAllTags, getAllSubjects } from './data';
import { highlightQuestionKeywords } from './highlight';
import { getAllQuestionCardBadges } from './cardBadges';
import {
  preprocessSearchQuery,
  UPSC_ACRONYM_MAP,
} from './searchQuery';

export interface SearchableQuestion extends Question {
  aiMicroThemes: string[];
  aiCoreConcepts: string[];
  aiPrimaryAnchor: string;
  aiDirective: string;
  aiStakeholders: string[];
}

const fallbackFuseOptions: IFuseOptions<SearchableQuestion> = {
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
  threshold: 0.25,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 4,
  useExtendedSearch: false,
  ignoreLocation: true,
};

let fallbackFuseInstance: Fuse<SearchableQuestion> | null = null;
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
  if (!fallbackFuseInstance) {
    const questions = getEnrichedQuestions();
    fallbackFuseInstance = new Fuse(questions, fallbackFuseOptions);
  }
  return fallbackFuseInstance;
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

  // Case 1: Empty Query
  if (!query || query.trim() === '') {
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

  // Case 2: Query Provided -> Hybrid Search Execution
  const preprocessed = preprocessSearchQuery(query);
  const rawMatches: Array<{ question: SearchableQuestion; rawScore: number }> = [];

  // Stage 2: Deterministic lexical whole-word & multi-field scoring
  for (const q of allEnrichedQuestions) {
    const textFields = [
      { text: q.text || '', weight: 12 },
      { text: (q.aiCoreConcepts || []).join(' '), weight: 9 },
      { text: (q.aiMicroThemes || []).join(' '), weight: 9 },
      { text: (q.tags || []).join(' '), weight: 7 },
      { text: (q.keywords || []).join(' '), weight: 6 },
      { text: q.aiPrimaryAnchor || '', weight: 4 },
      { text: q.subjectName || '', weight: 3 },
      { text: q.aiDirective || '', weight: 2 },
      { text: (q.aiStakeholders || []).join(' '), weight: 2 },
    ];

    const fullBlob = textFields.map((f) => f.text).join(' ');
    let score = 0;

    // 1. Exact phrase match bonus
    if (preprocessed.phraseRegex.test(q.text)) {
      score += 150;
    } else if (preprocessed.phraseRegex.test(fullBlob)) {
      score += 90;
    }

    // 2. Token match checks
    let tokensMatched = 0;
    for (const matcher of preprocessed.matchers) {
      let matchedTokenOnAnyField = false;
      for (const field of textFields) {
        if (!field.text) continue;
        if (matcher.regexes.some((r) => r.test(field.text))) {
          score += field.weight;
          matchedTokenOnAnyField = true;
        }
      }
      if (matchedTokenOnAnyField) {
        tokensMatched++;
      }
    }

    // 3. Match criteria
    const totalTokens = preprocessed.tokensToUse.length;
    let isMatch = false;

    if (totalTokens === 1) {
      isMatch = tokensMatched >= 1;
    } else if (totalTokens === 2) {
      isMatch = tokensMatched === 2;
    } else {
      isMatch = tokensMatched >= Math.ceil(totalTokens * 0.7);
    }

    if (isMatch) {
      if (tokensMatched === totalTokens) {
        score += 60;
      }
      rawMatches.push({ question: q, rawScore: score });
    }
  }

  // Stage 3: Guardrailed typo fallback if 0 matches from Stage 2
  if (rawMatches.length === 0) {
    const validTokens = preprocessed.substantiveTokens.filter((t) => t.length >= 4);
    if (validTokens.length > 0) {
      const fuse = getSearchEngine();
      const fuseResults = fuse.search(validTokens.join(' '));
      fuseResults.forEach((fr) => {
        rawMatches.push({
          question: fr.item,
          rawScore: (1 - (fr.score || 0)) * 100,
        });
      });
    }
  }

  const maxScore = rawMatches.length > 0 ? Math.max(...rawMatches.map((m) => m.rawScore)) : 1;

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
  const tagCounts = new Map<string, number>();

  for (const item of rawMatches) {
    const q = item.question;
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

    // Collect related tags
    for (const tag of q.tags) {
      if (!preprocessed.tokensToUse.some((st) => tag.toLowerCase().includes(st))) {
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

    // Keyword highlighting: highlight both query terms (including acronym expansions) and syllabus concepts
    const highlighted = highlightQuestionKeywords(
      q.text,
      q.tags,
      q.keywords,
      preprocessed.highlightTerms
    );

    const normalizedRelevance = Math.min(1, Math.max(0.15, item.rawScore / maxScore));

    mappedResults.push({
      question: q,
      relevanceScore: normalizedRelevance,
      matchedKeywords: preprocessed.tokensToUse,
      highlightedText: highlighted,
    });
  }

  // Sort
  if (filters?.sortBy === 'year-desc') {
    mappedResults.sort((a, b) => b.question.year - a.question.year || a.question.questionNumber - b.question.questionNumber);
  } else if (filters?.sortBy === 'year-asc') {
    mappedResults.sort((a, b) => a.question.year - b.question.year || a.question.questionNumber - b.question.questionNumber);
  } else if (filters?.sortBy === 'marks-desc') {
    mappedResults.sort((a, b) => b.question.marks - a.question.marks);
  } else {
    // Default relevance
    mappedResults.sort((a, b) => b.relevanceScore - a.relevanceScore || b.question.year - a.question.year);
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

  // Acronym and synonym mappings
  for (const [acronym, expansions] of Object.entries(UPSC_ACRONYM_MAP)) {
    pool.push(acronym.toUpperCase());
    for (const exp of expansions) {
      pool.push(exp);
    }
  }

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
