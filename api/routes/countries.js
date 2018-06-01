'use strict';
const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

router.get('/', async (req, res) => {
  const query = 'select country_code, population, reports_qnt, reports_qnt/Nullif(population,0) *10000 as tpr from country_population order by 4 desc nulls last;';
  const {rows} = await db.query(query);
  const queryResources = 'select country_code, resourcename, url from country_resource LEFT JOIN resource ON country_resource.resourcename = resource.name;'
  const resourcesResult = await db.query(queryResources);
  res.send({
    'status': 'SUCCESS',
    'sources': rows.map(v => {
      return {
        "country_code": v["country_code"],
        "population": v["population"],
        "reports_number": v["reports_qnt"],
        "tpr": v["tpr"],
        "resources": resourcesResult.rows.filter(o => o.country_code == v["country_code"]).map(n => {
          return  {
            "resourceName": n["resourcename"],
            "link" : n["url"]};
        })
      };
    })
  })
});

module.exports = router;
