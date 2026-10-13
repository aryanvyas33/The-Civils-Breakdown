const fs = require('fs');
const path = require('path');
const nlp = require('compromise');

const questions = JSON.parse(fs.readFileSync('./src/data/questions.json', 'utf8'));
const pointers = JSON.parse(fs.readFileSync('./src/data/syllabus-pointers.json', 'utf8'));

// STEP 1 - Directive Lexicon
const DIRECTIVE_LEXICON = {
  'critically examine': 'Deep probe into facts, weighing pros, cons, and alternative views.',
  'critically evaluate': 'Deep probe into facts, weighing pros, cons, and alternative views.',
  'critically analyse': 'Break down into components and weigh the evidence critically.',
  'evaluate': 'Judgement with pros, cons, and final verdict.',
  'discuss': 'Multi-dimensional description covering various angles and perspectives.',
  'elaborate': 'Detailed explanation providing context, examples, and mechanisms.',
  'what do you mean by': 'Clear definition and conceptual framework.',
  'what is meant by': 'Clear definition and conceptual framework.',
  'explain': 'Clear definition and step-by-step mechanism or reasons.',
  'analyse': 'Break down into causes, effects, and interrelations.',
  'analyze': 'Break down into causes, effects, and interrelations.',
  'comment': 'Express an informed opinion or viewpoint with supporting arguments.',
  'elucidate': 'Make clear by providing evidence, examples, and detailed explanation.',
  'examine': 'Look closely into the facts, issues, and implications.',
  'trace': 'Follow the historical evolution or step-by-step progression.',
  'highlight': 'Bring focus to the most important points or salient features.',
  'account for': 'Provide reasons or causes for the phenomenon.',
  'to what extent': 'Evaluate the degree of truth or impact, showing where it holds true and where it falls short.',
  'justify': 'Provide valid reasons or evidence to support a statement.'
};

// STEP 2 - Term Classification
function classifyTerm(term) {
  const lower = term.toLowerCase();
  if (lower.includes('act') || lower.includes('article') || lower.includes('case') || lower.match(/v\.\s/)) return 'LEGAL_ANCHOR';
  if (lower.includes('court') || lower.includes('rbi') || lower.includes('commission') || lower.includes('ministry') || lower.includes('government') || lower.includes('parliament')) return 'ACTOR';
  if (lower.includes('scheme') || lower.includes('framework') || lower.includes('policy') || lower.includes('mission') || lower.includes('initiative')) return 'INSTRUMENT';
  if (['social', 'political', 'economic', 'cultural', 'environmental', 'ethical', 'historical', 'geographical'].includes(lower)) return 'DIMENSION';
  return 'CONCEPT';
}

