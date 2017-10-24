const ExpressBrute = require('express-brute');
const PgStore = require('express-brute-pg');
const toBoolean = require('to-boolean');

let store;
if (process.env.ENV === 'development'){
    store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
} else {

    const sslHack = toBoolean(process.env.DB_SSL || '') ? '?ssl=true' : ''

    store = new PgStore({
        host: process.env.DB_HOST,
        database: (process.env.DB_NAME || 'trash') + sslHack,
        username: process.env.DB_USER || 'ldiw',
        password: process.env.DB_PASSWORD,
    });
}
module.exports = new ExpressBrute(store);
