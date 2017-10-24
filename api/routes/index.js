const express_jwt = require('express-jwt');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const reports = require('./reports');
const login = require('./login');
const sources = require('./sources');
const logger = require('../logger');

const swaggerDocument = require('./swagger.json');

const cors = require('cors');
//const brute = require('./brute');


module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express_jwt({secret: process.env.JWT_SECRET}).unless({ 
      path: [ 
          /doc/, 
          '/api/token',
          {url: '/api/reports', methods: ['GET']},
          {url: '/api/sources', methods: ['GET']},
          {url: /\/api(\/)?|\//, methods:['GET']}
      ]
    }));

  app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use('/api/token'/*, brute.prevent*/, login);
  app.use('/api/reports'/*, brute.prevent*/, reports);
  app.use('/api/sources'/*, brute.prevent*/, sources);

  app.get(/\/api(\/)?|\// /*, brute.prevent*/, function (req, res, next) {
    res.redirect('/api/doc/');
    next();
  });

  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({'status':'Unauthorized'});
      logger.error(err);
    } else {
      res.status(500).send({'status':'Server error'});
      logger.error(err);
    }
  });
};
