import Joi from '@hapi/joi';
import Rules from '../../../../helpers/rules';

export const createUnitSchema = Joi.object({
  title: Rules.persianText.min(3).max(25).required(),
  floor: Joi.number().integer().required(),
  area: Joi.number().integer().positive().required(),
  parkingSpaceCount: Joi.number().integer().min(0).required(),
  residentCount: Joi.number().integer().min(0).required(),
  fixedCharge: Joi.number().integer().min(0),
  powerConsumption: Joi.number().integer().min(1),
  isEmpty: Joi.bool().required(),
  resident: Rules.mobileNumber
});

export const updateUnitSchema = Joi.object({
  title: Rules.persianText.min(3).max(25),
  floor: Joi.number().integer(),
  area: Joi.number().integer().positive(),
  parkingSpaceCount: Joi.number().integer().min(0),
  residentCount: Joi.number().integer().min(0),
  fixedCharge: Joi.number().integer().min(0),
  powerConsumption: Joi.number().integer().min(1),
  isEmpty: Joi.boolean(),
  resident: Rules.mobileNumber.allow(null)
});
