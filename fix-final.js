const fs = require('fs');

function fixQuestionPage() {
    let content = fs.readFileSync('d:\\UPSC PYQ SEARCHER\\src\\app\\question\\[questionId]\\page.tsx', 'utf8');

    // Restore ternaries that were replaced by -
    content = content.replace(/highlightKeywords\r?\n(\s*)\- /g, "highlightKeywords\n$1? ");
    content = content.replace(/\{highlightKeywords \- \(/g, "{highlightKeywords ? (");
    content = content.replace(/=== 'essay' \- /g, "=== 'essay' ? ");
    content = content.replace(/question\.paperId === 'essay' \- /g, "question.paperId === 'essay' ? ");
    content = content.replace(/\{question\.paperId === 'essay' \- /g, "{question.paperId === 'essay' ? ");
    content = content.replace(/\{copied \- /g, "{copied ? ");
    content = content.replace(/\{shared \- /g, "{shared ? ");
    content = content.replace(/\{bookmarked \- /g, "{bookmarked ? ");
    content = content.replace(/\{prevQ \- /g, "{prevQ ? ");
    content = content.replace(/\{nextQ \- /g, "{nextQ ? ");
    
    // Fallback for any ` - ` that is followed by `:` on the same line
    content = content.replace(/\n([ \t]*)(.+) \- (.+) \: /g, "\n$1$2 ? $3 : ");
    content = content.replace(/ \- 'italic' \: ''/g, " ? 'italic' : ''");
    content = content.replace(/ \- \`\&ldquo;(.+)\&rdquo;\`/g, " ? `&ldquo;$1&rdquo;`");

    fs.writeFileSync('d:\\UPSC PYQ SEARCHER\\src\\app\\question\\[questionId]\\page.tsx', content, 'utf8');
}

function fixHighYieldPage() {
    let content = fs.readFileSync('d:\\UPSC PYQ SEARCHER\\src\\app\\high-yield\\page.tsx', 'utf8');
    content = content.replace(/\{isEssayExcluded \- /g, "{isEssayExcluded ? ");
    fs.writeFileSync('d:\\UPSC PYQ SEARCHER\\src\\app\\high-yield\\page.tsx', content, 'utf8');
}

fixQuestionPage();
fixHighYieldPage();
