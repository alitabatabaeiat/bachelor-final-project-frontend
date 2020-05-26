import baseReducer from '../../helpers/BaseReducer';

export const initialState = {
  role: 'manager'
};

const apartmentsReducer = baseReducer(initialState, {});

export default apartmentsReducer;
