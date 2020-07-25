import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestCreateCharge(token, role, apartmentId, data) {
  const endpoint = environment.api(role).apartments(apartmentId).charges().create;

  return HttpUtils.post(endpoint, token, data);
}

export async function requestGetAllApartmentCharges(token, role, apartmentId, query) {
  const endpoint = environment.api(role).apartments(apartmentId).charges().getAll;

  return HttpUtils.get(endpoint, token, query);
}

export async function requestGetApartmentCharge(token, role, apartmentId, chargeId) {
  const endpoint = environment.api(role).apartments(apartmentId).charges(chargeId).getOne;

  return HttpUtils.get(endpoint, token);
}

export async function requestGetApartmentLastCharge(token, role, apartmentId) {
  const endpoint = environment.api(role).apartments(apartmentId).charges().lastCharge;

  return HttpUtils.get(endpoint, token);
}

export async function requestGetUnitLastCharge(token, role, unitId) {
  const endpoint = environment.api(role).units(unitId).charges().lastCharge;

  return HttpUtils.get(endpoint, token);
}

export async function requestGetAllUnitCharges(token, role, unitId) {
  const endpoint = environment.api(role).units(unitId).charges().getAll;

  return HttpUtils.get(endpoint, token);
}

export async function requestPayUnitCharges(token, role, unitId, chargeId) {
  const endpoint = environment.api(role).units(unitId).charges(chargeId).pay;

  return HttpUtils.post(endpoint, token);
}
