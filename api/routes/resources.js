'use strict';
const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

router.get('/', async (req, res) => {
  const query = 'select * ' +
    ' from resource;';
  const {rows} = await db.query(query);
  res.send({
    'status': 'SUCCESS',
    'sources': rows
  })
});

module.exports = router;
