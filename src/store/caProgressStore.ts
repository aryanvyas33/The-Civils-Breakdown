'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CAProgressStore {
  // Stored ID arrays for native JSON compatibility
  doneIds: number[];
  quickDoneIds: number[];
  updateDoneIds: number[];
  _hasHydrated: boolean;

  // Hydration tracking
  setHasHydrated: (hydrated: boolean) => void;

  // Toggle actions (return true if now marked, false if unmarked)
  toggleDone: (id: number) => boolean;
  toggleQuickDone: (id: number) => boolean;
  toggleUpdateDone: (id: number) => boolean;

  // Query helpers
  isDone: (id: number) => boolean;
  isQuickDone: (id: number) => boolean;
  isUpdateDone: (id: number) => boolean;

  // Reset
  resetProgress: () => void;
}

export const useCAProgressStore = create<CAProgressStore>()(
  persist(
    (set, get) => ({
      doneIds: [],
      quickDoneIds: [],
      updateDoneIds: [],
      _hasHydrated: false,

      setHasHydrated: (hydrated: boolean) => {
        set({ _hasHydrated: hydrated });
      },

      toggleDone: (id: number) => {
        const current = get().doneIds;
        const exists = current.includes(id);
        const next = exists ? current.filter((item) => item !== id) : [...current, id];
        set({ doneIds: next });
        return !exists;
      },

      toggleQuickDone: (id: number) => {
        const current = get().quickDoneIds;
        const exists = current.includes(id);
        const next = exists ? current.filter((item) => item !== id) : [...current, id];
        set({ quickDoneIds: next });
        return !exists;
      },

      toggleUpdateDone: (id: number) => {
        const current = get().updateDoneIds;
        const exists = current.includes(id);
        const next = exists ? current.filter((item) => item !== id) : [...current, id];
        set({ updateDoneIds: next });
        return !exists;
      },

      isDone: (id: number) => {
        return get().doneIds.includes(id);
      },

      isQuickDone: (id: number) => {
        return get().quickDoneIds.includes(id);
      },

      isUpdateDone: (id: number) => {
        return get().updateDoneIds.includes(id);
      },

      resetProgress: () => {
        set({ doneIds: [], quickDoneIds: [], updateDoneIds: [] });
      },
    }),
    {
      name: 'ca-progress-v1',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        // Fallback dummy storage during SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        doneIds: state.doneIds,
        quickDoneIds: state.quickDoneIds,
        updateDoneIds: state.updateDoneIds,
      }),
    }
  )
);
