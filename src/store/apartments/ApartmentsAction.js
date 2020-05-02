import * as ApartmentsEffect from './ApartmentsEffect';
import * as ActionUtils from '../../helpers/ActionUtils';

export const REQUEST_ALL_APARTMENTS = 'ApartmentsAction.REQUEST_ALL_APARTMENTS';
export const REQUEST_ALL_APARTMENTS_FINISHED = 'ApartmentsAction.REQUEST_ALL_APARTMENTS_FINISHED';

export function requestAllApartments() {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_ALL_APARTMENTS, ApartmentsEffect.requestAllApartments, userRole);
  };
}
