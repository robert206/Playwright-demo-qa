const {expect, page} = require('@playwright/test');

class APIRequest {
    constructor(page) {
        this.page = page;
    }

    async getUserById (id, request) {
        const URI = "https://reqres.in/api/users";
        const reqURL = URI + "/" + id;
        
        const response = await request.get(reqURL);
        expect(response.ok()).toBeTruthy();
        console.log(response);
    }

    async createNewUser (request) {
        const URI = "https://reqres.in/api/users";
        const createUserBody= JSON.parse(JSON.stringify(require("../test-data/createUser.json")));
        const headerJson = "Content-Type:application/json";

        const response =  await request.post(URI,createUserBody);
        
        const respText= JSON.parse(await response.text());
        console.log(respText);
        /* if (response.status() !== 201) {
            throw new Error('User creation failed');
        } */
        expect (response.status()).toEqual(201);
        
    }

}

module.exports = { APIRequest };