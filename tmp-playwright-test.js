const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Dark mode screenshot
  await page.screenshot({ path: '/tmp/hero-dark.png', fullPage: false });

  // Switch to light mode
  const themeBtn = page.locator('.theme-btn');
  await themeBtn.click();
  await page.waitForTimeout(500);

  // Light mode screenshot
  await page.screenshot({ path: '/tmp/hero-light.png', fullPage: false });

  // Get computed styles of buttons in light mode
  const buttons = await page.locator('.hero-actions .btn-outline').all();
  for (let i = 0; i < buttons.length; i++) {
    const b = buttons[i];
    const text = await b.textContent();
    const styles = await b.evaluate(el => {
      const cs = getComputedStyle(el);
      return {
        color: cs.color,
        opacity: cs.opacity,
        border: cs.border,
        borderColor: cs.borderColor,
        borderWidth: cs.borderWidth,
        display: cs.display,
        visibility: cs.visibility,
        background: cs.background,
      };
    });
    console.log(`Button "${text.trim()}":`, JSON.stringify(styles, null, 2));
  }

  // Check theme attribute
  const themeAttr = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  console.log('data-theme:', themeAttr);

  await browser.close();
})();
