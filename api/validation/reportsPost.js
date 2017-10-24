const Joi = require('joi');

module.exports = {
    body: {
        id: Joi.string().max(32).required(),
        source: Joi.string().max(30).required(),
        ts: Joi.string().isoDate().required(),
        lat: Joi.number().min(-90).max(90).required(),
        long: Joi.number().min(-180).max(180).required(),
        status: Joi.string().valid('CLEANED','REPORTED','CONFIRMED','UNKNOWN').insensitive().required()
    }
  };
