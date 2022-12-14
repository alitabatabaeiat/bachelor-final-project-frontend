import * as ApartmentsAction from './ApartmentsAction';
import baseReducer from '../../helpers/BaseReducer';
import { REQUEST_UPDATE_APARTMENT_SETTING } from './ApartmentsAction';

export const initialState = {
  apartments: [],
  expenses: [],
  selectedExpenses: [],
  expenseOptions: {
    splitOptions: [],
    filterOptions: []
  },
  calculatedUnitExpenses: [],
  setting: {}
};

const apartmentsReducer = baseReducer(initialState, {
  [ApartmentsAction.REQUEST_ALL_APARTMENTS](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      apartments: []
    };
  },

  [ApartmentsAction.REQUEST_ALL_APARTMENTS_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      apartments: action.payload.data
    };
  },

  [ApartmentsAction.REQUEST_DELETE_APARTMENT_FINISHED](state, action) {
    if (action.error)
      return state;
    //
    // let apartments = [...state.apartments];
    // apartments = apartments.filter(apartment => apartment.id !== action.payload.id);
    return state;
  },

  [ApartmentsAction.REQUEST_ALL_APARTMENT_EXPENSES](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      expenses: []
    };
  },

  [ApartmentsAction.REQUEST_ALL_APARTMENT_EXPENSES_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      expenses: action.payload.data
    };
  },

  [ApartmentsAction.REQUEST_CREATE_APARTMENT_EXPENSE_FINISHED](state, action) {
    if (action.error)
      return state;
    return state;
  },

  [ApartmentsAction.REQUEST_CALCULATE_APARTMENT_EXPENSE_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      calculatedUnitExpenses: action.payload.data
    };
  },

  [ApartmentsAction.REQUEST_DELETE_APARTMENT_EXPENSE_FINISHED](state, action) {
    if (action.error)
      return state;
    return state;
  },

  [ApartmentsAction.REQUEST_ALL_EXPENSE_OPTIONS_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      expenseOptions: action.payload.data
    };
  },

  [ApartmentsAction.REQUEST_APARTMENT_SETTING](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      setting: []
    };
  },

  [ApartmentsAction.REQUEST_APARTMENT_SETTING_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      setting: action.payload.data
    };
  },

  [ApartmentsAction.REQUEST_UPDATE_APARTMENT_SETTING](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      setting: []
    };
  },

  [ApartmentsAction.REQUEST_UPDATE_APARTMENT_SETTING_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      setting: action.payload.data
    };
  },

  [ApartmentsAction.SELECT_ALL_EXPENSES](state) {
    return {
      ...state,
      selectedExpenses: state.expenses.map(expense => expense.id)
    };
  },

  [ApartmentsAction.SELECT_EXPENSE](state, action) {
    return {
      ...state,
      selectedExpenses: [...state.selectedExpenses, action.payload]
    };
  },

  [ApartmentsAction.UNSELECT_EXPENSE](state, action) {
    return {
      ...state,
      selectedExpenses: state.selectedExpenses.filter(expense => expense !== action.payload)
    };
  },

  [ApartmentsAction.RESET_SELECTED_EXPENSES](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      selectedExpenses: []
    };
  }
});

export default apartmentsReducer;
