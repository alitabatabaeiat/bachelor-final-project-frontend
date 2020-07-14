import Joi from '@hapi/joi';

export const updateApartmentSettingSchema = Joi.object({
  residentCountStep: Joi.number().positive(),
  parkingSpaceCountStep: Joi.number().positive(),
  floorStep: Joi.number().positive(),
  areaStep: Joi.number().positive()
});
