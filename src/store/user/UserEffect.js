import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestSignIn(data) {
  const endpoint = environment.api().user().signIn;

  return HttpUtils.post(endpoint, null, data);
}
