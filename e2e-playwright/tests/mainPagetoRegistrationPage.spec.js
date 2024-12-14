const { test, expect } = require("@playwright/test");

test("Can navigate to register page from main page", async ({ page }) => {
    await page.goto("/");

    await page.locator(`a:has-text("Register")`).click();

    await expect(page.locator("h1")).toHaveText("Registration form");
});
