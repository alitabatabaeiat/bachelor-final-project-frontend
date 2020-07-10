import * as ApartmentsAction from './ChargesAction';
import baseReducer from '../../helpers/BaseReducer';

export const initialState = {
  charges: [],
  charge: null
};

const chargesReducer = baseReducer(initialState, {
  [ApartmentsAction.REQUEST_GET_ALL_CHARGES_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      charges: action.payload.data
    };
  },

  [ApartmentsAction.REQUEST_CREATE_CHARGE_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      charge: action.payload.data
    };
  }
});

export default chargesReducer;
