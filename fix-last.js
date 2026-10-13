const fs = require('fs');

// Fix questionId
let contentQ = fs.readFileSync('d:\\UPSC PYQ SEARCHER\\src\\app\\question\\[questionId]\\page.tsx', 'utf8');
contentQ = contentQ.replace(/paperQuestions\[index \? 1\]/g, 'paperQuestions[index - 1]');
contentQ = contentQ.replace(/length \? 1 \?/g, 'length - 1 ?');
fs.writeFileSync('d:\\UPSC PYQ SEARCHER\\src\\app\\question\\[questionId]\\page.tsx', contentQ, 'utf8');

// Fix high-yield
let contentH = fs.readFileSync('d:\\UPSC PYQ SEARCHER\\src\\app\\high-yield\\page.tsx', 'utf8');
contentH = contentH.replace(/\- \`Calibrated for/g, '? `Calibrated for');
fs.writeFileSync('d:\\UPSC PYQ SEARCHER\\src\\app\\high-yield\\page.tsx', contentH, 'utf8');
