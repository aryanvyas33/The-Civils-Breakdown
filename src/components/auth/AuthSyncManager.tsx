'use client';

import { useVaultSync } from '@/hooks/useVaultSync';

export default function AuthSyncManager() {
  useVaultSync();
  return null;
}
