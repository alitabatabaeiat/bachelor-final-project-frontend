import * as ApartmentsAction from './ExpenseTypesAction';
import baseReducer from '../../helpers/BaseReducer';

export const initialState = {
  types: [],
};

const expenseTypesReducer = baseReducer(initialState, {
  [ApartmentsAction.REQUEST_ALL_EXPENSE_TYPES_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      types: action.payload.data
    };
  },

  [ApartmentsAction.REQUEST_CREATE_EXPENSE_TYPE_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      types: [action.payload.data, ...state.types]
    };
  }
});

export default expenseTypesReducer;
