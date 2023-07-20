import puppeteer from 'puppeteer';
import * as fs from 'fs';

const data = JSON.parse(fs.readFileSync('targets.json', 'utf8'));

const launch = async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  return { page, browser };
};

const collectData = async (page, key) => {
  await page.goto(key.url);
  const els = key.els;
  await page.waitForSelector(els[els.length - 1].name);
  for(let i = 0; i < els.length; i++) await (await page.$(els[i].name)).screenshot({path: els[i].dst});
};

(async () => {
  const { page, browser } = await launch();
  const keys = Object.keys(data);
  for(let i = 0; i < keys.length; i++) await collectData(page, data[keys[i]]);
  await browser.close();
})();