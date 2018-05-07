'use strict';
const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

router.get('/', async (req, res) => {
  const query = 'select count (*) as reports_number, country_code from reports where country_code is not null group by country_code order by 1 desc;';
  const { rows } = await db.query(query);
  res.send({
    'status': 'SUCCESS',
      'sources': rows.map(v => {
          return { 
            "count": v["reports_number"],
            "country_code": v["country_code"]
          };
      })
  })
});

module.exports = router;
