import * as ActionUtils from '../../helpers/ActionUtils';
import * as UserEffet from './UserEffect';


export let REQUEST_SIGN_IN = 'UserAction.REQUEST_SIGN_IN';
export let REQUEST_SIGN_IN_FINISHED = 'UserAction.REQUEST_SIGN_IN_FINISHED';

export let SIGN_OUT = 'UserAction.SIGN_OUT';

export let CHANGE_ROLE = 'UserAction.CHANGE_ROLE';
export let CHANGE_CURRENT_APARTMENT = 'UserAction.CHANGE_CURRENT_APARTMENT';
export let CHANGE_CURRENT_UNIT = 'UserAction.CHANGE_CURRENT_UNIT';

export function requestSignIn(data) {
  return async (dispatch) => {
    await ActionUtils.createThunkEffect(dispatch, REQUEST_SIGN_IN, UserEffet.requestSignIn, data);
  }
}

export function requestSignOut() {
  return ActionUtils.createAction(SIGN_OUT);
}

export function changeRole() {
  return ActionUtils.createAction(CHANGE_ROLE);
}

export function changeCurrentApartment(apartment) {
  return ActionUtils.createAction(CHANGE_CURRENT_APARTMENT, apartment);
}

export function changeCurrentUnit(unit) {
  return ActionUtils.createAction(CHANGE_CURRENT_UNIT, unit);
}
