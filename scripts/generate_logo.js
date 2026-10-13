const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function run() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  // 1. Get exact background color from prism_logo_mark_cream.png
  const b64 = fs.readFileSync('public/prism_logo_mark_cream.png').toString('base64');
  await page.setContent(`
    <html><body>
      <canvas id="c"></canvas>
      <img id="img" src="data:image/png;base64,${b64}">
    </body></html>
  `);
  
  const sampledColor = await page.evaluate(() => {
    return new Promise((resolve) => {
      const img = document.getElementById('img');
      img.onload = () => {
        const canvas = document.getElementById('c');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const p = ctx.getImageData(5, 5, 1, 1).data;
        resolve('#' + [p[0], p[1], p[2]].map(x => x.toString(16).padStart(2, '0')).join(''));
      };
      if (img.complete) img.onload();
    });
  });

  console.log('Sampled Background Color:', sampledColor);

  // 2. Render new prism_logo_full.png
  await page.setViewport({ width: 640, height: 690, deviceScaleFactor: 2 });
  
  const renderHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800;900&family=DM+Sans:wght@900&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 640px;
            height: 690px;
            background-color: ${sampledColor};
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            overflow: hidden;
            font-family: 'Plus Jakarta Sans', 'DM Sans', -apple-system, sans-serif;
            -webkit-font-smoothing: antialiased;
          }
          .prism-img {
            width: 640px;
            height: 475px;
            display: block;
          }
          .text-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top: 18px;
            text-align: center;
          }
          .line1 {
            font-size: 58px;
            font-weight: 900;
            color: #1A1A1A;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            line-height: 1.0;
          }
          .line2 {
            font-size: 60px;
            font-weight: 900;
            color: #1A1A1A;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            line-height: 1.05;
            margin-top: 6px;
          }
        </style>
      </head>
      <body>
        <img class="prism-img" src="data:image/png;base64,${b64}">
        <div class="text-wrap">
          <div class="line1">THE CIVILS</div>
          <div class="line2">BREAKDOWN</div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(renderHtml, { waitUntil: 'networkidle0' });
  // Wait a small moment for font rendering
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: 'public/prism_logo_full.png',
    type: 'png',
    clip: { x: 0, y: 0, width: 640, height: 690 }
  });

  console.log('Successfully saved updated public/prism_logo_full.png');
  await browser.close();
}

run().catch(console.error);
