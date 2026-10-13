const fs = require('fs');

const formattedTopics = JSON.parse(fs.readFileSync('formatted_59_topics.json', 'utf8'));

// Read existing HTML template or build it cleanly
const htmlPath = 'wireframes/12-current-affairs-priority-tracker.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Separate Band A topics (Ranks 1 to 35) and Band B/C topics (Ranks 36 to 59)
const bandATopics = formattedTopics.filter(t => t.band === 'bandA');
const bandBTopics = formattedTopics.filter(t => t.band !== 'bandA');

console.log('Band A:', bandATopics.length);
console.log('Band B/C:', bandBTopics.length);

// Let's create an injector script to update the data and UI elements
const newScriptContent = `
  // Authoritative 59-Topic Dataset (Updated up to September 2026)
  const TOPICS_DATA = ${JSON.stringify(formattedTopics, null, 2)};

  // State Management
  const TOTAL_A = 35;
  let doneSet = new Set();
  let currentMonthFilter = 'all';
  let currentPaperFilter = 'all';
  let currentTierFilter = 'all';

  // Toggle Single Topic Done State
  function toggleDone(id) {
    const card = document.querySelector(\`.topic-card[data-id="\${id}"]\`);
    const btn = document.getElementById(\`btn-\${id}\`);
    if (doneSet.has(id)) {
      doneSet.delete(id);
      if (card) card.classList.remove('done');
      if (btn) {
        btn.textContent = '☐';
        btn.classList.remove('checked');
      }
    } else {
      doneSet.add(id);
      if (card) card.classList.add('done');
      if (btn) {
        btn.textContent = '✔';
        btn.classList.add('checked');
      }
    }
    updateProgress();
  }

  // Update Progress Meters
  function updateProgress() {
    const done = doneSet.size;
    const pct = Math.round((done / TOTAL_A) * 100);
    document.getElementById('progCount').textContent = \`\${done} / \${TOTAL_A}\`;
    document.getElementById('progFill').style.width = \`\${pct}%\`;
    document.getElementById('stickyFill').style.width = \`\${pct}%\`;
    document.getElementById('stickyPct').textContent = \`\${done} / \${TOTAL_A} Must-Cover done (\${pct}%)\`;

    const msgs = [
      'Start with Rank #1 below — just 45 mins per topic!',
      'Good start! Building consistent momentum across months.',
      'Nice work! Core themes being locked into your memory vault.',
      'Halfway through Must-Cover themes — solid competitive edge!',
      'Great discipline! Over 70% of high-probability themes covered.',
      'Almost done with Band A topics across all 6 months!',
      '🎉 All 35 Must-Cover themes mastered! Ready for answer writing.'
    ];
    const idx = Math.min(Math.floor((done / TOTAL_A) * (msgs.length - 1)), msgs.length - 1);
    document.getElementById('progMsg').textContent = msgs[idx];
  }

  // Switch Paper for a Specific Topic Card (Interactive Multi-Paper Angle)
  function switchTopicPaper(topicId, selectedPaper) {
    const topic = TOPICS_DATA.find(t => t.id === topicId);
    if (!topic) return;
    topic.selectedPaper = selectedPaper;

    // Update active paper pill buttons on this card
    const card = document.querySelector(\`.topic-card[data-id="\${topicId}"]\`);
    if (!card) return;
    
    card.querySelectorAll('.paper-pill-btn').forEach(btn => {
      if (btn.dataset.paper === selectedPaper) {
        btn.className = \`paper-pill-btn active \${selectedPaper}\`;
      } else {
        btn.className = 'paper-pill-btn';
      }
    });

    // Update the Syllabus Pointer text
    const pointerEl = card.querySelector('.syllabus-pointer-text');
    if (pointerEl) {
      pointerEl.textContent = topic.syllabusPointers[selectedPaper] || topic.syllabusPointers[topic.primaryPaper];
    }

    // Update the Syllabus Pointer label tag
    const headerLabel = card.querySelector('.syllabus-pointer-header span');
    if (headerLabel) {
      headerLabel.textContent = \`OFFICIAL SYLLABUS POINTER // \${selectedPaper}\`;
    }

    // Update the Plain English Exam Angle Hook
    const hookEl = card.querySelector('.card-hook');
    if (hookEl) {
      hookEl.innerHTML = topic.paperAngles[selectedPaper] || topic.paperAngles[topic.primaryPaper];
    }
  }

  // Render Band A Cards
  function renderCards() {
    const container = document.getElementById('topicListA');
    let html = '';

    // Only render Band A topics in the primary card deck
    const bandAList = TOPICS_DATA.filter(t => t.band === 'bandA');

    bandAList.forEach(t => {
      const activePaper = t.selectedPaper;
      const syllabusText = t.syllabusPointers[activePaper] || t.syllabusPointers[t.primaryPaper];
      const angleText = t.paperAngles[activePaper] || t.paperAngles[t.primaryPaper];

      // Build interactive paper pills
      let paperPillsHtml = '';
      t.papers.forEach(p => {
        const isActive = p === activePaper;
        const cls = isActive ? \`paper-pill-btn active \${p}\` : 'paper-pill-btn';
        paperPillsHtml += \`
          <button class="\${cls}" data-paper="\${p}" onclick="switchTopicPaper(\${t.id}, '\${p}')">
            \${p}\${p === t.primaryPaper ? ' (Primary)' : ''}
          </button>
        \`;
      });

      html += \`
        <div class="topic-card" data-id="\${t.id}" data-papers="\${t.papers.join(',')}" data-band="\${t.band}" data-month="\${t.monthShort}">
          <div class="card-rank-col">
            <span class="rank-num \${t.rank <= 3 ? 'top3' : ''}">#\${t.rank}</span>
            <span class="rank-label">RANK</span>
            <span style="font-family:var(--ff-mono); font-size:0.58rem; background:var(--border); color:#FFF; padding:1px 4px; margin-top:6px; border-radius:2px;">\${t.monthShort}</span>
          </div>

          <div class="card-body">
            <div class="card-top-tags">
              <div class="paper-switcher-group">
                <span class="paper-switcher-hint">Select Paper Angle:</span>
                \${paperPillsHtml}
              </div>
              <div style="display:flex; gap:6px; align-items:center;">
                <span style="font-family:var(--ff-mono); font-size:0.65rem; color:#555; font-weight:bold;">Index: \${t.index} | P: \${t.prob}</span>
                <span class="effort-badge deep">★ \${t.effort}</span>
              </div>
            </div>

            <div class="card-title">\${t.title}</div>

            <!-- Prominently displayed official syllabus pointer -->
            <div class="syllabus-pointer-box">
              <div class="syllabus-pointer-header">
                <span>OFFICIAL SYLLABUS POINTER // \${activePaper}</span>
                <span style="font-size: 0.65rem; color: #888;">Matches official UPSC syllabus</span>
              </div>
              <div class="syllabus-pointer-text">\${syllabusText}</div>
            </div>

            <!-- Plain English Exam Angle Hook -->
            <div class="card-hook">
              \${angleText}
            </div>
          </div>

          <div class="card-action-col">
            <button class="done-btn \${doneSet.has(t.id) ? 'checked' : ''}" id="btn-\${t.id}" onclick="toggleDone(\${t.id})" title="Mark this topic as done">
              \${doneSet.has(t.id) ? '✔' : '☐'}
            </button>
            <span class="done-btn-label">\${doneSet.has(t.id) ? 'DONE' : 'Mark Done'}</span>
          </div>
        </div>
      \`;
    });

    container.innerHTML = html;
  }

  // Render Band B & C Quick Reads
  function renderQuickReads() {
    const container = document.getElementById('quickReadsContainer');
    let html = '';
    const quickList = TOPICS_DATA.filter(t => t.band !== 'bandA');

    quickList.forEach(q => {
      const isBandC = q.band === 'bandC';
      const badgeCls = isBandC ? 'effort-badge skim' : 'effort-badge quick';
      const badgeText = isBandC ? 'HEADLINE' : 'QUICK READ';

      html += \`
        <div class="qr-item" data-paper="\${q.primaryPaper}" data-band="\${q.band}" data-month="\${q.monthShort}">
          <div class="qr-item-top">
            <span class="qr-rank">#\${q.rank}</span>
            <span class="paper-pill-btn active \${q.primaryPaper}" style="cursor:default; font-size:0.65rem;">\${q.primaryPaper}</span>
            <span style="font-family:var(--ff-mono); font-size:0.65rem; background:#EEE; border:1px solid #CCC; padding:1px 5px; font-weight:bold;">\${q.month}</span>
            <span class="qr-title">\${q.title}</span>
            <span style="font-family:var(--ff-mono); font-size:0.65rem; color:#666;">P: \${q.prob}</span>
            <span class="\${badgeCls}" style="font-size:0.65rem;">\${badgeText}</span>
          </div>
          <div style="font-size: 0.8rem; color: #555; padding-left: 42px;">
            <strong>Mains Focus / Static Core:</strong> \${q.staticCore} &mdash; <em>\${q.prepDepth}</em>
          </div>
        </div>
      \`;
    });
    container.innerHTML = html;
  }

  // Filter Handlers
  function setMonthFilter(month) {
    currentMonthFilter = month;
    ['all','apr','may','jun','jul','aug','sep'].forEach(m => {
      const btn = document.getElementById(\`f-month-\${m}\`);
      if (btn) btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(\`f-month-\${month.toLowerCase()}\`);
    if (activeBtn) activeBtn.classList.add('active');

    applyFilters();
  }

  function setPaperFilter(paper) {
    currentPaperFilter = paper;
    ['all','gs1','gs2','gs3','gs4'].forEach(p => {
      const btn = document.getElementById(\`f-paper-\${p}\`);
      if (btn) btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(\`f-paper-\${paper.toLowerCase()}\`);
    if (activeBtn) activeBtn.classList.add('active');

    applyFilters();
  }

  function setTierFilter(tier) {
    currentTierFilter = tier;
    ['all','bandA','bandB','bandC'].forEach(t => {
      const btn = document.getElementById(\`f-tier-\${t}\`);
      if (btn) btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(\`f-tier-\${tier}\`);
    if (activeBtn) activeBtn.classList.add('active');

    applyFilters();
  }

  function applyFilters() {
    // Filter Band A Cards
    document.querySelectorAll('.topic-card').forEach(card => {
      const papers = card.dataset.papers.split(',');
      const band = card.dataset.band;
      const month = card.dataset.month;

      let showMonth = (currentMonthFilter === 'all') || (month.toLowerCase() === currentMonthFilter.toLowerCase());
      let showPaper = (currentPaperFilter === 'all') || papers.includes(currentPaperFilter);
      let showTier = (currentTierFilter === 'all') || (currentTierFilter === 'bandA');

      card.style.display = (showMonth && showPaper && showTier) ? 'grid' : 'none';

      // If user selected a specific paper (e.g. GS1), automatically set that card's view to that paper
      if (currentPaperFilter !== 'all' && papers.includes(currentPaperFilter)) {
        const id = parseInt(card.dataset.id, 10);
        switchTopicPaper(id, currentPaperFilter);
      }
    });

    // Filter Quick Read Items
    document.querySelectorAll('.qr-item').forEach(item => {
      const paper = item.dataset.paper;
      const band = item.dataset.band;
      const month = item.dataset.month;

      let showMonth = (currentMonthFilter === 'all') || (month.toLowerCase() === currentMonthFilter.toLowerCase());
      let showPaper = (currentPaperFilter === 'all') || (paper === currentPaperFilter);
      let showTier = (currentTierFilter === 'all') || (currentTierFilter === band);

      item.style.display = (showMonth && showPaper && showTier) ? 'flex' : 'none';
    });

    // Show/Hide Section Headings based on Tier filter
    const sectionA = document.getElementById('sectionHeadingA');
    const sectionB = document.getElementById('sectionB');
    if (currentTierFilter === 'bandB' || currentTierFilter === 'bandC') {
      sectionA.style.display = 'none';
      sectionB.style.display = 'block';
      document.getElementById('qrList').classList.add('open');
      document.getElementById('qrArrowIcon').textContent = '▲ HIDE LIST';
    } else if (currentTierFilter === 'bandA') {
      sectionA.style.display = 'flex';
      sectionB.style.display = 'none';
    } else {
      sectionA.style.display = 'flex';
      sectionB.style.display = 'block';
    }
  }

  // Toggle Dropdown Explainer
  function toggleModelExplainer() {
    const body = document.getElementById('explainerBody');
    const btn = document.getElementById('explainerToggleBtn');
    const arrow = document.getElementById('explainerArrowIcon');
    body.classList.toggle('open');
    btn.classList.toggle('open');
    if (body.classList.contains('open')) {
      arrow.textContent = '▲ CLICK TO COLLAPSE';
    } else {
      arrow.textContent = '▼ CLICK TO EXPAND';
    }
  }

  // Toggle Quick Reads Accordion
  function toggleQuickReads() {
    const list = document.getElementById('qrList');
    const arrow = document.getElementById('qrArrowIcon');
    list.classList.toggle('open');
    arrow.textContent = list.classList.contains('open') ? '▲ HIDE LIST' : '▼ SHOW LIST';
  }

  // Initial Load
  document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    renderQuickReads();
    updateProgress();
  });
`;

fs.writeFileSync('scripts/generated_script.js', newScriptContent);
console.log('Generated script written!');
