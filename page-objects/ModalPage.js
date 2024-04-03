const {expect, page} = require('@playwright/test');

class ModalPage {

    constructor (page) {
        this.page = page;
        this.modalLink = page.locator('span.text').filter({hasText:'Modal Dialogs'})
        this.modalSmallModalBtn = page.locator ('#showSmallModal');
        this.modalSmallHeading = page.locator ('#example-modal-sizes-title-sm.modal-title.h4');
        this.modalBodyText = page.locator ('.modal-body');
        this.modalSmallClose = page.locator ('#closeSmallModal');

        this.modalLargeModalBtn = page.locator ('#showLargeModal');
        this.modalLargeHeading = page.locator ('#example-modal-sizes-title-lg');
        this.modalLargeClose = page.locator ('#closeLargeModal');
    }

}

module.exports = { ModalPage };