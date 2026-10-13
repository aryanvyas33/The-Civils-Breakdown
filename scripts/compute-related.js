const fs = require('fs');
const path = require('path');
const nlp = require('compromise');
const { PorterStemmer } = require('natural');

// Load base configurations
const papersPath = path.join(__dirname, '../src/data/papers.json');
const subjectsPath = path.join(__dirname, '../src/data/subjects.json');
const pointersPath = path.join(__dirname, '../src/data/syllabus-pointers.json');

const papers = JSON.parse(fs.readFileSync(papersPath, 'utf8'));
const subjects = JSON.parse(fs.readFileSync(subjectsPath, 'utf8'));
const syllabusPointers = JSON.parse(fs.readFileSync(pointersPath, 'utf8'));

// Build lookup maps
const paperMap = new Map();
papers.forEach((p) => {
  paperMap.set(p.id, p);
});

const subjectMap = new Map();
subjects.forEach((s) => {
  subjectMap.set(s.id, s);
});

const pointerMap = new Map();
syllabusPointers.forEach((p) => {
  pointerMap.set(p.id, p);
});

const pointersBySubject = {};
syllabusPointers.forEach((p) => {
  if (!pointersBySubject[p.subjectId]) {
    pointersBySubject[p.subjectId] = [];
  }
  pointersBySubject[p.subjectId].push(p);
});

// Cache existing pointerId mappings from questions.json if present
const questionsExistingPath = path.join(__dirname, '../src/data/questions.json');
const existingPointerMap = new Map();
if (fs.existsSync(questionsExistingPath)) {
  try {
    const existingQs = JSON.parse(fs.readFileSync(questionsExistingPath, 'utf8'));
    existingQs.forEach((q) => {
      if (q.pointerId) existingPointerMap.set(q.id, q.pointerId);
    });
  } catch (err) {}
}

// Load curated current affairs context & static core metadata
const currentAffairsPath = path.join(__dirname, '../src/data/current-affairs.json');
let currentAffairsMap = {};
if (fs.existsSync(currentAffairsPath)) {
  try {
    currentAffairsMap = JSON.parse(fs.readFileSync(currentAffairsPath, 'utf8'));
  } catch (err) {}
}

// Load NLP deconstructions
const deconstructionsPath = path.join(__dirname, '../src/data/deconstructions.json');
let deconstructionsMap = {};
if (fs.existsSync(deconstructionsPath)) {
  try {
    deconstructionsMap = JSON.parse(fs.readFileSync(deconstructionsPath, 'utf8'));
  } catch (err) {}
}

// Import raw datasets
const essayQuestions = require('./data/essay.js');
const gs1Questions = require('./data/gs1.js');
const gs2Questions = require('./data/gs2.js');
const gs3Questions = require('./data/gs3.js');
const gs4Questions = require('./data/gs4.js');

// Import 2025 & 2026 newly ingested datasets
const essayNew = require('./data/essay_new.json');
const gs1New = require('./data/gs1_new.json');
const gs2New = require('./data/gs2_new.json');
const gs3New = require('./data/gs3_new.json');
const gs4New = require('./data/gs4_new.json');

console.log('--- Raw Data Loaded ---');
console.log(`Essay: ${essayQuestions.length + essayNew.length} (${essayNew.length} new)`);
console.log(`GS1:   ${gs1Questions.length + gs1New.length} (${gs1New.length} new)`);
console.log(`GS2:   ${gs2Questions.length + gs2New.length} (${gs2New.length} new)`);
console.log(`GS3:   ${gs3Questions.length + gs3New.length} (${gs3New.length} new)`);
console.log(`GS4:   ${gs4Questions.length + gs4New.length} (${gs4New.length} new)`);

// Common English and UPSC question stop words (for search indexing keywords)
const stopWords = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'also', 'am', 'an', 'and', 'any',
  'are', 'arent', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between',
  'both', 'but', 'by', 'cant', 'cannot', 'could', 'couldnt', 'did', 'didnt', 'do', 'does',
  'doesnt', 'doing', 'dont', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had',
  'hadnt', 'has', 'hasnt', 'have', 'havent', 'having', 'he', 'hed', 'hell', 'hes', 'her',
  'here', 'heres', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'hows', 'i', 'id',
  'ill', 'im', 'ive', 'if', 'in', 'into', 'is', 'isnt', 'it', 'its', 'itself', 'lets', 'me',
  'more', 'most', 'mustnt', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once',
  'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same',
  'shant', 'she', 'shed', 'shell', 'shes', 'should', 'shouldnt', 'so', 'some', 'such', 'than',
  'that', 'thats', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'theres',
  'these', 'they', 'theyd', 'theyll', 'theyre', 'theyve', 'this', 'those', 'through', 'to',
  'too', 'under', 'until', 'up', 'very', 'was', 'wasnt', 'we', 'wed', 'well', 'were', 'werent',
  'weve', 'what', 'whats', 'when', 'whens', 'where', 'wheres', 'which', 'while', 'who', 'whos',
  'whom', 'why', 'whys', 'with', 'wont', 'would', 'wouldnt', 'you', 'youd', 'youll', 'youre',
  'youve', 'your', 'yours', 'yourself', 'yourselves',
  // UPSC directive words and academic prompt filler
  'discuss', 'critically', 'examine', 'evaluate', 'comment', 'elucidate', 'explain', 'analyze',
  'analyse', 'bring', 'out', 'highlight', 'give', 'reasons', 'account', 'view', 'context',
  'light', 'statement', 'suitable', 'examples', 'measures', 'role', 'impact', 'various',
  'recent', 'major', 'extent', 'differentiate', 'distinguish', 'compare', 'contrast',
  'reconstruct', 'reconstructing', 'reconstruction', 'understand', 'understanding',
  'salient', 'features', 'aspects', 'factors', 'exemplifies', 'amalgamation', 'mobilized', 'masses',
  'relating', 'related', 'dear', 'human', 'protected', 'effect', 'effects', 'generates', 'owing',
  'working', 'mean', 'means', 'lay', 'paucity', 'professor', 'modifications'
]);

