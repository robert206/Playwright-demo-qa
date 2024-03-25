// @ts-check
// @ts-ignore
const {test, expect} = require('../fixture/PageObjectFixture');
//const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

test('0 1 TextBox page', async({page,homePage,textBoxPage}) => {
    await homePage.Elements.click();
    await expect(textBoxPage.textBoxLink).toBeVisible();
    await textBoxPage.textBoxLink.click();

    //check to be on text page
    await expect(textBoxPage.textBoxHeader).toHaveText("Text Box");

    // enter text in form
    await textBoxPage.enterText();
    await textBoxPage.verifyUserDetails();
    //await page.pause();
});

test ('0 2 CheckBox page', async({page, homePage, checkBoxPage}) => {
    await homePage.Elements.click();
    await expect(checkBoxPage.checkBoxLink).toBeVisible();
    await checkBoxPage.checkBoxLink.click();
    await page.pause();

    //check if im on checkbox page
    await expect(checkBoxPage.checkBoxPageTitle).toBeVisible();

    //expand all 
    await checkBoxPage.checkBoxExpandAll.click();
    //check if some of the folders are present and if all are there
    await checkBoxPage.checkFoldersSize(17);
    await checkBoxPage.checkAllFolders(0,"Home");
    await checkBoxPage.checkAllFolders(5,"WorkSpace")
    //collapse all
    await checkBoxPage.checkBoxCollapseAll.click();
    await checkBoxPage.checkFoldersSize(1);
    
});

test ('0 3 RadioButton page', async({page, homePage, radioBtnPage}) => {
    // go to radio btn page
    await homePage.Elements.click();
    await radioBtnPage.radioBtnLink.click();
    await expect (radioBtnPage.radioBtnHeader).toBeVisible;

    //yes btn
    await radioBtnPage.radioBtnYes.check();
    await expect (radioBtnPage.radioBtnYes).toBeChecked();
    //check for label
    await expect (radioBtnPage.radioMessage).toHaveText("Yes");
 
    //impressive btn
    await radioBtnPage.radioBtnImpressive.check();
    await expect  (radioBtnPage.radioBtnImpressive).toBeChecked();
    //check for label
    await expect (radioBtnPage.radioMessage).toHaveText("Impressive");

    //no btn
    await expect (radioBtnPage.radioBtnNo).toBeVisible; 

});

test.only ('0 4 WebTables page', async({page, homePage, webTablesPage}) => {
    await homePage.Elements.click();
    await webTablesPage.webTableLink.click();
    await expect(webTablesPage.webTableTitle).toBeVisible();
    await expect(webTablesPage.webTableAddBtn).toBeVisible();
    await expect(webTablesPage.webTableJumpToPage).toBeVisible();

    //table rows per page
    await webTablesPage.checkRowsPerPage();
    //await webTablesPage.webTableRowsPerPage.nth(0).click();
    await page.locator(".select-wrap > select:nth-child(1) > option:nth-child(2)").click();
    await webTablesPage.webTableRowsPerPage.nth(0).click();
    await page.pause();

});


