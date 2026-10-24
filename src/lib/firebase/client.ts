import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import {
  initializeFirestore,
  getFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from 'firebase/firestore';

import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

import { clientEnv, isFirebaseConfigured } from '@/lib/env';

const firebaseConfig = {
  apiKey: clientEnv.firebaseApiKey,
  authDomain: clientEnv.firebaseAuthDomain,
  projectId: clientEnv.firebaseProjectId,
  storageBucket: clientEnv.firebaseStorageBucket,
  messagingSenderId: clientEnv.firebaseMessagingSenderId,
  appId: clientEnv.firebaseAppId,
};

export { isFirebaseConfigured };

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let appCheckInitialized = false;

function initAppCheckInternal(firebaseApp: FirebaseApp): void {
  if (typeof window === 'undefined' || appCheckInitialized) return;
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  try {
    if (process.env.NODE_ENV !== 'production') {
      const globalAny = window as any;
      if (typeof globalAny.FIREBASE_APPCHECK_DEBUG_TOKEN === 'undefined') {
        globalAny.FIREBASE_APPCHECK_DEBUG_TOKEN =
          process.env.NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN || true;
      }
    }

    if (recaptchaKey) {
      initializeAppCheck(firebaseApp, {
        provider: new ReCaptchaV3Provider(recaptchaKey),
        isTokenAutoRefreshEnabled: true,
      });
      appCheckInitialized = true;
    }
  } catch (err) {
    // Non-fatal fallback for development or re-renders
    console.warn('[AppCheck] Registration skipped or already loaded:', err);
  }
}

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    initAppCheckInternal(app);
  }
  return app;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

export function getFirebaseDb(): Firestore {
  if (!db) {
    const firebaseApp = getFirebaseApp();
    if (typeof window !== 'undefined') {
      try {
        db = initializeFirestore(firebaseApp, {
          localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager(),
          }),
        });
      } catch (e) {
        // Fallback if already initialized
        db = getFirestore(firebaseApp);
      }
    } else {
      db = getFirestore(firebaseApp);
    }
  }
  return db;
}