// Prompt template stems and determiners for keyword sanitization
const STEM_REGEX = /^(?:(?:the\s+)?(?:effect|effects|role|roles|importance|significance|perspective|perspectives|impact|impacts|consequence|consequences|implication|implications|need|needs|relevance|nature|context|challenge|challenges|issue|issues|problem|problems)\s+(?:of|in|facing|with|for)\s+(?:the\s+|a\s+|an\s+)?|(?:well\s+)?protected\s+under\s+(?:the\s+|a\s+|an\s+)?|(?:relating|related)\s+to\s+(?:the\s+|a\s+|an\s+)?|(?:in\s+)?(?:the\s+)?context\s+of\s+(?:the\s+|a\s+|an\s+)?|(?:with\s+)?(?:reference|regard)\s+to\s+(?:the\s+|a\s+|an\s+)?|(?:in\s+)?light\s+of\s+(?:the\s+|a\s+|an\s+)?|(?:in\s+)?terms\s+of\s+(?:the\s+|a\s+|an\s+)?|(?:the\s+)?(?:concept|notion|nature|extent|manner)\s+(?:of|in\s+which)\s+(?:the\s+|a\s+|an\s+)?|(?:reconstructing|analyzing|analysing|evaluating|examining|discussing)\s+(?:the\s+|a\s+|an\s+)?)/i;

const LEADING_DETERMINER_REGEX = /^(?:the|a|an|this|that|these|those)\s+/i;

const KEYWORD_PURGE_PHRASES = new Set([
  'every human', 'the masses', 'paucity of time', 'some modifications',
  'university professor', 'a university professor', 'the constitution',
  'constitution', 'indian constitution', 'the indian constitution',
  'the effect of', 'the role of', 'the importance of', 'protected under',
  'above observation of the', 'above observation of', 'purpose of the',
  'for the purpose of the', 'for the purpose of', 'important contributions of',
  'in the fields of', 'fields of', 'high functionaries', 'citizens alike',
  'its application', 'interwoven', 'deeply', 'our lives', 'fulcrum', 'acts'
]);

