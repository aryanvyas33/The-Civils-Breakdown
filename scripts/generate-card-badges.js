const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, '../src/data/ai-deconstructions.json');
const outputPath = path.resolve(__dirname, '../src/data/card-badges.json');

try {
  const raw = require(inputPath);
  const items = Array.isArray(raw) ? raw : Object.values(raw);

  const badges = {};
  for (const item of items) {
    const qid = (item.question_id || item.id || '').toLowerCase().trim();
    if (!qid) continue;
    badges[qid] = {
      directiveWord: item.deconstruction?.directive?.word || '',
      primaryAnchor: item.taxonomy_mapping?.primary_anchor || '',
      microThemes: item.taxonomy_mapping?.micro_themes || [],
      coreConcepts: item.deconstruction?.core_concepts || [],
      stakeholders: item.stakeholders || [],
    };
  }

  fs.writeFileSync(outputPath, JSON.stringify(badges));
  console.log(`[BadgeGenerator] Generated ${outputPath} with ${Object.keys(badges).length} entries.`);
} catch (err) {
  console.error('[BadgeGenerator] Error generating card-badges.json:', err);
  process.exit(1);
}
