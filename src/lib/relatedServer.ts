import { Question, RelatedQuestion } from '@/types';
import { getAllQuestions } from './data';

let cachedRelatedMap: Record<string, any[]> | null = null;

function loadRelatedMapData(): Record<string, any[]> {
  if (cachedRelatedMap) return cachedRelatedMap;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    cachedRelatedMap = require('@/data/related-map.json');
    return cachedRelatedMap || {};
  } catch (err) {
    console.error('[RelatedServer] Failed to load related-map.json:', err);
    return {};
  }
}

/**
 * Server-only helper to fetch related questions from the 3.99 MB related-map.json
 * without leaking the dataset into browser client bundles.
 */
export function getRelatedQuestionsServer(questionId: string, limit: number = 10): RelatedQuestion[] {
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

  // Fallback similarity calculation if map not precomputed for this ID
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
    const samePaper = target.paperId === q.paperId ? 1 : 0;

    let score =
      tagMatches.length * 15 +
      majorKwMatches.length * 10 +
      sameSub * 12 +
      samePaper * 5;

    if (score > 12) {
      scored.push({
        question: q,
        score,
        relevanceLevel: score > 35 ? 'directly_related' : score > 20 ? 'moderate' : 'low',
        matchingTags: tagMatches,
        matchingKeywords: majorKwMatches,
        matchReason: tagMatches.length > 0 ? `Shared concept: ${tagMatches[0]}` : undefined,
      });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}
