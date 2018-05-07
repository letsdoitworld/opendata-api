'use strict';
const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

router.get('/', async (req, res) => {
  const query = 'select count (*) as reports_number' +
      ', r.country_code' +
      ', count(*) /  (select population / 10000 from country_population where country_population.country_code = r.country_code) as tpr' +
      ' from reports r' +
      ' where  r.country_code is not null' +
      ' group by r.country_code order by tpr desc NULLS  LAST;';
  const { rows } = await db.query(query);
  res.send({
    'status': 'SUCCESS',
      'sources': rows.map(v => {
          return { 
            "count": v["reports_number"],
            "country_code": v["country_code"],
            "tpr": v["tpr"]
          };
      })
  })
});

module.exports = router;
