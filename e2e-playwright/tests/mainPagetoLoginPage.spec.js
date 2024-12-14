const { test, expect } = require("@playwright/test");

test("Can navigate to login page from main page", async ({ page }) => {
    await page.goto("/");

    await page.locator(`a:has-text("Login")`).click();

    await expect(page.locator("h1")).toHaveText("Login form");
});
