var request = require('request');
var async = require("async");
const db = require('../db');
//const trashoutCon = require('../connector');
var authenticatedToken = 'a0c84fe524f970d1a404fb3ccf985f71';
module.exports.importReportsLatest = async.forever(
    function (next) {
        var requestLoop = setInterval(function () {
            request({
                headers: {
                    'x-api-key': authenticatedToken,
                },
                //url: process.env.TRASHOUT_URL,
                url: "https://api.trashout.ngo/v1/trash/" +
                "?attributesNeeded=id,gpsFull,created,types,size,note,userInfo,url,status&limit=10000000000000",
                method: "GET",
                timeout: 10000,
                followRedirect: true,
                maxRedirects: 10
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log('sucess!' + body.toString());
                } else {
                    console.log('error' + response.statusCode);
                }
            });
        }, 5000);
    },
    function (err) {
        console.error(err);
    }
);
module.exports.importReportsAll = function (serviceUrl, reportsType, appName) {
    request({
        headers: {
            'x-api-key': authenticatedToken,
        },
        //url: process.env.TRASHOUT_URL,
        url: "https://api.trashout.ngo/v1/trash/" +
        "?attributesNeeded=id,gpsFull,created,types,size,note,userInfo,url,status&limit=10000000000000",
        json: true,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function (error, response, trashoutReports) {
        if (!error && response.statusCode == 200) {
            console.log('sucess!');
            storeReports(response, appName, reportsType);
        } else {
            console.log('error' + response.statusCode);
        }
    });
};
module.exports.storeReports = async (reports, appName, reportsType, converter) => {
    //Update Open-data db
    //Check if report exists in db
    try {
        let reportsToSave=[];
        let paramsAll = [reportsType];
        const qry = 'SELECT * FROM reports WHERE type= $1 ORDER BY id';
        const {existingReports} = await db.query(qry, paramsAll);
        const upsert_returning = 'RETURNING id, type, source_id, lat, long, ts, status';
        for (let i = 0; i < reports.length; i++) {
            var found = existingReports.find(o => o.source_id === reports[i].id);
            if (found != null) {
                let paramsUpd = [reports[i].status, reports[i].id,reportsType];
                const qryUpd = 'UPDATE reports set status = $1 where source_id = $2 and type=$3 ' + upsert_returning;
                const {rowsUpd} = await db.query(qryUpd, paramsUpd);
            } else {
                reportsToSave.push(reports[i]);
            }
        }
        var convertedToSaveReports=convertReports(reportsToSave);
        for (let n = 0; i < convertedToSaveReports.length; n++) {
            let queryUpd='INSERT INTO reports(type, lat, long, type, source_id, country, admin_area, admin_sub_area,' +
                ' locality, status, household, construction, hazardous, bulky, uncategorized, glass, plastic, textile, ' +
                'metal, other, created_by, created_at) values ? ' + upsert_returning;
            const {rowsIns} = await db.query(qryIns, convertedToSaveReports[n]);
        }
    }
    catch
    (error)
    {
        console.log('error' + error);
        throw error;
    }
};