const {expect, page} = require('@playwright/test');


class LinksPage {
    constructor (page) {
        this.page = page;
        this.linksPageLink = page.getByText ('Links', { exact: true });
        this.linksPageSimpleLink = page.locator ('#simpleLink');
        //api links
        this.linksCreatedLink = page.locator('#created'); //201
        this.linksNoContentLink = page.locator ('#no-content'); // 204
        this.linksMoved = page.locator ('#moved'); //301
        this.linksBadRequest = page.locator ('#bad-request'); // 400
        this.linksUnath = page.locator ('#unauthorized'); // 401
        this.linksInvalid = page.locator ('#invalid-url'); // 404

        this.linksResponse = page.locator ('p#linkResponse');

    }

    async openNewTab () {
        const pagePromise = this.page.context().waitForEvent('page');
        await this.linksPageSimpleLink.click();//open tab
        const newPage = await pagePromise;
        await newPage.waitForLoadState(); 
        //console.log(await newPage.title());

        expect(newPage.url()).toEqual("https://demoqa.com/"); //did it opened ?
        newPage.close();
    }


    async checkApiStatus (link) {
        let apiResponseCodes = [];
        //let apiResponseCode;
        await link.click();
        //monitor api response
        await this.page.on('response', response => {
            //console.log('>>', response.status(), response.statusText()), //
            //apiResponseCode = response.status();
            //console.log (apiResponseCode);
            apiResponseCodes.push(response.status()) //add response to array
        });
        return apiResponseCodes;
            //await expect(page).toHaveText('#linkResponse', "201 and status text Created");
            //expect(apiResponses).toContain(201); // confirm API sent the expected response
    }


}

module.exports = {LinksPage};