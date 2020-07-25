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
    const userRole = getState().user.role;
    const apartmentId = getState().user.currentApartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_CREATE_CHARGE, ChargesEffect.requestCreateCharge,
      userRole, apartmentId, data);
  };
}

export function requestGetAllApartmentCharges(query = null) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().user.currentApartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_GET_ALL_APARTMENT_CHARGES, ChargesEffect.requestGetAllApartmentCharges,
      userRole, apartmentId, query);
  };
}

export function requestGetApartmentLastCharge() {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().user.currentApartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_GET_APARTMENT_LAST_CHARGE, ChargesEffect.requestGetApartmentLastCharge,
      userRole, apartmentId);
  };
}

export function requestGetUnitLastCharge() {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().user.currentUnit.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_GET_UNIT_LAST_CHARGE, ChargesEffect.requestGetUnitLastCharge,
      userRole, apartmentId);
  };
}

export function requestGetApartmentCharge(chargeId) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().user.currentApartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_GET_APARTMENT_CHARGE, ChargesEffect.requestGetApartmentCharge,
      userRole, apartmentId, chargeId);
  };
}

export function requestGetAllUnitCharges() {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const unitId = getState().user.currentUnit.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_GET_ALL_UNIT_CHARGES, ChargesEffect.requestGetAllUnitCharges,
      userRole, unitId);
  };
}

export function requestPayUnitCharges(chargeId) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const unitId = getState().user.currentUnit.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_REQUEST_PAY_UNIT_CHARGE, ChargesEffect.requestPayUnitCharges,
      userRole, unitId, chargeId);
  };
}
