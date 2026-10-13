'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Filter, Loader2 } from 'lucide-react';

interface EssayToggleProps {
  initialValue: boolean;
}

export default function EssayToggle({ initialValue }: EssayToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [optimisticChecked, setOptimisticChecked] = useState(initialValue);

  // Sync state when server prop changes (e.g. browser back/forward)
  useEffect(() => {
    setOptimisticChecked(initialValue);
  }, [initialValue]);

  const handleToggle = (checked: boolean) => {
    // 1. Instant optimistic visual update
    setOptimisticChecked(checked);

    // 2. Prepare URL query
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set('excludeEssay', 'true');
    } else {
      params.delete('excludeEssay');
    }

    // 3. Transition server navigation in background
    startTransition(() => {
      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    });
  };

  return (
    <div className={`retro-container bg-white flex items-center justify-between gap-4 max-w-md ${isPending ? 'border-dashed' : ''}`}>
      <div className="flex items-start gap-3">
        <div className="p-2 border-2 border-retro-border bg-retro-gs3 text-white shrink-0 shadow-[2px_2px_0px_#2A2A2A]">
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Filter className="w-4 h-4" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2 font-space">
            <span className="font-bold text-retro-border text-sm">Exclude Essay Marks</span>
            {optimisticChecked && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 border-2 border-retro-border bg-retro-gs1 text-retro-border animate-fadeIn uppercase">
                GS Only
              </span>
            )}
            {isPending && (
              <span className="text-[10px] font-medium text-retro-accent animate-pulse uppercase">
                Updating...
              </span>
            )}
          </div>
          <p className="font-space text-xs text-retro-border/80 mt-0.5 leading-relaxed font-bold">
            Excludes high-weightage, creative essay topics from yield scoring to focus purely on GS1-GS4 core questions.
          </p>
        </div>
      </div>

      <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={optimisticChecked}
          onChange={(e) => handleToggle(e.target.checked)}
        />
        <div className="w-12 h-6 bg-white border-2 border-retro-border peer-focus:outline-none shadow-[2px_2px_0px_#2A2A2A] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-retro-border after:h-4 after:w-5 after:transition-all peer-checked:bg-retro-accent peer-checked:after:bg-white"></div>
      </label>
    </div>
  );
}
