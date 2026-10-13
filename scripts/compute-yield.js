const fs = require('fs');
const path = require('path');
const { PorterStemmer } = require('natural');

const questionsPath = path.join(__dirname, '../src/data/questions.json');
const deconstPath = path.join(__dirname, '../src/data/ai-deconstructions.json');
const outPath = path.join(__dirname, '../src/data/high-yield-concepts.json');

const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
let aiDeconstMap = new Map();
if (fs.existsSync(deconstPath)) {
  const deconstructions = JSON.parse(fs.readFileSync(deconstPath, 'utf8'));
  if (Array.isArray(deconstructions)) {
    deconstructions.forEach(d => {
      if (d.question_id) aiDeconstMap.set(d.question_id, d);
    });
  }
}

// Broad stop words (from compute-related.js)
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
  'youve', 'your', 'yours', 'yourself', 'yourselves', 'india', 'indian',
  // UPSC directive words and academic prompt filler
  'discuss', 'critically', 'examine', 'evaluate', 'comment', 'elucidate', 'explain', 'analyze',
  'analyse', 'bring', 'out', 'highlight', 'give', 'reasons', 'account', 'view', 'context',
  'light', 'statement', 'suitable', 'examples', 'measures', 'role', 'impact', 'various',
  'recent', 'major', 'extent', 'differentiate', 'distinguish', 'compare', 'contrast',
  'reconstruct', 'reconstructing', 'reconstruction', 'understand', 'understanding',
  'salient', 'features', 'aspects', 'factors', 'exemplifies', 'amalgamation', 'mobilized', 'masses',
  'answer', 'reference', 'state', 'meaning', 'nature', 'need', 'needs', 'way', 'ways', 'case'
]);

const genericSingleWords = new Set([
  'ancient', 'medieval', 'modern', 'history', 'culture', 'heritage', 'architecture', 'literature',
  'society', 'polity', 'economy', 'article', 'act', 'power', 'powers', 'doctrine',
  'risk', 'infrastructure', 'national', 'international', 'global', 'public', 'private',
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
  'level', 'dimension', 'dimensions', 'aspect', 'aspects', 'status', 'type', 'types',
  'form', 'forms', 'cases', 'field', 'area', 'areas', 'recent', 'major', 'extent', 'significance',
  'pattern', 'patterns', 'situation', 'scenarios', 'trends', 'affairs', 'cooperative', 'challenges'
]);

// Helper to normalize and stem a phrase to cluster similar concepts
function normalizePhrase(phrase) {
  const clean = phrase.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').trim();
  const words = clean.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
  if (words.length === 0) return null;
  if (words.length === 1 && genericSingleWords.has(words[0])) return null;
  
  // Create a base string for display (first occurrence will set it)
  const display = words.join(' ');
  // Create a stem signature for clustering
  const signature = words.map(w => PorterStemmer.stem(w)).join(' ');
  return { display, signature };
}

