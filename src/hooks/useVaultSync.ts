'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { syncVault } from '@/lib/firebase/sync';

export function useVaultSync() {
  const user = useAuthStore((state) => state.user);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerSync = useCallback(() => {
    if (!user) return;
    syncVault(user.uid);
  }, [user]);

  const scheduleDebouncedSync = useCallback(() => {
    if (!user) return;
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      syncVault(user.uid);
    }, 2000);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    // Initial sync upon login/hydration
    syncVault(user.uid);

    // Event listeners
    const handleManualTrigger = () => triggerSync();
    const handleDataChange = () => scheduleDebouncedSync();

    window.addEventListener('pyq-vault-sync-trigger', handleManualTrigger);
    window.addEventListener('pyq-bookmarks-updated', handleDataChange);
    window.addEventListener('pyq-notes-updated', handleDataChange);
    window.addEventListener('pyq-meta-notes-updated', handleDataChange);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      window.removeEventListener('pyq-vault-sync-trigger', handleManualTrigger);
      window.removeEventListener('pyq-bookmarks-updated', handleDataChange);
      window.removeEventListener('pyq-notes-updated', handleDataChange);
      window.removeEventListener('pyq-meta-notes-updated', handleDataChange);
    };
  }, [user, triggerSync, scheduleDebouncedSync]);
}
