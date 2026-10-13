const fs = require('fs');

async function inspectSpreadsheet(name, id) {
  console.log(`\n=== Inspecting ${name} (${id}) ===`);
  const editUrl = `https://docs.google.com/spreadsheets/d/${id}/edit`;
  const res = await fetch(editUrl);
  const html = await res.text();

  // Find sheet names and gids in bootstrap data
  const gidRegex = /gid=(\d+)/g;
  const gids = new Set();
  let m;
  while ((m = gidRegex.exec(html)) !== null) {
    gids.add(m[1]);
  }
  console.log(`Found possible gids in HTML for ${name}:`, Array.from(gids));

  // Let's also fetch the default CSV
  const csvUrl = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`;
  const csvRes = await fetch(csvUrl);
  const csvText = await csvRes.text();
  fs.writeFileSync(`./scripts/data_${name}_default.csv`, csvText, 'utf8');
  console.log(`Saved default CSV (${csvText.length} bytes) to scripts/data_${name}_default.csv`);

  // Try fetching each gid if more than 0
  for (const gid of gids) {
    const tabUrl = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;
    const tabRes = await fetch(tabUrl);
    if (tabRes.ok) {
      const tabText = await tabRes.text();
      fs.writeFileSync(`./scripts/data_${name}_gid_${gid}.csv`, tabText, 'utf8');
      console.log(`Saved gid ${gid} (${tabText.length} bytes, lines: ${tabText.split('\n').length})`);
    }
  }
}

async function main() {
  await inspectSpreadsheet('2026', '1WpaLj3RYnYPWFrCguc15AbbUmGu8b4vIlTAI5zlas4s');
  await inspectSpreadsheet('2025', '1Bn_Eyqit3d1Call3BZt1eypvuCG08ShWZdjv9nNyfhs');
}

main().catch(console.error);
