import Joi from '@hapi/joi';
import Rules from '../../../../helpers/rules';

export const createApartmentExpenseSchema = Joi.object({
  type: Rules.id.required(),
  amount: Joi.number().integer().min(0).required(),
  description: Rules.persianText.max(256),
  splitOption: Joi.number().integer().valid(...[1, 2, 3, 4, 5, 6]).required(),
  filterOption: Joi.number().integer().valid(...[1, 2, 3, 4]).required(),
  units: Joi.array().items(Joi.number().integer().greater(0)).min(1).messages({
    'array.min': 'باید حداقل یک واحد انتخاب شود'
  }),
  coefficients: Joi.array().items(Joi.number().integer().min(0)).min(1)
});
