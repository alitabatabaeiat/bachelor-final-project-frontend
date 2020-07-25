import Joi from '@hapi/joi';
import Rules from '../../helpers/rules';

export const signInSchema = Joi.object({
  mobileNumber: Rules.mobileNumber.required(),
  password: Joi.string().required()
});
