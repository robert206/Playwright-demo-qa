const {expect, page} = require('@playwright/test');


class ButtonsPage {
    constructor(page) {
        this.page = page;
        this.buttonsPageLink = page.locator ('span.text').filter( {hasText:'Buttons'});
        this.doubleClickBtn = page.locator ('#doubleClickBtn');
        this.rightClickBtn = page.locator ('#rightClickBtn');
        this.dynamicBtn = page.locator('"Click Me"'); // if u are accessing by Text anyway this is super easy way
        this.doubleClickMsg = page.locator ('#doubleClickMessage');
        this.rightClickMsg = page.locator ('#rightClickMessage');
        this.dynaClickMsg = page.locator ('#dynamicClickMessage');
    }

    async clickDoubleClickBtn () {
        await this.doubleClickBtn.dblclick();
        await expect (this.doubleClickMsg).toBeVisible();
    }

    async rightClick () {
        await this.rightClickBtn.click({button : 'right'});
        await expect (this.rightClickMsg).toBeVisible();
    }

    async dynamicClick () {
        //await this.page.click('"Click Me"')
        await this.dynamicBtn.click();
        await expect (this.dynaClickMsg).toBeVisible();
    }
}

module.exports= {ButtonsPage};