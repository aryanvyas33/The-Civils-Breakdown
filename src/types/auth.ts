import type { User } from 'firebase/auth';

export type AuthModalTab = 'login' | 'signup' | 'forgot';

export interface UserProfile {
  id: string;
  display_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at?: string;
  updated_at?: string;
}

export type VaultSyncStatus = 'idle' | 'syncing' | 'synced' | 'error' | 'offline';

export interface VaultCloudBookmark {
  questionId: string;
  createdAt: string;
}

export interface VaultCloudNote {
  questionId: string;
  pointerId?: string | null;
  subjectId?: string | null;
  paperId?: string | null;
  content: string;
  tags?: string[];
  updatedAt: string;
  answerType?: 'text' | 'file' | null;
  answerText?: string;
  answerFileName?: string;
}

export interface VaultCloudMetaNote {
  id: string;
  type: 'subject' | 'pointer';
  content: string;
  updatedAt: string;
}

export type { User };
