'use strict';
require('dotenv').config();
const db = require('../db');

var expect = require("chai").expect;
var countryDao = require("../reportImporter/countryDao");

const qryRuTotalreports = "SELECT COUNT (*) FROM reports where country_code='RU'";
const qryRuSetZeroReports = "UPDATE country_population set reportsQnt = 0 WHERE country_code= 'RU'";
const qryRUcountryReports = "SELECT reportsQnt FROM country_population where country_code='RU'";


describe("Country data updating", function () {
    it("udpates country_population Reportsqnt", async () => {
        const  totalReportsActual=await db.query(qryRuTotalreports, null);
        await db.query(qryRuSetZeroReports, null);

        const  totalCountryReportsBefore=await db.query(qryRUcountryReports, null);
        expect(parseInt(totalReportsActual.rows[0].count)).to.not.equal(totalCountryReportsBefore.rows[0].reportsqnt);
        const result = await countryDao.storeCountryStatistics();
        const totalCountryReportsAfter =await db.query(qryRUcountryReports, null);

        expect(parseInt(totalReportsActual.rows[0].count)).to.equal(totalCountryReportsAfter.rows[0].reportsqnt);
        await db.end();
    }).timeout(40000);
});