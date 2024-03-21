import { test as base } from '@playwright/test';
import  {HomePage} from '../page-objects/HomePage.js';
import { TextBoxPage } from '../page-objects/TextBoxPage.js';
import { CheckBoxPage } from '../page-objects/CheckBoxPage.js';
import { RadioBtnPage } from '../page-objects/RadioBtnPage.js';


//to je kot pageobject ki vse pageobjecte ostale zajema in potem ne rabiš v vsakem testu posebej klicat newNekPage,
// prav tako ostale importe lahko narediš tu . pa greš na page. kot beforeEach,afterEach lahko tu dodaš itd.
//import { HomePage } from '../page-objects/HomePage.js';
//import { TextBoxPage } from '../page-objects/TextBoxPage.js';
export const test = base.extend({
    /* homePage:[ async ({ page }, use) => {
        await page.goto('/');
        await use(page);
    }, {auto:true}], */

    homePage: async ({page},use) => {
        await page.goto('https://demoqa.com/');
        await use(new HomePage(page));
    },

    textBoxPage: async ({page}, use) => {
        await use(new TextBoxPage(page)); 
    },

    checkBoxPage: async ({page},use) => {
        await use (new CheckBoxPage(page));
    },

    radioBtnPage: async ({page},use) => {
        await use (new RadioBtnPage(page));
    }


});

exports.expect = test.expect;