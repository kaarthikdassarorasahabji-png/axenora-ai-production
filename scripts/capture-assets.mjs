import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  await mkdir("public/images", { recursive: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 1,
  });
  await page.goto("https://elovri.axenoraai.in", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.screenshot({
    path: "public/images/elovri-site.jpg",
    type: "jpeg",
    quality: 85,
  });
  console.log("Captured actual Elvori website.");
} finally {
  await browser.close();
}
