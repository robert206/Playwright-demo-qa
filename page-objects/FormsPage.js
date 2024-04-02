const {expect, page} = require('@playwright/test');

class FormsPage {

    constructor (page) {
        this.page = page;
        this.formsPageLink = page.locator('span.text').filter({hasText:'Practice Form'});
        this.formsPageFirstName = page.locator ('#firstName');
        this.formsPageLastName = page.locator ('#lastName');
        this.formsPageEmail = page.locator ('#userEmail');
        this.formsPageGenders = page.locator('div.custom-control.custom-radio.custom-control-inline label.custom-control-label');
        this.formsPageMobile = page.locator ('#userNumber');
        this.formsPageSubjects = page.locator ('.subjects-auto-complete__value-container');
        this.formsPageHobbies = page.locator ('div.custom-control.custom-checkbox.custom-control-inline label.custom-control-label');
        this.formsPageCurrentAddress = page.locator ('#currentAddress');

        //date of birth and date picker
        this.formsPageDateOfBirth = page.locator ('#dateOfBirthInput');
        this.formsPageMonthSelector = page.locator ('.react-datepicker__month-select');

        this.formsPageCurrentAddress = page.locator ('#currentAddress');
        this.formsStateDropdown = page.locator ('#react-select-3-input');
        this.formsSubmitBtn = page.locator ('#submit');

        //after submit elements
        this.formsPageSubmitTitle = page.locator ('#example-modal-sizes-title-lg');
        this.formsPageSubmitTable = page.locator ('tbody td');
        
    }

}

module.exports = {FormsPage};