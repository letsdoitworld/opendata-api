'use strict';
const Router = require('express-promise-router');
const db = require('../db');
var dateformat = require('dateformat');

const router = new Router({ mergeParams: true });
var elem;
var q;
router.get('/', async (req, res) => {
  const { rows } = await query(req.query.code, req.query.type, req.query.status, req.query.hazardous,
    req.query.start, req.query.end, req.query.maxrec, req.query.startrecord);

  if (req.query.download) {
    //download everything as a file if asked
    res.setHeader('Content-disposition', 'attachment; filename=opendata-export.json');
    res.setHeader('Content-type', 'application/json');
  }

  res.send({
    'trashpoints_total': rows[0].full_count,
    'trashpoints': rows
  });
});
var query = (country_code, type, status, hazardous, start_date, end_date, max_records, start_from_record) => {
  this.q = 'select *, count(*) over() as full_count from reports';
  this.elem = 0;
  let newParams = [];
  if (country_code) {
    addMultiplyParam(country_code.toUpperCase(), 'country_code= $', newParams);
  }
  if (type) {
    addMultiplyParam(type, 'type=$', newParams);
  }
  if (status) {
    addMultiplyParam(status.toUpperCase(), 'status=$', newParams);
  }
  if (hazardous) {
    addSingleParam(hazardous, ' hazardous=$', newParams, false);
  }
  if (start_date) {
    addSingleParam(start_date, ' last_updated>=$', newParams, false);
  }
  if (end_date) {
    addSingleParam(end_date, ' last_updated<=$', newParams, false);
  }
  this.q = this.q + ' order by last_updated';
  if (start_from_record) {
    addSingleParam(start_date, ' offset $', newParams, true);
  }
  if (max_records) {
    addSingleParam(start_date, ' limit $', newParams, true);
  } else {
    this.q = this.q + ' limit 50';
  }
  return db.query(this.q, newParams);
};
var convertDate = (dateString) => {
  var year = dateString.substring(0, 4);
  var month = dateString.substring(4, 6);
  var day = dateString.substring(6, 8);
  var mydate = dateformat(new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0, 0)), 'yyyy-mm-dd\'T\'HH:MM:ss\'Z\'hh');

  return mydate;
};
var addMultiplyParam = (param, paramSQL, paramArr) => {
  let firstParOfSplit=true;
  let partsOfParam= param.split(',');
  for (let i = 0; i < partsOfParam.length; i++) {
    this.elem = this.elem + 1;
    if (paramArr.length>0) {
      this.q = this.q + (firstParOfSplit ? ' and (' : ' or ')+paramSQL + this.elem;
    } else {
      this.q = this.q + (firstParOfSplit ? ' where (' : ' or ')+paramSQL + this.elem;
    }
    paramArr.push(partsOfParam[i]);
    firstParOfSplit=false;
  }
  this.q = this.q + ')';
}
var addSingleParam = (param, paramSQL, paramArr, simpleAdd) => {
  this.elem = this.elem + 1;
  if (simpleAdd){
    this.q = this.q + paramSQL + this.elem;
  } else {
    this.q = this.q + (paramArr.length>0 ? ' and' : ' where') + paramSQL + this.elem;
  }
  paramArr.push(param);
}
module.exports = router;
