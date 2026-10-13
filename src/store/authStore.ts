import { create } from 'zustand';
import type { User, AuthModalTab, UserProfile, VaultSyncStatus } from '@/types/auth';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isModalOpen: boolean;
  activeTab: AuthModalTab;
  lastSyncedAt: Date | null;
  isSyncing: boolean;
  syncStatus: VaultSyncStatus;
  errorMessage: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (isLoading: boolean) => void;
  setModalOpen: (open: boolean, tab?: AuthModalTab) => void;
  setActiveTab: (tab: AuthModalTab) => void;
  setSyncStatus: (status: VaultSyncStatus, lastSyncedAt?: Date | null) => void;
  setErrorMessage: (msg: string | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isLoading: true,
  isModalOpen: false,
  activeTab: 'login',
  lastSyncedAt: null,
  isSyncing: false,
  syncStatus: 'idle',
  errorMessage: null,

  setUser: (user) =>
    set({
      user,
      isLoading: false,
      profile: user
        ? {
            id: user.uid,
            display_name: user.displayName || user.email?.split('@')[0] || 'Aspirant',
            email: user.email || null,
            avatar_url: user.photoURL || null,
          }
        : null,
    }),

  setProfile: (profile) => set({ profile }),

  setLoading: (isLoading) => set({ isLoading }),

  setModalOpen: (isModalOpen, tab) =>
    set((state) => ({
      isModalOpen,
      activeTab: tab || state.activeTab,
      errorMessage: null,
    })),

  setActiveTab: (activeTab) => set({ activeTab, errorMessage: null }),

  setSyncStatus: (syncStatus, lastSyncedAt) =>
    set((state) => ({
      syncStatus,
      isSyncing: syncStatus === 'syncing',
      lastSyncedAt: lastSyncedAt !== undefined ? lastSyncedAt : state.lastSyncedAt,
    })),

  setErrorMessage: (errorMessage) => set({ errorMessage }),

  reset: () =>
    set({
      user: null,
      profile: null,
      isLoading: false,
      isModalOpen: false,
      activeTab: 'login',
      lastSyncedAt: null,
      isSyncing: false,
      syncStatus: 'idle',
      errorMessage: null,
    }),
}));
