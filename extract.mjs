import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  console.log('Starting browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('Navigating to framefolio...');
  await page.goto('https://framefolio.in/JashanMadaan', { waitUntil: 'networkidle' });

  // Wait for the skeleton loaders (animate-pulse) to disappear or wait a bit
  await page.waitForTimeout(5000); 

  console.log('Extracting data...');
  // The layout has two main columns. 
  // Let's grab all texts to extract name/bio and search for iframes or videos.
  
  const html = await page.content();
  fs.writeFileSync('page.html', html);


  await browser.close();
  console.log('Done.');
})();
