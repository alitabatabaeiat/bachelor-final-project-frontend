import * as ActionUtils from '../../helpers/ActionUtils';


export let CHANGE_ROLE = 'UserAction.CHANGE_ROLE';
export let CHANGE_CURRENT_APARTMENT = 'UserAction.CHANGE_CURRENT_APARTMENT';
export let CHANGE_CURRENT_UNIT = 'UserAction.CHANGE_CURRENT_UNIT';

export function changeRole() {
  return ActionUtils.createAction(CHANGE_ROLE);
}

export function changeCurrentApartment(apartment) {
  return ActionUtils.createAction(CHANGE_CURRENT_APARTMENT, apartment);
}

export function changeCurrentUnit(unit) {
  return ActionUtils.createAction(CHANGE_CURRENT_UNIT, unit);
}
