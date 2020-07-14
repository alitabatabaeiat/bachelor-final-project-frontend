import * as ChargesEffect from './ChrgesEffect';
import * as ActionUtils from '../../helpers/ActionUtils';

export const REQUEST_CREATE_CHARGE = 'ApartmentsAction.REQUEST_CREATE_CHARGE';
export const REQUEST_CREATE_CHARGE_FINISHED = 'ApartmentsAction.REQUEST_CREATE_CHARGE_FINISHED';

export const REQUEST_GET_ALL_APARTMENT_CHARGES = 'ApartmentsAction.REQUEST_GET_ALL_APARTMENT_CHARGES';
export const REQUEST_GET_ALL_APARTMENT_CHARGES_FINISHED = 'ApartmentsAction.REQUEST_GET_ALL_APARTMENT_CHARGES_FINISHED';

export const REQUEST_GET_ALL_UNIT_CHARGES = 'ApartmentsAction.REQUEST_GET_ALL_UNIT_CHARGES';
export const REQUEST_GET_ALL_UNIT_CHARGES_FINISHED = 'ApartmentsAction.REQUEST_GET_ALL_UNIT_CHARGES_FINISHED';

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

export function requestGetAllUnitCharges() {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const unitId = getState().units.activeUnit.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_GET_ALL_UNIT_CHARGES, ChargesEffect.requestGetAllUnitCharges,
      userRole, unitId);
  };
}
