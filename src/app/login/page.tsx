'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AuthTabs from '@/components/auth/AuthTabs';
import LoginForm from '@/components/auth/LoginForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'forgot'>('login');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/saved');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      {/* Back button */}
      <div className="w-full max-w-[460px] mb-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-space text-xs font-bold text-retro-border hover:text-retro-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Retro Window */}
      <div className="w-full max-w-[460px] bg-retro-window border-4 border-retro-border shadow-retro-lg overflow-hidden">
        {/* Title Bar */}
        <div className="bg-retro-border text-white px-3.5 py-2 flex items-center justify-between border-b-3 border-retro-border select-none">
          <div className="flex items-center gap-2">
            <span className="font-vt text-lg tracking-wider">C:\VAULT\AUTH.EXE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-retro-window border-2 border-retro-border" />
            <div className="w-4 h-4 bg-retro-folder border-2 border-retro-border" />
            <Link
              href="/"
              className="w-4 h-4 bg-retro-accent border-2 border-retro-border flex items-center justify-center text-[10px] text-white font-bold leading-none"
              title="Close"
            >
              ✕
            </Link>
          </div>
        </div>

        {/* Tab Switcher */}
        {activeTab !== 'forgot' && (
          <AuthTabs
            activeTab="login"
            onTabChange={(tab) => {
              if (tab === 'signup') {
                router.push('/signup');
              }
            }}
          />
        )}

        {/* Form Body */}
        <div className="bg-[#F8F5EE] bg-[radial-gradient(#D3D0C5_1px,transparent_1px)] [background-size:16px_16px]">
          {activeTab === 'login' ? (
            <LoginForm
              onSwitchToSignup={() => router.push('/signup')}
              onSwitchToForgot={() => setActiveTab('forgot')}
            />
          ) : (
            <ForgotPasswordForm onBackToLogin={() => setActiveTab('login')} />
          )}
        </div>
      </div>
    </div>
  );
}
