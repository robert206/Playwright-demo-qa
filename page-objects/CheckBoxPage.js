const {expect,page} = require('@playwright/test');

class CheckBoxPage {
    constructor(page) {
        this.page = page;
        this.checkBoxLink = page.locator('span.text').filter({hasText:'Check Box'});
        this.checkBoxPageTitle = page.getByRole('heading', { name: 'Check Box' })
        this.checkBoxExpandAll = page.locator("button.rct-option.rct-option-expand-all");
        this.checkBoxCollapseAll = page.locator("button.rct-option.rct-option-collapse-all");
        this.checkBoxFolders = page.locator("span.rct-title"); //array of folders
    }

    
    async checkFoldersSize(expectedSize) {
        const actualSize = await this.checkBoxFolders.count();
        expect (actualSize).toEqual(expectedSize);
    }


    checkAllFolders = async (index,folderName) => {
        console.log('dsfd ',await this.checkBoxFolders.nth(index).textContent());
        //check if nth element has expected text
        const actualFolderName = await this.checkBoxFolders.nth(index).textContent();
        expect (actualFolderName).toEqual(folderName);
    }

}

module.exports = {CheckBoxPage};