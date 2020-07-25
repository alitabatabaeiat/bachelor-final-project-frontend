import uuid from 'uuid/v4';
import * as ActionUtils from '../../helpers/ActionUtils';

export const ADD_TOAST = 'ToastsAction.ADD_TOAST';

export function add(message, type) {
  return ActionUtils.createAction(ADD_TOAST, {
    message,
    type,
    id: uuid(),
  });
}

export const REMOVE_TOAST = 'ToastsAction.REMOVE_TOAST';

export function removeById(toastId) {
  return ActionUtils.createAction(REMOVE_TOAST, toastId);
}
