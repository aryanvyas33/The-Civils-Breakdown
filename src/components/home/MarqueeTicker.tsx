import React from 'react';

export default function MarqueeTicker() {
  const tickerItems = [
    '★ 1,100+ VERIFIED QUESTIONS',
    '★ 14 YEARS (2013–2026)',
    '★ GS1 · GS2 · GS3 · GS4 · ESSAY',
    '★ NEW: MAINS 2027 CURRENT AFFAIRS PRIORITY TRACKER',
    '★ 76 CONTEMPORARY THEMES RANKED BY 8-PARAM MODEL',
    '★ BAND A MUST-COVER · MULTI-PAPER SYLLABUS ANGLES',
    '★ REDUCE AI DEPENDENCY: STRUCTURE YOUR INTELLECT',
    '★ NOTE-MAKING TOOL COMING SOON TO YOUR VAULT',
    '★ OFFICIAL CONTACT: thecivilsbreakdown@gmail.com',
  ];

  return (
    <div className="marquee-strip select-none" aria-label="Announcement ticker">
      <div className="marquee-inner">
        {tickerItems.map((item, idx) => (
          <span key={`a-${idx}`} className="px-6 font-space text-xs">
            {item}
          </span>
        ))}
        {tickerItems.map((item, idx) => (
          <span key={`b-${idx}`} className="px-6 font-space text-xs">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
