const Joi = require('joi');

module.exports = {
    body: {
        status: Joi.string().valid('CLEANED','REPORTED','CONFIRMED','UNKNOWN').insensitive().required()
    },
    params: {
        platformid: Joi.number().integer().min(1).required()
    }
  };
