var request = require('request');
var async = require("async");
const db = require('../db');
/**module.exports.importReportsLatest = async.forever(
    function (token) {
        var requestLoop = setInterval(function () {
            request({
                headers: {
                    'x-api-key': token,
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
);**/
module.exports.importReportsAll = function (serviceUrl, reportsType, token, convertReports) {
    request({
        headers: {
            'x-api-key': token,
        },
        url: serviceUrl,
        json: true,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function (error, response) {
        if (!error && response.statusCode == 200) {
            console.log('sucess!');
            var reportsStr=JSON.stringify(res.body);
            var parsedReports=JSON.parse(parsed);
            storeReports(parsedReports, reportsType, convertReports);
        } else {
            console.log('error' + response.statusCode);
        }
    });
};