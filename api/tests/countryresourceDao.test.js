'use strict';
require('dotenv').config();
const db = require('../db');

var expect = require("chai").expect;
var countryResourceDao = require("../reportImporter/countryResourceDao");

const qryRemoveCountryRes= "DELETE FROM country_resource";
const qrySelectCountryRes = "SELECT * FROM country_resource";


describe("Country_resource insert", function () {
    it("insert country_resources", async () => {
        await db.query(qryRemoveCountryRes, null);
        const  totalCountryResourcesBefore=await db.query(qrySelectCountryRes, null);
        expect(totalCountryResourcesBefore.rows.length).to.equal(0);
        await countryResourceDao.storeCountryResources();
        const  totalCountryResourcesAfter=await db.query(qrySelectCountryRes, null);

        expect(totalCountryResourcesAfter.rows.length).not.to.equal(0);
        await db.end();
    }).timeout(40000);
});