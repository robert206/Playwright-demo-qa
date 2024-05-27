const {expect,page} = require('@playwright/test');

class DroppablePage {
    constructor(page) {
        this.page = page;
        this.droppablePageLink = page.locator ('span.text').filter({hasText:'Droppable'});
        this.droppableSimpleTab = page.locator ('#droppableExample-tab-simple');
        this.droppableAcceptTab = page.locator ('#droppableExample-tab-accept');
        this.droppablePreventTab = page.locator ('#droppableExample-tab-preventPropogation');
        this.droppableRevertTab = page.locator ('#droppableExample-tab-revertable');

        this.droppableDragMe = page.locator ('#draggable');
        this.droppableDropMe = page.locator ('#droppable'); // 3 boxes 
    }
}

module.exports = {DroppablePage};