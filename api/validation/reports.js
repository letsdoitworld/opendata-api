const Joi = require('joi');

module.exports = {
    query: {
      pageSize: Joi.number().integer().greater(0).max(1000).default(10).optional(),
      offset: Joi.number().integer().min(0).default(0).optional(),
      source: Joi.alternatives().try(Joi.string(), Joi.array()).default([]).optional(),
      country: Joi.alternatives().try(Joi.string(), Joi.array()).default([]).optional()
    }
  };