function generateYieldList(questionsList, excludeEssay = false) {
  const filteredQuestions = excludeEssay
    ? questionsList.filter(q => (q.paperId || '').toLowerCase() !== 'essay')
    : questionsList;

  const allYears = Array.from(new Set(questionsList.map(q => q.year)));
  const maxYear = allYears.length > 0 ? Math.max(...allYears) : new Date().getFullYear();
  const totalYears = allYears.length > 0 ? allYears.length : 14;

  // Local concept map to ensure clean state per run
  const conceptClusters = new Map();

  function addConcept(q, phrase) {
    const norm = normalizePhrase(phrase);
    if (!norm) return;
    const { display, signature } = norm;

    if (!conceptClusters.has(signature)) {
      conceptClusters.set(signature, {
        id: signature.replace(/\s+/g, '-'),
        display: phrase, // Keep original casing for first encounter
        cleanDisplay: display,
        questions: [],
        totalMarks: 0,
        yearsAppeared: new Set(),
        papers: new Set(),
        recentMarksWeighted: 0
      });
    }

    const cluster = conceptClusters.get(signature);
    // Avoid duplicate counting for the same question
    if (!cluster.questions.some(existing => existing.id === q.id)) {
      cluster.questions.push({ id: q.id, year: q.year, marks: q.marks, paperId: q.paperId });
      cluster.totalMarks += q.marks;
      cluster.yearsAppeared.add(q.year);
      cluster.papers.add(q.paperId);

      // Recency weighting
      let weight = 0.5; // Older than maxYear - 4
      if (q.year >= maxYear - 1) weight = 1.5;
      else if (q.year >= maxYear - 4) weight = 1.0;
      cluster.recentMarksWeighted += (q.marks * weight);
    }
  }

  filteredQuestions.forEach(q => {
    // 1. From Static Core
    if (q.staticCore && Array.isArray(q.staticCore)) {
      q.staticCore.forEach(sc => addConcept(q, sc));
    }

    // 2. From Curated Tags
    if (q.tags && Array.isArray(q.tags)) {
      q.tags.forEach(t => addConcept(q, t));
    }

    // 3. From AI Deconstructions (Micro-Syllabus Taxonomy)
    const aiData = aiDeconstMap.get(q.id);
    if (aiData && aiData.taxonomy_mapping) {
      if (aiData.taxonomy_mapping.primary_anchor) {
        addConcept(q, aiData.taxonomy_mapping.primary_anchor);
      }
      if (Array.isArray(aiData.taxonomy_mapping.micro_themes)) {
        aiData.taxonomy_mapping.micro_themes.forEach(mt => addConcept(q, mt));
      }
    }
  });

  // Calculate HYI Score - dynamically scaled based on whether 125-mark essays are included
  const maxTotalMarks = excludeEssay ? 65 : 100;
  const maxRecentMarks = excludeEssay ? 65 : 150;
  const versaMaxPapers = excludeEssay ? 2 : 3;
  // totalYears is dynamically calculated above

  const yieldList = [];

  for (const [sig, data] of conceptClusters.entries()) {
    if (data.questions.length < 2) continue; // Must appear at least twice to be a trend

    // 1. Volume & Marks (40%)
    const volScore = Math.min((data.totalMarks / maxTotalMarks) * 40, 40);

    // 2. Strike Rate (30%)
    const strikeScore = Math.min((data.yearsAppeared.size / (totalYears * 0.5)) * 30, 30);

    // 3. Recency Momentum (20%)
    const recencyScore = Math.min((data.recentMarksWeighted / maxRecentMarks) * 20, 20);

    // 4. Versatility (10%)
    const paperCount = data.papers.size;
    const versaScore = Math.min((paperCount / versaMaxPapers) * 10, 10);

    const hyi = Math.round(volScore + strikeScore + recencyScore + versaScore);

    let tier = 'Slate';
    let tierLevel = 4;
    if (hyi >= 80) { tier = 'Emerald'; tierLevel = 1; }
    else if (hyi >= 60) { tier = 'Teal'; tierLevel = 2; }
    else if (hyi >= 40) { tier = 'Amber'; tierLevel = 3; }

    // Sort questions inside cluster by year descending
    data.questions.sort((a, b) => b.year - a.year);

    yieldList.push({
      id: data.id,
      display: data.display,
      hyi,
      tier,
      tierLevel,
      metrics: {
        totalMarks: data.totalMarks,
        yearsAppeared: data.yearsAppeared.size,
        papers: Array.from(data.papers),
        recentMarksWeighted: data.recentMarksWeighted,
        questionCount: data.questions.length
      },
      questions: data.questions
    });
  }

  // Sort by HYI descending
  yieldList.sort((a, b) => b.hyi - a.hyi);
  return yieldList;
}

console.log('Extracting concepts (with essays)...');
const defaultYield = generateYieldList(questions, false);
fs.writeFileSync(outPath, JSON.stringify(defaultYield, null, 2), 'utf8');
console.log(`Saved ${defaultYield.length} High-Yield concepts (with essays) to ${outPath}`);

console.log('Extracting concepts (without essays)...');
const noEssayYield = generateYieldList(questions, true);
const noEssayOutPath = path.join(__dirname, '../src/data/high-yield-concepts-no-essay.json');
fs.writeFileSync(noEssayOutPath, JSON.stringify(noEssayYield, null, 2), 'utf8');
console.log(`Saved ${noEssayYield.length} High-Yield concepts (without essays) to ${noEssayOutPath}`);

// Generate a lightweight Elite Concepts array for frontend badges (using default with essays)
const eliteTagsPath = path.join(__dirname, '../src/data/elite-yield-tags.json');
const eliteTags = defaultYield.filter(c => c.tierLevel === 1).map(c => c.display);
fs.writeFileSync(eliteTagsPath, JSON.stringify(eliteTags, null, 2), 'utf8');
console.log(`Saved ${eliteTags.length} Elite tags to ${eliteTagsPath}`);
