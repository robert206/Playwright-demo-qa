const {expect,page} = require('@playwright/test');

class WebTablesPage {
    constructor(page) {
        this.page = page;
        this.webTableLink = page.locator('span.text').filter({hasText:'Web Tables'});
        this.webTableTitle = page.getByRole("heading", {name: "Web Tables"});
        this.webTableAddBtn = page.locator("#addNewRecordButton");
        this.webTableSearchField = page.locator("#searchBox");
        // table elements
        this.webTable = page.locator("div.rt-table");
        this.webTableJumpToPage = page.locator("div.-pageJump input");
        this.webTableRowsPerPage = page.locator(".select-wrap.-pageSizeOptions select option")//rows per page selector
        this.webTableHeader = page.locator("div.rt-resizable-header-content"); // all table headers 

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
}

module.exports = {WebTablesPage};
