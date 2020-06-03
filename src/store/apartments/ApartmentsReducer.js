import * as ApartmentsAction from './ApartmentsAction';
import baseReducer from '../../helpers/BaseReducer';

export const initialState = {
  apartments: [],
  activeApartment: {
    id: '-',
    title: 'هیچ آپارتمانی انتخاب نشده است'
  },
  expenses: [],
  expenseOptions: {
    splitOptions: [],
    filterOptions: []
  }
};

const apartmentsReducer = baseReducer(initialState, {
  [ApartmentsAction.REQUEST_ALL_APARTMENTS_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      apartments: action.payload.data,
      activeApartment: state.activeApartment ?? action.payload.data[0]
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

  [ApartmentsAction.UPDATE_ACTIVE_APARTMENT](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      activeApartment: action.payload
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
    return {
      ...state,
      expenses: [action.payload.data, ...state.expenses]
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
  }
});

export default apartmentsReducer;
