import * as ApartmentsAction from './ChargesAction';
import baseReducer from '../../helpers/BaseReducer';

export const initialState = {
  apartmentCharges: [],
  unitCharges: [],
  apartmentLastCharge: null,
  unitLastCharge: null,
  charge: null,
  activeChargeId: null
};

const chargesReducer = baseReducer(initialState, {
  [ApartmentsAction.REQUEST_GET_ALL_APARTMENT_CHARGES](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      apartmentCharges: []
    };
  },

  [ApartmentsAction.REQUEST_GET_ALL_APARTMENT_CHARGES_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      apartmentCharges: action.payload.data
    };
  },

  [ApartmentsAction.REQUEST_GET_APARTMENT_CHARGE](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      unitCharges: []
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

  [ApartmentsAction.REQUEST_CREATE_CHARGE](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      charge: null
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

  [ApartmentsAction.REQUEST_GET_APARTMENT_LAST_CHARGE](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      apartmentLastCharge: null
    };
  },

  [ApartmentsAction.REQUEST_GET_APARTMENT_LAST_CHARGE_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      apartmentLastCharge: action.payload.data
    };
  },

  [ApartmentsAction.REQUEST_GET_UNIT_LAST_CHARGE](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      unitLastCharge: null
    };
  },

  [ApartmentsAction.REQUEST_GET_UNIT_LAST_CHARGE_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      unitLastCharge: action.payload.data
    };
  },

  [ApartmentsAction.REQUEST_GET_ALL_UNIT_CHARGES](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      unitCharges: []
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

  [ApartmentsAction.REQUEST_REQUEST_PAY_UNIT_CHARGE_FINISHED](state, action) {
    if (action.error)
      return state;
    const unitCharges = [...state.unitCharges];
    const chargeIndex = unitCharges.findIndex(c => c.id === action.payload.data.id);
    unitCharges[chargeIndex] = {
      ...unitCharges[chargeIndex],
      isPaid: true
    };
    return {
      ...state,
      unitCharges
    };
  }
});

export default chargesReducer;
