const fs = require('fs');

const topics = JSON.parse(fs.readFileSync('parsed_topics.json', 'utf8'));

// Sort topics by overall rank (1 to 59)
topics.sort((a, b) => a.rank - b.rank);

// Function to determine connected papers based on primary paper and text
function getConnectedPapers(t) {
  const set = new Set([t.paper]);
  const text = (t.title + ' ' + t.anchor + ' ' + t.staticCore + ' ' + t.alsoUseful).toLowerCase();
  
  if (text.includes('ethics') || text.includes('art 21') || text.includes('fairness') || text.includes('moral') || text.includes('case study')) {
    set.add('GS4');
  }
  if (t.paper === 'GS2') {
    if (text.includes('demograph') || text.includes('census') || text.includes('women') || text.includes('society') || text.includes('poverty') || text.includes('caste')) {
      set.add('GS1');
    }
    if (text.includes('fiscal') || text.includes('budget') || text.includes('economy') || text.includes('trade') || text.includes('mineral') || text.includes('tax') || text.includes('gdp') || text.includes('energy')) {
      set.add('GS3');
    }
  } else if (t.paper === 'GS3') {
    if (text.includes('act') || text.includes('ordinance') || text.includes('supreme court') || text.includes('rule of law') || text.includes('treaty') || text.includes('brics') || text.includes('quad') || text.includes('wto') || text.includes('regulation') || text.includes('centre-state') || text.includes('council')) {
      set.add('GS2');
    }
    if (text.includes('monsoon') || text.includes('climate') || text.includes('landslide') || text.includes('tribal') || text.includes('geography')) {
      set.add('GS1');
    }
  } else if (t.paper === 'GS1') {
    set.add('GS2'); // Census, Women's reservation both have heavy GS2 angles
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
    } else if (t.title.includes('Women')) {
      pointers['GS1'] = 'GS1: Role of women and women\'s organisations; Social empowerment.';
    } else if (t.title.includes('Monsoon') || t.title.includes('Heat')) {
      pointers['GS1'] = 'GS1: Geophysical phenomena (cyclone, monsoon, ENSO); Critical geographical features.';
    } else {
      pointers['GS1'] = 'GS1: Salient features of Indian society; Social empowerment and developmental issues.';
    }
  }

  if (papers.includes('GS2') && t.paper !== 'GS2') {
    if (t.title.includes('Climate') || t.title.includes('NDC') || t.title.includes('Treaty') || t.title.includes('Trade')) {
      pointers['GS2'] = 'GS2: Bilateral, regional and global groupings and agreements involving or affecting India; International treaties.';
    } else if (t.title.includes('Clearance') || t.title.includes('Environmental') || t.title.includes('Act') || t.title.includes('Code') || t.title.includes('Bill') || t.title.includes('Tribunal')) {
      pointers['GS2'] = 'GS2: Government policies and interventions; Statutory regulatory framework and dispute redressal.';
    } else if (t.title.includes('Labour') || t.title.includes('Employment') || t.title.includes('Welfare')) {
      pointers['GS2'] = 'GS2: Welfare schemes for vulnerable sections; Mechanisms, laws, institutions for social security.';
    } else {
      pointers['GS2'] = 'GS2: Functions and responsibilities of the Union and the States; Government policies and interventions.';
    }
  }

  if (papers.includes('GS3') && t.paper !== 'GS3') {
    if (t.title.includes('Finance Commission') || t.title.includes('Fiscal') || t.title.includes('MMDR') || t.title.includes('Tax')) {
      pointers['GS3'] = 'GS3: Government Budgeting; Indian Economy and issues relating to planning, resource mobilisation.';
    } else if (t.title.includes('Trade') || t.title.includes('FTA') || t.title.includes('West Asia')) {
      pointers['GS3'] = 'GS3: Infrastructure: energy, ports; Effects of liberalisation on the economy and trade balance.';
    } else if (t.title.includes('Jan Vishwas') || t.title.includes('Regulation')) {
      pointers['GS3'] = 'GS3: Changes in industrial policy and their effects on industrial growth and ease of doing business.';
    } else {
      pointers['GS3'] = 'GS3: Indian economy and issues relating to planning, resource mobilisation, growth and development.';
    }
  }

  if (papers.includes('GS4')) {
    pointers['GS4'] = 'GS4: Public/civil service values and ethics in public administration; Ethical governance, dilemmas, and accountability.';
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

const formattedTopics = topics.map(t => {
  const papers = getConnectedPapers(t);
  const bandKey = t.band === 'A' ? 'bandA' : (t.band === 'B' ? 'bandB' : 'bandC');
  const effortStr = t.band === 'A' ? 'DEEP DIVE' : (t.band === 'B' ? 'QUICK READ' : 'SKIM');
  const monthShort = t.month.split(' ')[0]; // 'Apr', 'May', etc.

  return {
    id: t.num,
    rank: t.rank,
    paperRank: t.paperRank,
    month: t.month,
    monthShort: monthShort,
    title: t.title,
    primaryPaper: t.paper,
    papers: papers,
    selectedPaper: t.paper,
    band: bandKey,
    effort: effortStr,
    prob: (t.prob * 100).toFixed(1) + '%',
    index: t.index,
    tier: t.tier,
    prepDepth: t.prepDepth,
    staticCore: t.staticCore,
    syllabusPointers: getSyllabusPointers(t, papers),
    paperAngles: getPaperAngles(t, papers)
  };
});

fs.writeFileSync('formatted_59_topics.json', JSON.stringify(formattedTopics, null, 2));
console.log('Successfully formatted 59 topics!');
console.log('Band A count:', formattedTopics.filter(t => t.band === 'bandA').length);
console.log('Band B count:', formattedTopics.filter(t => t.band === 'bandB').length);
console.log('Band C count:', formattedTopics.filter(t => t.band === 'bandC').length);
