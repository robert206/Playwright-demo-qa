import { test as base } from '@playwright/test';

//to je kot pageobject ki vse pageobjecte ostale zajema in potem ne rabiš v vsakem testu posebej klicat newNekPage,
// prav tako ostale importe lahko narediš tu . pa greš na page. kot beforeEach,afterEach lahko tu dodaš itd.
import { HomePage } from '../page-objects/HomePage';
import { TextBoxPage } from '../page-objects/TextBoxPage';

export const test = base.extend({
    homePage:[ async ({ page }, use) => {
        await page.goto('/');
        await use(page);
    }, {auto:true}],

    homePage: async ({page},use) =>{
        await use(new HomePage(page));
    },

    textBoxPage: async ({page}, use) => {
        await use(new TextBoxPage(page)) 
    },


});

exports.expect = test.expect;
exports.expect = base.expect;