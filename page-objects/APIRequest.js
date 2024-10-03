const {test, expect, page} = require('@playwright/test');

class APIRequest {
    constructor(page) {
        this.page = page;
    }

    async getUserById (id) {
        const URI = "https://reqres.in/api/users";
        const reqURL = URI + "/" + id;
        console.log(reqURL);

        const response = await request.get(reqURL);
        console.log(response);
    }
}

module.exports = { APIRequest };