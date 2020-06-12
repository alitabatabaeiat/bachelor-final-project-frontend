import Joi from '@hapi/joi';
import Rules from '../../helpers/rules';

export const chargeInformationSchema = Joi.object({
  title: Rules.persianText.min(3).max(30).required(),
  paymentDeadline: Joi.number().integer().positive(),
  delayPenalty: Joi.number().integer().positive(),
  includeFixedCharge: Joi.boolean().required()
});
