import React from 'react';

interface PasswordStrengthBarProps {
  password: string;
}

export function getPasswordStrength(password: string): {
  score: 0 | 1 | 2 | 3;
  label: string;
  width: string;
  colorClass: string;
} {
  if (!password) {
    return { score: 0, label: 'Enter a password', width: '0%', colorClass: 'bg-transparent' };
  }

  let score: 0 | 1 | 2 | 3 = 1;
  const hasLength = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (hasLength && hasNumber && hasSpecial) {
    score = 3;
  } else if (hasLength && (hasNumber || hasSpecial)) {
    score = 2;
  } else if (password.length >= 6) {
    score = 1;
  }

  switch (score) {
    case 3:
      return { score: 3, label: '✓ Strong password!', width: '100%', colorClass: 'bg-[#0D9488]' };
    case 2:
      return { score: 2, label: '~ Medium — add numbers & symbols', width: '66%', colorClass: 'bg-[#FFD25A]' };
    case 1:
    default:
      return { score: 1, label: '⚠ Weak — too short', width: '33%', colorClass: 'bg-[#E26A59]' };
  }
}

export default function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
  const { label, width, colorClass } = getPasswordStrength(password);

  return (
    <div className="mt-1.5">
      <div className="h-1.5 w-full bg-[#E2E2E2] border-2 border-retro-border overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${colorClass}`}
          style={{ width }}
        />
      </div>
      <div className="mt-1 font-space text-[10px] text-retro-border font-medium">
        {label}
      </div>
    </div>
  );
}
