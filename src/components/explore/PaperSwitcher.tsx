import React from 'react';
import Link from 'next/link';

interface PaperSwitcherProps {
  currentPaperId: string;
}

export default function PaperSwitcher({ currentPaperId }: PaperSwitcherProps) {
  const papers = [
    { id: 'gs1', label: 'GS1', activeBg: 'bg-retro-gs1' },
    { id: 'gs2', label: 'GS2', activeBg: 'bg-retro-gs2' },
    { id: 'gs3', label: 'GS3', activeBg: 'bg-retro-gs3' },
    { id: 'gs4', label: 'GS4', activeBg: 'bg-retro-gs4' },
    { id: 'essay', label: 'Essay', activeBg: 'bg-retro-accent' },
  ];

  return (
    <div className="flex gap-1 font-space font-bold text-sm uppercase -mb-3 z-10 relative items-end">
      {papers.map((paper) => {
        const isActive = currentPaperId === paper.id;
        return (
          <Link
            key={paper.id}
            href={`/explore/${paper.id}`}
            className={`border-4 border-b-0 border-retro-border px-4 transition-all ${
              isActive
                ? `${paper.activeBg} py-3 shadow-[4px_0px_0px_#2A2A2A] z-20`
                : `bg-white py-2 hover:bg-retro-window z-10 hover:z-20`
            }`}
          >
            {paper.label}
          </Link>
        );
      })}
    </div>
  );
}
