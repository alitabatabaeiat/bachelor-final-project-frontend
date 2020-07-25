import * as ChargesEffect from './ChrgesEffect';
import * as ActionUtils from '../../helpers/ActionUtils';

export const REQUEST_CREATE_CHARGE = 'ChargesAction.REQUEST_CREATE_CHARGE';
export const REQUEST_CREATE_CHARGE_FINISHED = 'ChargesAction.REQUEST_CREATE_CHARGE_FINISHED';

export const REQUEST_GET_ALL_APARTMENT_CHARGES = 'ChargesAction.REQUEST_GET_ALL_APARTMENT_CHARGES';
export const REQUEST_GET_ALL_APARTMENT_CHARGES_FINISHED = 'ChargesAction.REQUEST_GET_ALL_APARTMENT_CHARGES_FINISHED';

export const REQUEST_GET_APARTMENT_LAST_CHARGE = 'ChargesAction.REQUEST_GET_APARTMENT_LAST_CHARGE';
export const REQUEST_GET_APARTMENT_LAST_CHARGE_FINISHED = 'ChargesAction.REQUEST_GET_APARTMENT_LAST_CHARGE_FINISHED';

export const REQUEST_GET_UNIT_LAST_CHARGE = 'ChargesAction.REQUEST_GET_UNIT_LAST_CHARGE';
export const REQUEST_GET_UNIT_LAST_CHARGE_FINISHED = 'ChargesAction.REQUEST_GET_UNIT_LAST_CHARGE_FINISHED';

export const REQUEST_GET_APARTMENT_CHARGE = 'ChargesAction.REQUEST_GET_APARTMENT_CHARGE';
export const REQUEST_GET_APARTMENT_CHARGE_FINISHED = 'ChargesAction.REQUEST_GET_APARTMENT_CHARGE_FINISHED';

export const REQUEST_GET_ALL_UNIT_CHARGES = 'ChargesAction.REQUEST_GET_ALL_UNIT_CHARGES';
export const REQUEST_GET_ALL_UNIT_CHARGES_FINISHED = 'ChargesAction.REQUEST_GET_ALL_UNIT_CHARGES_FINISHED';

export const REQUEST_REQUEST_PAY_UNIT_CHARGE = 'ChargesAction.REQUEST_REQUEST_PAY_UNIT_CHARGE';
export const REQUEST_REQUEST_PAY_UNIT_CHARGE_FINISHED = 'ChargesAction.REQUEST_REQUEST_PAY_UNIT_CHARGE_FINISHED';

export function requestCreateCharge(data) {
  return async (dispatch, getState) => {
    const { user } = getState();

    await ActionUtils.createThunkEffect(dispatch, REQUEST_CREATE_CHARGE, ChargesEffect.requestCreateCharge,
      user.token, user.role, user.currentApartment.id, data);
  };
}

export function requestGetAllApartmentCharges(query = null) {
  return async (dispatch, getState) => {
    const { user } = getState();

    await ActionUtils.createThunkEffect(dispatch, REQUEST_GET_ALL_APARTMENT_CHARGES, ChargesEffect.requestGetAllApartmentCharges,
      user.token, user.role, user.currentApartment.id, query);
  };
}

export function requestGetApartmentLastCharge() {
  return async (dispatch, getState) => {
    const { user } = getState();

    await ActionUtils.createThunkEffect(dispatch, REQUEST_GET_APARTMENT_LAST_CHARGE, ChargesEffect.requestGetApartmentLastCharge,
      user.token, user.role, user.currentApartment.id);
  };
}

export function requestGetUnitLastCharge() {
  return async (dispatch, getState) => {
    const { user } = getState();

    await ActionUtils.createThunkEffect(dispatch, REQUEST_GET_UNIT_LAST_CHARGE, ChargesEffect.requestGetUnitLastCharge,
      user.token, user.role, user.currentUnit.id);
  };
}

export function requestGetApartmentCharge(chargeId) {
  return async (dispatch, getState) => {
    const { user } = getState();

    await ActionUtils.createThunkEffect(dispatch, REQUEST_GET_APARTMENT_CHARGE, ChargesEffect.requestGetApartmentCharge,
      user.token, user.role, user.currentApartment.id, chargeId);
  };
}

export function requestGetAllUnitCharges() {
  return async (dispatch, getState) => {
    const { user } = getState();

    await ActionUtils.createThunkEffect(dispatch, REQUEST_GET_ALL_UNIT_CHARGES, ChargesEffect.requestGetAllUnitCharges,
      user.token, user.role, user.currentUnit.id);
  };
}

export function requestPayUnitCharges(chargeId) {
  return async (dispatch, getState) => {
    const { user } = getState();

    await ActionUtils.createThunkEffect(dispatch, REQUEST_REQUEST_PAY_UNIT_CHARGE, ChargesEffect.requestPayUnitCharges,
      user.token, user.role, user.currentUnit.id, chargeId);
  };
}
