import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestAllApartments(role) {
  const endpoint = environment.api(role).apartments().getAll;

  return HttpUtils.get(endpoint);
}

export async function requestDeleteApartment(role, id) {
  const endpoint = environment.api(role).apartments(id).delete;

  return HttpUtils.del(endpoint);
}

export async function requestAllApartmentExpenses(role, apartmentId) {
  const endpoint = environment.api(role).apartments(apartmentId).expenses().getAll;

  return HttpUtils.get(endpoint);
}

export async function requestDeleteApartmentExpense(role, apartmentId, expenseId) {
  const endpoint = environment.api(role).apartments(apartmentId).expenses(expenseId).delete;

  return HttpUtils.del(endpoint);
}
