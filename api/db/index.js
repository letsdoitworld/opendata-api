const {Pool} = require('pg');
const toBoolean = require('to-boolean');

const pool = new Pool({
    user: process.env.DB_USER || 'ldiw',
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'trash',
    port: process.env.DB_PORT || 5432,
    ssl: toBoolean(process.env.DB_SSL || ''),
    idleTimeoutMillis: process.env.PG_TIMEOUT || 8 * 60 * 60 * 1000 // 8 hours by default
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    end: () => pool.end()
};