const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// Load highlight module via TypeScript transpilation
const highlightCode = fs.readFileSync(path.join(__dirname, '../src/lib/highlight.ts'), 'utf8');
const transpiled = ts.transpile(highlightCode);
const highlightModule = {};
eval('(function(exports){' + transpiled + '})(highlightModule)');

const {
  highlightQuestionKeywords,
  getMatchedKeywordsInText,
  getMatchedDirectivesInText,
  getMatchedInstitutionsInText
} = highlightModule;

const questions = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/questions.json'), 'utf8'));

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('====================================================');
console.log('   UPSC PYQ HIGHLIGHTING REGRESSION TEST SUITE');
console.log('====================================================\n');

// -----------------------------------------------------------------------------
// Test Case 1: gs2-2026-q1 (Right to privacy / Transgender Persons Act)
// -----------------------------------------------------------------------------
console.log('TEST 1: gs2-2026-q1 (User Example 1)');
const q1 = questions.find(q => q.id === 'gs2-2026-q1');
const out1 = highlightQuestionKeywords(q1.text, q1.tags, q1.keywords);

assert(out1.includes('class="kw-directive" title="Directive: examine">examine</span>'), 'Directive "examine" highlighted in blue');
assert(out1.includes('class="kw-highlight">Article 21</span>'), 'Article 21 highlighted in amber');
assert(out1.includes('class="kw-highlight">self-identity</span>'), 'self-identity highlighted in amber');
assert(out1.includes('class="kw-highlight">privacy</span>'), 'privacy highlighted in amber');
assert(out1.includes('class="kw-highlight">amendment</span>'), 'amendment highlighted in amber');
assert(out1.includes('class="kw-highlight">Transgender Persons (Protection of Rights) Act, 2019</span>'), 'Full Transgender Persons Act highlighted as unified statute');

// Negative assertions
assert(!out1.includes('>relating<'), '"relating" is NOT highlighted');
assert(!out1.includes('>dear<'), '"dear" is NOT highlighted');
assert(!out1.includes('>every human<'), '"every human" is NOT highlighted');
assert(!out1.includes('>protected under<'), '"protected under" is NOT highlighted');
assert(!out1.includes('>the Constitution<') && !out1.includes('>Constitution<'), '"the Constitution" is NOT highlighted');
assert(!out1.includes('>the effect of<') && !out1.includes('>the effect of the<'), '"the effect of" is NOT highlighted');
console.log('');

// -----------------------------------------------------------------------------
// Test Case 2: gs3-2013-q6 (IPR Policy in India / TRIPS)
// -----------------------------------------------------------------------------
console.log('TEST 2: gs3-2013-q6 (User Example 2)');
const q2 = questions.find(q => q.id === 'gs3-2013-q6');
const out2 = highlightQuestionKeywords(q2.text, q2.tags, q2.keywords);

assert(out2.includes('class="kw-institution" title="Institution / Stakeholder: India">India</span>'), 'India highlighted as Institution in green');
assert(out2.includes('class="kw-highlight">salient features</span>'), '"salient features" highlighted in amber');
assert(out2.includes('class="kw-highlight">Intellectual Property Rights (IPR)</span>'), '"Intellectual Property Rights (IPR)" highlighted in amber');
assert(out2.includes('class="kw-highlight">balance</span>'), '"balance" highlighted in amber');
assert(out2.includes('class="kw-highlight">public health</span>'), '"public health" highlighted in amber');
assert(out2.includes('class="kw-highlight">TRIPS</span>'), '"TRIPS" highlighted in amber');

// Negative assertions
assert(!out2.includes('>What are the<'), '"What are the" is NOT highlighted');
assert(!out2.includes('>of the<'), '"of the" is NOT highlighted');
assert(!out2.includes('>policy in<'), '"policy in" is NOT highlighted');
assert(!out2.includes('>imperatives under<'), '"imperatives under" is NOT highlighted');
console.log('');

// -----------------------------------------------------------------------------
// Test Case 3: gs3-2020-q6 (Science interwoven / Indian scientists)
// -----------------------------------------------------------------------------
console.log('TEST 3: gs3-2020-q6 (User Example 3)');
const q3 = questions.find(q => q.id === 'gs3-2020-q6');
const out3 = highlightQuestionKeywords(q3.text, q3.tags, q3.keywords);

