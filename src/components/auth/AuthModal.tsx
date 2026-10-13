'use client';

import React, { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthTabs from './AuthTabs';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';

export default function AuthModal() {
  const { isModalOpen, activeTab, closeAuthModal, setActiveTab } = useAuth();
  const windowRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeAuthModal]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-[2px] transition-all animate-fadeIn"
      onClick={(e) => {
        if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
          closeAuthModal();
        }
      }}
    >
      <div
        ref={windowRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="w-full max-w-[460px] bg-retro-window border-4 border-retro-border shadow-retro-lg overflow-hidden transform transition-transform"
      >
        {/* Window Title Bar */}
        <div className="bg-retro-border text-white px-3.5 py-2 flex items-center justify-between border-b-3 border-retro-border select-none">
          <div className="flex items-center gap-2">
            <span className="font-vt text-lg tracking-wider" id="auth-modal-title">
              C:\VAULT\AUTH.EXE
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={closeAuthModal}
              className="w-4 h-4 bg-retro-window border-2 border-retro-border hover:bg-white transition-colors"
              title="Minimize"
              aria-label="Minimize"
            />
            <button
              type="button"
              onClick={closeAuthModal}
              className="w-4 h-4 bg-retro-folder border-2 border-retro-border hover:brightness-110 transition-colors"
              title="Maximize"
              aria-label="Maximize"
            />
            <button
              type="button"
              onClick={closeAuthModal}
              className="w-4 h-4 bg-retro-accent border-2 border-retro-border hover:bg-[#d05948] transition-colors relative flex items-center justify-center"
              title="Close"
              aria-label="Close"
            >
              <span className="text-[10px] text-white font-bold leading-none select-none">✕</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher (Visible in Login & Signup modes) */}
        {activeTab !== 'forgot' && (
          <AuthTabs activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />
        )}

        {/* Form Body with subtle retro scanline texture */}
        <div className="bg-[#F8F5EE] bg-[radial-gradient(#D3D0C5_1px,transparent_1px)] [background-size:16px_16px]">
          {activeTab === 'login' && (
            <LoginForm
              onSwitchToSignup={() => setActiveTab('signup')}
              onSwitchToForgot={() => setActiveTab('forgot')}
            />
          )}

          {activeTab === 'signup' && (
            <SignupForm onSwitchToLogin={() => setActiveTab('login')} />
          )}

          {activeTab === 'forgot' && (
            <ForgotPasswordForm onBackToLogin={() => setActiveTab('login')} />
          )}
        </div>
      </div>
    </div>
  );
}
