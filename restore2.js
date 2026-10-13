const fs = require('fs');
let content = fs.readFileSync('d:\\UPSC PYQ SEARCHER\\src\\app\\high-yield\\page.tsx', 'utf8');

content = content.replace(/searchParams\-\:/g, 'searchParams?:');
content = content.replace(/searchParams\-\.exclude/g, 'searchParams?.exclude');
content = content.replace(/isEssayExcluded \- /g, 'isEssayExcluded ? ');
content = content.replace(/\/search\-q=/g, '/search?q=');
content = content.replace(/c\.tierLevel === 1 \- /g, 'c.tierLevel === 1 ? ');
content = content.replace(/: c\.tierLevel === 2 \- /g, ': c.tierLevel === 2 ? ');
content = content.replace(/const height = hasQ \- /g, 'const height = hasQ ? ');
content = content.replace(/\{isEssayExcluded \- /g, '{isEssayExcluded ? ');
content = content.replace(/              \- \Calibrated/g, '              ? Calibrated');
content = content.replace(/dYZ\_/g, '??');
content = content.replace(/dY\\"s/g, '??');
content = content.replace(/GS1\\?\"GS4/g, 'GS1-GS4');

fs.writeFileSync('d:\\UPSC PYQ SEARCHER\\src\\app\\high-yield\\page.tsx', content, 'utf8');
console.log('Restored HY');
