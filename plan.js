const fs = require('fs');

let content = fs.readFileSync('d:\\UPSC PYQ SEARCHER\\src\\app\\question\\[questionId]\\page.tsx', 'utf8');

// Fix optional chaining
content = content.replace(/\-\./g, '?.');

// Fix ternaries: look for -  or - ( or - < which are likely ?  or ? ( or ? <
// Wait, I can just match:  -  ->  ?  if there's a : later on the line or next lines.
// Actually, let's do safe replacements:
content = content.replace(/ \- /g, ' ? ');
content = content.replace(/ \- \(/g, ' ? (');
content = content.replace(/ \- \</g, ' ? <');
content = content.replace(/ \- \/g, ' ? ');
content = content.replace(/ \- \'/g, ' ? \'');
content = content.replace(/ \- \"/g, ' ? \"');
content = content.replace(/\{highlightKeywords \- /g, '{highlightKeywords ? ');
content = content.replace(/\{copied \- /g, '{copied ? ');
content = content.replace(/\{shared \- /g, '{shared ? ');
content = content.replace(/\{bookmarked \- /g, '{bookmarked ? ');
content = content.replace(/\{prevQ \- /g, '{prevQ ? ');
content = content.replace(/\{nextQ \- /g, '{nextQ ? ');
content = content.replace(/\/search\-q\=/g, '/search?q=');
// But wait, are there legitimate  -  (minus signs) in the file?
// Let's check original file minus signs!
