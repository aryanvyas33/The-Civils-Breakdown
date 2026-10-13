const test = require('node:test');
const assert = require('node:assert/strict');

// Import compiled TS / JS modules via require
// Note: We can test the logic directly using Node.js

test('1. Array Immutability in getFilteredQuestions', () => {
  const data = require('../src/lib/data');
  const initial = data.getAllQuestions();
  const initialFirstId = initial[0].id;
  const initialLength = initial.length;

  // Perform a reverse sort
  const filteredAsc = data.getFilteredQuestions({ sortBy: 'year-asc' });
  assert.ok(filteredAsc.length > 0);

  // Check that the cached getAllQuestions was NOT mutated in place
  const afterCheck = data.getAllQuestions();
  assert.equal(afterCheck.length, initialLength);
  assert.equal(afterCheck[0].id, initialFirstId, 'Cache should preserve original order and not be mutated by sort');
});

test('2. Search paper breakdown consistency with empty query', () => {
  const search = require('../src/lib/search');
  
  // Empty query with no filter
  const resAll = search.searchQuestions('');
  assert.ok(resAll.totalResults > 1000);
  assert.equal(resAll.paperBreakdown.all, resAll.totalResults);
  assert.ok(resAll.paperBreakdown.gs1 > 0);
  assert.ok(resAll.paperBreakdown.gs2 > 0);
  assert.ok(resAll.paperBreakdown.gs3 > 0);
  assert.ok(resAll.paperBreakdown.gs4 > 0);
  assert.ok(resAll.paperBreakdown.essay > 0);

  // Empty query with paper="gs1" filter
  const resGs1 = search.searchQuestions('', { paper: 'gs1' });
  assert.equal(resGs1.totalResults, resAll.paperBreakdown.gs1);
  // Paper breakdown must still report available counts across all papers, NOT 0!
  assert.ok(resGs1.paperBreakdown.gs2 > 0, 'GS2 count must not be zeroed out when filtering by GS1');
  assert.ok(resGs1.paperBreakdown.gs3 > 0, 'GS3 count must not be zeroed out when filtering by GS1');
  assert.equal(resGs1.paperBreakdown.all, resAll.totalResults);
});

test('3. HTML Entity Escaping and XSS Protection in highlightQuestionKeywords', () => {
  const highlight = require('../src/lib/highlight');

  // Input with special HTML characters and script tag attempt
  const dangerousText = 'Analyze <script>alert("xss")</script> and economic R&D in Jammu & Kashmir.';
  const highlighted = highlight.highlightQuestionKeywords(dangerousText, ['Jammu & Kashmir', 'R&D'], [], ['economic']);

  assert.ok(!highlighted.includes('<script>'), 'Raw <script> tags must be escaped');
  assert.ok(highlighted.includes('&lt;script&gt;'), '<script> must be converted to &lt;script&gt;');
  assert.ok(highlighted.includes('class="kw-highlight"'), 'Legitimate keyword highlights must still render');
});

test('4. Raw Deconstruction Adapter to DeconstructionData', () => {
  const deconstructionLib = require('../src/lib/questionDeconstruction');
  const rawDeconstructions = require('../src/data/deconstructions.json');
  const questions = require('../src/data/questions.json');

  const sampleQ = questions.find(q => q.id === 'gs1-2026-q1');
  assert.ok(sampleQ);

  const raw = rawDeconstructions['gs1-2026-q1'];
  assert.ok(raw);

  const adapted = deconstructionLib.adaptRawDeconstruction(raw, sampleQ);

  assert.ok(Array.isArray(adapted.directives), 'Directives must be an array');
  assert.ok(adapted.directives.length > 0);
  assert.ok(Array.isArray(adapted.primaryEntities), 'Primary entities must be an array');
  assert.ok(Array.isArray(adapted.scopeLimiters), 'Scope limiters must be an array');
  assert.ok(Array.isArray(adapted.whatIsAsked), 'What is asked must be an array');
  assert.ok(Array.isArray(adapted.whatToWrite), 'What to write must be an array');
  assert.ok(adapted.whatToWrite.length >= 3, 'Must have at least intro, body, conclusion sections');
});

test('5. Fast Autocomplete Suggestions from Tag Index', () => {
  const search = require('../src/lib/search');
  const suggestions = search.getAutocompleteSuggestions('fed', 5);

  assert.ok(Array.isArray(suggestions));
  assert.ok(suggestions.length > 0);
  assert.ok(suggestions.some(s => s.toLowerCase().includes('fed')));
});

test('6. Stats Year Span and Count Hardening', () => {
  const data = require('../src/lib/data');
  const stats = data.getStats();

  assert.equal(stats.yearSpan, '2013–2026');
  assert.ok(stats.totalQuestions >= 1131);
  assert.equal(stats.totalPapers, 5);
});
