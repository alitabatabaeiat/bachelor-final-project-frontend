import Joi from '@hapi/joi';
import Rules from '../../../../helpers/rules';

const createExpenseTypeSchema = Joi.object({
  title: Rules.persianText.min(3).max(25).required(),
  color: Joi.string().hex().length(6).required()
});

export {
  createExpenseTypeSchema
};
