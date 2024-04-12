const {expect,page} = require('@playwright/test');

class SliderPage {
    constructor (page) {
        this.page = page;
        this.sliderPageLink = page.locator('span.text').filter({hasText:'Slider'});
        this.sliderCurrentSlider = page.locator ('#sliderValue');
        this.slider = page.locator ('.range-slider__wrap');
    }


    async moveSlider (targetValue) {
        const initialValue = await this.sliderCurrentSlider.getAttribute('value');
        console.log(initialValue);
        let imDone = false;
        while (!imDone) {
            let srcBound = await this.slider.boundingBox();
            if (srcBound) {
                await this.page.mouse.move(srcBound.x + srcBound.width / 2, srcBound.y + srcBound.height /2);
                await this.page.mouse.down();
                await this.page.mouse.move(srcBound.x + 10, srcBound.y + srcBound.height /2);
                await this.page.mouse.up();
                let currentValue = await this.sliderCurrentSlider.getAttribute('value');
                if (currentValue == targetValue) {
                    imDone = true;
                }
            }
        }
    }
    

    async currentValue () {
        const drek = await this.sliderCurrentSlider.getAttribute('value');
        console.log(drek);
    }
}

module.exports = {SliderPage};