const {expect,page} = require('@playwright/test');
const { strict } = require('assert');

class BookStorePage {
    constructor(page) {
        this.page = page;
        this.loginLink = page.getByText('Login',{ exact:true});
        this.userName = page.locator('#userName');
        this.password = page.locator('#password');
        this.loginBtn = page.locator('#login');
        this.newUserBtn = page.locator('#newUser');

        //registerPage
        this.registerFirstName = page.locator('#firstname');
        this.registerLastName = page.locator('#lastname');
        this.registerLogin = page.locator('#userName');
        this.registerPasswd = page.locator('#password');
        this.registerBtn = page.locator('#register');

    }
}

module.exports = {BookStorePage};