function sanitizeKeyTerm(raw) {
  if (!raw || typeof raw !== 'string') return null;
  let term = raw.trim();
  term = term.replace(/^\([a-z0-9]+\)\s*/i, '');
  term = term.replace(/^["'`([{]+|["'`)\]}]+$/g, '').trim();

  let prev = '';
  while (term !== prev && term.length > 0) {
    prev = term;
    term = term.replace(LEADING_DETERMINER_REGEX, '').trim();
    term = term.replace(STEM_REGEX, '').trim();
  }

  term = term.replace(/^["'`([{]+|["'`)\]}.,;:]+$/g, '').trim();
  if (term.length < 2) return null;
  return term;
}

function isJunkKeyTerm(term) {
  if (!term || term.length < 2) return true;
  const lower = term.toLowerCase().trim();
  if (stopWords.has(lower) || KEYWORD_PURGE_PHRASES.has(lower)) return true;
  if (/^\d+$/.test(term)) return true;
  const words = lower.split(/\s+/).filter(Boolean);
  if (words.length > 0 && words.every((w) => stopWords.has(w))) return true;
  return false;
}

// Broad umbrella categories & doctrines that must NEVER trigger directly_related
const broadUmbrellaConcepts = new Set([
  // Broad constitutional articles
  'article 21', 'article 19', 'article 14', 'article 32', 'article 226',
  'fundamental right', 'fundamental rights', 'directive principles', 'dpsp',
  'preamble', 'basic structure', 'basic structure doctrine',

  // Broad constitutional & governance doctrines
  'separation of powers', 'separation power', 'separation powers', 'checks and balances', 'checks balances',
  'rule of law', 'constitutional morality', 'constitutionalism',
  'federalism', 'cooperative federalism', 'fiscal federalism', 'centre-state relations', 'center state relations',
  'good governance', 'governance', 'e-governance', 'public administration',
  'social justice', 'international relations', 'foreign policy', 'indian foreign policy',
  'judiciary', 'parliament', 'executive', 'legislature', 'civil services', 'bureaucracy',

  // Macro judicial doctrines (institutional tools, NOT specific substantive topics)
  'judicial activism', 'judicial overreach', 'judicial legislation', 'judicial review',
  'judicial independence', 'public interest litigation', 'pil', 'judicial pronouncements',
  'judicial doctrine', 'judicial intervention', 'judicial interventions',

  // Broad economic & developmental umbrellas
  'inclusive growth', 'sustainable development', 'economic development', 'economic growth',
  'poverty', 'poverty alleviation', 'unemployment', 'employment', 'human development',
  'demographic dividend', 'infrastructure', 'agriculture', 'indian agriculture',
  'industry', 'industrial growth', 'manufacturing', 'services sector',
  'macroeconomics', 'fiscal policy', 'monetary policy',

  // Broad environmental & science umbrellas
  'climate change', 'global warming', 'environment', 'biodiversity', 'environmental protection',
  'science technology', 'science and technology', 'science tech', 'information technology',
  'internal security', 'security challenges', 'disaster management', 'disaster risk',

  // Broad history & culture umbrellas
  'ancient history', 'ancient indian history', 'ancient india', 'ancient',
  'medieval history', 'medieval indian history', 'medieval india', 'medieval',
  'modern history', 'modern indian history', 'modern india', 'british india',
  'world history', 'post-independence', 'post independence', 'freedom struggle',
  'national movement', 'indian national movement', 'indian culture', 'art and culture',
  'art culture', 'indian heritage', 'indian architecture', 'architecture', 'literature',

  // Broad society umbrellas
  'indian society', 'society', 'social issues', 'social transformation', 'social change',
  'women empowerment', 'gender equality', 'vulnerable sections', 'urbanization',

  // Broad ethics umbrellas
  'ethics', 'integrity', 'aptitude', 'human values', 'foundational values',
  'civil service values', 'probity', 'probity in governance', 'moral philosophy',
  'case study', 'case studies', 'applied ethics', 'general studies', 'upsc mains',

  // Universal Indian Polity generic terms
  'indian constitution', 'constitution of india', 'constitution'
]);

// Grammatical prepositions & functional words that should never appear in a 2-word concept phrase
const functionalWords = new Set([
  'of', 'in', 'for', 'and', 'to', 'by', 'with', 'on', 'at', 'from', 'into', 'through',
  'over', 'under', 'between', 'among', 'against', 'during', 'before', 'after', 'above',
  'below', 'as', 'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'its', 'their', 'this', 'that', 'these',
  'those', 'which', 'what', 'where', 'when', 'who', 'whom', 'how', 'why', 'not', 'no',
  'nor', 'or', 'so', 'such', 'too', 'very', 'can', 'will', 'just', 'should', 'now',
  'india', 'indian' // India is universal in UPSC CSE; 'of india' or 'in india' should not form matches
]);

// Generic single words that are broad or polysemous across subjects (must NOT match alone)
// e.g. "risk" in PPP vs Sendai, "ancient" / "history" in Ashoka vs Vedic
const genericSingleWords = new Set([
  'ancient', 'medieval', 'modern', 'history', 'culture', 'heritage', 'architecture', 'literature',
  'society', 'polity', 'economy', 'article', 'act', 'power', 'powers', 'doctrine',
  'risk', 'infrastructure', 'national', 'international', 'global', 'state', 'public', 'private',
  'management', 'governance', 'policy', 'reform', 'reforms', 'system', 'systems', 'model',
  'models', 'approach', 'framework', 'frameworks', 'challenge', 'challenges', 'measure', 'measures',
  'impact', 'role', 'development', 'growth', 'security', 'structure', 'structures', 'sharing',
  'scheme', 'schemes', 'project', 'projects', 'planning', 'process', 'action', 'right', 'rights',
  'justice', 'trade', 'market', 'markets', 'fund', 'funds', 'resource', 'resources',
  'sector', 'sectors', 'issues', 'issue', 'welfare', 'service', 'services', 'program', 'programmes',
  'programme', 'programs', 'initiative', 'initiatives', 'commission', 'transition', 'transformation',
  'mechanism', 'mechanisms', 'capacity', 'analysis', 'assessment', 'strategy', 'strategies',
  'performance', 'participation', 'community', 'cooperation', 'resolution', 'modernization',
  'provision', 'provisions', 'prospect', 'prospects', 'progress', 'sustainability', 'sustainable',
  'potential', 'implication', 'implications', 'factor', 'factors', 'dynamic', 'institution',
  'institutions', 'agency', 'agencies', 'evolution', 'perspective', 'perspectives', 'required',
  'essential', 'critical', 'effective', 'efficient', 'appropriate', 'adequate', 'relevant',
  'related', 'enhancing', 'ensuring', 'promoting', 'strengthening', 'addressing', 'fostering',
  'mitigating', 'achieving', 'implementing', 'social', 'economic', 'political', 'environmental',
  'administrative', 'constitutional', 'digital', 'technological', 'century', 'future', 'order',
  'level', 'dimension', 'dimensions', 'aspect', 'aspects', 'status', 'nature', 'type', 'types',
  'form', 'forms', 'case', 'cases', 'field', 'area', 'areas', 'way', 'ways', 'need', 'needs',
  'context', 'light', 'statement', 'view', 'views', 'recent', 'major', 'extent', 'give', 'reasons',
  'account', 'discuss', 'critically', 'examine', 'evaluate', 'comment', 'elucidate', 'explain',
  'analyze', 'various', 'different', 'bring', 'suitable', 'examples', 'significance', 'pattern',
  'patterns', 'situation', 'scenarios', 'trends', 'affairs', 'cooperative'
]);

// Domain-specific acronyms, proper entities, treaties, thinkers, acts, and specialized terms
const specificEntities = new Set([
  'sendai', 'sfdrr', 'cdri', 'ndmp', 'ndma', 'hvra', 'drr',
  'ramsar', 'cites', 'unfccc', 'ipcc', 'cop28', 'cop27', 'cop26', 'kyoto', 'paris',
  'gandhi', 'gandhian', 'nehru', 'ambedkar', 'tagore', 'kautilya', 'ashoka', 'ashokan', 'akbar',
  'buddha', 'buddhism', 'jain', 'jainism', 'sufi', 'sufism', 'bhakti', 'sangam',
  'chola', 'pallava', 'vijayanagara', 'mughal', 'gupta', 'maurya', 'mauryan', 'harappan',
  'rigvedic', 'vedic', 'swadeshi', 'satyagraha', 'khilafat', 'el-nino', 'la-nina', 'itcz', 'tsunami',
  'monsoon', 'cyclone', 'mangrove', 'mangroves', 'wetland', 'wetlands', 'peatland',
  'permafrost', 'glacier', 'himalayan', 'brahmaputra', 'ganga', 'groundwater', 'aquifer',
  'crypto', 'fintech', 'blockchain', 'semiconductor', 'nanotechnology', 'crispr', 'mrna',
  'isro', 'drdo', 'pegasus', 'lokpal', 'lokayukta', 'collegium', 'njac', 'sedition',
  'uapa', 'afspa', 'pmla', 'fcra', 'pocso', 'posh', 'apmc', 'msp', 'kisan',
  'aadhaar', 'upi', 'dbt', 'ayushman', 'poshan', 'kudumbashree', 'nabard', 'sidbi',
  'mudra', 'brics', 'quad', 'asean', 'bimstec', 'sco', 'saarc', 'wto', 'imf',
  'ppp', 'ham', 'bot', 'epc', 'reit', 'invit', 'cag', 'cci', 'trai', 'niti', 'aayog',
  'gst', 'npa', 'ibc', 'shg', 'evm', 'vvpat', 'rfctlarr', 'fbr', 'kalpakkam',
  'fujiwhara', 'macaulay', 'epigraphy', 'inscription', 'inscriptions', 'edicts', 'dhamma',
  // Specific doctrines & legal topics
  'euthanasia', 'gian-kaur', 'shanbaug', 'puttaswamy', 'vaccine', 'vaccines', 'anti-defection'
]);

function stem(word) {
  let w = word.toLowerCase().trim();
  if (w === 'ashokan') return 'ashoka';
  if (w === 'mauryan') return 'maurya';
  if (w === 'gandhian') return 'gandhi';
  if (w === 'buddhist' || w === 'buddhism') return 'buddha';
  if (w === 'jainism') return 'jain';
  if (specificEntities.has(w)) return w;
  return PorterStemmer.stem(w);
}

function isUmbrella(phrase) {
  const p = phrase.toLowerCase().trim();
  if (/^(right|article|section)\s+\d+$/.test(p)) return true;
  if (broadUmbrellaConcepts.has(p)) return true;
  for (const u of broadUmbrellaConcepts) {
    if (p === u || p.startsWith(u + ' ') || p.endsWith(' ' + u)) return true;
  }
  return false;
}

function extractKeywords(text, tags, subject) {
  const kwSet = new Set();

  tags.forEach((tag) => {
    const cleanedTag = tag.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ');
    cleanedTag.split(/\s+/).forEach((w) => {
      const cleanW = w.replace(/^-+|-+$/g, '');
      if (cleanW.length > 2 && !stopWords.has(cleanW) && !genericSingleWords.has(cleanW)) {
        kwSet.add(cleanW);
      }
    });
  });

  const cleanText = text.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ');
  cleanText.split(/\s+/).forEach((w) => {
    const cleanW = w.replace(/^-+|-+$/g, '');
    if (cleanW.length > 2 && !stopWords.has(cleanW) && !genericSingleWords.has(cleanW)) {
      kwSet.add(cleanW);
    }
  });

  if (subject && Array.isArray(subject.keywords)) {
    subject.keywords.forEach((skw) => {
      const skwLower = skw.toLowerCase();
      if (text.toLowerCase().includes(skwLower) || tags.some((t) => t.toLowerCase().includes(skwLower))) {
        skwLower.split(/\s+/).forEach((w) => {
          if (w.length > 2 && !stopWords.has(w) && !genericSingleWords.has(w)) {
            kwSet.add(w);
          }
        });
      }
    });
  }

  return Array.from(kwSet).slice(0, 15);
}

// Compile all questions with validation
const allRawData = [
  { list: [...essayNew, ...essayQuestions], paperId: 'essay', paperNumber: 5 },
  { list: [...gs1New, ...gs1Questions], paperId: 'gs1', paperNumber: 1 },
  { list: [...gs2New, ...gs2Questions], paperId: 'gs2', paperNumber: 2 },
  { list: [...gs3New, ...gs3Questions], paperId: 'gs3', paperNumber: 3 },
  { list: [...gs4New, ...gs4Questions], paperId: 'gs4', paperNumber: 4 },
];

const validatedQuestions = [];
const idSet = new Set();

for (const group of allRawData) {
  const { list, paperId, paperNumber } = group;

  for (const q of list) {
    const id = `${paperId}-${q.year}-q${q.questionNumber}`;
    if (idSet.has(id)) {
      throw new Error(`Duplicate question id detected: ${id}`);
    }
    idSet.add(id);

    const subject = subjectMap.get(q.subjectId);
    if (!subject) {
      throw new Error(`Invalid subjectId '${q.subjectId}' in question ${id}`);
    }

    if (subject.paperId !== paperId) {
      throw new Error(`Subject ${q.subjectId} belongs to paper ${subject.paperId}, but question has ${paperId}`);
    }

    if (!q.text || q.text.trim().length === 0) {
      throw new Error(`Question ${id} has empty text!`);
    }

    if (q.text.includes('TODO') || q.text.includes('Placeholder')) {
      throw new Error(`Question ${id} has placeholder text!`);
    }

    if (!Array.isArray(q.tags) || q.tags.length < 3) {
      throw new Error(`Question ${id} must have at least 3 tags! Has: ${JSON.stringify(q.tags)}`);
    }

    const wordCount = q.text.trim().split(/\s+/).filter(Boolean).length;
    const keywords = extractKeywords(q.text, q.tags, subject);

    // Assign or preserve pointerId
    let pointerId = existingPointerMap.get(id) || q.pointerId;
    if (!pointerId) {
      const subjectPointers = pointersBySubject[q.subjectId] || [];
      if (subjectPointers.length === 1) {
        pointerId = subjectPointers[0].id;
      } else if (subjectPointers.length > 1) {
        let bestPointer = null;
        let maxScore = -1;
        const qText = (q.text || '').toLowerCase();
        const qKeywords = keywords.map((k) => k.toLowerCase());
        const qTags = (q.tags || []).map((t) => t.toLowerCase());

        subjectPointers.forEach((p) => {
          let score = 0;
          p.keywords.forEach((pk) => {
            const pkw = pk.toLowerCase();
            if (qKeywords.includes(pkw)) score += 3;
            if (qTags.some((t) => t.includes(pkw) || pkw.includes(t))) score += 4;
            if (qText.includes(pkw)) score += 1;
          });
          if (score > maxScore) {
            maxScore = score;
            bestPointer = p;
          }
        });
        pointerId = bestPointer ? bestPointer.id : subjectPointers[0].id;
      }
    }

    const decomp = deconstructionsMap[id];
    if (decomp && decomp.key_terms) {
      decomp.key_terms.forEach(kt => {
        const sanitized = sanitizeKeyTerm(kt.term);
        if (sanitized && !isJunkKeyTerm(sanitized)) {
          const lowerT = sanitized.toLowerCase();
          if (!keywords.map(k => k.toLowerCase()).includes(lowerT)) {
            keywords.push(sanitized);
          }
        }
      });
    }

    const questionObj = {
      id,
      text: q.text.trim(),
      year: q.year,
      paperId,
      paperNumber,
      subjectId: q.subjectId,
      subjectName: subject.name,
      pointerId,
      marks: q.marks,
      questionNumber: q.questionNumber,
      tags: q.tags,
      keywords,
      wordCount,
    };

    // Attach curated current affairs metadata if present
    const caEntry = currentAffairsMap[id];
    if (caEntry) {
      questionObj.isCurrentAffair = true;
      questionObj.currentAffairsContext = caEntry.currentAffairsContext;
      questionObj.staticCore = caEntry.staticCore;
    }

    if (paperId === 'essay') {
      if (!q.section || !['A', 'B'].includes(q.section)) {
        throw new Error(`Essay question ${id} must have section 'A' or 'B'`);
      }
      questionObj.section = q.section;
    }

    validatedQuestions.push(questionObj);
  }
}

console.log(`\nTotal Validated Questions: ${validatedQuestions.length}`);

// Sort questions consistently: year desc, paperNumber asc, questionNumber asc
validatedQuestions.sort((a, b) => {
  if (b.year !== a.year) return b.year - a.year;
  if (a.paperNumber !== b.paperNumber) return a.paperNumber - b.paperNumber;
  return a.questionNumber - b.questionNumber;
});

// 1. Write src/data/questions.json
const questionsOutPath = path.join(__dirname, '../src/data/questions.json');
fs.writeFileSync(questionsOutPath, JSON.stringify(validatedQuestions, null, 2), 'utf8');
console.log(`Saved questions to ${questionsOutPath}`);

// 2. Build and write src/data/tags.json
const tagFrequency = new Map();
validatedQuestions.forEach((q) => {
  q.tags.forEach((tag) => {
    tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1);
  });
});

const sortedTags = Array.from(tagFrequency.entries())
  .map(([tag, count]) => ({ tag, count }))
  .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));

const tagsOutPath = path.join(__dirname, '../src/data/tags.json');
fs.writeFileSync(tagsOutPath, JSON.stringify(sortedTags, null, 2), 'utf8');
console.log(`Saved ${sortedTags.length} unique tags to ${tagsOutPath}`);

// 3. Advanced Concept & Phrase Extraction for Semantics
function extractConcepts(q) {
  const fullTags = [];
  const phrases = new Set();
  const entities = new Set();

  q.tags.forEach((tag) => {
    const rawLower = tag.toLowerCase();

    // Check specific entities and acronyms in tag
    const rawWords = rawLower.replace(/[^a-z0-9\s-]/g, ' ').split(/[\s-]+/);
    rawWords.forEach((w) => {
      const stemW = stem(w);
      if (specificEntities.has(w) || specificEntities.has(stemW)) {
        entities.add(stemW);
      }
    });

    // Substantive words in tag (no functional words, stemmed)
    const substantive = rawWords
      .map(stem)
      .filter((w) => w.length > 1 && !functionalWords.has(w));

    if (substantive.length >= 2) {
      const fullPhrase = substantive.join(' ');
      const hasNonGeneric = substantive.some((w) => !genericSingleWords.has(w));
      if (hasNonGeneric) {
        if (!isUmbrella(fullPhrase) && !isUmbrella(rawLower)) {
          fullTags.push(fullPhrase);
        }
        phrases.add(fullPhrase);
      }

      // Add substantive word pairs (adjacent or co-occurring in tag)
      for (let i = 0; i < substantive.length; i++) {
        for (let j = i + 1; j < substantive.length; j++) {
          const w1 = substantive[i];
          const w2 = substantive[j];
          if (!genericSingleWords.has(w1) || !genericSingleWords.has(w2)) {
            phrases.add(`${w1} ${w2}`);
            phrases.add(`${w2} ${w1}`);
          }
        }
      }
    } else if (substantive.length === 1) {
      const w = substantive[0];
      if (specificEntities.has(w)) {
        entities.add(w);
      } else if (!genericSingleWords.has(w) && !isUmbrella(w)) {
        phrases.add(w);
      }
    }
  });

  // NLP Named Entities and Syntactic Noun Phrase extraction directly from question text
  const doc = nlp(q.text);

  // 1. Extract proper nouns, organizations, and acronyms
  const properNouns = doc.match('#ProperNoun+').out('array');
  const orgs = doc.organizations().out('array');
  const acronyms = doc.acronyms().out('array');

  const genericEntityExclusions = new Set([
    'usa', 'india', 'indian', 'article', 'articl', 'court', 'apex', 'supreme', 'president',
    'presidential', 'presid', 'prime', 'minister', 'state', 'states', 'union', 'parliament',
    'commission', 'act', 'bill', 'government', 'country', 'nation', 'national', 'world', 'power', 'powers',
    'indian constitution', 'constitution of india', 'constitution', 'supreme court', 'high court'
  ]);

  [...properNouns, ...orgs, ...acronyms].forEach((item) => {
    const cleanItem = item.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim();
    const stemW = stem(cleanItem);

    if (
      cleanItem.length > 2 &&
      !functionalWords.has(cleanItem) &&
      !isUmbrella(cleanItem) &&
      !genericSingleWords.has(cleanItem) &&
      !genericSingleWords.has(stemW) &&
      !genericEntityExclusions.has(cleanItem) &&
      !genericEntityExclusions.has(stemW)
    ) {
      const isAcronym = item === item.toUpperCase() && item.length >= 3;
      const isSpecific = specificEntities.has(cleanItem) || specificEntities.has(stemW);
      const isMultiWord = cleanItem.includes(' ');

      if (isSpecific || isAcronym || isMultiWord) {
        entities.add(stemW);
      } else {
        phrases.add(stemW);
      }
    }
  });

  // 2. Extract syntactic compound noun chunks (e.g. "passive euthanasia", "judicial legislation", "living will")
  const compoundNouns = [
    ...doc.match('#Adjective+ #Noun+').out('array'),
    ...doc.match('#Noun+ #Noun+').out('array'),
  ];

  compoundNouns.forEach((phrase) => {
    const clean = phrase.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').trim();
    const words = clean.split(/\s+/).filter((w) => w.length > 1 && !functionalWords.has(w));
    if (words.length >= 2) {
      const stemmedPhrase = words.map(stem).join(' ');
      if (!isUmbrella(stemmedPhrase) && !isUmbrella(clean)) {
        phrases.add(stemmedPhrase);
      }
    }
  });

  // 3. Question text token scan for specific domain entities & acronyms
  const textWords = q.text.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/[\s-]+/);
  textWords.forEach((w) => {
    const stemW = stem(w);
    if (specificEntities.has(w) || specificEntities.has(stemW)) {
      entities.add(stemW);
    }
  });

  // 4. Substantive bigrams from adjacent text tokens (filtered for stop and functional words)
  const substantiveTextWords = textWords.filter(
    (w) => w.length > 2 && !stopWords.has(w) && !functionalWords.has(w)
  );

  for (let i = 0; i < substantiveTextWords.length - 1; i++) {
    const w1 = substantiveTextWords[i];
    const w2 = substantiveTextWords[i + 1];
    if (!genericSingleWords.has(w1) || !genericSingleWords.has(w2)) {
      const st1 = stem(w1);
      const st2 = stem(w2);
      const pair1 = `${st1} ${st2}`;
      const pair2 = `${st2} ${st1}`;
      if (!isUmbrella(pair1)) {
        phrases.add(pair1);
        phrases.add(pair2);
      }
    }
  }

  // 5. If question has curated staticCore syllabus concepts, add them to phrases
  if (q.staticCore && Array.isArray(q.staticCore)) {
    q.staticCore.forEach((scPhrase) => {
      const clean = scPhrase.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').trim();
      const words = clean.split(/\s+/).filter((w) => w.length > 1 && !functionalWords.has(w));
      if (words.length >= 2) {
        phrases.add(words.map(stem).join(' '));
      } else if (words.length === 1) {
        phrases.add(stem(words[0]));
      }
    });
  }

  // 6. Augment with NLP Extracted key terms (CONCEPT, INSTRUMENT, LEGAL_ANCHOR, ACTOR)
  const decomp = deconstructionsMap[q.id];
  if (decomp && decomp.key_terms) {
    decomp.key_terms.forEach(kt => {
      const clean = kt.term.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').trim();
      if (isUmbrella(clean)) return;

      if (['LEGAL_ANCHOR', 'ACTOR', 'INSTRUMENT'].includes(kt.type)) {
        // Only add if it's not a single generic word
        const words = clean.split(/\s+/).filter(w => !functionalWords.has(w) && !stopWords.has(w) && w.length > 2);
        if (words.length === 1 && (genericSingleWords.has(words[0]) || functionalWords.has(words[0]))) return;
        
        if (words.length > 0) {
          entities.add(words.map(stem).join(' '));
        }
      } else if (kt.type === 'CONCEPT') {
        const words = clean.split(/\s+/).filter(w => !functionalWords.has(w) && !stopWords.has(w) && w.length > 2);
        if (words.length >= 2) {
          const stemmedPhrase = words.map(stem).join(' ');
          if (!isUmbrella(stemmedPhrase)) phrases.add(stemmedPhrase);
        }
        else if (words.length === 1 && !genericSingleWords.has(words[0]) && !functionalWords.has(words[0])) {
          entities.add(stem(words[0]));
        }
      }
    });
  }

  return {
    fullTags,
    phrases: Array.from(phrases),
    entities: Array.from(entities),
  };
}

