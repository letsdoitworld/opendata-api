require('dotenv').config();
const db = require('../db');
var dateformat = require("dateformat");

module.exports.storeReports = async (reports, reportsType, reportsConverter) => {
    //Check if report exists in db
    //Update Open-data db
    try {
        var reportsToSave=[];
        let paramsAll = [reportsType];
        const qry = 'SELECT * FROM reports WHERE type= $1 ORDER BY id';
        const {rows} = await db.query(qry, paramsAll);
        const upsert_returning = 'RETURNING id, type, source_id, lat, long, ts_imported, status';

        for (let i = 0; i < reports.length; i++) {
            var found = rows.find(o => o.source_id == reports[i].id);
            if (found != null) {
                let convertedReport = reportsConverter.convertReport(reports[i], reportsType);
                if (convertedReport.status!=found.status) {
                    let dateUpdated=dateformat(new Date(), "yyyy-mm-dd'T'HH:MM:ss'Z'hh");
                    let paramsUpd = [convertedReport.status, convertedReport.source_id, reportsType, dateUpdated];
                    const qryUpd = 'UPDATE reports set status = $1, last_updated = $4 where source_id = $2 and type=$3 ' + upsert_returning;
                    await db.query(qryUpd, paramsUpd);
                    console.log(reportsType+' report with id='+found.id+' updated in database');
                }
            } else {
                reportsToSave.push(reports[i]);
            }
        }
        var convertedToSaveReports=reportsConverter.convertListReports(reportsToSave, reportsType);
        for (let n = 0; n < convertedToSaveReports.length; n++) {

            let queryIns='INSERT INTO reports(type, lat, long, ts_imported, source_id, country, admin_area, admin_sub_area,' +
                ' locality, status, household, construction, hazardous, bulky, uncategorized, glass, plastic, textile, ' +
                'lumber,metal,rubber, other, created_at, created_by, last_updated) ' +
                'values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)'
                + upsert_returning;
            await db.query(queryIns, Object.values(convertedToSaveReports[n]));
            console.log(reportsType+' report with source id='+convertedToSaveReports[n].source_id+' added to database');
        }
    }
    catch
        (error)
    {
        console.log('error ' + error);
        throw error;
    }
};
