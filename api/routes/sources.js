'use strict';
const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

router.get('/', async (req, res) => {
  const qry = 'select r.type, r.reports, r.updated, rs.url, rs.name from (select type, count(id) as reports, max(created_at) as updated from reports group by type) r, report_sources rs where r.type = rs.type;';
  const { rows } = await db.query(qry);
  res.send({
    'status': 'SUCCESS',
      'sources': rows.map(v => {
          return { 
            "name": v["name"],
            "url": v["url"],
            "type": v["type"], 
            "reports": parseInt(v["reports"]), 
            "updated": v["updated"]
          };
      })
  })
});

module.exports = router;
