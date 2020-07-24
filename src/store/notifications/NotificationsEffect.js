import environment from 'environment';
import * as HttpUtils from '../../helpers/HttpUtils';

export async function requestAllNotifications(role, query) {
  const endpoint = environment.api(role).notifications().getAll;

  return HttpUtils.get(endpoint, query);
}

export async function requestCreateNotifications(role, data) {
  const endpoint = environment.api(role).notifications().create;

  return HttpUtils.post(endpoint, data);
}
