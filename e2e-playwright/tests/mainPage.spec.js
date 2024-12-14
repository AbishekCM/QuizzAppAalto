const { expect, test } = require("@playwright/test");

test("Main page has expected title and headings", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Quizes!");

  await expect(page.locator("h1")).toHaveText("Quiz application");

  await expect(page.locator("h2")).toHaveText("Quiz application statistics");
});
