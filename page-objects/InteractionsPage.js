const {expect,page} = require('@playwright/test');

class InteractionsPage {
    constructor(page) {
        this.page = page;
        //sortable
        this.sortableLink = page.locator('span.text').filter({hasText:'Sortable'});
        this.sortableList = page.locator('#demo-tab-list');
        this.sortableGrid = page.locator('#demo-tab-grid');
        this.sortableListElements = page.locator('.vertical-list-container > div');
        this.sortableGridElements = page.locator('.create-grid > div');

        //selectable page
        this.selectableLink = page.locator('span.text').filter({hasText:'Selectable'});
        this.selectableList = page.locator('#demo-tab-list');
        this.selectableGrid = page.locator('#demo-tab-grid');
        this.selectableListItems = page.locator('li.mt-2.list-group-item'); // returns n-list items
        this.selectableListItemsSelected = page.locator('li.mt-2.list-group-item.active'); // returns list of selected elements -active class
        this.selectableGridItems = page.locator('#gridContainer > div > li.list-group-item.list-group-item-action'); //list of all items
        this.selectableGridItemsSelected = page.locator('#gridContainer > div > li.list-group-item.active'); //list of selected

        //resizable
        this.resizableLink = page.locator('span.text').filter({hasText:'Resizable'});

    }

    async dragAndDrop (source, dest) {
        await source.hover();
        await this.page.mouse.down();
        await dest.hover();
        await this.page.mouse.up();
    }

    async selectSingleListElement (item) {
        await item.click();
    }

    async selectAllListElements (list) {
        for (const el of await list.all()) {
            await el.click();
        }
    }


}

module.exports = {InteractionsPage};