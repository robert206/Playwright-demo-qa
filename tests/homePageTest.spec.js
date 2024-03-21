
// @ts-check
// @ts-ignore
import { test, expect } from "../fixture/PageObjectFixture.js";

test('0 0 Home Page check',async ({page,homePage}) => {
    await expect(homePage.Elements).toBeVisible();
    await expect(homePage.Forms).toBeVisible();
    await expect(homePage.Widgets).toBeVisible();
    await expect(homePage.Interactions).toBeVisible();
    await expect(homePage.AlertsWindows).toBeVisible();
    await expect(homePage.BookStore).toBeVisible();
    await page.pause();
});

