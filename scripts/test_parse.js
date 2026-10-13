const fs = require('fs');

function parseCsv(text) {
  const lines = text.trim().split('\n');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const parts = [];
    let cur = '';
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      if (c === '"') {
        if (inQuotes && line[j + 1] === '"') {
          cur += '"';
          j++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        parts.push(cur.trim());
        cur = '';
      } else {
        cur += c;
      }
    }
    parts.push(cur.trim());
    rows.push(parts);
  }
  return rows;
}

const content = fs.readFileSync('scripts/raw_tracker_76.csv', 'utf8');
const rows = parseCsv(content);
console.log('Total parsed rows:', rows.length);
console.log('Row 1 num, title, rank, band:', rows[0][0], rows[0][2], rows[0][24], rows[0][26]);
console.log('Row 76 num, title, rank, band:', rows[75][0], rows[75][2], rows[75][24], rows[75][26]);
const bandA = rows.filter(r => r[26] === 'A').length;
const bandB = rows.filter(r => r[26] === 'B').length;
const bandC = rows.filter(r => r[26] === 'C').length;
console.log('Bands count:', { bandA, bandB, bandC, total: bandA + bandB + bandC });
