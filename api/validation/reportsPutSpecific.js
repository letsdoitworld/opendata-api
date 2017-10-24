const Joi = require('joi');

module.exports = {
    body: {
        status: Joi.string().valid('CLEANED','REPORTED','CONFIRMED','UNKNOWN').insensitive().required()
    },
    params: {
        type: Joi.string().max(30).required(),
        id: Joi.string().max(32).required()
    }
  };
