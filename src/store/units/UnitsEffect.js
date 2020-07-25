import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestUnits(token, role, params) {
  const endpoint = environment.api(role).units().getAll;

  return HttpUtils.get(endpoint, token, params);
}

export async function requestUnitsCount(token, role, params) {
  const endpoint = environment.api(role).units().count;

  return HttpUtils.get(endpoint, token, params);
}

export async function requestCreateUnit(token, role, data) {
  const endpoint = environment.api(role).units().create;

  return HttpUtils.post(endpoint, token, data);
}

export async function requestUploadExcel(token, role, data) {
  const endpoint = environment.api(role).units().uploadExcel;

  return HttpUtils.post(endpoint, token, data);
}

export async function requestUpdateUnit(token, role, unitId, data) {
  const endpoint = environment.api(role).units(unitId).update;

  return HttpUtils.patch(endpoint, token, data)
}

export async function requestDeleteUnit(token, role, unitId) {
  const endpoint = environment.api(role).units(unitId).delete;

  return HttpUtils.del(endpoint, token)
}
