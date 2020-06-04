import * as UnitsAction from './UnitsAction';
import baseReducer from '../../helpers/BaseReducer';

export const initialState = {
  units: [],
};

const unitsReducer = baseReducer(initialState, {
  [UnitsAction.REQUEST_ALL_UNITS_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      units: action.payload.data
    };
  },
  [UnitsAction.REQUEST_CREATE_UNIT_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      units: [action.payload.data, ...state.units]
    };
  }
});

export default unitsReducer;
