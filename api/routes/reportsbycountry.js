'use strict';
const Router = require('express-promise-router');
const db = require('../db');

const router = new Router({mergeParams: true});

router.get('/:code', async (req, res) => {
    let params = [req.params.code.toUpperCase()];
    const query = 'select * ' +
        ' from reports'+
        ' where  country_code= $1;'
    const {rows} = await db.query(query, params);
    res.send({
        'status': 'SUCCESS',
        'sources': rows
    })
});

module.exports = router;
