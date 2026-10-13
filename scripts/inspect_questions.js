const fs = require('fs');

function parseCSV(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let cur = '';

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (c === '"') {
      if (inQuotes && next === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push(cur.trim());
      cur = '';
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') i++;
      row.push(cur.trim());
      if (row.some((x) => x.length > 0)) lines.push(row);
      row = [];
      cur = '';
    } else {
      cur += c;
    }
  }
  if (cur.length > 0 || row.length > 0) {
    row.push(cur.trim());
    if (row.some((x) => x.length > 0)) lines.push(row);
  }
  return lines;
}

const csv2026 = parseCSV(fs.readFileSync('./scripts/data_2026_default.csv', 'utf8'));
const csv2025 = parseCSV(fs.readFileSync('./scripts/data_2025_default.csv', 'utf8'));

console.log('=== 2026 Questions by Paper ===');
const byPaper2026 = {};
csv2026.slice(1).forEach((r) => {
  const paper = r[3];
  if (!byPaper2026[paper]) byPaper2026[paper] = [];
  byPaper2026[paper].push({
    question: r[0],
    marks: r[1],
    year: r[2],
    source: r[4],
  });
});

Object.keys(byPaper2026).forEach((p) => {
  console.log(`\n--- ${p} (${byPaper2026[p].length} Qs) ---`);
  byPaper2026[p].forEach((q, idx) => {
    console.log(`  ${idx + 1}. [${q.marks}m] ${q.question.slice(0, 90)}...`);
  });
});

console.log('\n=== 2025 Questions by Paper ===');
const byPaper2025 = {};
csv2025.slice(1).forEach((r) => {
  const paper = r[3];
  if (!byPaper2025[paper]) byPaper2025[paper] = [];
  byPaper2025[paper].push({
    question: r[0],
    year: r[1],
    marks: r[2],
    source: r[4],
  });
});

Object.keys(byPaper2025).forEach((p) => {
  console.log(`\n--- ${p} (${byPaper2025[p].length} Qs) ---`);
  byPaper2025[p].forEach((q, idx) => {
    console.log(`  ${idx + 1}. [${q.marks}m] ${q.question.slice(0, 90)}...`);
  });
});
