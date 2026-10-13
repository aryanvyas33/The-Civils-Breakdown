'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import GoogleAuthButton from './GoogleAuthButton';
import PasswordStrengthBar from './PasswordStrengthBar';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const { signupWithPassword, loginWithGoogle, errorMessage, setErrorMessage } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setErrorMessage('Please accept the Terms of Service and Privacy Policy.');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    setIsSubmitting(true);
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const result = await signupWithPassword(email, password, fullName);
    setIsSubmitting(false);

    if (result.success && result.needsVerification) {
      setVerificationSent(true);
    }
  };

  const handleGoogle = async () => {
    setIsGoogleSubmitting(true);
    await loginWithGoogle();
    setIsGoogleSubmitting(false);
  };

  if (verificationSent) {
    return (
      <div className="p-6 text-center flex flex-col items-center">
        <div className="w-14 h-14 bg-retro-mint text-white border-3 border-retro-border flex items-center justify-center mb-4 shadow-retro">
          <CheckCircle2 className="w-8 h-8 text-[#0D9488]" />
        </div>
        <h3 className="font-vt text-3xl uppercase text-retro-border mb-2">
          Vault Account Created!
        </h3>
        <p className="font-space text-xs text-retro-border/80 max-w-sm mb-6 leading-relaxed">
          We sent a verification link to <strong className="text-retro-border">{email}</strong>.
          Click the link in your email to verify and start syncing your vault.
        </p>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="bg-retro-accent text-white border-2 border-retro-accent py-2 px-6 font-vt text-lg shadow-retro hover:bg-[#d05948] transition-all"
        >
          ▶ PROCEED TO LOGIN
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Google Sign-in */}
      <GoogleAuthButton
        onClick={handleGoogle}
        isLoading={isGoogleSubmitting}
        label="SIGN UP WITH GOOGLE"
      />

      {/* Divider */}
      <div className="flex items-center gap-2.5 my-4">
        <div className="flex-1 h-[2px] bg-retro-border" />
        <span className="font-space text-[11px] font-bold tracking-widest text-retro-border">
          — OR EMAIL —
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-space text-[11px] font-bold uppercase tracking-wider text-retro-border mb-1">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Aryan"
              className="w-full bg-white border-2 border-retro-border py-2 px-3 font-space text-xs text-retro-border shadow-retro-sm outline-none focus:border-retro-accent focus:shadow-[4px_4px_0px_#E26A59] transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block font-space text-[11px] font-bold uppercase tracking-wider text-retro-border mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Singh"
              className="w-full bg-white border-2 border-retro-border py-2 px-3 font-space text-xs text-retro-border shadow-retro-sm outline-none focus:border-retro-accent focus:shadow-[4px_4px_0px_#E26A59] transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block font-space text-[11px] font-bold uppercase tracking-wider text-retro-border mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            className="w-full bg-white border-2 border-retro-border py-2 px-3 font-space text-xs text-retro-border shadow-retro-sm outline-none focus:border-retro-accent focus:shadow-[4px_4px_0px_#E26A59] transition-all placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block font-space text-[11px] font-bold uppercase tracking-wider text-retro-border mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            required
            className="w-full bg-white border-2 border-retro-border py-2 px-3 font-space text-xs text-retro-border shadow-retro-sm outline-none focus:border-retro-accent focus:shadow-[4px_4px_0px_#E26A59] transition-all placeholder:text-gray-400"
          />
          <PasswordStrengthBar password={password} />
        </div>

        {/* Terms checkbox */}
        <div
          onClick={() => setAcceptedTerms(!acceptedTerms)}
          className="flex items-start gap-2 cursor-pointer select-none mt-1"
        >
          <div
            className={`w-4 h-4 border-2 border-retro-border shrink-0 mt-0.5 flex items-center justify-center shadow-retro-sm transition-colors ${
              acceptedTerms ? 'bg-retro-border text-white' : 'bg-white'
            }`}
          >
            {acceptedTerms && <span className="text-xs font-bold leading-none">✓</span>}
          </div>
          <span className="font-space text-[10px] text-retro-border leading-tight">
            I agree to the Terms of Service & Privacy Policy for cloud data storage.
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-retro-accent text-white border-2 border-retro-accent py-2.5 px-4 font-vt text-xl tracking-wider cursor-pointer shadow-retro hover:bg-[#d05948] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 mt-1 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>CREATING ACCOUNT...</span>
            </>
          ) : (
            <span>✚ CREATE VAULT ACCOUNT</span>
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <p className="font-space text-xs text-center text-retro-border/80 mt-4">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-retro-accent font-bold underline hover:opacity-80 cursor-pointer"
        >
          Login →
        </button>
      </p>
    </div>
  );
}
