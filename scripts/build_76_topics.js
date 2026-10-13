const fs = require('fs');

function parseCsv(text) {
  const lines = text.trim().split('\n');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const parts = [];
    let cur = '';
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      if (c === '"') {
        if (inQuotes && line[j + 1] === '"') {
          cur += '"';
          j++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        parts.push(cur.trim());
        cur = '';
      } else {
        cur += c;
      }
    }
    parts.push(cur.trim());
    rows.push(parts);
  }
  return rows;
}

const content = fs.readFileSync('scripts/raw_tracker_76.csv', 'utf8');
const rows = parseCsv(content);

// Load previous ca-topics.json to preserve existing recentUpdates and existing angles where applicable
let existingMap = new Map();
if (fs.existsSync('src/data/ca-topics.json')) {
  const existing = JSON.parse(fs.readFileSync('src/data/ca-topics.json', 'utf8'));
  existing.forEach(t => existingMap.set(t.id, t));
}

// Function to determine connected papers
function getConnectedPapers(t) {
  const set = new Set([t.paper]);
  const text = (t.title + ' ' + t.anchor + ' ' + t.staticCore + ' ' + t.alsoUseful).toLowerCase();

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

// Generate syllabus pointers map
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

// Generate paper angles map
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

const topics = rows.map(r => {
  const num = parseInt(r[0], 10);
  const month = r[1];
  const title = r[2];
  const paper = r[3];
  const anchor = r[4];
  const staticCore = r[5];
  const tier = r[16];
  const alsoUseful = r[17];
  const cluster = r[18];
  const index = parseInt(r[22], 10);
  const probVal = parseFloat(r[23]);
  const rank = parseInt(r[24], 10);
  const paperRank = parseInt(r[25], 10);
  const band = r[26];
  const prepDepth = r[27];

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
  const bandKey = band === 'A' ? 'bandA' : band === 'B' ? 'bandB' : 'bandC';
  const effortStr = band === 'A' ? 'DEEP DIVE' : band === 'B' ? 'QUICK READ' : 'SKIM';
  const monthShort = month.split(' ')[0];

  const item = {
    id: num,
    rank,
    paperRank,
    month,
    monthShort,
    title,
    primaryPaper: paper,
    papers,
    selectedPaper: paper,
    band: bandKey,
    effort: effortStr,
    prob: (probVal * 100).toFixed(1) + '%',
    index,
    tier,
    prepDepth,
    staticCore,
    syllabusPointers: getSyllabusPointers(tObj, papers),
    paperAngles: getPaperAngles(tObj, papers)
  };

  // Preserve existing recentUpdate if present
  const existing = existingMap.get(num);
  if (existing && existing.recentUpdate) {
    item.recentUpdate = existing.recentUpdate;
  }

  return item;
});

// Sort strictly by overall rank (1 to 76)
topics.sort((a, b) => a.rank - b.rank);

console.log(`Total topics generated: ${topics.length}`);
console.log('Band A count:', topics.filter(t => t.band === 'bandA').length);
console.log('Band B count:', topics.filter(t => t.band === 'bandB').length);
console.log('Band C count:', topics.filter(t => t.band === 'bandC').length);
console.log('Tier 1 count:', topics.filter(t => t.tier === 'Tier 1').length);
console.log('Tier 2 count:', topics.filter(t => t.tier === 'Tier 2').length);

fs.writeFileSync('src/data/ca-topics.json', JSON.stringify(topics, null, 2));
fs.writeFileSync('parsed_topics.json', JSON.stringify(topics, null, 2));
fs.writeFileSync('formatted_76_topics.json', JSON.stringify(topics, null, 2));
console.log('Successfully saved to src/data/ca-topics.json and parsed/formatted json files!');
