const {expect,page} = require('@playwright/test');

class TextBoxPage {
    constructor(page) {
        this.page = page;
        this.textBoxLink = page.locator('li').filter({ hasText: 'Text Box' });
        this.textBoxHeader = page.locator("h1.text-center");
        //input fields
        this.fullNameBox = page.locator('input#userName');
        this.emailBox = page.locator("input#userEmail");
        this.currentAddressBox = page.locator('textarea#currentAddress');
        this.permanentAddressBox = page.locator("textarea#permanentAddress");
        this.submitBtn = page.locator("button#submit");
        //output fields
        this.name = page.locator("#output div p#name");
        this.email = page.locator("#output div p#email");
        this.currentAddress = page.locator("#output div p#currentAddress");
        this.permanentAddress = page.locator("#output div p#permanentAddress")
    }

    async enterText() {
        await this.fullNameBox.fill("Robert Leskovsek");
        await this.emailBox.fill("robert.leskovsek@gmail.com");
        await this.currentAddressBox.fill("Podvelka 36");
        await this.permanentAddressBox.fill("Podvelka 36");
        await this.submitBtn.click();
    }

    async verifyUserDetails() {
        //var nameText = await this.name.textContent();
        await expect(this.name).toHaveText("Name:" + "Robert Leskovsek");
        await expect(this.email).toHaveText("Email:" + "robert.leskovsek@gmail.com");
        await expect(this.currentAddress).toHaveText("Current Address :" + "Podvelka 36");
        await expect(this.permanentAddress).toHaveText("Permananet Address :" + "Podvelka 36");
    }

}
module.exports = { TextBoxPage };
