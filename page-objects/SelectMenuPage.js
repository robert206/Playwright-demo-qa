const {expect,page} = require('@playwright/test');


class SelectMenuPage {
    constructor(page) {
        this.page = page;
        this.selectMenuLink = page.locator('span.text').filter({hasText:'Select Menu'});
        this.selectOption = page.locator('#withOptGroup');
        this.selectRootOption = page.getByText('A root option',{exact : true});
        this.selectOne = page.locator('#selectOne');
        this.selectProfesor = page.getByText('Prof.',{exact:true});

        this.selectColor = page.locator('#oldSelectMenu');
    }
}

module.exports = {SelectMenuPage};