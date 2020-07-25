import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestAllNotifications(token, role, query) {
  const endpoint = environment.api(role).notifications().getAll;

  return HttpUtils.get(endpoint, token, query);
}

export async function requestCreateNotifications(token, role, data) {
  const endpoint = environment.api(role).notifications().create;

  return HttpUtils.post(endpoint, token, data);
}
