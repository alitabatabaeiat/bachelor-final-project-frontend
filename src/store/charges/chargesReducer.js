import * as ApartmentsAction from './ChargesAction';
import baseReducer from '../../helpers/BaseReducer';

export const initialState = {
  apartmentCharges: [],
  unitCharges: [],
  charge: null,
  activeChargeId: null
};

const chargesReducer = baseReducer(initialState, {
  [ApartmentsAction.REQUEST_GET_ALL_APARTMENT_CHARGES_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      apartmentCharges: action.payload.data
    };
  },

  [ApartmentsAction.REQUEST_GET_APARTMENT_CHARGE_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      unitCharges: action.payload.data.unitCharges
    };
  },

  [ApartmentsAction.REQUEST_CREATE_CHARGE_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      charge: action.payload.data
    };
  },

  [ApartmentsAction.REQUEST_GET_ALL_UNIT_CHARGES_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      unitCharges: action.payload.data
    };
  },

  [ApartmentsAction.SET_ACTIVE_CHARGE](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      activeChargeId: action.payload
    };
  }
});

export default chargesReducer;
