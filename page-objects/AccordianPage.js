const {expect, page} = require('@playwright/test');

class AccordianPage {
    constructor (page) {
        this.page = page;
        this.accordianLink = page.locator('span.text').filter({hasText:'Accordian'})
        this.accordianWhatBtn = page.locator ('#section1Heading');
        this.accordianWhereBtn = page.locator ('#section2Heading');
        this.accordianWhyBtn = page.locator ('#section3Heading');
        this.accordianWhatBody = page.locator ('#section1Content p');
        this.accordianWhereBody = page.locator ('#section2Content p');//returns 2 elements 
        this.accordianWhyBody = page.locator ('#section3Content p');
    }

    async amIOnAccordianPage () {
        await expect(this.page).toHaveURL('https://demoqa.com/accordian');
    }
}

module.exports = { AccordianPage };