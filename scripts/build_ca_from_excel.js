const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// ── 1. FILE DISCOVERY & RESOLUTION ──────────────────────────────────────────
function resolveSourceFile() {
  const cliArg = process.argv[2];
  if (cliArg) {
    const customPath = path.resolve(process.cwd(), cliArg);
    if (!fs.existsSync(customPath)) {
      console.error(`❌ Specified file not found: ${customPath}`);
      process.exit(1);
    }
    return customPath;
  }

  // Auto-discovery priority
  const candidates = [
    'scripts/raw_tracker.xlsx',
    'scripts/raw_tracker_76.xlsx',
    'scripts/current_affairs.xlsx',
    'scripts/tracker.xlsx',
    'scripts/raw_tracker_76.csv',
    'scripts/raw_tracker.csv'
  ];

  for (const candidate of candidates) {
    const fullPath = path.resolve(process.cwd(), candidate);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

  // Scan scripts/ directory for any .xlsx matching 'tracker' or 'topics'
  const scriptsDir = path.resolve(process.cwd(), 'scripts');
  if (fs.existsSync(scriptsDir)) {
    const files = fs.readdirSync(scriptsDir);
    const matched = files.find(f => (f.endsWith('.xlsx') || f.endsWith('.xls')) && !f.startsWith('~$'));
    if (matched) {
      return path.join(scriptsDir, matched);
    }
  }

  console.error('❌ Could not locate a tracker spreadsheet.');
  console.error('   Please place an Excel file at "scripts/raw_tracker.xlsx" or pass the file path:');
  console.error('   node scripts/build_ca_from_excel.js <path-to-excel-file.xlsx>');
  process.exit(1);
}

// ── 2. SYLLABUS & CROSS-PAPER ANGLES GENERATION ────────────────────────────
function getConnectedPapers(t) {
  const set = new Set([t.paper]);
  const text = `${t.title || ''} ${t.anchor || ''} ${t.staticCore || ''} ${t.alsoUseful || ''}`.toLowerCase();

  // GS4 / Ethics
  if (
    text.includes('ethics') ||
    text.includes('art 21') ||
    text.includes('fairness') ||
    text.includes('moral') ||
    text.includes('case study') ||
    text.includes('probity') ||
    text.includes('accountability') ||
    text.includes('euthanasia') ||
    text.includes('dignity') ||
    text.includes('impeachment') ||
    text.includes('discrimination')
  ) {
    set.add('GS4');
  }

  // GS1 Connections
  if (t.paper === 'GS2' || t.paper === 'GS3') {
    if (
      text.includes('demograph') ||
      text.includes('census') ||
      text.includes('women') ||
      text.includes('society') ||
      text.includes('poverty') ||
      text.includes('caste') ||
      text.includes('tribal') ||
      text.includes('transgender') ||
      text.includes('urbanisation') ||
      text.includes('urban renewal') ||
      text.includes('gender') ||
      text.includes('shompen') ||
      text.includes('pvtg')
    ) {
      set.add('GS1');
    }
  }

  // GS1 primary connects to GS2
  if (t.paper === 'GS1') {
    set.add('GS2');
  }

  // GS2 connecting to GS3
  if (t.paper === 'GS2') {
    if (
      text.includes('fiscal') ||
      text.includes('budget') ||
      text.includes('economy') ||
      text.includes('trade') ||
      text.includes('fta') ||
      text.includes('mineral') ||
      text.includes('tax') ||
      text.includes('gdp') ||
      text.includes('energy') ||
      text.includes('industry') ||
      text.includes('infrastructure') ||
      text.includes('water supply') ||
      text.includes('jal jeevan') ||
      text.includes('municipal bonds') ||
      text.includes('banking')
    ) {
      set.add('GS3');
    }
  }

  // GS3 connecting to GS2
  if (t.paper === 'GS3') {
    if (
      text.includes('act') ||
      text.includes('ordinance') ||
      text.includes('bill') ||
      text.includes('supreme court') ||
      text.includes('rule of law') ||
      text.includes('treaty') ||
      text.includes('brics') ||
      text.includes('quad') ||
      text.includes('wto') ||
      text.includes('regulation') ||
      text.includes('centre-state') ||
      text.includes('council') ||
      text.includes('governance') ||
      text.includes('deputation') ||
      text.includes('cadre') ||
      text.includes('rules') ||
      text.includes('mospi') ||
      text.includes('national statistics')
    ) {
      set.add('GS2');
    }
    if (
      text.includes('monsoon') ||
      text.includes('climate') ||
      text.includes('landslide') ||
      text.includes('heat') ||
      text.includes('geography') ||
      text.includes('female labour')
    ) {
      set.add('GS1');
    }
  }

  return Array.from(set);
}

function getSyllabusPointers(t, papers) {
  const pointers = {};
  pointers[t.paper] = `${t.paper}: ${t.anchor}`;

  if (papers.includes('GS1') && t.paper !== 'GS1') {
    if (t.title.includes('Census') || t.title.includes('Delimitation') || t.title.includes('Demographic') || t.title.includes('Immigration')) {
      pointers['GS1'] = 'GS1: Population and associated issues; Regionalism, diversity, and demographic transition.';
    } else if (t.title.includes('Women') || t.title.includes('Female')) {
      pointers['GS1'] = "GS1: Role of women and women's organisations; Social empowerment and female workforce participation.";
    } else if (t.title.includes('Monsoon') || t.title.includes('Heat')) {
      pointers['GS1'] = 'GS1: Geophysical phenomena (cyclone, monsoon, ENSO); Critical geographical features.';
    } else if (t.title.includes('Urban Challenge') || t.title.includes('Municipal')) {
      pointers['GS1'] = 'GS1: Urbanisation: problems and remedies, sustainable habitat and municipal infrastructure.';
    } else if (t.title.includes('Transgender') || t.title.includes('Scheduled Caste') || t.title.includes('Equity') || t.title.includes('Jal Jeevan')) {
      pointers['GS1'] = 'GS1: Salient features of Indian society; Social empowerment, communalism, regionalism and secularism.';
    } else {
      pointers['GS1'] = 'GS1: Salient features of Indian society; Social empowerment and developmental issues.';
    }
  }

  if (papers.includes('GS2') && t.paper !== 'GS2') {
    if (t.title.includes('Climate') || t.title.includes('NDC') || t.title.includes('Treaty') || t.title.includes('Trade')) {
      pointers['GS2'] = 'GS2: Bilateral, regional and global groupings and agreements involving or affecting India; International treaties.';
    } else if (t.title.includes('Clearance') || t.title.includes('Environmental') || t.title.includes('Act') || t.title.includes('Code') || t.title.includes('Bill') || t.title.includes('Tribunal') || t.title.includes('CAPF')) {
      pointers['GS2'] = 'GS2: Government policies and interventions; Statutory regulatory framework and dispute redressal.';
    } else if (t.title.includes('Labour') || t.title.includes('Employment') || t.title.includes('Welfare')) {
      pointers['GS2'] = 'GS2: Welfare schemes for vulnerable sections; Mechanisms, laws, institutions for social security.';
    } else if (t.title.includes('AI') || t.title.includes('Budget') || t.title.includes('GDP')) {
      pointers['GS2'] = 'GS2: Government policies and interventions in various sectors; Executive accountability and institutional design.';
    } else {
      pointers['GS2'] = 'GS2: Functions and responsibilities of the Union and the States; Government policies and interventions.';
    }
  }

  if (papers.includes('GS3') && t.paper !== 'GS3') {
    if (t.title.includes('Finance Commission') || t.title.includes('Fiscal') || t.title.includes('MMDR') || t.title.includes('Tax') || t.title.includes('Budget') || t.title.includes('Municipal')) {
      pointers['GS3'] = 'GS3: Government Budgeting; Indian Economy and issues relating to planning, resource mobilisation.';
    } else if (t.title.includes('Trade') || t.title.includes('FTA') || t.title.includes('West Asia')) {
      pointers['GS3'] = 'GS3: Infrastructure: energy, ports; Effects of liberalisation on the economy and trade balance.';
    } else if (t.title.includes('Jan Vishwas') || t.title.includes('Regulation') || t.title.includes('Industry') || t.title.includes('Rajappa')) {
      pointers['GS3'] = 'GS3: Changes in industrial policy and their effects on industrial growth and ease of doing business.';
    } else if (t.title.includes('Jal Jeevan')) {
      pointers['GS3'] = 'GS3: Infrastructure: rural drinking water, public utilities and investment models.';
    } else {
      pointers['GS3'] = 'GS3: Indian economy and issues relating to planning, resource mobilisation, growth and development.';
    }
  }

  if (papers.includes('GS4')) {
    if (t.title.includes('Varma') || t.title.includes('Custodial') || t.title.includes('Examination') || t.title.includes('NEET')) {
      pointers['GS4'] = 'GS4: Probity in governance, public service integrity, anti-corruption, and code of conduct.';
    } else if (t.title.includes('Euthanasia') || t.title.includes('End-of-life')) {
      pointers['GS4'] = 'GS4: Ethics and human interface: essence, determinants, and consequences; Bioethics and moral philosophy.';
    } else if (t.title.includes('Transgender') || t.title.includes('Equity') || t.title.includes('Scheduled Caste') || t.title.includes('Antyodaya')) {
      pointers['GS4'] = 'GS4: Aptitude and foundational values for civil service: empathy, tolerance, compassion towards the weaker sections.';
    } else {
      pointers['GS4'] = 'GS4: Public/civil service values and ethics in public administration; Ethical governance, dilemmas, and accountability.';
    }
  }

  return pointers;
}

function getPaperAngles(t, papers) {
  const angles = {};

  // Primary angle
  angles[t.paper] = `<strong>${t.paper} Core Angle:</strong> Focus on <em>${t.staticCore}</em>. Exam Priority: ${t.prepDepth}.`;

  // Linked angles
  if (papers.includes('GS1') && t.paper !== 'GS1') {
    angles['GS1'] = `<strong>GS1 Societal/Geographical Angle:</strong> Examine demography, societal stratification, regional divergence, and grassroots impacts.`;
  }
  if (papers.includes('GS2') && t.paper !== 'GS2') {
    angles['GS2'] = `<strong>GS2 Polity/Governance Angle:</strong> Examine legislative competence, Centre-State friction, judicial precedents, and institutional design.`;
  }
  if (papers.includes('GS3') && t.paper !== 'GS3') {
    angles['GS3'] = `<strong>GS3 Economic/Tech Angle:</strong> Focus on fiscal sustainability, Capex allocations, supply-chain resilience, and macroeconomic stability.`;
  }
  if (papers.includes('GS4')) {
    angles['GS4'] = `<strong>GS4 Ethics & Values Angle:</strong> Examine administrative integrity, equity in public resource allocation, constitutional morality, and ethical dilemmas.`;
  }

  return angles;
}

// ── 3. MAIN WORKFLOW ────────────────────────────────────────────────────────
function main() {
  const filePath = resolveSourceFile();
  console.log(`\n========================================================`);
  console.log(`📖 Reading Current Affairs Tracker from:`);
  console.log(`   ${filePath}`);
  console.log(`========================================================\n`);

  // Read workbook via SheetJS
  const workbook = xlsx.readFile(filePath, { cellDates: true, raw: false });
  const sheetNames = workbook.SheetNames;
  console.log(`Sheets found in workbook: [${sheetNames.join(', ')}]`);

  // Pick target sheet: prefer 'Tracker', 'Topics', 'Current Affairs', or first sheet
  const targetSheetName =
    sheetNames.find(s => /tracker|current\s*affairs|topics|mains/i.test(s)) || sheetNames[0];
  console.log(`Using sheet: "${targetSheetName}"`);

  const worksheet = workbook.Sheets[targetSheetName];
  const rawRows = xlsx.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

  if (!rawRows || rawRows.length < 2) {
    console.error(`❌ Sheet "${targetSheetName}" is empty or has no data rows.`);
    process.exit(1);
  }

  // Detect header row (first row with '#' or 'topic' or 'paper')
  let headerRowIndex = 0;
  for (let i = 0; i < Math.min(rawRows.length, 10); i++) {
    const rowStr = rawRows[i].map(x => String(x).toLowerCase().trim()).join(' ');
    if (rowStr.includes('topic') && (rowStr.includes('paper') || rowStr.includes('#'))) {
      headerRowIndex = i;
      break;
    }
  }

  const headers = rawRows[headerRowIndex].map(h => String(h || '').trim());
  const dataRows = rawRows.slice(headerRowIndex + 1).filter(r => r && r.some(c => String(c).trim() !== ''));

  console.log(`Detected header at row index ${headerRowIndex + 1} (${headers.length} columns)`);
  console.log(`Data rows count: ${dataRows.length}\n`);

  // Build column index finder helper
  function findColIndex(patterns, fallbackIdx) {
    for (const pattern of patterns) {
      const idx = headers.findIndex(h => pattern.test(h));
      if (idx !== -1) return idx;
    }
    return fallbackIdx;
  }

  const colMap = {
    id: findColIndex([/^#$/i, /^id$/i, /^topic\s*(#|no)/i, /^sl/i], 0),
    month: findColIndex([/^month/i, /^cycle/i], 1),
    title: findColIndex([/topic\s*\(mains-style theme\)/i, /^topic/i, /^theme/i, /^title/i], 2),
    paper: findColIndex([/^paper$/i, /^primary\s*paper/i, /^gs\s*paper/i], 3),
    anchor: findColIndex([/syllabus\s*anchor/i, /^anchor/i], 4),
    staticCore: findColIndex([/static.*core/i, /^conceptual\s*core/i], 5),
    tier: findColIndex([/^tier$/i], 16),
    alsoUseful: findColIndex([/also\s*useful/i, /other\s*papers/i], 17),
    index: findColIndex([/priority\s*index/i, /^index$/i], 22),
    prob: findColIndex([/p\(asked\)/i, /probability/i], 23),
    rank: findColIndex([/rank\s*\(overall\)/i, /^overall\s*rank/i, /^rank$/i], 24),
    paperRank: findColIndex([/rank\s*\(within\s*paper\)/i, /^paper\s*rank/i], 25),
    band: findColIndex([/priority\s*band/i, /^band$/i], 26),
    prepDepth: findColIndex([/suggested\s*prep\s*depth/i, /prep\s*depth/i], 27)
  };

  console.log('Column mapping resolved:');
  Object.entries(colMap).forEach(([key, idx]) => {
    console.log(`  • ${key.padEnd(12)} -> Col ${idx} ("${headers[idx] || 'N/A'}")`);
  });
  console.log('');

  // Load previous ca-topics.json to preserve existing recentUpdates and existing notes
  const existingMap = new Map();
  const caTopicsPath = path.resolve(process.cwd(), 'src/data/ca-topics.json');
  if (fs.existsSync(caTopicsPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(caTopicsPath, 'utf8'));
      existing.forEach(t => existingMap.set(t.id, t));
      console.log(`Loaded ${existing.length} existing topics to preserve manual delta updates.`);
    } catch (e) {
      console.warn('Notice: Could not parse existing ca-topics.json, proceeding fresh.');
    }
  }

  // Parse topics
  const topics = [];
  dataRows.forEach((r, rowIdx) => {
    const rawId = r[colMap.id];
    const num = parseInt(rawId, 10);
    if (isNaN(num)) return; // Skip non-numeric header/filler rows

    const month = String(r[colMap.month] || '').trim();
    const title = String(r[colMap.title] || '').trim();
    let paper = String(r[colMap.paper] || '').trim().toUpperCase();
    if (!['GS1', 'GS2', 'GS3', 'GS4'].includes(paper)) {
      // Clean fallback if e.g. "GS 2"
      paper = paper.replace(/\s+/g, '');
    }

    const anchor = String(r[colMap.anchor] || '').trim();
    const staticCore = String(r[colMap.staticCore] || '').trim();
    const tier = String(r[colMap.tier] || 'Tier 1').trim();
    const alsoUseful = String(r[colMap.alsoUseful] || '').trim();

    // Priority index
    const rawIndex = r[colMap.index];
    const index = parseInt(rawIndex, 10) || 0;

    // Probability formatting
    const rawProb = r[colMap.prob];
    let probStr = '50.0%';
    if (typeof rawProb === 'number') {
      const pct = rawProb <= 1 ? rawProb * 100 : rawProb;
      probStr = pct.toFixed(1) + '%';
    } else if (typeof rawProb === 'string' && rawProb.trim().length > 0) {
      if (rawProb.includes('%')) {
        probStr = rawProb.trim();
      } else {
        const parsed = parseFloat(rawProb);
        if (!isNaN(parsed)) {
          const pct = parsed <= 1 ? parsed * 100 : parsed;
          probStr = pct.toFixed(1) + '%';
        }
      }
    }

    // Rank values
    const rank = parseInt(r[colMap.rank], 10) || (rowIdx + 1);
    const paperRank = parseInt(r[colMap.paperRank], 10) || 1;

    // Band normalization
    let rawBand = String(r[colMap.band] || '').trim().toUpperCase();
    let bandKey = 'bandB';
    if (rawBand.startsWith('A') || rawBand === 'BANDA') {
      bandKey = 'bandA';
    } else if (rawBand.startsWith('C') || rawBand === 'BANDC') {
      bandKey = 'bandC';
    } else {
      bandKey = 'bandB';
    }

    // Suggested prep depth & effort
    const prepDepth = String(r[colMap.prepDepth] || '').trim() ||
      (bandKey === 'bandA' ? 'Full note + 2 practised answers + data/case' : 'Single page framework summary');
    const effortStr = bandKey === 'bandA' ? 'DEEP DIVE' : bandKey === 'bandB' ? 'QUICK READ' : 'SKIM';
    const monthShort = month.split(' ')[0] || month;

    const tObj = {
      num,
      month,
      title,
      paper,
      anchor,
      staticCore,
      alsoUseful,
      prepDepth
    };

    const papers = getConnectedPapers(tObj);

    const isNew = month.toLowerCase().includes('oct') || monthShort.toLowerCase().includes('oct');

    const item = {
      id: num,
      rank,
      paperRank,
      month,
      monthShort,
      isNew,
      title,
      primaryPaper: paper,
      papers,
      selectedPaper: paper,
      band: bandKey,
      effort: effortStr,
      prob: probStr,
      index,
      tier,
      prepDepth,
      staticCore,
      syllabusPointers: getSyllabusPointers(tObj, papers),
      paperAngles: getPaperAngles(tObj, papers)
    };

    // Preserve existing delta update (recentUpdate) if available
    const existing = existingMap.get(num);
    if (existing && existing.recentUpdate) {
      item.recentUpdate = existing.recentUpdate;
    }

    topics.push(item);
  });

  // Sort strictly by overall rank
  topics.sort((a, b) => a.rank - b.rank);

  // ── 4. REPORT & SAVE ──────────────────────────────────────────────────────
  console.log(`\n--------------------------------------------------------`);
  console.log(`📊 Current Affairs Compilation Summary:`);
  console.log(`   Total Themes Processed: ${topics.length}`);
  console.log(`   ★ Band A (Must-Cover):  ${topics.filter(t => t.band === 'bandA').length}`);
  console.log(`   📖 Band B (Quick Read):  ${topics.filter(t => t.band === 'bandB').length}`);
  console.log(`   👁️ Band C (Headline):    ${topics.filter(t => t.band === 'bandC').length}`);
  console.log(`   🏷️ Tier 1 Count:         ${topics.filter(t => t.tier === 'Tier 1').length}`);
  console.log(`   🏷️ Tier 2 Count:         ${topics.filter(t => t.tier === 'Tier 2').length}`);
  console.log(`   🔄 Topics with Updates:  ${topics.filter(t => Boolean(t.recentUpdate)).length}`);
  console.log(`--------------------------------------------------------\n`);

  // Target files
  const targets = [
    'src/data/ca-topics.json',
    'parsed_topics.json',
    'formatted_76_topics.json'
  ];

  targets.forEach(tgt => {
    const fullTgt = path.resolve(process.cwd(), tgt);
    fs.writeFileSync(fullTgt, JSON.stringify(topics, null, 2), 'utf8');
    console.log(`✅ Saved: ${tgt}`);
  });

  console.log(`\n🎉 Current Affairs Framework successfully updated from Excel!`);
}

main();
