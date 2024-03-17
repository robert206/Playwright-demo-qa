const {test,expect} = require('@playwright/test');


/* test.only('Playwright page test', async ({page})=>
{
    await page.goto("https://www.google.com/");
    console.log(await page.title());
    await expect (page).toHaveTitle("Google");

}); */

test("Init page", async ({ page }) => {
    console.log(process.env.BASE_URL);
});

test.only('Sauce login page', async({page})=> {
    const user = page.locator("#user-name");
    const password = page.locator("#password");
    const loginBtn = page.locator("#login-button");
    const category = page.locator("//span[@class='title']");
    // first product of many elements selector
    const firstProduct = page.locator("[class='inventory_item_name ']").nth(0); 
    //list of all elements 
    const allProducts = page.locator("[class='inventory_item_name ']");
    //isti drek samo z first()
    //const firstProduct = page.locator("[class='inventory_item_name ']").first(); 

    await page.goto("/");
    //await page.locator("#user-name").fill("standard_user");
    //await page.locator("#password").fill("secret_sauce");
    //await page.locator("#login-button").click();
    await user.fill("standard_user");
    await password.fill("secret_sauce");
    await loginBtn.click();

    //wait for all to be loaded
    await page.waitForLoadState("networkidle");
    console.log(await category.textContent());
    console.log(await firstProduct.textContent());

    const allProductNames = allProducts.allTextContents();
    console.log(await allProductNames);
    page.pause();
    
});




/* test('Browser Context playwright test', async ({browser,page})=>
{
    chrome - plugins/ cookies 
    const context = await browser.newContext();
    const page = await context().newPage;
    await page.goto("https://courses.rahulshettyacademy.com/courses/")
    await page.pause()
}); */