const qConcepts = validatedQuestions.map((q) => ({
  id: q.id,
  text: q.text,
  subjectId: q.subjectId,
  subjectName: q.subjectName,
  paperId: q.paperId,
  year: q.year,
  marks: q.marks,
  tags: q.tags,
  pointerId: q.pointerId,
  isCurrentAffair: q.isCurrentAffair,
  currentAffairsContext: q.currentAffairsContext,
  staticCore: q.staticCore,
  ...extractConcepts(q),
}));

// Phase 4: Centralised Weighted Score Engine
function computeScore(signals) {
  const {
    samePointer, siblingPointer, pointersInSubject,
    tagMatches, entityMatches, phraseMatches, staticCoreMatches,
    sameSubject, crossPaperBonus, yearProx, marksMatch,
    hasStaticCoreMatch, sameEvent, isDirect, isThematicMatch
  } = signals;

  let score = 0;

  if (isDirect) {
    score = 30 + (samePointer ? 25 : 0) + (hasStaticCoreMatch ? 16 : 0) +
            tagMatches.length * 10 + phraseMatches.length * 4 + entityMatches.length * 8;
    if (sameSubject) score += 3.5;
    score += crossPaperBonus + yearProx * 0.5;
  } else if (samePointer) {
    score = (pointersInSubject > 1 ? 25.0 : 14.0) + phraseMatches.length * 3 +
            (sameSubject ? 3.0 : 0) + crossPaperBonus + yearProx * 0.5;
  } else if (phraseMatches.length > 0) {
    score = 12.0 + phraseMatches.length * 3 + (sameSubject ? 3.0 : 0) + crossPaperBonus + yearProx * 0.5;
  } else if (sameSubject) {
    score = (siblingPointer ? 4.5 : 3.0) + yearProx * 0.5;
  } else if (isThematicMatch) {
    score = 5.0 + yearProx * 0.5;
  }

  if (marksMatch) {
    score += 1.5;
  }

  // Dampen superficial same-event matches if they share NO static core or pointer
  if (sameEvent && !hasStaticCoreMatch && !samePointer && tagMatches.length === 0) {
    score *= 0.75;
  }

  return score;
}

