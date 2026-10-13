const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

const artifactDir = 'C:\\Users\\Aryan\\.gemini\\antigravity\\brain\\59ef8d5f-b69b-4c80-ad42-97cf9d08dc7d';
const localDir = path.join(__dirname, '../screenshots');

if (!fs.existsSync(localDir)) {
  fs.mkdirSync(localDir, { recursive: true });
}

const targets = [{ name: '23-exact-syllabus-pointer.png', url: 'http://localhost:3000/question/gs2-2026-q12', width: 1280, height: 950 },
  { name: '04-question-detail-desktop.png', url: 'http://localhost:3000/question/gs2-2023-q5', width: 1280, height: 950 },
  { name: '10-2026-search-desktop.png', url: 'http://localhost:3000/search?year=2026', width: 1280, height: 950 },
  { name: '11-2026-question-detail.png', url: 'http://localhost:3000/question/gs1-2026-q1', width: 1280, height: 950 },
  { name: '12-highlight-question-detail.png', url: 'http://localhost:3000/question/gs1-2026-q1', width: 1280, height: 950 },
  { name: '13-highlight-search-2026.png', url: 'http://localhost:3000/search?year=2026', width: 1280, height: 950 },
  { name: '14-highlight-gs2-cci.png', url: 'http://localhost:3000/question/gs2-2023-q5', width: 1280, height: 950 },
  { name: '15-highlight-paper-listing.png', url: 'http://localhost:3000/papers/gs1', width: 1280, height: 950 },
];

async function run() {
  console.log('Launching browser with:', executablePath);
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();

  for (const target of targets) {
    console.log(`Navigating to ${target.url} for ${target.name}...`);
    await page.setViewport({ width: target.width, height: target.height, deviceScaleFactor: 1 });
    await page.goto(target.url, { waitUntil: 'networkidle0', timeout: 30000 });

    const localPath = path.join(localDir, target.name);
    const artifactPath = path.join(artifactDir, target.name);

    await page.screenshot({ path: localPath, fullPage: false });
    await page.screenshot({ path: artifactPath, fullPage: false });
    console.log(`✓ Saved ${target.name} to local and artifact directory`);
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error taking screenshots:', err);
  process.exit(1);
});
