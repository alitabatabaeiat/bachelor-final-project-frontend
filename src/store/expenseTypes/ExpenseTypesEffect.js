import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestExpenseTypes(role) {
  const endpoint = environment.api(role).expenseTypes().getAll;

  return HttpUtils.get(endpoint);
}
