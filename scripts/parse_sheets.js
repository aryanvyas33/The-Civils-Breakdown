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
console.log('=== 2026 CSV ===');
console.log('Header:', csv2026[0]);
console.log('Total Rows:', csv2026.length - 1);
const papers2026 = {};
csv2026.slice(1).forEach((r) => {
  const p = r[3];
  papers2026[p] = (papers2026[p] || 0) + 1;
});
console.log('Papers breakdown:', papers2026);
console.log('First 3 rows:');
csv2026.slice(1, 4).forEach((r, idx) => {
  console.log(` Row ${idx + 1}:`, {
    question: r[0]?.slice(0, 100),
    marks: r[1],
    year: r[2],
    paper: r[3],
    source: r[4],
  });
});

const csv2025 = parseCSV(fs.readFileSync('./scripts/data_2025_default.csv', 'utf8'));
console.log('\n=== 2025 CSV ===');
console.log('Header:', csv2025[0]);
console.log('Total Rows:', csv2025.length - 1);
const papers2025 = {};
csv2025.slice(1).forEach((r) => {
  // Notice in 2025 header: questions,year,marks,gs paper,Source
  const p = r[3];
  papers2025[p] = (papers2025[p] || 0) + 1;
});
console.log('Papers breakdown:', papers2025);
console.log('First 3 rows:');
csv2025.slice(1, 4).forEach((r, idx) => {
  console.log(` Row ${idx + 1}:`, {
    question: r[0]?.slice(0, 100),
    year: r[1],
    marks: r[2],
    paper: r[3],
    source: r[4],
  });
});
