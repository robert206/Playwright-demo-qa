const {expect, page} = require('@playwright/test');

class FormsPage {
    constructor (page) {
        this.page = page;
        this.formsPageLink = page.locator('span.text').filter({hasText:'Practice Form'});
        
    }
}

module.exports = {FormsPage};