// @ts-check
// @ts-ignore
const { strict } = require('assert');
const {test,expect} = require('../fixture/PageObjectFixture');
const { create } = require('domain');
const { APIRequest } = require('../page-objects/APIRequest');
//const { HomePage } = require('../page-objects/HomePage');
//const dataset = JSON.parse(JSON.stringify(require("../test-data/TablesData.json")));

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

    await formsPage.formsPageFirstName.fill('Roberto');
    await formsPage.formsPageLastName.fill('Cecon');
    await formsPage.formsPageEmail.fill('drek@gate.com');
    await formsPage.formsPageGenders.last().click();
    //await formsPage.formsPageGender1.check();
    await formsPage.formsPageMobile.fill('0180600700');
    await formsPage.formsPageDateOfBirth.fill('08 Jan 1980');
    await formsPage.formsPageMobile.click();
    await formsPage.formsPageHobbies.last().click(); //select last option in hobbies
    await formsPage.formsPageCurrentAddress.fill('Drek 34 Fargo');
    await formsPage.formsSubmitBtn.click();

    //after submitting
    await expect (formsPage.formsPageSubmitTitle).toHaveText('Thanks for submitting the form');
    await expect(formsPage.formsPageSubmitTable.nth(1)).toContainText('Roberto Cecon');
});


test ('1 2 Alerts', async ({page,homePage,alertsPage}) => {
    await homePage.AlertsWindows.click();
    await alertsPage.alertsPageLink.click();
    await alertsPage.amIOnAlertsPage();

    await alertsPage.clickOnAlert1();
    await alertsPage.clickOnAlert2();
    //await alertsPage.confirmationMessageAlert();
});

test ('1 3 Alerts Confirmation', async ({page,homePage,alertsPage}) => {
    await homePage.AlertsWindows.click();
    await alertsPage.alertsPageLink.click();
    await alertsPage.amIOnAlertsPage();
    await alertsPage.confirmationMessageAlert();
});


test ('1 4 Modal dialogs', async ({homePage,modalPage}) => {
    await homePage.AlertsWindows.click();
    await modalPage.modalLink.click();
    //open small modal dialog
    await modalPage.modalSmallModalBtn.click();
    await expect (modalPage.modalSmallHeading).toContainText('Small Modal');
    await expect(modalPage.modalBodyText).toContainText('very less content');
    await modalPage.modalSmallClose.click();
    //check if modal was closed
    await expect( modalPage.modalSmallHeading).toHaveCount(0);

    //open large modal dialog
    await modalPage.modalLargeModalBtn.click();
    await expect (modalPage.modalLargeHeading).toContainText('Large Modal');
    await expect (modalPage.modalBodyText).toContainText('Lorem Ipsum');
    await modalPage.modalLargeClose.click();
    await expect (modalPage.modalLargeHeading).toHaveCount(0);
});


test ('2 1 Widgets-Accordian', async ({page,homePage,accordianPage}) => {
    await homePage.Widgets.click();
    await accordianPage.accordianLink.click();
    await accordianPage.amIOnAccordianPage();
    //click first accordion btn
    await accordianPage.accordianWhatBtn.click();
    await expect(accordianPage.accordianWhatBody).toContainText('Lorem Ipsum is simply dummy text');
    //click second accordion
    await accordianPage.accordianWhereBtn.click();
    await expect(accordianPage.accordianWhereBody.nth(0)).toContainText('Richard McClintock');

    //click third accordion 
    await accordianPage.accordianWhyBtn.click();
    await expect(accordianPage.accordianWhyBody).toContainText('normal distribution of letters');
    
});


test ('2 2 Autocomplete', async ({page,homePage}) => {
    await homePage.Widgets.click();
    await page.locator('span.text').filter({hasText:'Auto Complete'}).click();
    
    await page.locator('#autoCompleteMultipleInput').fill('R');
    await page.getByText('Purple', { exact: true }).click();

    await page.locator('#autoCompleteMultipleInput').fill('w');
    await page.getByText('Yellow', { exact: true }).click();

    await page.locator('#autoCompleteSingleInput').fill('r');
    await page.getByText('Red', { exact: true }).click();
    
    // check if they were added
    await expect(page.getByText('Red')).toBeVisible();
    await expect(page.getByText('Yellow')).toBeVisible();
    await expect(page.getByText('Purple')).toBeVisible();
});

/* test ('2 3 Sliders', async ({homePage,sliderPage}) => {
    await homePage.Widgets.click();
    await sliderPage.sliderPageLink.click();
    //await page.pause();
    //sliderPage.currentValue();
    sliderPage.moveSlider(50);
}); */

test ('2 3 Progress bar', async ({homePage,progressBarPage}) => {
    await homePage.Widgets.click();
    await progressBarPage.progressPageLink.click();

    let currentProgress = await progressBarPage.returnProgress();
    await expect(currentProgress).toEqual('0');
    await expect(progressBarPage.progressPageStartStopBtn).toHaveText('Start');

    //await progressBarPage.startProgressBar(50);// useless anyway as it never stops right on the dot,only max 100 counts as valid
    await progressBarPage.startProgressBar(100);
});

//all declared in test ,,tired of creating pages for now ..as it is for learning .I'll use approach to check attribute values here for assertions
test ('2 4 Tabs', async ({page,homePage}) => {
    await homePage.Widgets.click();
    await page.locator('span.text').filter({hasText:'Tabs'}).click();

    const demoWhat = page.locator('#demo-tab-what')
    await demoWhat.click();
    await expect(demoWhat).toHaveAttribute('aria-selected','true');

    const demoOrigin = page.locator ('#demo-tab-origin');
    await demoOrigin.click();
    await expect(demoOrigin).toHaveAttribute('aria-selected','true');

    const demoUse = page.locator ('#demo-tab-use');
    await demoUse.click();
    await expect(demoUse).toHaveAttribute('aria-selected','true');

    await expect(page.locator('#demo-tab-more')).toHaveAttribute('aria-disabled','true');

});