assert(out3.includes('class="kw-institution" title="Institution / Stakeholder: Indian scientists">Indian scientists</span>'), '"Indian scientists" highlighted in green');
assert(out3.includes('class="kw-highlight">science</span>'), '"science" highlighted in amber');
assert(out3.includes('class="kw-highlight">science and technology</span>'), '"science and technology" highlighted in amber');
assert(out3.includes('class="kw-highlight">20th century</span>'), '"20th century" highlighted in amber');

// Negative assertions
assert(!out3.includes('>in the<'), '"in the" is NOT highlighted');
assert(!out3.includes('>interwoven<'), '"interwoven" is NOT highlighted');
assert(!out3.includes('>deeply<'), '"deeply" is NOT highlighted');
assert(!out3.includes('>our lives<'), '"our lives" is NOT highlighted');
assert(!out3.includes('>important contributions of<'), '"important contributions of" is NOT highlighted');
assert(!out3.includes('>fields of<'), '"fields of" is NOT highlighted');
console.log('');

// -----------------------------------------------------------------------------
// Test Case 4: gs2-2025-q11 (Constitutional morality / Supreme Court)
// -----------------------------------------------------------------------------
console.log('TEST 4: gs2-2025-q11 (User Example 4)');
const q4 = questions.find(q => q.id === 'gs2-2025-q11');
const out4 = highlightQuestionKeywords(q4.text, q4.tags, q4.keywords);

assert(out4.includes('class="kw-directive" title="Directive: explain">explain</span>'), '"explain" highlighted in blue as directive');
assert(out4.includes('class="kw-institution" title="Institution / Stakeholder: Supreme Court">Supreme Court</span>'), '"Supreme Court" highlighted in green');
assert(out4.includes('class="kw-institution" title="Institution / Stakeholder: India">India</span>'), '"India" highlighted in green');
assert(out4.includes('class="kw-highlight">Constitutional morality</span>'), '"Constitutional morality" highlighted in amber');
assert(out4.includes('class="kw-highlight">judicial independence</span>'), '"judicial independence" highlighted in amber');
assert(out4.includes('class="kw-highlight">judicial accountability</span>'), '"judicial accountability" highlighted in amber');
assert(out4.includes('class="kw-highlight">balance</span>'), '"balance" highlighted in amber');

// Negative assertions
assert(!out4.includes('>above observation of the<'), '"above observation of the" is NOT highlighted');
assert(!out4.includes('>fulcrum<'), '"fulcrum" is NOT highlighted');
assert(!out4.includes('>acts<'), '"acts" is NOT highlighted');
assert(!out4.includes('>essential check<'), '"essential check" is NOT highlighted');
assert(!out4.includes('>high functionaries<'), '"high functionaries" is NOT highlighted');
assert(!out4.includes('>citizens alike<'), '"citizens alike" is NOT highlighted');
assert(!out4.includes('>its application<') && !out4.includes('>application<'), '"its application" is NOT highlighted');
console.log('');

// -----------------------------------------------------------------------------
// Test Case 5: gs2-2025-q1 (Corrupt practices / RPA 1951)
// -----------------------------------------------------------------------------
console.log('TEST 5: gs2-2025-q1 (User Example 5)');
const q5 = questions.find(q => q.id === 'gs2-2025-q1');
const out5 = highlightQuestionKeywords(q5.text, q5.tags, q5.keywords);

assert(out5.includes('class="kw-directive" title="Directive: Discuss">Discuss</span>'), '"Discuss" highlighted in blue');
assert(out5.includes('class="kw-directive" title="Directive: Analyze">Analyze</span>'), '"Analyze" highlighted in blue');
assert(out5.includes('class="kw-highlight">Representation of the People Act, 1951</span>'), 'Representation of the People Act, 1951 highlighted as whole statute');
assert(out5.includes('class="kw-institution" title="Institution / Stakeholder: legislators">legislators</span>'), '"legislators" highlighted in green');
assert(out5.includes('class="kw-highlight">corrupt practices</span>'), '"corrupt practices" highlighted in amber');
assert(out5.includes('class="kw-highlight">undue influence</span>'), '"undue influence" highlighted in amber');
assert(out5.includes('class="kw-highlight">known sources of income</span>'), '"known sources of income" highlighted in amber');

// Negative assertions
assert(!out5.includes('>purpose of the<') && !out5.includes('>for the purpose of the<'), '"purpose of the" is NOT highlighted');
assert(!out5.includes('>increase in the<'), '"increase in the" is NOT highlighted');
assert(!out5.includes('>their associates<'), '"their associates" is NOT highlighted');
assert(!out5.includes('>would constitute<'), '"would constitute" is NOT highlighted');
console.log('');

