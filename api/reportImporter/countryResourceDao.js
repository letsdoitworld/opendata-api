require('dotenv').config();
const db = require('../db');

module.exports.storeCountryResources = async () => {
    //Update countries total reports number
    try {
        var reportsToSave=[];
        const qryCountries = 'SELECT * FROM country_population';
        const {rows} = await db.query(qryCountries);
        const upsert_returning = 'RETURNING country_code, resourcename';
        for (let i = 0; i < rows.length; i++) {
            let paramsTypes= [rows[i].country_code];
            const qryTypes = 'SELECT DISTINCT type FROM reports WHERE country_code= $1';
            const types = await db.query(qryTypes, paramsTypes);
            for (let n = 0; n < types.rows.length; n++) {
                let paramsIns= [rows[i].country_code, types.rows[n].type];
                const qryIns = 'INSERT INTO country_resource(country_code, resourcename) ' +
                    'values ($1, $2) ' + upsert_returning;
                await db.query(qryIns, paramsIns);
                console.log('country_resource with code='+rows[i].country_code+' and resource='+types.rows[n].type+' added');
            }
        }
    } catch
        (error)
    {
        console.log('error ' + error);
        throw error;
    }
};