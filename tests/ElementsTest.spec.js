// @ts-check
// @ts-ignore
const {test, expect} = require('../fixture/PageObjectFixture');
const dataset = JSON.parse(JSON.stringify(require("../test-data/TablesData.json")));

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

test ('0 4 WebTables page', async({page, homePage, webTablesPage}) => {

    await homePage.Elements.click();
    await webTablesPage.webTableLink.click();
    await expect(webTablesPage.webTableTitle).toBeVisible();
    await expect(webTablesPage.webTableAddBtn).toBeVisible();
    await expect(webTablesPage.webTableJumpToPage).toBeVisible();

    //table rows per page
    await webTablesPage.checkRowsPerPage();
    await webTablesPage.populateUsers();

    //switch to 5 rows per page
    await page.selectOption('[aria-label="rows per page"]','5');// select 5 rows per
    //click next btn to go to page2 after new users were added
    await webTablesPage.clickNextBtn();
    //check if you are on second page
    await expect (page.getByRole('gridcell', { name: "Bojan", exact: true })).toBeVisible();
    //go back to first page
    await webTablesPage.clickPreviousBtn();
    //check if im on first page
    await expect (page.getByRole('gridcell', { name: "Cierra", exact: true })).toBeVisible();
});


test ('0 5 Buttons page', async({page,homePage,buttonsPage}) => {
    await homePage.Elements.click();
    await buttonsPage.buttonsPageLink.click();
    await expect(page).toHaveURL('https://demoqa.com/buttons');

    await buttonsPage.clickDoubleClickBtn();
    await buttonsPage.rightClick();
    await buttonsPage.dynamicClick();
});

test ('0 6 Links page', async({homePage,linksPage}) => {
    await homePage.Elements.click();
    await linksPage.linksPageLink.click();
    await linksPage.openNewTab();
    await linksPage.checkApiStatus("201");
    await linksPage.checkApiStatus("204");
    await linksPage.checkApiStatus("301");
    await linksPage.checkApiStatus("400");
    await linksPage.checkApiStatus("401");
    await linksPage.checkApiStatus("404");
});

test ('0 7 Download and Upload of file', async ({page,homePage}) => {
    await homePage.Elements.click();

    await page.getByText ('Upload and Download', { exact: true }).click();
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#downloadButton').click();
    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file somewhere.
    await download.saveAs('D:/' + download.suggestedFilename());
    expect(download.suggestedFilename()).toBe("sampleFile.jpeg");
    await page.pause();

    //upload 
    //const fileChooserPromise = page.waitForEvent('filechooser');
    //await page.getByLabel('Select a file').click();
    //await page.locator('#uploadFile"]').setInputFiles('fixture.pdf');
    //await page.getByLabel('Select a file').setInputFiles('ScriptHookV');
    //await expect(page.locator('#uploadedFilePath')).hasText('C:\fakepath\ScriptHookV');

});

test ('1 1 Practice Forms', async ({page,homePage,formsPage}) => {
    await homePage.Forms.click();
    await formsPage.formsPageLink.click();
    await expect(page.url()).toEqual('https://demoqa.com/automation-practice-form');


});







