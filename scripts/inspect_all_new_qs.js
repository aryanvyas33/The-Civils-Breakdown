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

fs.writeFileSync(
  './scripts/raw_2026.json',
  JSON.stringify(
    csv2026.slice(1).map((r, i) => ({
      index: i + 1,
      text: r[0],
      marks: parseInt(r[1], 10) || 10,
      year: parseInt(r[2], 10) || 2026,
      paperRaw: r[3],
    })),
    null,
    2
  ),
  'utf8'
);

fs.writeFileSync(
  './scripts/raw_2025.json',
  JSON.stringify(
    csv2025.slice(1).map((r, i) => ({
      index: i + 1,
      text: r[0],
      year: parseInt(r[1], 10) || 2025,
      marks: parseInt(r[2], 10) || 10,
      paperRaw: r[3],
    })),
    null,
    2
  ),
  'utf8'
);

console.log('Saved raw_2026.json and raw_2025.json');
