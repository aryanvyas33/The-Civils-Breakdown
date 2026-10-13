const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, '../src/data/questions.json');
const pointersPath = path.join(__dirname, '../src/data/syllabus-pointers.json');

function main() {
  console.log('Loading data...');
  const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
  const pointers = JSON.parse(fs.readFileSync(pointersPath, 'utf8'));

  // Group pointers by subject for quick access
  const pointersBySubject = {};
  pointers.forEach(p => {
    if (!pointersBySubject[p.subjectId]) {
      pointersBySubject[p.subjectId] = [];
    }
    pointersBySubject[p.subjectId].push(p);
  });

  let assignedCount = 0;
  let unassignedCount = 0;

  console.log('Assigning pointers to questions...');
  
  questions.forEach(q => {
    const subjectPointers = pointersBySubject[q.subjectId] || [];

    if (subjectPointers.length === 0) {
      unassignedCount++;
      return; // No pointer defined for this subject yet
    }

    if (subjectPointers.length === 1) {
      // Only one pointer, easy choice
      q.pointerId = subjectPointers[0].id;
      assignedCount++;
      return;
    }

    // Multiple pointers, need to score them
    let bestPointer = null;
    let maxScore = -1;

    const qText = (q.text || '').toLowerCase();
    const qKeywords = (q.keywords || []).map(k => k.toLowerCase());
    const qTags = (q.tags || []).map(t => t.toLowerCase());

    subjectPointers.forEach(p => {
      let score = 0;
      
      p.keywords.forEach(pk => {
        const pkw = pk.toLowerCase();
        
        // Exact keyword match
        if (qKeywords.includes(pkw)) score += 3;
        
        // Tag match
        if (qTags.some(t => t.includes(pkw) || pkw.includes(t))) score += 4;
        
        // Text match
        if (qText.includes(pkw)) score += 1;
      });

      if (score > maxScore) {
        maxScore = score;
        bestPointer = p;
      }
    });

    if (bestPointer) {
      q.pointerId = bestPointer.id;
      assignedCount++;
    } else {
      // Fallback to first if somehow no score matches (very rare)
      q.pointerId = subjectPointers[0].id;
      assignedCount++;
    }
  });

  console.log(`Writing updated questions to ${questionsPath}`);
  fs.writeFileSync(questionsPath, JSON.stringify(questions, null, 2));

  // Compute pointer coverage
  const pointerCounts = {};
  questions.forEach(q => {
    if (q.pointerId) {
      pointerCounts[q.pointerId] = (pointerCounts[q.pointerId] || 0) + 1;
    }
  });

  console.log('\n--- Coverage Report ---');
  let gapCount = 0;
  pointers.forEach(p => {
    const count = pointerCounts[p.id] || 0;
    if (count === 0) {
      gapCount++;
      console.log(`GAP: Pointer '${p.id}' (${p.label}) has 0 questions.`);
    }
  });
  
  console.log(`\nAssigned: ${assignedCount}`);
  console.log(`Unassigned (missing subjects): ${unassignedCount}`);
  console.log(`Pointers with 0 questions: ${gapCount} out of ${pointers.length}`);
  console.log('Done!');
}

main();
