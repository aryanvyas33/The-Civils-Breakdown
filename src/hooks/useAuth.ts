'use client';

import { useEffect, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase/client';

export function useAuth() {
  const {
    user,
    profile,
    isLoading,
    isModalOpen,
    activeTab,
    lastSyncedAt,
    isSyncing,
    syncStatus,
    errorMessage,
    setUser,
    setProfile,
    setLoading,
    setModalOpen,
    setActiveTab,
    setSyncStatus,
    setErrorMessage,
    reset,
  } = useAuthStore();

  // Listen to Firebase Auth state
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    try {
      const auth = getFirebaseAuth();
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    } catch (e) {
      setLoading(false);
    }
  }, [setUser, setLoading]);

  const loginWithPassword = useCallback(
    async (
      email: string,
      password: string,
      rememberMe = true
    ): Promise<{ success: boolean; error?: string }> => {
      setErrorMessage(null);
      if (!isFirebaseConfigured()) {
        const error = 'GCP / Firebase credentials are not yet configured in .env';
        setErrorMessage(error);
        return { success: false, error };
      }

      try {
        const auth = getFirebaseAuth();
        try {
          await setPersistence(
            auth,
            rememberMe ? browserLocalPersistence : browserSessionPersistence
          );
        } catch {
          // Persistence setup non-fatal fallback
        }
        const res = await signInWithEmailAndPassword(auth, email, password);
        setUser(res.user);
        setModalOpen(false);
        return { success: true };
      } catch (err: any) {
        let message = 'Login failed. Please check your credentials.';
        if (err?.code === 'auth/invalid-credential' || err?.code === 'auth/wrong-password') {
          message = 'Invalid email or password.';
        } else if (err?.code === 'auth/user-not-found') {
          message = 'No account found with this email.';
        } else if (err?.message) {
          message = err.message;
        }
        setErrorMessage(message);
        return { success: false, error: message };
      }
    },
    [setErrorMessage, setUser, setModalOpen]
  );

  const signupWithPassword = useCallback(
    async (
      email: string,
      password: string,
      name?: string
    ): Promise<{ success: boolean; error?: string; needsVerification?: boolean }> => {
      setErrorMessage(null);
      if (!isFirebaseConfigured()) {
        const error = 'GCP / Firebase credentials are not yet configured in .env';
        setErrorMessage(error);
        return { success: false, error };
      }

      try {
        const auth = getFirebaseAuth();
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (name && res.user) {
          await updateProfile(res.user, { displayName: name });
        }
        try {
          await sendEmailVerification(res.user);
        } catch (vErr) {
          console.warn('[FirebaseAuth] Email verification send warning:', vErr);
        }
        setUser(res.user);
        return { success: true, needsVerification: true };
      } catch (err: any) {
        let message = 'Sign up failed. Please try again.';
        if (err?.code === 'auth/email-already-in-use') {
          message = 'An account already exists with this email address.';
        } else if (err?.code === 'auth/weak-password') {
          message = 'Password is too weak. Please use at least 8 characters.';
        } else if (err?.message) {
          message = err.message;
        }
        setErrorMessage(message);
        return { success: false, error: message };
      }
    },
    [setErrorMessage, setUser, setModalOpen]
  );

  const loginWithGoogle = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    setErrorMessage(null);
    if (!isFirebaseConfigured()) {
      const error = 'GCP / Firebase credentials are not yet configured in .env';
      setErrorMessage(error);
      return { success: false, error };
    }

    try {
      const auth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      setUser(res.user);
      setModalOpen(false);
      return { success: true };
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        return { success: false };
      }
      if (err?.code === 'auth/popup-blocked') {
        const message = 'Google sign-in popup was blocked by your browser. Please allow popups or use email sign-in.';
        setErrorMessage(message);
        return { success: false, error: message };
      }
      const message = err?.message || 'Google sign-in failed.';
      setErrorMessage(message);
      return { success: false, error: message };
    }
  }, [setErrorMessage, setUser, setModalOpen]);

  const resetPassword = useCallback(
    async (email: string): Promise<{ success: boolean; error?: string }> => {
      setErrorMessage(null);
      if (!isFirebaseConfigured()) {
        const error = 'GCP / Firebase credentials are not yet configured in .env';
        setErrorMessage(error);
        return { success: false, error };
      }

      try {
        const auth = getFirebaseAuth();
        await sendPasswordResetEmail(auth, email);
        return { success: true };
      } catch (err: any) {
        const message = err?.message || 'Failed to send recovery email.';
        setErrorMessage(message);
        return { success: false, error: message };
      }
    },
    [setErrorMessage]
  );

  const signOut = useCallback(async (): Promise<void> => {
    if (isFirebaseConfigured()) {
      try {
        const auth = getFirebaseAuth();
        await firebaseSignOut(auth);
      } catch {
        // Fallback
      }
    }
    reset();
  }, [reset]);

  const openAuthModal = useCallback(
    (tab: 'login' | 'signup' | 'forgot' = 'login') => {
      setModalOpen(true, tab);
    },
    [setModalOpen]
  );

  const closeAuthModal = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  return {
    user,
    session: user,
    profile,
    isLoading,
    isAuthenticated: Boolean(user),
    isModalOpen,
    activeTab,
    lastSyncedAt,
    isSyncing,
    syncStatus,
    errorMessage,
    loginWithPassword,
    signupWithPassword,
    loginWithGoogle,
    resetPassword,
    signOut,
    openAuthModal,
    closeAuthModal,
    setActiveTab,
    setSyncStatus,
    setErrorMessage,
  };
}
