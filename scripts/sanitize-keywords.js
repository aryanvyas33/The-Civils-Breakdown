const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const highlightCode = fs.readFileSync(path.join(__dirname, '../src/lib/highlight.ts'), 'utf8');
const transpiled = ts.transpile(highlightCode);
const highlightModule = {};
eval('(function(exports){' + transpiled + '})(highlightModule)');

const { cleanCandidatePhrase, NON_KEYWORDS, BLACKLIST_PHRASES, UMBRELLA_TAGS } = highlightModule;

const questionsPath = path.join(__dirname, '../src/data/questions.json');
const rawData = fs.readFileSync(questionsPath, 'utf8');
const questions = JSON.parse(rawData);

let totalKeywordsBefore = 0;
let totalKeywordsAfter = 0;
let modifiedQuestions = 0;

const sampleIds = ['gs2-2026-q1', 'gs3-2013-q6', 'gs3-2020-q6', 'gs2-2025-q11', 'gs2-2025-q1'];
const beforeSnapshots = {};

questions.forEach(q => {
  if (sampleIds.includes(q.id)) {
    beforeSnapshots[q.id] = [...(q.keywords || [])];
  }

  totalKeywordsBefore += (q.keywords || []).length;

  const newKeywordsSet = new Set();

  (q.keywords || []).forEach(k => {
    if (!k || typeof k !== 'string') return;
    const cleanedTerms = cleanCandidatePhrase(k);
    cleanedTerms.forEach(term => {
      const trimmed = term.trim();
      const lower = trimmed.toLowerCase();
      if (
        trimmed.length >= 2 &&
        !NON_KEYWORDS.has(lower) &&
        !BLACKLIST_PHRASES.has(lower) &&
        !UMBRELLA_TAGS.has(lower)
      ) {
        newKeywordsSet.add(trimmed);
      }
    });
  });

  const cleanedArray = Array.from(newKeywordsSet);
  totalKeywordsAfter += cleanedArray.length;

  // Check if modified
  const oldSet = new Set((q.keywords || []).map(k => k.toLowerCase()));
  const newLowerSet = new Set(cleanedArray.map(k => k.toLowerCase()));
  if (oldSet.size !== newLowerSet.size || [...oldSet].some(x => !newLowerSet.has(x))) {
    modifiedQuestions++;
  }

  q.keywords = cleanedArray;
});

fs.writeFileSync(questionsPath, JSON.stringify(questions, null, 2), 'utf8');

console.log('=== DATASET SANITIZATION REPORT ===');
console.log(`Total questions processed: ${questions.length}`);
console.log(`Questions with keywords modified: ${modifiedQuestions}`);
console.log(`Total keyword tokens before: ${totalKeywordsBefore}`);
console.log(`Total keyword tokens after: ${totalKeywordsAfter}`);
console.log(`Junk / filler keyword tokens purged: ${totalKeywordsBefore - totalKeywordsAfter}`);
console.log('');
console.log('=== SAMPLE BEFORE & AFTER COMPARISONS ===');
sampleIds.forEach(id => {
  const q = questions.find(x => x.id === id);
  console.log(`--- [${id}] ---`);
  console.log('BEFORE:', beforeSnapshots[id]);
  console.log('AFTER: ', q.keywords);
  console.log('');
});