test ('2 5 Tooltips', async ({page, homePage}) => {
    await homePage.Widgets.click();
    await page.locator('span.text').filter({hasText:'Tool tips'}).click();

    const hoverBtn = page.locator ('#toolTipButton');
    await hoverBtn.hover();
    await expect(page.getByText('You hovered over the Button')).toBeVisible();

    await page.getByText('Contrary',{exact:true}).hover();
    await expect(page.getByText('You hovered over the Contrary')).toBeVisible();
});


test ('2 6 Select menu', async ({page, selectMenuPage,homePage}) => {
    await homePage.Widgets.click();
    await selectMenuPage.selectMenuLink.click();
    //select menu
    await expect(selectMenuPage.selectOption).toBeVisible();
    await selectMenuPage.selectOption.click();
    await expect(selectMenuPage.selectRootOption).toBeVisible();
    await selectMenuPage.selectRootOption.click();
    //select title one
    await selectMenuPage.selectOne.click();
    await selectMenuPage.selectProfesor.click();
    await expect(selectMenuPage.selectProfesor).toBeVisible();
    //select green color
    await page.selectOption('#oldSelectMenu','Green');
    //select car
    await page.selectOption('#cars','Audi');
});


test ('3 0 Interactions-Sortable', async ({page,homePage,interactionsPage}) => {
    await homePage.Interactions.click();
    await interactionsPage.sortableLink.click();

    page.waitForLoadState('domcontentloaded');

    await expect(interactionsPage.sortableListElements).toHaveCount(6);
    
    const sourceL = await interactionsPage.sortableListElements.nth(0);
    const destL = await interactionsPage.sortableListElements.nth(1);
    //await sourceL.dragTo(destL); // this official way doesnt work ..doesnt drag shit 
    //manual way //list
    await interactionsPage.dragAndDrop(sourceL,destL);
    await expect(sourceL).toHaveText('Two');
    await expect(destL).toHaveText('One');

    // grid
    await interactionsPage.sortableGrid.click();
    await expect(interactionsPage.sortableGridElements).toHaveCount(9);
    const sourceG = await interactionsPage.sortableGridElements.nth(0);
    const destG = await interactionsPage.sortableGridElements.nth(5);
    await interactionsPage.dragAndDrop(sourceG,destG);
    //await page.pause();
    await expect(sourceG).toHaveText('Two');
    await expect(destG).toHaveText('One');
});


test ('3 1 Interactions-Selectable', async ({page,homePage,interactionsPage}) => {
    await homePage.Interactions.click();
    await interactionsPage.selectableLink.click();
    page.waitForLoadState('domcontentloaded');
    await interactionsPage.selectableList.click();
    await expect(interactionsPage.selectableListItems).toHaveCount(4);
    
    // select all items in list
    await interactionsPage.selectAllListElements(interactionsPage.selectableListItems);
    await expect(interactionsPage.selectableListItemsSelected).toHaveCount(4); // all are selected
    // deselect some
    await interactionsPage.selectSingleListElement(interactionsPage.selectableListItems.nth(0));
    await expect(interactionsPage.selectableListItemsSelected).toHaveCount(3);

    //selectable grid
    await interactionsPage.selectableGrid.click();
    await expect(interactionsPage.selectableGridItems).toHaveCount(9);
    //select all 
    await interactionsPage.selectAllListElements(interactionsPage.selectableGridItems);
    await expect(interactionsPage.selectableGridItemsSelected).toHaveCount(9);
    //deselect some
    await interactionsPage.selectSingleListElement(interactionsPage.selectableGridItemsSelected.nth(0));
    await interactionsPage.selectSingleListElement(interactionsPage.selectableGridItemsSelected.nth(1));
    await expect(interactionsPage.selectableGridItemsSelected).toHaveCount(7);

    //browser.newPage({viewport: null}) i
});


test ('3 2 Interactions - Resizable', async ({page,homePage,interactionsPage}) => {
    await homePage.Interactions.click();
    await interactionsPage.resizableLink.click();
    const resizeBtn1 = page.locator('#resizableBoxWithRestriction > span');
    await resizeBtn1.hover();
    await page.mouse.down();
    await page.mouse.move(500,500);
    await page.mouse.up();
});


test ('3 3 Interactions - Droppable', async ({page,homePage,droppablePage,interactionsPage}) => {
    await homePage.Interactions.click();
    await droppablePage.droppablePageLink.click();
    await expect(page.url()).toEqual('https://demoqa.com/droppable');
    //first tab
    const source = droppablePage.droppableDragMe;
    const dest = droppablePage.droppableDropMe.first();
    await interactionsPage.dragAndDrop(source,dest);
    await expect(page.getByText('Dropped!')).toBeVisible();

});

// 
test ('4 Book Store', async ({page,homePage,bookStorePage}) => {
    await homePage.BookStore.click();
    await bookStorePage.loginLink.first().click();
    await expect(page.getByText('Login in Book Store', { exact:true})).toBeVisible();
    
 });


test ('API GET', async ({request, apiRequest}) => {
    //pass 'request' builtin into method or error
    //await apiRequest.getUserById(2,request); //GET
    await apiRequest.createNewUser(request);
});




