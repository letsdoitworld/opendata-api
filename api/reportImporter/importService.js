var request = require('request');
var reportDao = require("../reportImporter/reportDao");
var async = require("async");
var CronJob = require('cron').CronJob;

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
module.exports.importReportsDaily = async (serviceUrl, reportsType, token, converter, cronPattern)=> {
    new CronJob(cronPattern, function() {
            try {
                module.exports.importReportsAll(serviceUrl, reportsType, token, converter).then(() => {

                    console.log('daily reports update started');
                });

            } catch (error) {
                console.log('error' + error);
                throw error;
            };
        }, function () {
            console.log('daily reports update finished');
        },
        true, /* Start the job right now */
        'Europe/London' /* Time zone of this job. */
)};