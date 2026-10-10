import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const base = process.env.QA_URL || "http://127.0.0.1:5187";
const routes = [
  "/",
  "/solutions",
  "/about",
  "/features",
  "/how-it-works",
  "/pricing",
  "/contact",
  "/projects/elovri",
  "/projects/empmetria",
  "/projects/chatbots",
  "/projects/calling",
  "/projects/crm",
  "/projects/whatsapp",
  "/projects/instagram",
  "/projects/office-automation",
  "/projects/monitoring",
  "/projects/meloqis",
  "/privacy",
  "/terms",
  "/refund",
  "/login",
  "/register",
  "/forgot-password",
];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
try {
  await mkdir("test-artifacts", { recursive: true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("**/api/chat", (route) =>
    route.fulfill({
      json: {
        success: true,
        reply:
          "Elvori is the Axenora client workspace for requests, proposals and milestones. ".repeat(
            18,
          ),
        topic: "elovri",
        leadIntent: false,
      },
    }),
  );
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 960 });
    for (const route of routes) {
      await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => document.querySelector("h1,h3"));
      const result = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 2,
        brokenImages: [...document.images]
          .filter((image) => image.complete && !image.naturalWidth)
          .map((image) => image.src),
        headings: document.querySelectorAll("h1").length,
        title: document.title,
      }));
      assert.equal(
        result.overflow,
        false,
        `${width} ${route} horizontal overflow`,
      );
      assert.deepEqual(
        result.brokenImages,
        [],
        `${width} ${route} missing image`,
      );
      if (!["/login", "/register"].includes(route))
        assert.equal(result.headings, 1, `${route} needs one H1`);
      results.push({ width, route, ...result });
      if (
        ["/", "/projects/elovri", "/projects/calling", "/contact"].includes(
          route,
        )
      ) {
        await page.evaluate(async () => {
          for (
            let position = 0;
            position < document.body.scrollHeight;
            position += 500
          ) {
            window.scrollTo(0, position);
            await new Promise((resolve) => setTimeout(resolve, 60));
          }
          window.scrollTo(0, 0);
        });
        await page.screenshot({
          path: `test-artifacts/${route.replaceAll("/", "-") || "home"}-${width}.png`,
          fullPage: true,
        });
      }
    }
  }
  await page.goto(base, { waitUntil: "networkidle" });
  const decline = page.getByRole("button", { name: "Decline", exact: true });
  if (await decline.isVisible()) await decline.click();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("link", { name: "AI Calling Agents", exact: true })
    .first()
    .click();
  await page.waitForURL("**/projects/calling");
  await page.getByRole("heading", { name: "AI calling agents", exact: true }).waitFor();
  assert.equal(await page.evaluate(() => scrollY), 0);
  await page.getByRole("button", { name: "Open AI assistant" }).click();
  await page
    .getByRole("button", { name: "Create a sales chatbot", exact: true })
    .click();
  const assistant = page.locator('[aria-label="Axenora AI assistant"]');
  await assistant
    .getByText("Elvori is the Axenora client workspace", { exact: false })
    .waitFor();
  const pane = page
    .locator('[aria-live="polite"]')
    .filter({ hasText: "Elvori is" });
  assert.ok(
    await pane.evaluate(
      (element) => element.scrollHeight > element.clientHeight,
    ),
  );
  await pane.evaluate((element) => {
    element.scrollTop = 0;
  });
  assert.equal(await pane.evaluate((element) => element.scrollTop), 0);
  await page.getByRole("button", { name: "Clear chat", exact: true }).click();
  assert.equal(
    await assistant
      .getByText("Elvori is the Axenora client workspace", { exact: false })
      .count(),
    0,
  );
  await page.getByRole("button", { name: "Minimize assistant" }).click();
  await page.goto(`${base}/contact`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Send brief" }).click();
  await page.getByText("Name must be at least 2 characters").waitFor();
  assert.deepEqual(errors, [], "Browser runtime errors");
  await writeFile(
    "test-artifacts/qa-results.json",
    JSON.stringify(
      {
        checks: results,
        chat: "mocked response, scroll and clear verified",
        contact: "invalid submission blocked",
        errors,
      },
      null,
      2,
    ),
  );
  console.log(
    `Passed ${results.length} page/viewport checks, mobile navigation, chat scroll/clear and contact validation.`,
  );
} finally {
  await browser.close();
}
