import { Paper, Subject, Question, RelatedQuestion, FilterOptions } from '@/types';
import papersData from '@/data/papers.json';
import subjectsData from '@/data/subjects.json';

// Dynamic helper to safely require questions and related map if built
let cachedQuestions: Question[] | null = null;
let cachedRelatedMap: Record<string, any[]> | null = null;
let cachedTags: { tag: string; count: number }[] | null = null;

function loadQuestionsData(): Question[] {
  if (cachedQuestions) return cachedQuestions;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    cachedQuestions = require('@/data/questions.json');
    return cachedQuestions || [];
  } catch (err) {
    console.error('[DataService] Failed to load questions.json:', err);
    return [];
  }
}

function loadRelatedMapData(): Record<string, any[]> {
  if (cachedRelatedMap) return cachedRelatedMap;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    cachedRelatedMap = require('@/data/related-map.json');
    return cachedRelatedMap || {};
  } catch (err) {
    console.error('[DataService] Failed to load related-map.json:', err);
    return {};
  }
}

function loadTagsData(): { tag: string; count: number }[] {
  if (cachedTags) return cachedTags;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    cachedTags = require('@/data/tags.json');
    return cachedTags || [];
  } catch (err) {
    console.error('[DataService] Failed to load tags.json:', err);
    return [];
  }
}

export function getAllPapers(): Paper[] {
  return papersData as Paper[];
}

export function getPaperById(paperId: string): Paper | undefined {
  return (papersData as Paper[]).find((p) => p.id.toLowerCase() === paperId.toLowerCase());
}

export function getAllSubjects(): Subject[] {
  return subjectsData as Subject[];
}

export function getSubjectsByPaper(paperId: string): Subject[] {
  return (subjectsData as Subject[]).filter((s) => s.paperId.toLowerCase() === paperId.toLowerCase());
}

export function getSubjectById(subjectId: string): Subject | undefined {
  return (subjectsData as Subject[]).find((s) => s.id.toLowerCase() === subjectId.toLowerCase());
}

export function getAllQuestions(): Question[] {
  return loadQuestionsData();
}

export function getQuestionById(id: string): Question | undefined {
  const questions = getAllQuestions();
  return questions.find((q) => q.id.toLowerCase() === id.toLowerCase());
}

export function getQuestionsByPaper(paperId: string): Question[] {
  const questions = getAllQuestions();
  return questions.filter((q) => q.paperId.toLowerCase() === paperId.toLowerCase());
}

export function getQuestionsBySubject(subjectId: string): Question[] {
  const questions = getAllQuestions();
  return questions.filter((q) => q.subjectId.toLowerCase() === subjectId.toLowerCase());
}

export function getQuestionsByYear(year: number): Question[] {
  const questions = getAllQuestions();
  return questions.filter((q) => q.year === year);
}

export function getFilteredQuestions(options: FilterOptions): Question[] {
  let questions = [...getAllQuestions()];

  if (options.paper && options.paper !== 'all') {
    questions = questions.filter((q) => q.paperId.toLowerCase() === options.paper?.toLowerCase());
  }

  if (options.subject) {
    questions = questions.filter((q) => q.subjectId.toLowerCase() === options.subject?.toLowerCase());
  }

  if (options.year) {
    questions = questions.filter((q) => q.year === options.year);
  }

  if (options.tag) {
    const searchTag = options.tag.toLowerCase();
    questions = questions.filter((q) =>
      q.tags.some((t) => t.toLowerCase() === searchTag)
    );
  }

  if (options.sortBy === 'year-desc') {
    questions.sort((a, b) => b.year - a.year || a.questionNumber - b.questionNumber);
  } else if (options.sortBy === 'year-asc') {
    questions.sort((a, b) => a.year - b.year || a.questionNumber - b.questionNumber);
  } else if (options.sortBy === 'marks-desc') {
    questions.sort((a, b) => b.marks - a.marks);
  }

  return questions;
}

