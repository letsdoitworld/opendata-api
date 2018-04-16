var async = require("async");
const db = require('../db');
module.exports.storeReports = async (reports, reportsType, convertReports) => {
    //Check if report exists in db
    //Update Open-data db
    try {
        let reportsToSave=[];
        let paramsAll = [reportsType];
        const qry = 'SELECT * FROM reports WHERE type= $1 ORDER BY id';paramsAll);
        const upsert_returning = 'RE
        const {rows} = await db.query(qry, TURNING id, type, source_id, lat, long, ts, status';

        for (let i = 0; i < reports.length; i++) {
            var found = rows.find(o => o.source_id === reports[i].id);
            if (found != null && reports[i].status!==found.status) {
                let paramsUpd = [reports[i].status, reports[i].id,reportsType];
                const qryUpd = 'UPDATE reports set status = $1 where source_id = $2 and type=$3 ' + upsert_returning;
                const {rowsUpd} = await db.query(qryUpd, paramsUpd);
            } else {
                console.log("------------222------");
                reportsToSave.push(reports[i]);
            }
        }
        var convertedToSaveReports=convertReports(reportsToSave, reportsType);
        for (let n = 0; n < convertedToSaveReports.length; n++) {

            let queryIns='INSERT INTO reports(type, lat, long, ts, source_id, country, admin_area, admin_sub_area,' +
                ' locality, status, household, construction, hazardous, bulky, uncategorized, glass, plastic, textile, ' +
                'lumber,metal,rubber, other, created_by, created_at) ' +
                'values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$24,$23)'
                + upsert_returning;
            const {rowsIns} = await db.query(queryIns, Object.values(convertedToSaveReports[n]));
        }
    }
    catch
        (error)
    {
        console.log('error' + error);
        throw error;
    }
};