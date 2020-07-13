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

export async function requestAllApartmentExpenses(role, apartmentId, query) {
  const endpoint = environment.api(role).apartments(apartmentId).expenses().getAll;

  return HttpUtils.get(endpoint, query);
}

export async function requestCreateApartmentExpense(role, apartmentId, data) {
  const endpoint = environment.api(role).apartments(apartmentId).expenses().create;

  return HttpUtils.post(endpoint, data);
}

export async function requestCalculateApartmentExpense(role, apartmentId, data) {
  const endpoint = environment.api(role).apartments(apartmentId).expenses().calculate;

  return HttpUtils.post(endpoint, data);
}

export async function requestDeleteApartmentExpense(role, apartmentId, expenseId) {
  const endpoint = environment.api(role).apartments(apartmentId).expenses(expenseId).delete;

  return HttpUtils.del(endpoint);
}

export async function requestAllExpenseOptions(role, apartmentId) {
  const endpoint = environment.api(role).apartments(apartmentId).expenses().getAllOptions;

  return HttpUtils.get(endpoint);
}
