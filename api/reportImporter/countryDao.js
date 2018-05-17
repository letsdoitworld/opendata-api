require('dotenv').config();
const db = require('../db');

module.exports.storeCountryStatistics = async () => {
    //Update countries total reports number
    try {
        var reportsToSave=[];
        const qry = 'SELECT * FROM country_population';
        const {rows} = await db.query(qry);
        for (let i = 0; i < rows.length; i++) {
            let paramsUpd= [rows[i].country_code];
            const qryUpd = 'UPDATE country_population set reportsQnt = (SELECT COUNT (*) FROM reports WHERE country_code= $1) WHERE country_code= $1';
            await db.query(qryUpd, paramsUpd);
            console.log('country with code='+rows[i].country_code+' updated total reports number');
        }
    } catch
        (error)
    {
        console.log('error ' + error);
        throw error;
    }
};