const Joi = require('joi');

module.exports = {
    body: {
      username: Joi.string().optional(),
      password: Joi.string().optional()
    }
  };
