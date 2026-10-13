'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import GoogleAuthButton from './GoogleAuthButton';
import { AlertCircle, Loader2 } from 'lucide-react';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSwitchToForgot: () => void;
}

export default function LoginForm({ onSwitchToSignup, onSwitchToForgot }: LoginFormProps) {
  const { loginWithPassword, loginWithGoogle, errorMessage, setErrorMessage } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await loginWithPassword(email, password, rememberMe);
    setIsSubmitting(false);

    if (!result.success && !result.error) {
      setErrorMessage('Invalid credentials. Please verify your details.');
    }
  };

  const handleGoogle = async () => {
    setIsGoogleSubmitting(true);
    await loginWithGoogle();
    setIsGoogleSubmitting(false);
  };

  return (
    <div className="p-6">
      {/* Google Sign-in */}
      <GoogleAuthButton
        onClick={handleGoogle}
        isLoading={isGoogleSubmitting}
        label="CONTINUE WITH GOOGLE"
      />

      {/* Divider */}
      <div className="flex items-center gap-2.5 my-4">
        <div className="flex-1 h-[2px] bg-retro-border" />
        <span className="font-space text-[11px] font-bold tracking-widest text-retro-border">
          — OR —
        </span>
        <div className="flex-1 h-[2px] bg-retro-border" />
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-4 bg-[#FFF0EE] border-2 border-retro-accent border-l-[5px] p-2.5 font-space text-xs font-bold text-retro-accent flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
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

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block font-space text-[11px] font-bold uppercase tracking-wider text-retro-border">
              Password
            </label>
            <button
              type="button"
              onClick={onSwitchToForgot}
              className="font-space text-[11px] font-bold text-retro-accent hover:underline cursor-pointer"
            >
              Forgot?
            </button>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            className="w-full bg-white border-2 border-retro-border py-2 px-3 font-space text-xs text-retro-border shadow-retro-sm outline-none focus:border-retro-accent focus:shadow-[4px_4px_0px_#E26A59] transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Remember me checkbox */}
        <div
          onClick={() => setRememberMe(!rememberMe)}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div
            className={`w-4 h-4 border-2 border-retro-border flex items-center justify-center shadow-retro-sm transition-colors ${
              rememberMe ? 'bg-retro-border text-white' : 'bg-white'
            }`}
          >
            {rememberMe && <span className="text-xs font-bold leading-none">✓</span>}
          </div>
          <span className="font-space text-[11px] text-retro-border">
            Keep me logged in for 30 days
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-retro-accent text-white border-2 border-retro-accent py-2.5 px-4 font-vt text-xl tracking-wider cursor-pointer shadow-retro hover:bg-[#d05948] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>AUTHENTICATING...</span>
            </>
          ) : (
            <span>▶ LOGIN TO MY VAULT</span>
          )}
        </button>
      </form>

      {/* Switch to Signup */}
      <p className="font-space text-xs text-center text-retro-border/80 mt-4">
        No account yet?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-retro-accent font-bold underline hover:opacity-80 cursor-pointer"
        >
          Create one free →
        </button>
      </p>
    </div>
  );
}
