const fs = require('fs');

const htmlPath = 'wireframes/12-current-affairs-priority-tracker.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Update hero and metadata
html = html.replace(
  /MODEL UPDATED TILL: <strong>.*?<\/strong> \(LIVE 2027 MAINS COHORT\)/,
  'MODEL UPDATED TILL: <strong>SEPTEMBER 2026</strong> (LIVE 2027 MAINS COHORT)'
);

html = html.replace(
  /THIS (?:MONTH|CYCLE)'S <span class="accent">MUST-COVER<\/span> TOPICS\s*<span class="cycle">\/\/ [^<]+<\/span>/,
  'THIS CYCLE\'S <span class="accent">MUST-COVER</span> TOPICS\n      <span class="cycle">// JAN–SEP 2026</span>'
);

html = html.replace(
  /<p class="hero-sub">[\s\S]*?<\/p>/,
  `<p class="hero-sub">
      Our probability engine has evaluated <strong>76 current affairs themes</strong> across 9 months (January – September 2026) for Mains 2027. We've done the scoring — just master them in order.
    </p>`
);

html = html.replace(
  /<div class="hero-metadata-bar">[\s\S]*?<\/div>/,
  `<div class="hero-metadata-bar">
      <span class="meta-chip highlight">&#9733; 45 Must-Cover Topics (Band A)</span>
      <span class="meta-chip">&#128214; 30 Quick-Read Topics (Band B)</span>
      <span class="meta-chip">&#128065; 1 Headline Awareness (Band C)</span>
      <span class="meta-chip">&#128197; Cycle: January 2026 &ndash; September 2026 (76 Total)</span>
      <span class="meta-chip">&#8635; Next Refresh: October 2026 Digest</span>
    </div>`
);

// 2. Update Progress widget
html = html.replace(
  /<span class="prog-title">.*?<\/span>\s*<span class="prog-count" id="progCount">.*?<\/span>/,
  `<span class="prog-title">YOUR 2027 MAINS MUST-COVER PROGRESS</span>
      <span class="prog-count" id="progCount">0 / 45</span>`
);

// 3. Update Explainer Box 4 formula
html = html.replace(
  /\/\/ ⚖️ WEIGHTED CA PROGRESS FORMULA \([0-9.]+ TOTAL PTS\)/,
  '// ⚖️ WEIGHTED CA PROGRESS FORMULA (60.5 TOTAL PTS)'
);

html = html.replace(
  /<span><strong>★ Band A \(Must-Cover\):<\/strong> \d+ Topics × 1\.0x<\/span>\s*<span class="val-pts green">\d+\.0 PTS MAX<\/span>/,
  '<span><strong>★ Band A (Must-Cover):</strong> 45 Topics × 1.0x</span>\n                <span class="val-pts green">45.0 PTS MAX</span>'
);

html = html.replace(
  /<span><strong>📖 Quick Reads \(Band B\/C\):<\/strong> \d+ Topics × 0\.5x<\/span>\s*<span class="val-pts blue">\d+\.0 PTS MAX<\/span>/,
  '<span><strong>📖 Quick Reads (Band B/C):</strong> 31 Topics × 0.5x</span>\n                <span class="val-pts blue">15.5 PTS MAX</span>'
);

html = html.replace(
  /&Sigma; Total Score = [0-9.]+ Points \(100% Mains Coverage\)[\s\S]*?diluting Band A mastery\./,
  '&Sigma; Total Score = 60.5 Points (100% Mains Coverage). Completing a Quick Read gives +0.5 pts, rewarding reading without diluting Band A mastery.'
);

