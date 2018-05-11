'use strict';
const Router = require('express-promise-router');
const db = require('../db');
var dateFormat = require("dateFormat");

const router = new Router({mergeParams: true});

router.get('/', async (req, res) => {
    const { rows } = await query(req.query.code?req.query.code.toUpperCase():req.query.code, req.query.createdby,
        req.query.start, req.query.end, req.query.maxrec, req.query.startrecord);
    res.send({
        'status': 'SUCCESS',
        'sources': rows
    })
});
var query = (country_code, created_by, start_date , end_date, max_records, start_from_record) => {
    let q = 'SELECT * FROM reports';
    let parExist=false;
    let elem=0
    let params = [country_code, created_by, start_date?convertDate(start_date):null,
        end_date?convertDate(end_date):null, start_from_record, max_records];
    if (country_code) {
        elem=elem+1;
        q = q + ' WHERE country_code= $'+elem;
        parExist=true;
    } else {params.splice(params.indexOf(country_code),1)}
    if (created_by) {
        elem=elem+1;
        q = q + (parExist?' AND':' WHERE')+' created_by=$'+elem;
        parExist=true;
    } else {params.splice(params.indexOf(created_by),1)}
    if (start_date) {
        elem=elem+1;
        q = q + (parExist?' AND':' WHERE')+' last_updated>=$'+elem;
        parExist=true;
    } else {params.splice(params.indexOf(start_date),1)}
    if (end_date) {
        elem=elem+1;
        q = q + (parExist?' AND':' WHERE')+' last_updated<=$'+elem;
        parExist=true;
    } else {params.splice(params.indexOf(end_date),1)}
    q = q + ' ORDER BY last_updated';
    if (start_from_record) {
        elem=elem+1;
        q = q + ' offset $'+elem;
    }else {params.splice(params.indexOf(start_from_record),1)}
    if (max_records) {
        elem=elem+1;
        q = q + ' limit $'+elem;
    } else {
        params.splice(params.indexOf(max_records),1)
        q = q + ' limit 50';
    }
    return db.query(q, params);
};
var convertDate = (dateString) => {
    var year =dateString.substring(0, 4);
    var month =dateString.substring(4, 6);
    var day =dateString.substring(6, 8);
    var mydate = dateFormat(new Date(Date.UTC(parseInt(year), parseInt(month)-1, parseInt(day),0,0,0)),"yyyy-mm-dd'T'HH:MM:ss'Z'hh");

    return mydate;
};

module.exports = router;
