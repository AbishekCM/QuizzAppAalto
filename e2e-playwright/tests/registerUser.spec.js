const { test, expect } = require("@playwright/test");

test("Can register user", async ({ page }) => {
    const userEmail = `My${Math.random()}@gmail.com`;
    const userPwd = `Pwd${Math.random()}`;

    await page.goto("/auth/register");

    await expect(page.locator("h1")).toHaveText("Registration form");

    await page.locator("input[type=email]").type(userEmail);
    await page.locator("input[type=password]").type(userPwd);

    await page.locator('input[type=submit][value="Register"]')
        .click();

    await expect(page.locator("h1")).toHaveText("Login form");
});
