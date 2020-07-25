import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestAllApartments(token, role) {
  const endpoint = environment.api(role).apartments().getAll;

  return HttpUtils.get(endpoint, token);
}

export async function requestDeleteApartment(token, role, id) {
  const endpoint = environment.api(role).apartments(id).delete;

  return HttpUtils.del(endpoint, token);
}

export async function requestAllApartmentExpenses(token, role, apartmentId, query) {
  const endpoint = environment.api(role).apartments(apartmentId).expenses().getAll;

  return HttpUtils.get(endpoint, token, query);
}

export async function requestCreateApartmentExpense(token, role, apartmentId, data) {
  const endpoint = environment.api(role).apartments(apartmentId).expenses().create;

  return HttpUtils.post(endpoint, token, data);
}

export async function requestCalculateApartmentExpense(token, role, apartmentId, data) {
  const endpoint = environment.api(role).apartments(apartmentId).expenses().calculate;

  return HttpUtils.post(endpoint, token, data);
}

export async function requestDeleteApartmentExpense(token, role, apartmentId, expenseId) {
  const endpoint = environment.api(role).apartments(apartmentId).expenses(expenseId).delete;

  return HttpUtils.del(endpoint, token);
}

export async function requestAllExpenseOptions(token, role, apartmentId) {
  const endpoint = environment.api(role).apartments(apartmentId).expenses().getAllOptions;

  return HttpUtils.get(endpoint, token);
}

export async function requestApartmentSetting(token, role, apartmentId) {
  const endpoint = environment.api(role).apartments(apartmentId).settings().getApartmentSetting;

  return HttpUtils.get(endpoint, token);
}

export async function requestUpdateApartmentSetting(token, role, apartmentId, data) {
  const endpoint = environment.api(role).apartments(apartmentId).settings().updateApartmentSetting;

  return HttpUtils.patch(endpoint, token, data);
}
