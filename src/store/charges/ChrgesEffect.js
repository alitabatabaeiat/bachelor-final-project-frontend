import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestCreateCharge(role, apartmentId, data) {
  const endpoint = environment.api(role).apartments(apartmentId).charges().create;

  return HttpUtils.post(endpoint, data);
}

export async function requestGetAllApartmentCharges(role, apartmentId) {
  const endpoint = environment.api(role).apartments(apartmentId).charges().getAll;

  return HttpUtils.get(endpoint);
}

export async function requestGetAllUnitCharges(role, unitId) {
  const endpoint = environment.api(role).units(unitId).charges().getAll;

  return HttpUtils.get(endpoint);
}
