var request = require('request');
var reportDao = require("../reportImporter/reportDao");
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
module.exports.importReportsAll = async (serviceUrl, reportsType, token, converter)=> {
    await request({
        headers: {
            'x-api-key': token,
        },
        url: serviceUrl,
        json: true,
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, async (error, response)=> {
        if (!error && response.statusCode == 200) {
            console.log('sucessfully connected to service');
            var reportsStr=JSON.stringify(response.body);
            var parsedReports=JSON.parse(reportsStr);
            await reportDao.storeReports(parsedReports, reportsType, converter);
            console.log('reports sucessfully updated');
        } else {
            console.log('error' + response.statusCode);
        }
    });
};