import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = "http://127.0.0.1:8765";
const paths = {
  es: "/es/servicios-y-precios/",
  en: "/en/services-and-prices/",
  fr: "/fr/services-et-prix/",
  pt: "/pt/servicos-e-precos/",
};
const browser = await chromium.launch({ headless: true });

try {
  for (const [lang, catalogue] of Object.entries(paths)) {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      const response = await page.goto(base + "/?lang=" + lang);
      assert.equal(response?.status(), 200);
      await page.locator("body.iha-nav-ready .home-picker").waitFor({ state: "visible" });
      assert.equal((await page.locator("html").getAttribute("lang"))?.slice(0, 2), lang);
      assert.equal(await page.locator(".home-option").count(), 3);

      const pricingLink = page.locator("header details:has(.iha-nav-price) a").first();
      assert.equal(await pricingLink.getAttribute("href"), catalogue);
      assert.ok(await page.locator("header .home-nav-agents").count());
      const pricing = await page.goto(base + catalogue);
      assert.equal(pricing?.status(), 200);
      const offers = page.locator("[aria-labelledby='iha-offer-title'] article");
      assert.equal(await offers.count(), 3);
      await offers.nth(1).locator("summary").click();
      assert.ok(await offers.nth(1).locator("a[href*='finca']").isVisible());
      assert.equal(await page.locator("main a[href*='online-course'], main a[href*='anfitrion-en-regla'], main a[href*='anfitriao-em-dia']").evaluateAll(links => links.filter(link => /curso|course|cours/.test(link.href)).length), 0);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), "Pricing fits viewport");
      if (width === 1440) {
        await page.goto(base + "/?lang=" + lang + "#servicios");
        const purchase = page.locator("#sv-pick");
        await purchase.waitFor({ state: "attached" });
        for (const id of ["curso", "consulta", "modelos", "pack"]) {
          assert.equal(await purchase.locator("option[value='" + id + "']").count(), 0, id + " is no longer requestable");
        }
      }
      assert.deepEqual(errors, []);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