// 4. Update Filter Panel to include all 9 months
const newFilterPanel = `
  <!-- MULTI-DIMENSIONAL FILTER BAR (MONTH, PAPER, TIER) -->
  <section class="filter-panel">
    
    <!-- Row 1: Month Filter (January to September 2026) -->
    <div class="filter-row">
      <span class="filter-label">&#128197; SELECT MONTH:</span>
      <button class="filter-btn active" id="f-month-all" onclick="setMonthFilter('all')">ALL MONTHS (76)</button>
      <button class="filter-btn" id="f-month-jan" onclick="setMonthFilter('jan')">JAN 2026 (6)</button>
      <button class="filter-btn" id="f-month-feb" onclick="setMonthFilter('feb')">FEB 2026 (5)</button>
      <button class="filter-btn" id="f-month-mar" onclick="setMonthFilter('mar')">MAR 2026 (6)</button>
      <button class="filter-btn" id="f-month-apr" onclick="setMonthFilter('apr')">APR 2026 (23)</button>
      <button class="filter-btn" id="f-month-may" onclick="setMonthFilter('may')">MAY 2026 (15)</button>
      <button class="filter-btn" id="f-month-jun" onclick="setMonthFilter('jun')">JUN 2026 (6)</button>
      <button class="filter-btn" id="f-month-jul" onclick="setMonthFilter('jul')">JUL 2026 (7)</button>
      <button class="filter-btn" id="f-month-aug" onclick="setMonthFilter('aug')">AUG 2026 (4)</button>
      <button class="filter-btn" id="f-month-sep" onclick="setMonthFilter('sep')">SEP 2026 (4)</button>
    </div>

    <!-- Row 2: GS Paper Filter -->
    <div class="filter-row">
      <span class="filter-label">&#128218; SELECT GS PAPER:</span>
      <button class="filter-btn active" id="f-paper-all" onclick="setPaperFilter('all')">ALL PAPERS (76)</button>
      <button class="filter-btn paper-gs1" id="f-paper-gs1" onclick="setPaperFilter('GS1')">GS1 (16 LINKED)</button>
      <button class="filter-btn paper-gs2" id="f-paper-gs2" onclick="setPaperFilter('GS2')">GS2 (42 PRIMARY)</button>
      <button class="filter-btn paper-gs3" id="f-paper-gs3" onclick="setPaperFilter('GS3')">GS3 (32 PRIMARY)</button>
      <button class="filter-btn paper-gs4" id="f-paper-gs4" onclick="setPaperFilter('GS4')">GS4 / ETHICS (38 LINKED)</button>
    </div>

    <!-- Row 3: Priority Band Filter -->
    <div class="filter-row">
      <span class="filter-label">&#9878; PRIORITY TIER:</span>
      <button class="filter-btn active" id="f-tier-all" onclick="setTierFilter('all')">ALL TIERS (76)</button>
      <button class="filter-btn" id="f-tier-banda" onclick="setTierFilter('bandA')">&#9733; MUST-COVER ONLY (45)</button>
      <button class="filter-btn" id="f-tier-bandb" onclick="setTierFilter('bandB')">&#128214; QUICK READS (30)</button>
      <button class="filter-btn" id="f-tier-bandc" onclick="setTierFilter('bandC')">&#128065; HEADLINE ONLY (1)</button>
    </div>

  </section>
`;

html = html.replace(/<!-- MULTI-(?:DIMENSIONAL|PAPER & EFFORT) FILTER BAR[\s\S]*?<\/section>/, newFilterPanel);

// 5. Update section headings
html = html.replace(
  /<span>BAND A: MUST-COVER TOPICS.*?&mdash; BUILD FULL NOTES &amp; PRACTISE ANSWERS<\/span>/,
  '<span>BAND A: MUST-COVER TOPICS (45 TOPICS) &mdash; BUILD FULL NOTES &amp; PRACTISE ANSWERS</span>'
);

html = html.replace(
  /&#128214; QUICK READS \(BAND B &amp; C\) &mdash; \d+ Secondary Topics \(1-Page Note Only\)/,
  '&#128214; QUICK READS (BAND B &amp; C) &mdash; 31 Secondary Topics (1-Page Note Only)'
);

// 6. Update sticky footer
html = html.replace(
  /<span class="sticky-pct" id="stickyPct">.*?<\/span>/,
  '<span class="sticky-pct" id="stickyPct">0 / 45 Must-Cover done</span>'
);

// 7. Replace JavaScript block with generated_script.js
const newScript = fs.readFileSync('scripts/generated_script.js', 'utf8');
const scriptStartIndex = html.indexOf('<script>');
if (scriptStartIndex !== -1) {
  html = html.substring(0, scriptStartIndex) + '<script>\n' + newScript + '\n</script>\n</body>\n</html>';
}

fs.writeFileSync(htmlPath, html);
console.log('Successfully updated wireframes/12-current-affairs-priority-tracker.html with all 76 topics!');
