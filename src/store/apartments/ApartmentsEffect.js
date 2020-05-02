import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestAllApartments(role) {
  const endpoint = environment.api.apartments(role).getAll;

  return HttpUtils.get(endpoint);
}
