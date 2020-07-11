import * as ActionUtils from '../../helpers/ActionUtils';
import _ from 'lodash';


export let CHANGE_ROLE = 'UserAction.CHANGE_ROLE';

export function changeRole() {
  return ActionUtils.createAction(CHANGE_ROLE);
}
