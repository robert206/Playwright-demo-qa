const {expect,page} = require('@playwright/test');
const formData = JSON.parse(JSON.stringify(require("../test-data/TablesData.json")));

class WebTablesPage {
    constructor(page) {
        this.page = page;
        this.webTableLink = page.locator('span.text').filter({hasText:'Web Tables'});
        this.webTableTitle = page.getByRole("heading", {name: "Web Tables"});
        this.webTableAddBtn = page.locator("#addNewRecordButton");
        this.webTableSearchField = page.locator("#searchBox");
        this.webTableNextBtn = page.getByRole('button', {name: "Next"});
        this.webTablePreviousBtn = page.getByRole('button', {name : "Previous"});
        // table elements
        this.webTable = page.locator("div.rt-table");
        this.webTableJumpToPage = page.locator("div.-pageJump input");
        this.webTableRowsPerPage = page.locator(".select-wrap.-pageSizeOptions select option")//rows per page table
        this.webTableRowsPPSelector = page.locator('[aria-label="rows per page"]');
        this.webTableHeader = page.locator("div.rt-resizable-header-content"); // all table headers 

        // registration form
        this.webTableFirstName = page.locator("#firstName");
        this.webTableLastName = page.locator("#lastName");
        this.webTableEmail = page.locator("#userEmail");
        this.webTableAge = page.locator("#age");
        this.webTableSalary = page.locator("#salary");
        this.webTableDepartment = page.locator("#department");
        this.webTableSubmitBtn = page.locator("#submit");
    }

    async checkRowsPerPage() {
        const expectedOptions = ["5 rows","10 rows","20 rows","25 rows","50 rows","100 rows"]

        await expect(this.webTableRowsPerPage).toHaveCount(6); //6 options
        //save all options into table for later
        const optTable = [];
        for (const option of await this.webTableRowsPerPage.all()) {
            const optionText = await option.textContent();
            optTable.push(optionText);
            //optTable.push(optionText.split(" ")[0]);
        }
        //compare actual options with expected
        for (let i=0; i < optTable.length;i++) {
            expect (expectedOptions[i]).toEqual(optTable[i]);
            //console.log(`${optTable[i]}`);
        }
    }

    
    //read data from json file and fill it in form 
    //also check if data was added correctly
    async populateUsers () {
        for (const currentUser of formData) {
            await this.webTableAddBtn.click();
            await this.webTableFirstName.fill(currentUser.firstName);
            await this.webTableLastName.fill(currentUser.lastName);
            await this.webTableAge.fill(currentUser.age);
            await this.webTableEmail.fill(currentUser.email);
            await this.webTableSalary.fill(currentUser.salary);
            await this.webTableDepartment.fill(currentUser.department);
            await this.webTableSubmitBtn.click();
            await expect (this.page.getByRole('gridcell', { name: currentUser.firstName, exact: true })).toBeVisible();
            await expect (this.page.getByRole('gridcell', { name: currentUser.lastName, exact:true })).toBeVisible();
            await expect (this.page.getByRole('gridcell', { name: currentUser.age, exact: true })).toBeVisible();
            await expect (this.page.getByRole('gridcell', { name: currentUser.email, exact: true })).toBeVisible();
            await expect (this.page.getByRole('gridcell', { name: currentUser.salary, exact: true })).toBeVisible();
            await expect (this.page.getByRole('gridcell', { name: currentUser.department, exact: true })).toBeVisible();
        }
    }

    async clickNextBtn() {
        this.webTableNextBtn.click();
    }

    async clickPreviousBtn() {
        this.webTablePreviousBtn.click();
    }

}

module.exports = {WebTablesPage};
