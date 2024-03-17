import {test,expect} from '../fixture/PageObjectFixture';
//import { HomePage } from '../page-objects/HomePage';
//const {HomePage} = require ('../page-objects/HomePage.js');


test('01 01 Elements page -TextBox', async ({ page, homePage, textBoxPage}) => {
    await expect(homePage.Elements.toBeVisible());
    
})




