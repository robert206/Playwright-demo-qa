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


    async checkApiStatus (code) {
        let apiResponseCodes = []
        switch (code) {
            case "201":
                await this.linksCreatedLink.click();
                await this.page.on('response', response => {
                    console.log('>>', response.status(), response.statusText())
                    apiResponseCodes.push(response.status())
                    expect(apiResponseCodes).toContain(201);
                });
                await expect(this.linksResponse).toHaveText('Link has responded with staus 201 and status text Created');
                break;

            case "204":
                await this.linksNoContentLink.click();
                await this.page.on('response', response => {
                    console.log('>>', response.status(), response.statusText())
                    apiResponseCodes.push(response.status())
                    expect(apiResponseCodes).toContain(204);
                });
                await expect(this.linksResponse).toHaveText('Link has responded with staus 204 and status text No Content');
                break;

            case "301":
                await this.linksMoved.click();
                await this.page.on('response', response => {
                    console.log('>>', response.status(), response.statusText())
                    apiResponseCodes.push(response.status())
                    expect(apiResponseCodes).toContain(301);
                });
                await expect(this.linksResponse).toHaveText('Link has responded with staus 301 and status text Moved Permanently');
                break;

            case "400":
                await this.linksBadRequest.click();
                await this.page.on('response', response => {
                    console.log('>>', response.status(), response.statusText())
                    apiResponseCodes.push(response.status())
                    expect(apiResponseCodes).toContain(400);
                });
                await expect(this.linksResponse).toHaveText('Link has responded with staus 400 and status text Bad Request');
                break;

            case "401":
                await this.linksUnath.click();
                await this.page.on('response', response => {
                    console.log('>>', response.status(), response.statusText())
                    apiResponseCodes.push(response.status())
                    expect(apiResponseCodes).toContain(401);
                });
                await expect(this.linksResponse).toHaveText('Link has responded with staus 401 and status text Unauthorized');
                break;

            case "404":
                await this.linksInvalid.click();
                await this.page.on('response', response => {
                    console.log('>>', response.status(), response.statusText())
                    apiResponseCodes.push(response.status())
                    expect(apiResponseCodes).toContain(404);
                });
                await expect(this.linksResponse).toHaveText('Link has responded with staus 404 and status text Not Found');
                break;
    
            default:
                console.log('Unknown option for api response');
        }
    }


}

module.exports = {LinksPage};