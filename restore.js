const fs = require('fs');

let content = fs.readFileSync('d:\\UPSC PYQ SEARCHER\\src\\app\\question\\[questionId]\\page.tsx', 'utf8');

content = content.replace(/\-\./g, '?.');
content = content.replace(/\/search\-q=/g, '/search?q=');
content = content.replace(/questionId \- getQuestionById/g, 'questionId ? getQuestionById');
content = content.replace(/question \- getSubjectById/g, 'question ? getSubjectById');
content = content.replace(/queryParam \- \[/g, 'queryParam ? [');
content = content.replace(/questionId \- getRelatedQuestionsForQuestion/g, 'questionId ? getRelatedQuestionsForQuestion');
content = content.replace(/> 0 \- question\.staticCore/g, '> 0 ? question.staticCore');
content = content.replace(/=== 'essay' \- /g, "=== 'essay' ? ");
content = content.replace(/highlightKeywords \- /g, 'highlightKeywords ? ');
content = content.replace(/\{copied \- /g, '{copied ? ');
content = content.replace(/\{shared \- /g, '{shared ? ');
content = content.replace(/\{bookmarked \- /g, '{bookmarked ? ');
content = content.replace(/\{prevQ \- /g, '{prevQ ? ');
content = content.replace(/\{nextQ \- /g, '{nextQ ? ');
content = content.replace(/ > 0 \- paperQuestions/g, ' > 0 ? paperQuestions');
content = content.replace(/ - 1 \- paperQuestions/g, ' - 1 ? paperQuestions'); 

fs.writeFileSync('d:\\UPSC PYQ SEARCHER\\src\\app\\question\\[questionId]\\page.tsx', content, 'utf8');
console.log('Restored');
