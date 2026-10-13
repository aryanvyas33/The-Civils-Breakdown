'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export default function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const { resetPassword, errorMessage, setErrorMessage } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);
    const result = await resetPassword(email);
    setIsSubmitting(false);

    if (result.success) {
      setLinkSent(true);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={onBackToLogin}
          className="p-1 hover:bg-retro-border hover:text-white border border-retro-border transition-colors cursor-pointer"
          title="Back to login"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
        <h3 className="font-vt text-2xl uppercase text-retro-border">
          Reset Password
        </h3>
      </div>

      <p className="font-space text-xs text-retro-border/80 mb-4 leading-relaxed">
        Enter your registered email address. We will send a secure password recovery link to your inbox.
      </p>

      {/* Success Banner */}
      {linkSent ? (
        <div className="mb-4 bg-[#EDF7F5] border-2 border-[#0D9488] border-l-[5px] p-3 font-space text-xs font-bold text-[#0D9488] flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Recovery link sent to {email}! Please check your email and spam folder.
          </span>
        </div>
      ) : (
        <>
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 bg-[#FFF0EE] border-2 border-retro-accent border-l-[5px] p-2.5 font-space text-xs font-bold text-retro-accent flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block font-space text-[11px] font-bold uppercase tracking-wider text-retro-border mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aspirant@upsc.gov.in"
                required
                className="w-full bg-white border-2 border-retro-border py-2 px-3 font-space text-xs text-retro-border shadow-retro-sm outline-none focus:border-retro-accent focus:shadow-[4px_4px_0px_#E26A59] transition-all placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-retro-accent text-white border-2 border-retro-accent py-2.5 px-4 font-vt text-xl tracking-wider cursor-pointer shadow-retro hover:bg-[#d05948] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>SENDING LINK...</span>
                </>
              ) : (
                <span>▶ SEND RECOVERY LINK</span>
              )}
            </button>
          </form>
        </>
      )}

      <button
        type="button"
        onClick={onBackToLogin}
        className="w-full mt-4 bg-white text-retro-border border-2 border-retro-border py-2 px-3 font-vt text-lg tracking-wider hover:bg-retro-window transition-all cursor-pointer shadow-retro-sm text-center"
      >
        ← BACK TO LOGIN
      </button>
    </div>
  );
}
