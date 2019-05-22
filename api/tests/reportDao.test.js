'use strict';
require('dotenv').config();
const db = require('../db');

var expect = require("chai").expect;
var convertertest = require("../tests/trashoutConverter.test");
var reportDao = require("../reportImporter/reportDao");
var trashoutConverter = require("../reportImporter/TrashoutConverter");


const reportsExample = convertertest.reportsExample;
let reportsStr=JSON.stringify(reportsExample);
let reports=JSON.parse(reportsStr);
const qryLastReport = "SELECT * FROM public.reports where type='Trashout' ORDER BY ID DESC LIMIT 1";
const qryCount = "SELECT COUNT (*) FROM reports where type='Trashout'";
var lastreport;
var lastreportAfterUpdate;
let existingQntAfterSave;
let existingQntAfterUpdate;

describe("Trashout db connector", function () {
    it("saves new report to db", async () => {
        lastreport=await db.query(qryLastReport, null);
        reports[0].id=lastreport.rows[0].id+1;
        expect(reports.length).to.equal(2);
        const existingQnt =await db.query(qryCount, null);
        const saving=await reportDao.storeReports(reports, "Trashout",trashoutConverter);
        existingQntAfterSave =await db.query(qryCount, null);

        expect(parseInt(existingQntAfterSave.rows[0].count)).to.equal(parseInt(existingQnt.rows[0].count)+1);
    });
    it("updates report from db", async () => {
        expect(reports.length).to.equal(2);
        let convertedReport = trashoutConverter.convertReport(reports[0], "Trashout");
        expect(convertedReport.status).to.equal("REPORTED");
        reports[0].status='cleaned';


        await reportDao.storeReports(reports, "Trashout",trashoutConverter);

        existingQntAfterUpdate =await db.query(qryCount, null);
        expect(parseInt(existingQntAfterUpdate.rows[0].count)).to.equal(parseInt(existingQntAfterSave.rows[0].count));
        lastreportAfterUpdate=await db.query(qryLastReport, null);
        expect(lastreportAfterUpdate.rows[0].status).to.equal("CLEANED");
        await db.end();
    });
});