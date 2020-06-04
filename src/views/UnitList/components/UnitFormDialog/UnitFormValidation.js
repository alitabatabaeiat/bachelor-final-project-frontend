import Joi from '@hapi/joi';
import Rules from '../../../../helpers/rules';

export const createUnitSchema = Joi.object({
  title: Rules.persianText.min(3).max(25).required(),
  floor: Joi.number().integer().required(),
  area: Joi.number().integer().positive().required(),
  parkingSpaceCount: Joi.number().integer().min(0).required(),
  residentCount: Joi.number().integer().min(0).required(),
  fixedCharge: Joi.number().integer().min(0),
  isEmpty: Joi.bool().required(),
  resident: Rules.mobileNumber
});
