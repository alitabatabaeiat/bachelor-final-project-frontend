import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestCreateCharge(role, apartmentId, data) {
  const endpoint = environment.api(role).apartments(apartmentId).charges().create;

  return HttpUtils.post(endpoint, data);
}

export async function requestGetAllApartmentCharges(role, apartmentId, query) {
  const endpoint = environment.api(role).apartments(apartmentId).charges().getAll;

  return HttpUtils.get(endpoint, query);
}

export async function requestGetApartmentCharge(role, apartmentId, chargeId) {
  const endpoint = environment.api(role).apartments(apartmentId).charges(chargeId).getOne;

  return HttpUtils.get(endpoint);
}

export async function requestGetApartmentLastCharge(role, apartmentId) {
  const endpoint = environment.api(role).apartments(apartmentId).charges().lastCharge;

  return HttpUtils.get(endpoint);
}

export async function requestGetUnitLastCharge(role, unitId) {
  const endpoint = environment.api(role).units(unitId).charges().lastCharge;

  return HttpUtils.get(endpoint);
}

export async function requestGetAllUnitCharges(role, unitId) {
  const endpoint = environment.api(role).units(unitId).charges().getAll;

  return HttpUtils.get(endpoint);
}

export async function requestPayUnitCharges(role, unitId, chargeId) {
  const endpoint = environment.api(role).units(unitId).charges(chargeId).pay;

  return HttpUtils.post(endpoint);
}
