'use strict';
const Router = require('express-promise-router');
const db = require('../db');
var dateformat = require('dateformat');

const router = new Router({ mergeParams: true });
var elem;
var q;
router.get('/', async (req, res) => {
  const { rows } = await query(req.query.country_code, req.query.type, req.query.status, req.query.hazardous,
    req.query.start_date, req.query.end_date, req.query.max_records, req.query.start_record);

  if (req.query.download) {
    //download everything as a file if asked
    res.setHeader('Content-disposition', 'attachment; filename=opendata-export.json');
    res.setHeader('Content-type', 'application/json');
  }

  res.send({
    'trashpoints_total': rows && rows.length > 0 ? rows[0].full_count : 0,
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
  this.q = this.q + ' order by last_updated desc nulls last';
  if (start_from_record) {
    addSingleParam(start_from_record, ' offset $', newParams, true);
  }

  const parsedMaxRecords = parseInt(max_records);

  if (parsedMaxRecords > 0) {
    addSingleParam(max_records, ' limit $', newParams, true);
  } else if (parsedMaxRecords !== -1) {
    this.q = this.q + ' limit 50';
  }

  console.log('Executing following query: ' + this.q);

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
    this.q = this.q + paramSQL.replace('$', ('$' + this.elem));
  } else {
    this.q = this.q + (paramArr.length>0 ? ' and' : ' where') + paramSQL.replace('$', ('$' + this.elem));
  }
  paramArr.push(param);
}
module.exports = router;
