'use strict';
/*global describe*/
/*global it*/
/*eslint no-unused-vars: "off"*/
var expect = require("chai").expect;
var trashoutConverter = require("../reportImporter/trashoutConverter");
const reportsExample = [{
    "id": 125,
    "activityId": 182,
    "gps": {
        "lat": "50.0989330234",
        "long": "14.213634599",
        "accuracy": 5,
        "source": "unknown",
        "area": {
            "continent": "Europe",
            "country": "Czechia",
            "aa1": "Středočeský kraj",
            "aa2": "Praha-západ",
            "aa3": null,
            "locality": "Jeneč",
            "subLocality": null,
            "street": "0066h",
            "zip": "252 61"
        }
    },
    "userInfo": {
        "id": 21563,
        "firstName": "Trash",
        "lastName": "Hunter"
    },
    "size": "car",
    "types": [
        "glass",
        "metal",
        "construction",
        "plastic",
        "domestic"
    ],
    "note": "And there is even more fresh trash there. 2013-apr-24",
    "status": "stillHere",
    "created": "2012-04-04T19:04:00.000Z",
    "activityCreated": "2013-04-24T14:00:46.000Z"
}, {}];
describe("TrashoutConverter", function () {
    it("converts trashoutReports to Open-data ones", function () {
        let reportsStr=JSON.stringify(reportsExample);
        let reports=JSON.parse(reportsStr);

        let convertedReports = trashoutConverter.convertListReports(reports, "Trashout");

        expect(reports.length).to.equal(2);
        expect(convertedReports.length).to.equal(1);
        expect(convertedReports[0].source_id).to.equal(125);
        expect(convertedReports[0].lat).to.equal("50.0989330234");
        expect(convertedReports[0].long).to.equal("14.213634599");
        expect(convertedReports[0].country).to.equal("Czechia");
        expect(convertedReports[0].admin_area).to.equal("Středočeský kraj");
        expect(convertedReports[0].admin_sub_area).to.equal("Praha-západ");
        expect(convertedReports[0].locality).to.equal("Jeneč");
        expect(convertedReports[0].status).to.equal("REPORTED");
        expect(convertedReports[0].household).to.equal(true);
        expect(convertedReports[0].construction).to.equal(true);
        expect(convertedReports[0].hazardous).to.equal(false);
        expect(convertedReports[0].bulky).to.equal(false);
        expect(convertedReports[0].uncategorized).to.equal(false);
        expect(convertedReports[0].glass).to.equal(true);
        expect(convertedReports[0].plastic).to.equal(true);
        expect(convertedReports[0].textile).to.equal(false);
        expect(convertedReports[0].lumber).to.equal(false);
        expect(convertedReports[0].metal).to.equal(true);
        expect(convertedReports[0].rubber).to.equal(false);
        expect(convertedReports[0].other).to.equal(false);
        expect(convertedReports[0].created_by).to.equal("Importer");
        expect(convertedReports[0].created_at).to.equal(reports[0].created);

    });
});
module.exports.reportsExample = reportsExample;