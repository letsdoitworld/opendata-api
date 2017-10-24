'use strict';
const Router = require('express-promise-router');
const db = require('../db');
const countryInfo = require('../models/country');
const validate = require('express-validation');
const validation = require('../validation');
const logger = require('../logger');

const router = new Router();

const success = 'SUCCESS';

router.get('/', validate(validation.reports), async (req, res) => {

  logger.info("Incoming", req.method, req.baseUrl, "params:", req.query, "user:", req.user);

  const { rows } = await query(req.query.pageSize, req.query.offset, req.query.country, req.query.source);
  
  res.send({
    'status': success,
    'reports': rows
  });
});

const upsert_returning = 'RETURNING id, type, source_id, lat, long, ts, status';

router.post('/', validate(validation.reportsPost), async (req, res) => {
  
  logger.info("Incoming", req.method, req.baseUrl, "body:", req.body, "user:", req.user);

  let params = [req.body.lat, req.body.long, req.body.ts, 
                req.body.source, req.body.id, req.body.status, 
                'TrashAPI', new Date()];

  const qry = 'INSERT INTO reports(lat, long, ts, type, source_id, status, created_by, created_at) ' +
    'values ($1, $2, $3, $4, $5, $6, $7, $8) ' + upsert_returning;

  const {rows} = await db.query(qry, params);

  res.send({
    'status': success,
    'report': rows[0]
  });
});

router.put('/:platformid', validate(validation.reportsPutNative), async (req, res) => {

  logger.info("Incoming", req.method, req.baseUrl, "params", req.params, "body:", req.body, "user:", req.user);
  
  let params = [req.body.status, req.params.platformid];
  const qry = 'UPDATE reports set status = $1 where id = $2 ' + upsert_returning;

  const {rows} = await db.query(qry, params);

  res.send({
    'status': success,
    'report': rows[0]
  });
});

router.put('/:type/:id', validate(validation.reportsPutSpecific), async (req, res) => {

  logger.info("Incoming", req.method, req.baseUrl, "params", req.params, "body:", req.body, "user:", req.user);
  
  let params = [req.body.status, req.params.type, req.params.id];

  const qry = 'UPDATE reports set status = $1 where type = $2 and source_id = $3 ' + upsert_returning;
  
  const {rows} = await db.query(qry, params);
  
  res.send({
    'status': success,
    'report': rows[0]
  });
  
});

var query = (pageSize, offset, countries, source) => {

  if (countries.constructor === Array) {
    countries = countries.map(c => countryInfo.getCountryName(c).toLowerCase());
  } else {
    countries = Array.of(countryInfo.getCountryName(countries).toLowerCase());
  }

  if (source.constructor === Array) {
    source = source.map(v => v.toLowerCase());
  } else {
    source = Array.of(source.toLowerCase());
  }

  let q = 'SELECT id, type as source, country_code, country, lat, long, ts, status FROM reports ';
  let params = [];

  if (countries.length && !source.length) {
    q = q + 'WHERE LOWER(country) = ANY ($3) ORDER BY id limit $1 offset $2';
    params = [pageSize, offset, countries]
  } else if (!countries.length && source.length) {
    q = q + 'WHERE LOWER(type) = ANY ($3) ORDER BY id limit $1 offset $2';
    params = [pageSize, offset, source]
  } else if (countries.length && source.length) {
    q = q + 'WHERE LOWER(country) = ANY ($3) AND LOWER(type) = ANY ($4) ORDER BY id limit $1 offset $2';
    params = [pageSize, offset, countries, source]
  } else {
    q = q + 'ORDER BY id limit $1 offset $2';
    params = [pageSize, offset]
  }
  return db.query(q, params);
};

module.exports = router;
