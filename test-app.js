const { chromium } = require('./node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  
  await page.goto('http://localhost:5175/');
  await page.waitForTimeout(1000);
  await page.click('text=Zeus');
  await page.waitForTimeout(600);
  await page.screenshot({ path: './god-selected.png' });
  
  await page.click('text=Begin met Zeus');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './schepping.png', fullPage: true });
  
  await page.goto('http://localhost:5175/godentijd');
  await page.waitForTimeout(800);
  await page.screenshot({ path: './godentijd.png', fullPage: true });
  
  await page.goto('http://localhost:5175/heldentijd');
  await page.waitForTimeout(800);
  await page.screenshot({ path: './heldentijd.png', fullPage: true });
  
  await browser.close();
  console.log('done');
})().catch(e => { console.error(e.message); process.exit(1); });