// -----------------------------------------------------------------------------
// Test Case 7: gs4-2013-q8 (Role De-gluing & Stakeholders)
// -----------------------------------------------------------------------------
console.log('TEST 7: gs4-2013-q8 (SDO & State Irrigation Department)');
const q7 = questions.find(q => q.id === 'gs4-2013-q8');
const out7 = highlightQuestionKeywords(q7.text, q7.tags, q7.keywords);

assert(out7.includes('class="kw-institution" title="Institution / Stakeholder: sub-divisional officer">sub-divisional officer</span>'), 'sub-divisional officer highlighted as Stakeholder in green');
assert(out7.includes('class="kw-institution" title="Institution / Stakeholder: state irrigation department">state irrigation department</span>'), 'state irrigation department highlighted as Institution in green');
assert(out7.includes('>sub-divisional officer</span> in the <span'), '"in the" between role and department is unhighlighted');
assert(out7.includes('class="kw-institution" title="Institution / Stakeholder: influential contractor">influential contractor</span>'), 'influential contractor is green');
assert(out7.includes('class="kw-institution" title="Institution / Stakeholder: departmental executive engineer">departmental executive engineer</span>'), 'departmental executive engineer is green');
assert(out7.includes('class="kw-institution" title="Institution / Stakeholder: senior minister">senior minister</span>'), 'senior minister is green');
assert(!out7.includes('>Case Study<') && !out7.includes('>Study<'), '"Study" is NOT highlighted');
assert(!out7.includes('>honest<'), '"honest" is NOT highlighted');
console.log('');

// -----------------------------------------------------------------------------
// Test Case 8: gs4-2014-q10 (Athletes as Stakeholders & Sports Kits Suppressed)
// -----------------------------------------------------------------------------
console.log('TEST 8: gs4-2014-q10 (Athletes as Stakeholders & Sports Kits Non-Concept)');
const q8 = questions.find(q => q.id === 'gs4-2014-q10');
const out8 = highlightQuestionKeywords(q8.text, q8.tags, q8.keywords);

assert(out8.includes('class="kw-institution" title="Institution / Stakeholder: rural underprivileged athletes">rural underprivileged athletes</span>'), 'rural underprivileged athletes highlighted in green as Stakeholder');
assert(out8.includes('class="kw-institution" title="Institution / Stakeholder: Talented athletes">Talented athletes</span>'), 'Talented athletes highlighted in green as Stakeholder');
assert(out8.includes('class="kw-institution" title="Institution / Stakeholder: district sports officer">district sports officer</span>'), 'district sports officer highlighted in green');
assert(out8.includes('class="kw-institution" title="Institution / Stakeholder: local sports association office-bearers">local sports association office-bearers</span>'), 'local sports association office-bearers highlighted in green');
assert(out8.includes('class="kw-institution" title="Institution / Stakeholder: association president">association president</span>'), 'association president highlighted in green');
assert(!out8.includes('>sports kits<') && !out8.includes('>sports<') && !out8.includes('>kits<'), '"sports kits" is NOT highlighted (not a concept)');
assert(!out8.includes('>discover<'), '"discover" is NOT highlighted');
console.log('');

// -----------------------------------------------------------------------------
// Test Case 9: gs4-2026-q19 (Head of Department of Weapon Sales as Stakeholder)
// -----------------------------------------------------------------------------
console.log('TEST 9: gs4-2026-q19 (Head of Department of Weapon Sales)');
const q9 = questions.find(q => q.id === 'gs4-2026-q19');
const out9 = highlightQuestionKeywords(q9.text, q9.tags, q9.keywords);

assert(out9.includes('class="kw-institution" title="Institution / Stakeholder: Head of Department of Weapon Sales">Head of Department of Weapon Sales</span>'), 'Head of Department of Weapon Sales highlighted in green as Stakeholder');
assert(out9.includes('class="kw-directive" title="Directive: Discuss">Discuss</span>'), '"Discuss" is directive in blue');
assert(out9.includes('class="kw-directive" title="Directive: justify">justify</span>'), '"justify" is directive in blue');
assert(!out9.includes('>Ajit<'), '"Ajit" character name is NOT highlighted');
assert(!out9.includes('>Country<') && !out9.includes('>Country A<'), '"Country" is NOT highlighted');
console.log('');

console.log('====================================================');
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
}