function processQuestion(q) {
  const text = q.text;
  
  // STEP 0 — Preprocess
  const subQuestions = [];
  const doc = nlp(text);
  const sentences = doc.sentences().out('array');
  
  sentences.forEach((s, idx) => {
    const lowerS = s.toLowerCase();
    const isDependent = lowerS.includes('in this context') || lowerS.includes('in the light of') || lowerS.includes('with reference to') || lowerS.startsWith('and ');
    subQuestions.push({
      text: s.trim(),
      type: isDependent ? 'DEPENDENT' : 'PRIMARY',
      order: idx + 1
    });
  });

  // STEP 1 — Directive detection
  const directives = [];
  const lowerText = text.toLowerCase();
  for (const [key, value] of Object.entries(DIRECTIVE_LEXICON)) {
    const regex = new RegExp(`\\b${key}\\b`, 'i');
    if (regex.test(lowerText)) {
      directives.push({ phrase: key, task: value });
    }
  }
  if (directives.length === 0) {
    if (lowerText.includes('what') || lowerText.includes('how') || lowerText.includes('why')) {
      directives.push({ phrase: 'Direct Query', task: 'Directly address the stated query with factual explanation.' });
    } else {
      directives.push({ phrase: 'Implicit', task: 'Provide a comprehensive overview of the stated topic.' });
    }
  }

// Prompt template stems and determiners for key_terms extraction
const STEM_REGEX = /^(?:(?:the\s+)?(?:effect|effects|role|roles|importance|significance|perspective|perspectives|impact|impacts|consequence|consequences|implication|implications|need|needs|relevance|nature|context|challenge|challenges|issue|issues|problem|problems)\s+(?:of|in|facing|with|for)\s+(?:the\s+|a\s+|an\s+)?|(?:well\s+)?protected\s+under\s+(?:the\s+|a\s+|an\s+)?|(?:relating|related)\s+to\s+(?:the\s+|a\s+|an\s+)?|(?:in\s+)?(?:the\s+)?context\s+of\s+(?:the\s+|a\s+|an\s+)?|(?:with\s+)?(?:reference|regard)\s+to\s+(?:the\s+|a\s+|an\s+)?|(?:in\s+)?light\s+of\s+(?:the\s+|a\s+|an\s+)?|(?:in\s+)?terms\s+of\s+(?:the\s+|a\s+|an\s+)?|(?:the\s+)?(?:concept|notion|nature|extent|manner)\s+(?:of|in\s+which)\s+(?:the\s+|a\s+|an\s+)?|(?:reconstructing|analyzing|analysing|evaluating|examining|discussing)\s+(?:the\s+|a\s+|an\s+)?)/i;

const LEADING_DETERMINER_REGEX = /^(?:the|a|an|this|that|these|those)\s+/i;

const DECONSTRUCT_PURGE_WORDS = new Set([
  'relating', 'related', 'dear', 'human', 'protected', 'effect', 'effects', 'masses',
  'generates', 'owing', 'working', 'mean', 'means', 'lay', 'various', 'different',
  'several', 'multiple', 'importance', 'significance', 'paucity', 'professor',
  'every human', 'the masses', 'paucity of time', 'some modifications', 'university professor',
  'the constitution', 'constitution', 'indian constitution',
  'above observation of the', 'above observation of', 'purpose of the',
  'for the purpose of the', 'for the purpose of', 'important contributions of',
  'in the fields of', 'fields of', 'high functionaries', 'citizens alike',
  'its application', 'interwoven', 'deeply', 'our lives', 'fulcrum', 'acts'
]);

function cleanKeyTerm(noun) {
  let clean = noun.replace(/[?,."']/g, '').trim();
  clean = clean.replace(/^\([a-z0-9]+\)\s*/i, '');
  clean = clean.replace(/^["'`([{]+|["'`)\]}]+$/g, '').trim();

  let prev = '';
  while (clean !== prev && clean.length > 0) {
    prev = clean;
    clean = clean.replace(LEADING_DETERMINER_REGEX, '').trim();
    clean = clean.replace(STEM_REGEX, '').trim();
  }

  clean = clean.replace(/^["'`([{]+|["'`)\]}.,;:]+$/g, '').trim();
  return clean;
}

  // STEP 2 — Entity and keyword extraction
  const key_terms = [];
  const termsSet = new Set();
  
  doc.nouns().out('array').forEach(noun => {
    const clean = cleanKeyTerm(noun);
    const lower = clean.toLowerCase();
    if (
      clean.length > 2 &&
      !termsSet.has(lower) &&
      !DECONSTRUCT_PURGE_WORDS.has(lower) &&
      !lower.includes('context') &&
      !lower.includes('reference to') &&
      !/^\d+$/.test(clean)
    ) {
      termsSet.add(lower);
      key_terms.push({ term: clean, type: classifyTerm(clean) });
    }
  });

  // STEP 3 — Scope and constraint detection
  const limiters = [];
  let requiresCurrentData = false;
  if (lowerText.match(/\bindia(n)?\b/)) limiters.push({ phrase: 'India', constraint: 'Geographical/Contextual focus: India' });
  if (lowerText.match(/\b(world|global|international)\b/)) limiters.push({ phrase: 'Global', constraint: 'Geographical/Contextual focus: World/Global' });
  if (lowerText.match(/\b(youth|women|vulnerable|poor|tribal|elderly)\b/)) limiters.push({ phrase: 'Demographic', constraint: 'Target Population focus' });
  if (lowerText.match(/\b(recent|progress|working|current|contemporary|present)\b/)) {
    limiters.push({ phrase: 'Temporal', constraint: 'Requires contemporary data and recent examples' });
    requiresCurrentData = true;
  }

  // STEP 4 — Syllabus graph linking
  const syllabus_nodes = [];
  if (q.pointerId) {
    const pointer = pointers.find(p => p.id === q.pointerId);
    if (pointer) {
      syllabus_nodes.push({
        id: pointer.id,
        label: pointer.label,
        type: 'PRIMARY_SYLLABUS_NODE'
      });
    }
  }
  if (q.staticCore) {
    q.staticCore.forEach(sc => {
      syllabus_nodes.push({
        id: sc,
        label: sc,
        type: 'STATIC_CORE_CONCEPT'
      });
    });
  }
  q.tags.forEach(t => {
      syllabus_nodes.push({
          id: t,
          label: t,
          type: 'TAG_NODE'
      });
  });

  // STEP 5 & 6 — Answer skeleton generation
  const answer_skeleton = {
    introduction: '',
    body_sections: [],
    critical_view: null,
    conclusion: ''
  };

  const concepts = key_terms.filter(t => t.type === 'CONCEPT').slice(0, 2).map(t => t.term);
  answer_skeleton.introduction = `Define and provide the context for ${concepts.join(' and ') || 'the core issue'}.`;

  const dimensions = key_terms.filter(t => t.type === 'DIMENSION');
  if (dimensions.length > 0) {
    dimensions.forEach(d => {
      answer_skeleton.body_sections.push({
        heading: `${d.term.charAt(0).toUpperCase() + d.term.slice(1)} Dimension`,
        focus: `Analyze the impact/factors related to ${d.term}`
      });
    });
  } else {
    subQuestions.forEach(sq => {
      answer_skeleton.body_sections.push({
        heading: `Addressing: ${sq.text.length > 40 ? sq.text.substring(0, 40) + '...' : sq.text}`,
        focus: sq.type === 'DEPENDENT' ? 'Link this aspect to the primary premise.' : 'Establish the primary argument.'
      });
    });
  }

  if (directives.some(d => ['evaluate', 'critically examine', 'critically evaluate', 'critically analyse', 'analyse', 'analyze', 'examine', 'to what extent'].includes(d.phrase))) {
    answer_skeleton.critical_view = 'Discuss challenges, limitations, or counter-arguments.';
  }

  answer_skeleton.conclusion = `Provide a forward-looking statement or way forward regarding ${concepts[0] || 'the issue'}.`;

  const totalWords = q.marks === 15 ? 250 : 150;
  const introWords = Math.floor(totalWords * 0.15);
  const conclusionWords = Math.floor(totalWords * 0.10);
  let bodyWords = totalWords - introWords - conclusionWords;
  if (answer_skeleton.critical_view) {
    const critWords = Math.floor(totalWords * 0.20);
    answer_skeleton.critical_view += ` (~${critWords} words)`;
    bodyWords -= critWords;
  }
  answer_skeleton.introduction += ` (~${introWords} words)`;
  answer_skeleton.conclusion += ` (~${conclusionWords} words)`;
  
  if (answer_skeleton.body_sections.length > 0) {
    const perSectionWords = Math.floor(bodyWords / answer_skeleton.body_sections.length);
    answer_skeleton.body_sections.forEach(sec => {
      sec.focus += ` (~${perSectionWords} words)`;
    });
  }

  return {
    directives,
    sub_questions: subQuestions,
    key_terms,
    scope_limiters: limiters,
    requires_current_data: requiresCurrentData,
    syllabus_nodes,
    answer_skeleton
  };
}

const deconstructions = {};
console.log(`Processing ${questions.length} questions for structural deconstruction...`);
questions.forEach(q => {
  deconstructions[q.id] = processQuestion(q);
});

fs.writeFileSync('./src/data/deconstructions.json', JSON.stringify(deconstructions, null, 2));
console.log('Done! Wrote src/data/deconstructions.json');
