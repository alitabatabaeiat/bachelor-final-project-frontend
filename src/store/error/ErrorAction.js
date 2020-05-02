import * as ActionUtils from '../../helpers/ActionUtils';

export const REMOVE = 'ErrorAction.REMOVE';

export function removeById(id) {
  return ActionUtils.createAction(REMOVE, id);
}

export const CLEAR_ALL = 'ErrorAction.CLEAR_ALL';

export function clearAll() {
  return ActionUtils.createAction(CLEAR_ALL);
}