// 4. Compute and write src/data/related-map.json
console.log('\nComputing semantically verified related questions map...');
const relatedMap = {};

for (let i = 0; i < qConcepts.length; i++) {
  const target = qConcepts[i];
  const candidates = [];

  for (let j = 0; j < qConcepts.length; j++) {
    if (i === j) continue;
    const q = qConcepts[j];

    // 1. Tag matches (exact or subset when length >= 2 words)
    const tagMatches = target.fullTags.filter((t) =>
      q.fullTags.some((qt) => qt === t || qt.includes(t) || t.includes(qt))
    );

    // 2. Phrase matches (multi-word concepts, e.g. "public private partnership", "sendai framework", "disaster resilience")
    const phraseMatches = target.phrases.filter((p) => q.phrases.includes(p));

    // 3. Entity matches (specific entities / acronyms, e.g. "ppp", "sendai", "cag", "cci", "ramsar")
    const entityMatches = target.entities.filter((e) => q.entities.includes(e));

    // 4. Pointer signals
    const samePointer = Boolean(target.pointerId && q.pointerId && target.pointerId === q.pointerId);
    const pointersInSubject = (pointersBySubject[target.subjectId] || []).length;
    const sameSubject = target.subjectId === q.subjectId;
    const siblingPointer = Boolean(sameSubject && !samePointer);
    const crossPaperBonus = target.paperId !== q.paperId ? 2.0 : 0.5;
    const yearProx = 1 / (1 + Math.abs(target.year - q.year) * 0.1);
    const marksMatch = target.marks === q.marks;

    // 5. Current affairs context & static core matches
    const staticCoreMatches = (target.staticCore || []).filter((sc) => {
      const scLower = sc.toLowerCase();
      return (
        (q.staticCore || []).some((qsc) => qsc.toLowerCase().includes(scLower) || scLower.includes(qsc.toLowerCase())) ||
        q.tags.some((t) => t.toLowerCase().includes(scLower)) ||
        q.text.toLowerCase().includes(scLower)
      );
    });

    const hasStaticCoreMatch = staticCoreMatches.length > 0;

    const sameEvent = Boolean(
      target.currentAffairsContext &&
      q.currentAffairsContext &&
      (target.currentAffairsContext === q.currentAffairsContext ||
       target.currentAffairsContext.toLowerCase().includes(q.currentAffairsContext.toLowerCase()) ||
       q.currentAffairsContext.toLowerCase().includes(target.currentAffairsContext.toLowerCase()))
    );

    // STRICT MULTI-TIER PRIORITY ORDER
    // Directly Related: specific domain entity OR full substantive specific tag
    // OR static syllabus core match OR same micro-syllabus pointer (when subject has >1 pointer) combined with tag/phrase/entity overlap
    const hasCoreEntityMatch = entityMatches.length > 0;
    const hasSpecificTagMatch = tagMatches.length > 0;
    const isDirect = hasCoreEntityMatch || hasSpecificTagMatch || hasStaticCoreMatch ||
                    (samePointer && pointersInSubject > 1 && (phraseMatches.length > 0 || entityMatches.length > 0));

    let isThematicMatch = false;
    if (target.paperId === 'essay' || q.paperId === 'essay') {
      const s1 = target.subjectId;
      const s2 = q.subjectId;
      isThematicMatch =
        (s1.includes('eco') && s2.includes('eco')) ||
        (s1.includes('eth') && (s2.includes('eth') || s2.includes('phi') || s2.includes('case'))) ||
        (s1.includes('pol') && (s2.includes('con') || s2.includes('gov'))) ||
        (s1.includes('sci') && (s2.includes('sci') || s2.includes('env'))) ||
        (s1.includes('soc') && s2.includes('soc'));
    }

    const score = computeScore({
      samePointer, siblingPointer, pointersInSubject,
      tagMatches, entityMatches, phraseMatches, staticCoreMatches,
      sameSubject, crossPaperBonus, yearProx, marksMatch,
      hasStaticCoreMatch, sameEvent, isDirect, isThematicMatch
    });

    // --- RELEVANCE TIER ASSIGNMENT ---
    //
    // Tier definitions (semantic, not just numeric):
    //
    // directly_related: Strong concept match — entity/tag/staticCore overlap, score >= 38
    //   Examples: same named doctrine (euthanasia), same landmark case, same policy scheme
    //
    // high: Moderate concept overlap WITH syllabus pointer — same pointer + phrase match, score >= 20
    //   BUT samePointer-only (no phrase/entity/tag concept overlap) is NOT high — stays moderate.
    //   Examples: Two federalism questions that share a doctrine phrase AND same pointer
    //
    // moderate: Structural/positional connection — same syllabus pointer (no concept overlap),
    //   or phrase-only match (no pointer), score >= 8
    //   Examples: Two questions under "Separation of Powers" pointer but about different aspects
    //
    // low: Broad thematic — same subject bucket or cross-paper essay resonance
    //
    const hasConceptOverlap = hasCoreEntityMatch || hasSpecificTagMatch || hasStaticCoreMatch || phraseMatches.length > 0;

    let relevanceLevel = 'none';
    if (score >= 38 && isDirect) {
      relevanceLevel = 'directly_related';
    } else if (score >= 20 && hasConceptOverlap) {
      // 'high' only when there is genuine concept overlap (entity, tag, static core, or phrases)
      // NOT just same-pointer-only — that would be moderate
      relevanceLevel = 'high';
    } else if (score >= 8) {
      relevanceLevel = 'moderate';
    } else if (score >= 4) {
      relevanceLevel = 'low';
    }

    if (relevanceLevel !== 'none' && score >= 4.0) {
      // Surface clean, human-readable matching tags
      let displayTags = [];
      if (isDirect) {
        // Find candidate tags that match the overlapping concepts
        displayTags = q.tags.filter((t) => {
          const tLower = t.toLowerCase();
          return (
            phraseMatches.some((pm) => tLower.includes(pm)) ||
            entityMatches.some((em) => tLower.includes(em))
          );
        });
      }
      if (displayTags.length === 0) {
        displayTags = q.tags.slice(0, 2);
      }

      // Generate transparent match reason for UI
      let matchReason = '';
      const targetPointer = pointerMap.get(target.pointerId);
      const pointerLabel = targetPointer ? targetPointer.label : '';

      if (hasStaticCoreMatch) {
        matchReason = `Static syllabus core: ${staticCoreMatches[0]}`;
      } else if (samePointer && hasCoreEntityMatch) {
        matchReason = `Syllabus (${pointerLabel}) & Concept: ${entityMatches[0]}`;
      } else if (hasCoreEntityMatch) {
        matchReason = `Core concept: ${entityMatches[0]}`;
      } else if (samePointer && (hasSpecificTagMatch || phraseMatches.length > 0)) {
        matchReason = `Syllabus (${pointerLabel}) & Topic: ${tagMatches[0] || phraseMatches[0]}`;
      } else if (samePointer && pointersInSubject > 1) {
        matchReason = `Syllabus topic: ${pointerLabel}`;
      } else if (hasSpecificTagMatch) {
        matchReason = `Shared theme: ${tagMatches[0]}`;
      } else if (phraseMatches.length > 0) {
        matchReason = `Concept overlap: ${phraseMatches[0]}`;
      } else if (samePointer) {
        matchReason = `Syllabus area: ${pointerLabel}`;
      } else if (siblingPointer) {
        matchReason = `Related ${target.subjectName} topic`;
      } else if (sameSubject) {
        matchReason = `Subject synergy: ${target.subjectName}`;
      } else {
        matchReason = `Thematic resonance`;
      }

      candidates.push({
        questionId: q.id,
        score: Number(score.toFixed(2)),
        relevanceLevel,
        matchingTags: displayTags.slice(0, 3),
        matchingKeywords: Array.from(new Set([...phraseMatches, ...entityMatches])).slice(0, 5),
        matchReason,
      });
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  // Store top 10 most related questions
  relatedMap[target.id] = candidates.slice(0, 10);
}

const relatedOutPath = path.join(__dirname, '../src/data/related-map.json');
fs.writeFileSync(relatedOutPath, JSON.stringify(relatedMap, null, 2), 'utf8');
console.log(`Saved semantically verified related map for ${Object.keys(relatedMap).length} questions to ${relatedOutPath}`);

// Summary statistics
console.log('\n========================================');
console.log('        DATASET GENERATION SUMMARY      ');
console.log('========================================');

const paperCounts = {};
const subjectCounts = {};
const yearCounts = {};

validatedQuestions.forEach((q) => {
  paperCounts[q.paperId] = (paperCounts[q.paperId] || 0) + 1;
  subjectCounts[q.subjectId] = (subjectCounts[q.subjectId] || 0) + 1;
  yearCounts[q.year] = (yearCounts[q.year] || 0) + 1;
});

console.log('\nQuestions per Paper:');
Object.keys(paperCounts).forEach((p) => {
  console.log(`  ${p.toUpperCase().padEnd(8)}: ${paperCounts[p]}`);
});

console.log('\nQuestions per Year:');
Object.keys(yearCounts).sort().forEach((yr) => {
  console.log(`  ${yr}: ${yearCounts[yr]}`);
});

console.log('\nTop 15 Tags:');
sortedTags.slice(0, 15).forEach((t, idx) => {
  console.log(`  ${(idx + 1).toString().padStart(2)}. ${t.tag.padEnd(35)} : ${t.count}`);
});

console.log('\nDone successfully!');
