import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestCreateCharge(role, apartmentId, data) {
  const endpoint = environment.api(role).apartments(apartmentId).charges().create;

  return HttpUtils.post(endpoint, data);
}
