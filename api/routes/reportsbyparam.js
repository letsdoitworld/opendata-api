'use strict';
const Router = require('express-promise-router');
const db = require('../db');
var dateformat = require('dateformat');

const router = new Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { rows } = await query(req.query.code ? req.query.code.toUpperCase() : req.query.code, req.query.type,
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
var query = (country_code, type, start_date, end_date, max_records, start_from_record) => {
  let q = 'select *, count(*) over() as full_count from reports';
  let parExist = false;
  let elem = 0;
  let params = [country_code, type, start_date ? convertDate(start_date) : null,
    end_date ? convertDate(end_date) : null, start_from_record, max_records];
  let newParams = [];
  if (country_code) {
    var partsOfCountry = country_code.split(',');
    for (let i = 0; i < partsOfCountry.length; i++) {
      elem = elem + 1;
      if (newParams.length>0) {
        q = q + ' or country_code= $' + elem;
      } else {
        q = q + ' where (country_code= $' + elem;
      }
      newParams.push(partsOfCountry[i]);
    }
    q = q + ')';
  }
  if (type) {
    let firstParOfSplit=true;
    let partsOfCreated = type.split(',');
    for (let i = 0; i < partsOfCreated.length; i++) {
      elem = elem + 1;
      if (newParams.length>0) {
        q = q + (firstParOfSplit ? ' and (' : ' or') + ' type=$' + elem;
      } else {
        q = q + (firstParOfSplit ? ' where (' : ' or') + ' type=$' + elem;
      }
      newParams.push(partsOfCreated[i]);
      firstParOfSplit=false;
    }
    q = q + ')';
  }
  if (start_date) {
    elem = elem + 1;
    q = q + (newParams.length>0 ? ' and' : ' where') + ' last_updated>=$' + elem;
    newParams.push(start_date);
  }
  if (end_date) {
    elem = elem + 1;
    q = q + (newParams.length>0 ? ' and' : ' where') + ' last_updated<=$' + elem;
    newParams.push(end_date);
  }
  q = q + ' order by last_updated';
  if (start_from_record) {
    elem = elem + 1;
    q = q + ' offset $' + elem;
    newParams.push(start_from_record);
  }
  if (max_records) {
    elem = elem + 1;
    q = q + ' limit $' + elem;
    newParams.push(max_records);
  } else {
    q = q + ' limit 50';
  }
  return db.query(q, newParams);
};
var convertDate = (dateString) => {
  var year = dateString.substring(0, 4);
  var month = dateString.substring(4, 6);
  var day = dateString.substring(6, 8);
  var mydate = dateformat(new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0, 0)), 'yyyy-mm-dd\'T\'HH:MM:ss\'Z\'hh');

  return mydate;
};

module.exports = router;
