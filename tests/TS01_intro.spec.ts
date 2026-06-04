import {chromium, expect, test} from "@playwright/test";

test("TS01: first playwright test", async () => {
 
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.google.com");
  const title = await page.title();
  await expect(page).toHaveTitle(/Google/);
  console.log(`Page title: ${title}`); // Output: Page title: Google

  // await page.getByLabel("Google apps").click(); // Click on the "Google apps" button
});

test("TS01: second playwright test", async ({page}) => {

  await page.goto("https://www.google.com");
  const title = await page.title();
  await expect(page).toHaveTitle(/Google/);
  console.log(`Page title: ${title}`); // Output: Page title: Google

  // await page.getByLabel("Google apps").click(); // Click on the "Google apps" button
});