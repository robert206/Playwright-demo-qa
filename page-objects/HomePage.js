import {expect} from "@playwright/test";

export class HomePage {
    constructor(page) {
        this.page = page;
        this.Elements = page.getByRole('heading', { name: 'Elements' });
        this.Forms = page.getByRole('heading', { name: 'Forms' });
        this.AlertsWindows = page.getByRole('heading', { name: 'Alerts, Frame & Windows' });
        this.Widgets = page.getByRole('heading', { name: 'Widgets' });
        this.Interactions = page.getByRole('heading', { name: 'Interactions' });
        this.BookStore = page.getByRole('heading', { name: 'Book Store Application' });
    }
}
//module.exports = { HomePage };

