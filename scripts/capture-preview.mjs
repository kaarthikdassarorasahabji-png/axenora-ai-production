import { chromium } from "@playwright/test";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const context = await browser.newContext();
  await context.addCookies([
    {
      name: "cookie-consent",
      value: "declined",
      domain: "127.0.0.1",
      path: "/",
    },
  ]);
  const page = await context.newPage();
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("http://127.0.0.1:5187", { waitUntil: "networkidle" });
  await page.screenshot({ path: "test-artifacts/home-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "test-artifacts/home-mobile.png" });
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.screenshot({
    path: "public/images/axenora-social.jpg",
    type: "jpeg",
    quality: 85,
  });
} finally {
  await browser.close();
}
