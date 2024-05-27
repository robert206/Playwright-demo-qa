import { test as base } from '@playwright/test';
import  {HomePage} from '../page-objects/HomePage.js';
import { TextBoxPage } from '../page-objects/TextBoxPage.js';
import { CheckBoxPage } from '../page-objects/CheckBoxPage.js';
import { RadioBtnPage } from '../page-objects/RadioBtnPage.js';
import { WebTablesPage } from '../page-objects/WebTablesPage.js';
import { ButtonsPage } from '../page-objects/ButtonsPage.js';
import {LinksPage} from '../page-objects/LinksPage.js';
import {FormsPage} from '../page-objects/FormsPage.js';
import { AlertsPage } from '../page-objects/AlertsPage.js';
import { ModalPage } from '../page-objects/ModalPage.js';
import { AccordianPage } from '../page-objects/AccordianPage.js';
import { SliderPage } from '../page-objects/SliderPage.js';
import { ProgressBarPage } from '../page-objects/ProgressBarPage.js';
import { SelectMenuPage } from '../page-objects/SelectMenuPage.js';
import { InteractionsPage } from '../page-objects/InteractionsPage.js';
import { DroppablePage } from '../page-objects/DroppablePage.js';
import { BookStorePage } from '../page-objects/BookStorePage.js';


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
    },

    webTablesPage: async ({page},use) => {
        await use (new WebTablesPage(page));
    },

    buttonsPage : async ({page}, use) => {
        await use (new ButtonsPage(page));
    },

    linksPage : async ({page}, use) => {
        await use (new LinksPage(page));
    },

    formsPage : async ( {page}, use) => {
        await use (new FormsPage(page));
    },

    alertsPage : async ( {page}, use) => {
        await use (new AlertsPage(page));
    },

    modalPage: async ( {page}, use) => {
        await use (new ModalPage(page));
    },

    accordianPage : async ({page}, use) => {
        await use (new AccordianPage(page));
    },

    sliderPage : async ({page}, use) => {
        await use (new SliderPage(page));
    },

    progressBarPage : async ({page}, use) => {
        await use (new ProgressBarPage(page));
    },

    selectMenuPage : async ({page}, use) => {
        await use (new SelectMenuPage(page));
    },

    interactionsPage : async ({page}, use) => {
        await use (new InteractionsPage(page));
    },

    droppablePage : async ({page}, use) => {
        await use (new DroppablePage(page));
    },

    bookStorePage : async ( {page}, use) => {
        await use (new BookStorePage(page));
    }

});

exports.expect = test.expect;