import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
const base = process.env.QA_URL || "http://127.0.0.1:5187";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const context = await browser.newContext();
  await context.addCookies([{ name: "cookie-consent", value: "declined", domain: new URL(base).hostname, path: "/" }]);
  const page = await context.newPage();
  for (const [width, height] of [[320, 667], [768, 1024], [1920, 1080]]) {
    await page.setViewportSize({ width, height });
    for (const route of ["/", "/solutions", "/projects/monitoring", "/projects/meloqis", "/about", "/pricing"]) {
      await page.goto(base + route, { waitUntil: "networkidle" });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2), false, route + " overflow at " + width);
      if (route.startsWith("/projects")) assert.equal(await page.locator(".studio img").count(), 0, "No actual software screenshots");
    }
  }
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto(base + "/solutions", { waitUntil: "networkidle" });
  assert.equal(await page.locator(".studio-product").count(), 10);
  await page.getByRole("button", { name: "Workforce", exact: true }).click();
  assert.equal(await page.locator(".studio-product").count(), 2);
  await page.getByRole("button", { name: "All systems", exact: true }).click();
  await page.getByRole("searchbox", { name: "Search solutions" }).fill("lyrics");
  assert.equal(await page.locator(".studio-product").count(), 1);
  await page.getByRole("searchbox", { name: "Search solutions" }).fill("no-such-product");
  await page.getByText("No matching systems.").waitFor();
  await page.getByRole("searchbox", { name: "Search solutions" }).fill("");
  await page.getByRole("button", { name: "Our solutions", exact: true }).click();
  assert.equal(await page.locator("#solutions-menu").isVisible(), true);
  await page.keyboard.press("Escape");
  await page.locator("#solutions-menu").waitFor({ state: "hidden" });
  const animated = page.locator(".art-system").first();
  const start = await animated.evaluate(el => getComputedStyle(el).transform);
  await page.waitForTimeout(500);
  assert.notEqual(await animated.evaluate(el => getComputedStyle(el).transform), start, "Concept art animates");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "networkidle" });
  assert.ok(parseFloat(await page.locator(".art-system").first().evaluate(el => getComputedStyle(el).animationDuration)) <= 0.01);
  assert.equal(await page.evaluate(() => document.documentElement.classList.contains("lenis-smooth")), false, "Reduced motion uses native scroll");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(base + "/projects/calling", { waitUntil: "networkidle" });
  await page.evaluate(async () => { for(let y=0; y<document.body.scrollHeight; y+=500) { window.scrollTo(0,y); await new Promise(r=>setTimeout(r,90)); } window.scrollTo(0,0); });
  await page.waitForTimeout(600);
  await page.screenshot({ path: "test-artifacts/calling-redesign.png", fullPage: true });
  await page.goto(base + "/solutions", { waitUntil: "networkidle" });
  await page.evaluate(async () => { for(let y=0; y<document.body.scrollHeight; y+=600) { window.scrollTo(0,y); await new Promise(r=>setTimeout(r,100)); } window.scrollTo(0,0); });
  await page.screenshot({ path: "test-artifacts/solutions-redesign.png", fullPage: true });
  console.log("Passed 18 additional responsive checks, all 10 projects, filters, search, menu dismissal, actual animation and reduced-motion behavior.");
} finally { await browser.close(); }
