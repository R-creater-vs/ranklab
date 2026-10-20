import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const SCREENSHOTS_DOCS = path.resolve(__dirname, '../docs/screenshots');
const SCREENSHOTS_ARTIFACTS = path.resolve(__dirname, '../artifacts');

fs.mkdirSync(SCREENSHOTS_DOCS, { recursive: true });
fs.mkdirSync(SCREENSHOTS_ARTIFACTS, { recursive: true });

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(DIST_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    const fallback = path.join(DIST_DIR, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(fallback).pipe(res);
  }
});

const PORT = 5195;
server.listen(PORT, async () => {
  console.log(`HTTP Server running at http://localhost:${PORT}`);

  try {
    const playwrightPath = 'D:/Ran/ASCEND/node_modules/playwright/index.js';
    const pwModule = await import(pathToFileURL(playwrightPath).href);
    const chromium = pwModule.default?.chromium || pwModule.chromium;

    const browser = await chromium.launch({
      headless: true,
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    });

    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`http://localhost:${PORT}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const screenshots = [
      {
        name: '01-search-duel-view.png',
        setup: async () => {
          // Tab is Search Duel
          await page.waitForTimeout(300);
        },
      },
      {
        name: '02-evidence-envelope-view.png',
        setup: async () => {
          const tab = page.locator('header button:has-text("Evidence Envelope")');
          await tab.click();
          await page.waitForTimeout(300);
        },
      },
      {
        name: '03-witness-assignment-inspection.png',
        setup: async () => {
          const btn = page.locator('button:has-text("Reveal Min Witness")');
          await btn.click();
          await page.waitForTimeout(300);
        },
      },
      {
        name: '04-judgment-desk-blinded.png',
        setup: async () => {
          const tab = page.locator('header button:has-text("Judgment Desk")');
          await tab.click();
          await page.waitForTimeout(300);
        },
      },
      {
        name: '05-minimax-next-judgment.png',
        setup: async () => {
          // Unblind mode to show metadata
          const unblindBtn = page.locator('button:has-text("Blinded Review (ON)")');
          if (await unblindBtn.count() > 0) {
            await unblindBtn.click();
          }
          await page.waitForTimeout(300);
        },
      },
      {
        name: '06-regression-map-heatmap.png',
        setup: async () => {
          const tab = page.locator('header button:has-text("Regression Map")');
          await tab.click();
          await page.waitForTimeout(300);
        },
      },
      {
        name: '07-heldout-split-analysis.png',
        setup: async () => {
          const heldOutBtn = page.locator('button:has-text("Held-Out Evaluation Set")');
          await heldOutBtn.click();
          await page.waitForTimeout(300);
        },
      },
      {
        name: '08-run-notebook-reproducibility.png',
        setup: async () => {
          const tab = page.locator('header button:has-text("Run Notebook")');
          await tab.click();
          await page.waitForTimeout(300);
        },
      },
    ];

    for (const s of screenshots) {
      console.log(`Capturing ${s.name}...`);
      await s.setup();
      const docsFile = path.join(SCREENSHOTS_DOCS, s.name);
      const artFile = path.join(SCREENSHOTS_ARTIFACTS, s.name);
      await page.screenshot({ path: docsFile, fullPage: false });
      fs.copyFileSync(docsFile, artFile);
      console.log(`Saved: ${docsFile}`);
    }

    await browser.close();
    console.log('All 8 screenshots captured successfully!');
  } catch (err) {
    console.error('Error during screenshot capture:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