export function getRelatedQuestionsForQuestion(questionId: string, limit: number = 10): RelatedQuestion[] {
  const relatedMap = loadRelatedMapData();
  const rawList = relatedMap[questionId] || [];
  const allQs = getAllQuestions();
  const qMap = new Map<string, Question>();
  allQs.forEach((q) => qMap.set(q.id, q));

  if (rawList.length > 0) {
    const result: RelatedQuestion[] = [];
    for (const item of rawList.slice(0, limit)) {
      const q = qMap.get(item.questionId || item.id);
      if (q) {
        result.push({
          question: q,
          relevanceLevel: (item.relevanceLevel as 'directly_related' | 'moderate' | 'low') || 'moderate',
          matchingTags: item.matchingTags || [],
          matchingKeywords: item.matchingKeywords || [],
          score: item.score || 0,
          matchReason: item.matchReason || undefined,
        });
      }
    }
    return result;
  }

  // Fallback on-the-fly similarity calculation if map not precomputed for this ID
  const target = qMap.get(questionId);
  if (!target) return [];

  const genericWords = new Set([
    'risk', 'infrastructure', 'national', 'international', 'global', 'state', 'public', 'private',
    'management', 'governance', 'policy', 'reform', 'system', 'model', 'approach', 'framework',
    'challenge', 'measure', 'impact', 'role', 'development', 'growth', 'security', 'structure',
    'sharing', 'scheme', 'project', 'planning', 'process', 'action', 'right', 'justice', 'power',
    'trade', 'market', 'fund', 'resource', 'sector', 'issues', 'issue', 'welfare', 'service',
    'program', 'programme', 'initiative', 'commission', 'transition', 'transformation', 'mechanism',
    'capacity', 'analysis', 'assessment', 'strategy', 'performance', 'community', 'cooperation',
    'resolution', 'modernization', 'provision', 'prospect', 'progress', 'sustainability', 'sustainable',
    'india', 'indian', 'country', 'social', 'economic', 'political', 'environmental', 'digital'
  ]);

  const scored: RelatedQuestion[] = [];
  for (const q of allQs) {
    if (q.id === questionId) continue;
    const tagMatches = target.tags.filter((t) => q.tags.includes(t));
    const kwMatches = target.keywords.filter((k) => q.keywords.includes(k));
    const majorKwMatches = kwMatches.filter((kw) => kw.length >= 4 && !genericWords.has(kw.toLowerCase()));
    const sameSub = target.subjectId === q.subjectId ? 1 : 0;
    const crossPaperBonus = target.paperId !== q.paperId ? 2.0 : 0.5;
    const yearProx = 1 / (1 + Math.abs(target.year - q.year) * 0.1);

    const hasDirectMatch = tagMatches.length > 0 || majorKwMatches.length > 0;

    let baseScore = tagMatches.length * 8 + majorKwMatches.length * 5 + sameSub * 3 + crossPaperBonus + yearProx * 0.5;
    let relevanceLevel: 'directly_related' | 'moderate' | 'low' = 'low';

    if (hasDirectMatch) {
      relevanceLevel = 'directly_related';
      baseScore += 20;
    } else if (sameSub === 1) {
      relevanceLevel = 'moderate';
      baseScore += 6;
    } else {
      relevanceLevel = 'low';
    }

    if (hasDirectMatch || sameSub === 1) {
      scored.push({
        question: q,
        relevanceLevel,
        matchingTags: tagMatches.length > 0 ? tagMatches : q.tags.slice(0, 2),
        matchingKeywords: Array.from(new Set([...tagMatches, ...majorKwMatches])).slice(0, 5),
        score: Number(baseScore.toFixed(2)),
      });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

export function getAllTags(): { tag: string; count: number }[] {
  return loadTagsData();
}

export function getStats() {
  const questions = getAllQuestions();
  const papers = getAllPapers();
  const subjects = getAllSubjects();

  const totalQuestions = questions.length;
  const paperCounts: Record<string, number> = {};
  const yearCounts: Record<number, number> = {};

  questions.forEach((q) => {
    paperCounts[q.paperId] = (paperCounts[q.paperId] || 0) + 1;
    yearCounts[q.year] = (yearCounts[q.year] || 0) + 1;
  });

  return {
    totalQuestions: totalQuestions > 0 ? totalQuestions : 1131,
    totalPapers: papers.length,
    totalSubjects: subjects.length,
    yearSpan: '2013–2026',
    paperCounts,
    yearCounts,
  };
}
