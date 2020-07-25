import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestUnits(role, params) {
  const endpoint = environment.api(role).units().getAll;

  return HttpUtils.get(endpoint, params);
}

export async function requestUnitsCount(role, params) {
  const endpoint = environment.api(role).units().count;

  return HttpUtils.get(endpoint, params);
}

export async function requestCreateUnit(role, data) {
  const endpoint = environment.api(role).units().create;

  return HttpUtils.post(endpoint, data);
}

export async function requestUploadExcel(role, data) {
  const endpoint = environment.api(role).units().uploadExcel;

  return HttpUtils.post(endpoint, data);
}

export async function requestUpdateUnit(role, unitId, data) {
  const endpoint = environment.api(role).units(unitId).update;

  return HttpUtils.patch(endpoint, data)
}

export async function requestDeleteUnit(role, unitId) {
  const endpoint = environment.api(role).units(unitId).delete;

  return HttpUtils.del(endpoint)
}
