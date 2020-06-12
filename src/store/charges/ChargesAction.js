import * as ChargesEffect from './ChrgesEffect';
import * as ActionUtils from '../../helpers/ActionUtils';

export const REQUEST_CREATE_CHARGE = 'ApartmentsAction.REQUEST_CREATE_CHARGE';
export const REQUEST_CREATE_CHARGE_FINISHED = 'ApartmentsAction.REQUEST_CREATE_CHARGE_FINISHED';

export function requestCreateCharge(data) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().apartments.activeApartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_CREATE_CHARGE, ChargesEffect.requestCreateCharge,
      userRole, apartmentId, data);
  };
}
