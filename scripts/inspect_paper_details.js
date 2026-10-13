const fs = require('fs');

function getPaperKey(raw) {
  const p = raw.toUpperCase();
  if (p.includes('ESSAY')) return 'essay';
  if (p.includes('IV') || p.includes('4')) return 'gs4';
  if (p.includes('III') || p.includes('3')) return 'gs3';
  if (p.includes('II') || p.includes('2')) return 'gs2';
  if (p.includes('I') || p.includes('1')) return 'gs1';
  return 'unknown';
}

const q26 = JSON.parse(fs.readFileSync('./scripts/raw_2026.json', 'utf8'));
const q25 = JSON.parse(fs.readFileSync('./scripts/raw_2025.json', 'utf8'));

let out = '';

['2026', '2025'].forEach((year) => {
  const list = year === '2026' ? q26 : q25;
  out += `\n========================================\n`;
  out += `          YEAR ${year} QUESTIONS       \n`;
  out += `========================================\n`;

  const papers = ['essay', 'gs1', 'gs2', 'gs3', 'gs4'];
  papers.forEach((pId) => {
    const pQs = list.filter((q) => getPaperKey(q.paperRaw) === pId);
    out += `\n--- Paper: ${pId.toUpperCase()} (${pQs.length} Questions) ---\n`;
    pQs.forEach((q, i) => {
      out += `Q${i + 1} [${q.marks}m]: ${q.text}\n`;
    });
  });
});

fs.writeFileSync('./scripts/inspection_output.txt', out, 'utf8');
console.log('Saved UTF-8 inspection_output.txt');
