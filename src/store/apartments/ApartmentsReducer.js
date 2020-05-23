import * as ApartmentsAction from './ApartmentsAction';
import baseReducer from '../../helpers/BaseReducer';

export const initialState = {
  apartments: [],
  selectedApartment: null,
};

const apartmentsReducer = baseReducer(initialState, {
  [ApartmentsAction.REQUEST_ALL_APARTMENTS_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      apartments: action.payload.data,
      // TODO: App should persist that what was the last selectedApartment before refresh
      selectedApartment: action.payload[-1]
    };
  },

  [ApartmentsAction.REQUEST_DELETE_APARTMENT_FINISHED](state, action) {
    if (action.error)
      return state;
    //
    // let apartments = [...state.apartments];
    // apartments = apartments.filter(apartment => apartment.id !== action.payload.id);
    return state
  },
});

export default apartmentsReducer;
