import * as ExpenseTypesEffect from './ExpenseTypesEffect';
import * as ActionUtils from '../../helpers/ActionUtils';

export const REQUEST_ALL_EXPENSE_TYPES = 'ApartmentsAction.REQUEST_ALL_EXPENSE_TYPES';
export const REQUEST_ALL_EXPENSE_TYPES_FINISHED = 'ApartmentsAction.REQUEST_ALL_EXPENSE_TYPES_FINISHED';

export const REQUEST_CREATE_EXPENSE_TYPE = 'ApartmentsAction.REQUEST_CREATE_EXPENSE_TYPE';
export const REQUEST_CREATE_EXPENSE_TYPE_FINISHED = 'ApartmentsAction.REQUEST_CREATE_EXPENSE_TYPE_FINISHED';


export function requestAllExpenseTypes() {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_ALL_EXPENSE_TYPES, ExpenseTypesEffect.requestExpenseTypes, userRole);
  };
}

export function requestCreateExpenseType(data) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_CREATE_EXPENSE_TYPE, ExpenseTypesEffect.requestCreateExpenseType, userRole, data);
  };
}
