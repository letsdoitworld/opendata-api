const winston = require('winston');
require('winston-daily-rotate-file');

const path = process.env.LOGPATH || '.';
const fileTransport = new (winston.transports.DailyRotateFile)({
    filename: path+'/log',
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info'
});

const logger = new winston.Logger({
    transports: [
        new (winston.transports.Console)({ level: 'debug' }),
        fileTransport,
    ]
});

module.exports = logger;
