import baseReducer from '../../helpers/BaseReducer';

export const initialState = {
  role: 'manager',
  activeApartment: null,
  activeUnit: null
};

const apartmentsReducer = baseReducer(initialState, {});

export default apartmentsReducer;
