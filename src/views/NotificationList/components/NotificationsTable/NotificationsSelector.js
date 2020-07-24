import { createSelector } from 'reselect';

function _selectNotifications(notifications) {
  return notifications;
}

export const selectNotifications = createSelector((state) => state.notifications.notifications, _selectNotifications);
