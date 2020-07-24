import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import apartmentReducer from './apartments/ApartmentsReducer';
import errorReducer from './error/ErrorReducer';
import requestingReducer from './requesting/RequestingReducer';
import userReducer from './user/UserReducer';
import expenseTypesReducer from './expenseTypes/ExpenseTypesReducer';
import unitsReducer from './units/UnitsReducer';
import chargesReducer from './charges/chargesReducer';
import notificationsReducer from './notifications/NotificationsReducer';

export default function rootReducer(history) {
  const reducerMap = {
    error: errorReducer,
    requesting: requestingReducer,
    router: connectRouter(history),
    user: userReducer,
    apartments: apartmentReducer,
    units: unitsReducer,
    expenseTypes: expenseTypesReducer,
    charges: chargesReducer,
    notifications: notificationsReducer
  };

  return combineReducers(reducerMap);
}
