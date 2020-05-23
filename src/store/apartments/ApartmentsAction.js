import * as ApartmentsEffect from './ApartmentsEffect';
import * as ActionUtils from '../../helpers/ActionUtils';

export const REQUEST_ALL_APARTMENTS = 'ApartmentsAction.REQUEST_ALL_APARTMENTS';
export const REQUEST_ALL_APARTMENTS_FINISHED = 'ApartmentsAction.REQUEST_ALL_APARTMENTS_FINISHED';

export const REQUEST_DELETE_APARTMENT = 'ApartmentsAction.REQUEST_DELETE_APARTMENT';
export const REQUEST_DELETE_APARTMENT_FINISHED = 'ApartmentsAction.REQUEST_DELETE_APARTMENT_FINISHED';

export function requestAllApartments() {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_ALL_APARTMENTS, ApartmentsEffect.requestAllApartments, userRole);
  };
}

export function requestDeleteApartment(id) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_DELETE_APARTMENT, ApartmentsEffect.requestDeleteApartment, userRole, id);
  };
}
