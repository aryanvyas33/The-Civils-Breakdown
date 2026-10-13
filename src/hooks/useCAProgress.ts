'use client';

import { useMemo, useState, useEffect } from 'react';
import { useCAProgressStore } from '@/store/caProgressStore';
import { CATopic, CAProgressMetrics, CA_WEIGHTS } from '@/types';

export interface UseCAProgressReturn extends CAProgressMetrics {
  isHydrated: boolean;
  toggleDone: (id: number) => boolean;
  toggleQuickDone: (id: number) => boolean;
  toggleUpdateDone: (id: number) => boolean;
  isDone: (id: number) => boolean;
  isQuickDone: (id: number) => boolean;
  isUpdateDone: (id: number) => boolean;
  resetProgress: () => void;
}

/**
 * Reactive hook providing CA progress metrics and store mutators.
 * Safely handles SSR hydration to prevent Next.js client/server markup mismatches.
 */
export function useCAProgress(topics: CATopic[]): UseCAProgressReturn {
  const {
    doneIds,
    quickDoneIds,
    updateDoneIds,
    _hasHydrated,
    toggleDone,
    toggleQuickDone,
    toggleUpdateDone,
    isDone,
    isQuickDone,
    isUpdateDone,
    resetProgress,
  } = useCAProgressStore();

  // Secondary local hydration guard for SSR consistency
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isHydrated = _hasHydrated || mounted;

  const metrics = useMemo<CAProgressMetrics>(() => {
    // If not hydrated yet on the client, render clean empty baseline to match server HTML
    if (!isHydrated) {
      const bandATopics = topics.filter((t) => t.band === 'bandA');
      const quickTopics = topics.filter((t) => t.band !== 'bandA');
      const updateTopics = topics.filter((t) => Boolean(t.recentUpdate));

      return {
        pts: 0,
        maxPts: CA_WEIGHTS.totalPts,
        pct: 0,
        bandADone: 0,
        bandATotal: bandATopics.length,
        quickDone: 0,
        quickTotal: quickTopics.length,
        updatesDone: 0,
        updatesTotal: updateTopics.length,
      };
    }

    const doneSet = new Set(doneIds);
    const quickDoneSet = new Set(quickDoneIds);
    const updateDoneSet = new Set(updateDoneIds);

    const bandATopics = topics.filter((t) => t.band === 'bandA');
    const quickTopics = topics.filter((t) => t.band !== 'bandA');
    const updateTopics = topics.filter((t) => Boolean(t.recentUpdate));

    const bandADone = bandATopics.filter((t) => doneSet.has(t.id)).length;
    const quickDone = quickTopics.filter((t) => quickDoneSet.has(t.id)).length;
    const updatesDone = updateTopics.filter((t) => updateDoneSet.has(t.id)).length;

    const rawPts = bandADone * CA_WEIGHTS.bandA + quickDone * CA_WEIGHTS.bandBandC;
    const pts = Number(rawPts.toFixed(1));
    const maxPts = CA_WEIGHTS.totalPts; // 60.5
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
  }, [topics, doneIds, quickDoneIds, updateDoneIds, isHydrated]);

  return {
    ...metrics,
    isHydrated,
    toggleDone,
    toggleQuickDone,
    toggleUpdateDone,
    isDone,
    isQuickDone,
    isUpdateDone,
    resetProgress,
  };
}
