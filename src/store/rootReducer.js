import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import apartmentReducer from './apartments/ApartmentsReducer';
import errorReducer from './error/ErrorReducer';
import requestingReducer from './requesting/RequestingReducer';
import userReducer from './user/userReducer';

export default function rootReducer(history) {
  const reducerMap = {
    error: errorReducer,
    requesting: requestingReducer,
    router: connectRouter(history),
    user: userReducer,
    apartments: apartmentReducer,
  };

  return combineReducers(reducerMap);
}
