'use strict';
const Router = require('express-promise-router');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');
const validate = require('express-validation');
const validation = require('../validation');
const logger = require('../logger');

const router = new Router();

router.post('/', validate(validation.login), async (req, res) => {
    const {username, password} = req.body;
    const q = 'select * from users where username = $1';
    const {rows} = await db.query(q, [username]);
    if (rows.length === 1) {
        bcrypt.compare(password, rows[0].password, function (err, valid) {
            if (valid) {
                logger.info(`User '${username} logged in'`);
                const token = jwt.sign({username: username, role: 'user'}, process.env.JWT_SECRET, {expiresIn: '6h'});
                res.status(200).send(token);
            } else {
                logger.info(`Invalid password for user '${username}'`);
                res.status(401).send({'status':'Authentication failed'});
            }
        });
    } else {
        logger.info(`User '${username}' not found`);
        res.status(401).send({'status':'Authentication failed'});
    }
});

/*router.get('/register', (req, res) => {
    const {password} = req.query;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            res.status(200).send(hash);
        });
    });
});
*/

module.exports = router;
