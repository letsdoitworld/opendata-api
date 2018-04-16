'use strict';
require('dotenv').config();
const db = require('../db');
var chai = require("chai");
var should = require('chai').should();
var expect = require("chai").expect;
var assert = require('assert');
var convertertest = require("../tests/trashoutConverter.test");
var reportDao = require("../reportImporter/reportDao");
var trashoutConverter = require("../reportImporter/TrashoutConverter");


const reportsExample = convertertest.reportsExample;
describe("Trashout db connector", function () {
    it("saves new report to db", async () => {
        console.log("88888888"+reportsExample);
        let reportsStr=JSON.stringify(reportsExample);
        let reports=JSON.parse(reportsStr);
        reports[0].id=10000000;
        expect(reports.length).to.equal(2);
        let convertedReports = trashoutConverter.convertReports(reports, "Trashout");
        const qry = "SELECT COUNT (*) FROM reports where type='Trashout'";
        const existingQnt =await db.query(qry, null);
        const saving=await reportDao.storeReports(reports, "Trashout",trashoutConverter.convertReports).then(console.log);

        const existingQntAfter =await db.query(qry, null);
        expect(parseInt(existingQntAfter.rows[0].count)).to.equal(parseInt(existingQnt.rows[0].count)+1);
    });
});