'use strict';
const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

router.get('/:id', async (req, res) => {
    let params = [req.params.id];
    const query = 'select * ' +
        ' from reports'+
        ' where  id= $1;'
    const {rows} = await db.query(query, params);
    res.send({
        'status': 'SUCCESS',
        'sources': rows
    })
});

module.exports = router;
