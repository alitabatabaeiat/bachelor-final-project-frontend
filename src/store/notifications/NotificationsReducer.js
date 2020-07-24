import * as ApartmentsAction from './NotificationsAction';
import baseReducer from '../../helpers/BaseReducer';

export const initialState = {
  notifications: []
};

const notificationsReducer = baseReducer(initialState, {
  [ApartmentsAction.REQUEST_ALL_NOTIFICATIONS_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      notifications: action.payload.data
    };
  },

  [ApartmentsAction.REQUEST_CREATE_NOTIFICATION_FINISHED](state, action) {
    if (action.error)
      return state;
    return state;
  },
});

export default notificationsReducer;
