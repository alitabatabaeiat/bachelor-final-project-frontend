import * as ChargesEffect from './ChrgesEffect';
import * as ActionUtils from '../../helpers/ActionUtils';

export const REQUEST_CREATE_CHARGE = 'ChargesAction.REQUEST_CREATE_CHARGE';
export const REQUEST_CREATE_CHARGE_FINISHED = 'ChargesAction.REQUEST_CREATE_CHARGE_FINISHED';

export const REQUEST_GET_ALL_APARTMENT_CHARGES = 'ChargesAction.REQUEST_GET_ALL_APARTMENT_CHARGES';
export const REQUEST_GET_ALL_APARTMENT_CHARGES_FINISHED = 'ChargesAction.REQUEST_GET_ALL_APARTMENT_CHARGES_FINISHED';

export const REQUEST_GET_APARTMENT_CHARGE = 'ChargesAction.REQUEST_GET_APARTMENT_CHARGE';
export const REQUEST_GET_APARTMENT_CHARGE_FINISHED = 'ChargesAction.REQUEST_GET_APARTMENT_CHARGE_FINISHED';

export const REQUEST_GET_ALL_UNIT_CHARGES = 'ChargesAction.REQUEST_GET_ALL_UNIT_CHARGES';
export const REQUEST_GET_ALL_UNIT_CHARGES_FINISHED = 'ChargesAction.REQUEST_GET_ALL_UNIT_CHARGES_FINISHED';

export const SET_ACTIVE_CHARGE = 'ChargesAction.SET_ACTIVE_CHARGE';

export function requestCreateCharge(data) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().apartments.activeApartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_CREATE_CHARGE, ChargesEffect.requestCreateCharge,
      userRole, apartmentId, data);
  };
}

export function requestGetAllApartmentCharges() {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().apartments.activeApartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_GET_ALL_APARTMENT_CHARGES, ChargesEffect.requestGetAllApartmentCharges,
      userRole, apartmentId);
  };
}

export function requestGetApartmentCharge(chargeId) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().apartments.activeApartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_GET_APARTMENT_CHARGE, ChargesEffect.requestGetApartmentCharge,
      userRole, apartmentId, chargeId);
  };
}

export function requestGetAllUnitCharges() {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const unitId = getState().units.activeUnit.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_GET_ALL_UNIT_CHARGES, ChargesEffect.requestGetAllUnitCharges,
      userRole, unitId);
  };
}

export function setActiveCharge(chargeId) {
  return ActionUtils.createAction(SET_ACTIVE_CHARGE, chargeId);
}
