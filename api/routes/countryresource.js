'use strict';
const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

router.get('/', async (req, res) => {
  const query = 'select * from country_population;'
  const {rows} = await db.query(query);
  const queryResources = 'select * from country_resource;'
  const resourcesResult = await db.query(queryResources);
    res.send({
        'status': 'SUCCESS',
        'sources': rows.map(v => {
            return {
                "country_code": v["country_code"],
                "population": v["population"],
                "reports_number": v["reportsqnt"],
                "resources": resourcesResult.rows.filter(o => o.country_code == v["country_code"]).map(n => {
                  return  {
                    "resourceName": n["resourcename"]};
                })
            };
        })
    })
});

module.exports = router;
