import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestExpenseTypes(token, role) {
  const endpoint = environment.api(role).expenseTypes().getAll;

  return HttpUtils.get(endpoint, token);
}

export async function requestCreateExpenseType(token, role, data) {
  const endpoint = environment.api(role).expenseTypes().create;

  return HttpUtils.post(endpoint, token, data);
}
