const {expect,page} = require('@playwright/test');

class ProgressBarPage {
    constructor (page) {
        this.page = page;
        this.progressPageLink = page.locator ('span.text').filter({hasText:'Progress Bar'});
        this.progressPageStartStopBtn = page.locator ('#startStopButton');
        this.progressBar = page.locator('.progress-bar');
        this.progressBarResetBtn = page.locator ('#resetButton'); //appears only at 100% progress
    }
    
    async returnProgress () {
        let percentage = await this.progressBar.getAttribute('aria-valuenow');
        return percentage;
    }

    async startProgressBar (max) {
        let stop = false;
        await this.progressPageStartStopBtn.click();
        let currentProgress = await this.returnProgress();
        while (!stop) {
            currentProgress = await this.returnProgress();
            console.log(currentProgress);
            if (currentProgress == max )    {
                await this.progressBarResetBtn.click();
                stop = true;
            }
        }
    }

}

module.exports = {ProgressBarPage};