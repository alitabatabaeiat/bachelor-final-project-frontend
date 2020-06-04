import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestUnits(role, params) {
  const endpoint = environment.api(role).units().getAll;

  return HttpUtils.get(endpoint, params);
}

export async function requestCreateUnit(role, data) {
  const endpoint = environment.api(role).units().create;

  return HttpUtils.post(endpoint, data);
}
