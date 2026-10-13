const fs = require('fs');
const path = require('path');

const testCasesPath = path.join(__dirname, 'test-cases.json');
const relatedMapPath = path.join(__dirname, '../src/data/related-map.json');

function evaluate() {
  if (!fs.existsSync(testCasesPath)) {
    console.error(`Test cases not found at: ${testCasesPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(relatedMapPath)) {
    console.error(`Related map not found at: ${relatedMapPath}`);
    process.exit(1);
  }

  const testCases = JSON.parse(fs.readFileSync(testCasesPath, 'utf8'));
  const relatedMap = JSON.parse(fs.readFileSync(relatedMapPath, 'utf8'));

  let totalMustInclude = 0;
  let hits = 0;
  let misses = 0;
  let totalMustExclude = 0;
  let falsePositives = 0;
  let fullySatisfiedCases = 0;

  console.log('======================================================');
  console.log('      UPSC RELATED QUESTION ALGORITHM EVALUATOR       ');
  console.log('======================================================\n');

  testCases.forEach((tc, idx) => {
    const list = relatedMap[tc.questionId] || [];
    const top10Ids = list.slice(0, 10).map((r) => r.questionId || r.id);
    const top10Map = new Map();
    list.slice(0, 10).forEach((r) => top10Map.set(r.questionId || r.id, r));

    let caseHits = 0;
    const caseMissesList = [];

    tc.mustInclude.forEach((targetId) => {
      totalMustInclude++;
      if (top10Ids.includes(targetId)) {
        hits++;
        caseHits++;
      } else {
        misses++;
        caseMissesList.push(targetId);
      }
    });

    let caseFalsePositives = 0;
    const caseFpList = [];
    (tc.mustExclude || []).forEach((targetId) => {
      totalMustExclude++;
      if (top10Ids.includes(targetId)) {
        falsePositives++;
        caseFalsePositives++;
        caseFpList.push(targetId);
      }
    });

    const isFullySatisfied = caseHits === tc.mustInclude.length && caseFalsePositives === 0;
    if (isFullySatisfied) fullySatisfiedCases++;

    const statusSymbol = isFullySatisfied ? '✅ PASS' : caseHits > 0 ? '⚠️  PARTIAL' : '❌ FAIL';
    console.log(`[${(idx + 1).toString().padStart(2)}] ${tc.questionId.padEnd(14)} ${statusSymbol} (${caseHits}/${tc.mustInclude.length} hits)`);

    if (caseMissesList.length > 0) {
      console.log(`     Missed: [${caseMissesList.join(', ')}]`);
    }
    if (caseFpList.length > 0) {
      console.log(`     False Positives: [${caseFpList.join(', ')}]`);
    }
    if (caseHits > 0) {
      const hitDetails = tc.mustInclude
        .filter((id) => top10Ids.includes(id))
        .map((id) => {
          const entry = top10Map.get(id);
          return `${id} (lvl=${entry.relevanceLevel}, sc=${entry.score}${entry.matchReason ? `, reason="${entry.matchReason}"` : ''})`;
        });
      console.log(`     Hits: ${hitDetails.join(' | ')}`);
    }
    console.log('');
  });

  const hitRate = ((hits / totalMustInclude) * 100).toFixed(1);
  const fpRate = totalMustExclude > 0 ? ((falsePositives / totalMustExclude) * 100).toFixed(1) : 0;
  const casePassRate = ((fullySatisfiedCases / testCases.length) * 100).toFixed(1);

  console.log('------------------------------------------------------');
  console.log('                   SUMMARY REPORT                     ');
  console.log('------------------------------------------------------');
  console.log(`Total Test Cases:           ${testCases.length}`);
  console.log(`Fully Satisfied Cases:      ${fullySatisfiedCases} / ${testCases.length} (${casePassRate}%)`);
  console.log(`Recall / Hit Rate:          ${hits} / ${totalMustInclude} (${hitRate}%)`);
  console.log(`Missed Relevant Questions:  ${misses} / ${totalMustInclude}`);
  console.log(`False Positives in Top 10:  ${falsePositives} / ${totalMustExclude} (${fpRate}%)`);
  console.log('======================================================\n');

  return { hits, misses, falsePositives, hitRate };
}

evaluate();
