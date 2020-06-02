import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestUnits(role, params) {
  const endpoint = environment.api(role).units().getAll;

  return HttpUtils.get(endpoint, params);
}
