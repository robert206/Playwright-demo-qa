const {expect, page} = require('@playwright/test');

class AlertsPage {
    
    constructor (page) {
        this.page = page;
        this.alertsPageLink = page.locator('span.text').filter({hasText:'Alerts'});
        this.alertsPageBtn1 = page.locator ('#alertButton');
        this.alertsPageBtn2 = page.locator ('#timerAlertButton');
        this.alertsPageConfirmBtn = page.locator ('#confirmButton');
    }


    async amIOnAlertsPage () {
        await expect(this.page).toHaveURL("https://demoqa.com/alerts");
    }


    async clickOnAlert1 () {
        await this.page.on('dialog', async dialog => {
            // Verify type of dialog
            expect(dialog.type()).toContain('alert');   
            
            // verify message of alert
            expect(dialog.message()).toContain('You clicked a button');
            
            //click on alert ok button
            await dialog.accept();
        });
        await this.alertsPageBtn1.click(); //click on btn to trigger alert
    }


    async clickOnAlert2 () {
        this.page.on('dialog', async dialog => {
            // Verify type of dialog
            expect(dialog.type()).toContain('alert');     
            // verify message of alert
            expect(dialog.message()).toContain('This alert appeared after 5 seconds');     
            //click on alert ok button
            await dialog.accept();
        });
        await this.alertsPageBtn2.click();
    }


    async confirmationMessageAlert () {
        this.page.on('dialog', async dialog => {
            // Verify type of dialog
            expect(dialog.type()).toContain('confirm');     
            // verify message of alert
            expect(dialog.message()).toContain('Do you confirm action?');     
            //click on alert ok button
            await dialog.accept();
        });
        await this.alertsPageConfirmBtn.click();
        await expect(this.page.locator('#confirmResult')).toHaveText('You selected Ok');
    }


}

module.exports = {AlertsPage};