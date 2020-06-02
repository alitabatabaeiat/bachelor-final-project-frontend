import * as UnitsEffect from './UnitsEffect';
import * as ActionUtils from '../../helpers/ActionUtils';
import _ from 'lodash';

export const REQUEST_ALL_UNITS = 'UnitsAction.REQUEST_ALL_UNITS';
export const REQUEST_ALL_UNITS_FINISHED = 'UnitsAction.REQUEST_ALL_UNITS_FINISHED';


export function requestAllUnits(params) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().apartments.activeApartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_ALL_UNITS, UnitsEffect.requestUnits, userRole,
      _.assign(params, { apartment: apartmentId }));
  };
}
