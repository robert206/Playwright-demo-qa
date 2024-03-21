const {expect,page} = require('@playwright/test');

class RadioBtnPage {
    constructor (page) {
        this.page = page;
        this.radioBtnLink = page.locator('span.text').filter({hasText:'Radio Button'});
        this.radioBtnHeader = page.getByRole("heading", {name:'Radio Button'});
        this.radioBtnYes = page.locator("label.custom-control-label[for='yesRadio']");//wtf noče radio buttona locatat
        this.radioBtnNo = page.locator("label.custom-control-label[for='noRadio']");//hidden
        this.radioBtnImpressive = page.locator("label.custom-control-label[for='impressiveRadio']");//isti drek
        //messages
        this.radioMessage = page.locator("span.text-success");
    }

    async clickRadioBtns (yni) {
        switch (yni) {
            case "yes":
                await this.radioBtnYes.click();
                await expect(this.radioBtnYes).toBeChecked();
                await expect(this.radioMessage).hasText("Yes");
                break;
            case "impressive":
                await expect(this.radioBtnImpressive).toBeEnabled();
                await this.radioBtnImpressive.click();
                await expect(this.radioMessage).hasText("Impressive");
                break;
            default : 
                console.log("Wrong option");
        }
    }
}

module.exports = { RadioBtnPage};