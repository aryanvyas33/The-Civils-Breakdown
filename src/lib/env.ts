/**
 * Environment Schema & Configuration Validator
 * Provides typed, validated access to client and server environment variables.
 */

export interface ClientEnv {
  firebaseApiKey: string;
  firebaseAuthDomain: string;
  firebaseProjectId: string;
  firebaseStorageBucket: string;
  firebaseMessagingSenderId: string;
  firebaseAppId: string;
}

export interface ServerEnv {
  openaiApiKey?: string;
  geminiModel?: string;
  gcpAccountId?: string;
  gcpProjectId?: string;
  gcpRegion?: string;
}

const isPlaceholder = (val?: string): boolean => {
  if (!val) return true;
  const lower = val.toLowerCase();
  return (
    lower.includes('your_') ||
    lower.includes('dummy') ||
    lower.includes('placeholder') ||
    lower.includes('example') ||
    val.trim() === ''
  );
};

export const clientEnv: ClientEnv = {
  firebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  firebaseAuthDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  firebaseProjectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  firebaseStorageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  firebaseMessagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  firebaseAppId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

export const serverEnv: ServerEnv = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  geminiModel: process.env.GEMINI_MODEL || 'gemini-1.5-pro',
  gcpAccountId: process.env.GCP_ACCOUNT,
  gcpProjectId: process.env.GCP_PROJECT_ID,
  gcpRegion: process.env.GCP_REGION || 'asia-south1',
};

/**
 * Checks whether client Firebase credentials are meaningfully configured.
 */
export function isFirebaseConfigured(): boolean {
  return (
    Boolean(clientEnv.firebaseApiKey) &&
    !isPlaceholder(clientEnv.firebaseApiKey) &&
    clientEnv.firebaseApiKey.length > 10 &&
    Boolean(clientEnv.firebaseProjectId) &&
    !isPlaceholder(clientEnv.firebaseProjectId)
  );
}
