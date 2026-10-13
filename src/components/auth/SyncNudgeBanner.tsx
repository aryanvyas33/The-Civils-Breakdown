'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Cloud, ArrowRight, X } from 'lucide-react';

interface SyncNudgeBannerProps {
  itemCount: number;
}

export default function SyncNudgeBanner({ itemCount }: SyncNudgeBannerProps) {
  const { openAuthModal } = useAuth();
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('pyq_vault_sync_nudge_dismissed');
    if (!dismissed) {
      setIsDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('pyq_vault_sync_nudge_dismissed', 'true');
  };

  if (isDismissed || itemCount === 0) return null;

  return (
    <div className="mb-6 bg-retro-window border-3 border-retro-folder shadow-[4px_4px_0px_#FFD25A] overflow-hidden animate-fadeIn">
      {/* Banner Header */}
      <div className="bg-retro-folder text-retro-border px-3.5 py-1.5 flex items-center justify-between border-b-2 border-retro-border font-vt text-lg tracking-wider font-bold">
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-retro-border" />
          <span>☁ CLOUD SYNC AVAILABLE</span>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="w-4 h-4 bg-retro-border text-white hover:bg-retro-accent flex items-center justify-center text-[10px] font-bold leading-none cursor-pointer transition-colors"
          title="Dismiss this notice"
          aria-label="Dismiss banner"
        >
          ✕
        </button>
      </div>

      {/* Banner Content */}
      <div className="p-4 sm:p-5 bg-[#FFFBEE] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="font-vt text-2xl uppercase text-retro-border mb-1">
            Your vault currently lives only on this device
          </h4>
          <p className="font-space text-xs text-retro-border/80 leading-relaxed max-w-2xl font-medium">
            Sign in to sync your <strong className="text-retro-border">{itemCount} saved items</strong> across devices, prevent accidental browser cache loss, and unlock cloud backup. Your existing data will be safely migrated.
          </p>
        </div>

        <button
          type="button"
          onClick={() => openAuthModal('login')}
          className="bg-retro-accent text-white border-2 border-retro-accent py-2 px-5 font-vt text-xl tracking-wider shadow-retro hover:bg-[#d05948] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 shrink-0 self-start md:self-auto cursor-pointer"
        >
          <span>SIGN IN TO SYNC</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
