const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/dYZ_/g, '??');
  content = content.replace(/dY"s/g, '??');
  content = content.replace(/GS1\?"GS4/g, 'GS1-GS4');
  content = content.replace(/\?"/g, '-');
  content = content.replace(/\?/g, '-');
  fs.writeFileSync(file, content, 'utf8');
}

fix('d:\\UPSC PYQ SEARCHER\\src\\app\\high-yield\\page.tsx');
fix('d:\\UPSC PYQ SEARCHER\\src\\app\\question\\[questionId]\\page.tsx');
console.log('Fixed');
