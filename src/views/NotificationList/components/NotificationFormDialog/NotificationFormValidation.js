import Joi from '@hapi/joi';
import Rules from '../../../../helpers/rules';

export const createNotificationSchema = Joi.object({
  title: Rules.persianText.min(3).max(30).required(),
  body: Rules.persianText.required(),
});
