import _ from 'lodash';
import * as NotificationsEffect from './NotificationsEffect';
import * as ActionUtils from '../../helpers/ActionUtils';

export const REQUEST_ALL_NOTIFICATIONS = 'ApartmentsAction.REQUEST_ALL_NOTIFICATIONS';
export const REQUEST_ALL_NOTIFICATIONS_FINISHED = 'ApartmentsAction.REQUEST_ALL_NOTIFICATIONS_FINISHED';

export const REQUEST_CREATE_NOTIFICATION = 'ApartmentsAction.REQUEST_CREATE_NOTIFICATION';
export const REQUEST_CREATE_NOTIFICATION_FINISHED = 'ApartmentsAction.REQUEST_CREATE_NOTIFICATION_FINISHED';

export function requestAllNotifications() {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = userRole === 'manager' ? getState().apartments.activeApartment.id : getState().units.activeUnit.apartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_ALL_NOTIFICATIONS, NotificationsEffect.requestAllNotifications, userRole, {apartment: apartmentId});
  };
}

export function requestCreateNotification(data) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().apartments.activeApartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_CREATE_NOTIFICATION, NotificationsEffect.requestCreateNotifications,
      userRole, _.assign(data, {apartment: apartmentId}));
  };
}
