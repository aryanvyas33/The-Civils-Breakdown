import {
  CATopic,
  CABand,
  GSPaper,
  CAProgressMetrics,
  CA_WEIGHTS,
} from '@/types';
import rawTopicsData from '@/data/ca-topics.json';

// Cast JSON import to strongly-typed array
const topics: CATopic[] = rawTopicsData as CATopic[];

/**
 * Returns all 59 current affairs priority topics.
 */
export function getAllTopics(): CATopic[] {
  return topics;
}

/**
 * Find a specific topic by its persistent integer ID.
 */
export function getTopicById(id: number): CATopic | undefined {
  return topics.find((t) => t.id === id);
}

/**
 * Filter topics by band:
 * - 'bandA': Must-Cover (P >= 50%) — 35 topics
 * - 'bandB': Quick Reads (25% <= P < 50%) — 23 topics
 * - 'bandC': Headline Awareness (P < 25%) — 1 topic
 */
export function getTopicsByBand(band: CABand): CATopic[] {
  return topics.filter((t) => t.band === band);
}

/**
 * Returns all Band A (Must-Cover) topics.
 */
export function getMustCoverTopics(): CATopic[] {
  return topics.filter((t) => t.band === 'bandA');
}

/**
 * Returns all Quick Read topics (Band B and Band C combined).
 */
export function getQuickReadTopics(): CATopic[] {
  return topics.filter((t) => t.band !== 'bandA');
}

/**
 * Returns topics linked to a specific GS paper (primary or secondary angle).
 */
export function getTopicsByPaper(paper: GSPaper): CATopic[] {
  return topics.filter((t) => t.papers.includes(paper));
}

/**
 * Returns topics that have received subsequent monthly delta updates.
 */
export function getTopicsWithUpdates(): CATopic[] {
  return topics.filter((t) => Boolean(t.recentUpdate));
}

/**
 * Computes live weighted progress metrics based on completion sets.
 * Formula: Band A * 1.0x + Quick Reads * 0.5x = 47.0 pts max.
 */
export function calculateCAProgress(
  allTopics: CATopic[],
  doneSetInput: Set<number> | number[],
  quickDoneSetInput: Set<number> | number[],
  updateDoneSetInput: Set<number> | number[]
): CAProgressMetrics {
  const doneSet = doneSetInput instanceof Set ? doneSetInput : new Set(doneSetInput);
  const quickDoneSet = quickDoneSetInput instanceof Set ? quickDoneSetInput : new Set(quickDoneSetInput);
  const updateDoneSet = updateDoneSetInput instanceof Set ? updateDoneSetInput : new Set(updateDoneSetInput);

  const bandATopics = allTopics.filter((t) => t.band === 'bandA');
  const quickTopics = allTopics.filter((t) => t.band !== 'bandA');
  const updateTopics = allTopics.filter((t) => Boolean(t.recentUpdate));

  const bandADone = bandATopics.filter((t) => doneSet.has(t.id)).length;
  const quickDone = quickTopics.filter((t) => quickDoneSet.has(t.id)).length;
  const updatesDone = updateTopics.filter((t) => updateDoneSet.has(t.id)).length;

  const pts = Number((bandADone * CA_WEIGHTS.bandA + quickDone * CA_WEIGHTS.bandBandC).toFixed(1));
  const maxPts = CA_WEIGHTS.totalPts; // 47.0
  const pct = maxPts > 0 ? Math.min(100, Math.round((pts / maxPts) * 100)) : 0;

  return {
    pts,
    maxPts,
    pct,
    bandADone,
    bandATotal: bandATopics.length,
    quickDone,
    quickTotal: quickTopics.length,
    updatesDone,
    updatesTotal: updateTopics.length,
  };
}

/**
 * Summary dataset statistics for headers and metadata badges.
 */
export function getTopicsSummaryStats() {
  const bandA = topics.filter((t) => t.band === 'bandA').length;
  const bandB = topics.filter((t) => t.band === 'bandB').length;
  const bandC = topics.filter((t) => t.band === 'bandC').length;
  const quickReads = bandB + bandC;
  const updates = topics.filter((t) => Boolean(t.recentUpdate)).length;

  return {
    total: topics.length,
    bandA,
    bandB,
    bandC,
    quickReads,
    updates,
    maxPoints: CA_WEIGHTS.totalPts,
    modelCoverage: 'April – September 2026',
  };
}
