import * as ApartmentsEffect from './ApartmentsEffect';
import * as ActionUtils from '../../helpers/ActionUtils';

export const REQUEST_ALL_APARTMENTS = 'ApartmentsAction.REQUEST_ALL_APARTMENTS';
export const REQUEST_ALL_APARTMENTS_FINISHED = 'ApartmentsAction.REQUEST_ALL_APARTMENTS_FINISHED';

export const REQUEST_DELETE_APARTMENT = 'ApartmentsAction.REQUEST_DELETE_APARTMENT';
export const REQUEST_DELETE_APARTMENT_FINISHED = 'ApartmentsAction.REQUEST_DELETE_APARTMENT_FINISHED';

export const REQUEST_ALL_APARTMENT_EXPENSES = 'ApartmentsAction.REQUEST_ALL_APARTMENT_EXPENSES';
export const REQUEST_ALL_APARTMENT_EXPENSES_FINISHED = 'ApartmentsAction.REQUEST_ALL_APARTMENT_EXPENSES_FINISHED';

export const REQUEST_CREATE_APARTMENT_EXPENSE = 'ApartmentsAction.REQUEST_CREATE_APARTMENT_EXPENSE';
export const REQUEST_CREATE_APARTMENT_EXPENSE_FINISHED = 'ApartmentsAction.REQUEST_CREATE_APARTMENT_EXPENSE_FINISHED';

export const REQUEST_CALCULATE_APARTMENT_EXPENSE = 'ApartmentsAction.REQUEST_CALCULATE_APARTMENT_EXPENSE';
export const REQUEST_CALCULATE_APARTMENT_EXPENSE_FINISHED = 'ApartmentsAction.REQUEST_CALCULATE_APARTMENT_EXPENSE_FINISHED';

export const REQUEST_DELETE_APARTMENT_EXPENSE = 'ApartmentsAction.REQUEST_DELETE_APARTMENT_EXPENSE';
export const REQUEST_DELETE_APARTMENT_EXPENSE_FINISHED = 'ApartmentsAction.REQUEST_DELETE_APARTMENT_EXPENSE_FINISHED';

export const REQUEST_ALL_EXPENSE_OPTIONS = 'ApartmentsAction.REQUEST_ALL_EXPENSE_OPTIONS';
export const REQUEST_ALL_EXPENSE_OPTIONS_FINISHED = 'ApartmentsAction.REQUEST_ALL_EXPENSE_OPTIONS_FINISHED';

export const REQUEST_APARTMENT_SETTING = 'ApartmentsAction.REQUEST_APARTMENT_SETTING';
export const REQUEST_APARTMENT_SETTING_FINISHED = 'ApartmentsAction.REQUEST_APARTMENT_SETTING_FINISHED';

export const REQUEST_UPDATE_APARTMENT_SETTING = 'ApartmentsAction.REQUEST_UPDATE_APARTMENT_SETTING';
export const REQUEST_UPDATE_APARTMENT_SETTING_FINISHED = 'ApartmentsAction.REQUEST_UPDATE_APARTMENT_SETTING_FINISHED';

export const SELECT_ALL_EXPENSES = 'ApartmentsAction.SELECT_ALL_EXPENSES';

export const SELECT_EXPENSE = 'ApartmentsAction.SELECT_EXPENSE';

export const UNSELECT_EXPENSE = 'ApartmentsAction.UNSELECT_EXPENSE';

export const RESET_SELECTED_EXPENSES = 'ApartmentsAction.RESET_SELECTED_EXPENSES';


export function requestAllApartments() {
  return async (dispatch, getState) => {
    const { user } = getState();

    await ActionUtils.createThunkEffect(dispatch, REQUEST_ALL_APARTMENTS, ApartmentsEffect.requestAllApartments, user.token, user.role);
  };
}

export function requestDeleteApartment(id) {
  return async (dispatch, getState) => {
    const { user } = getState();

    await ActionUtils.createThunkEffect(dispatch, REQUEST_DELETE_APARTMENT, ApartmentsEffect.requestDeleteApartment, user.token, user.role, id);
  };
}

export function requestAllApartmentExpenses(query) {
  return async (dispatch, getState) => {
    const { user } = getState();

    await ActionUtils.createThunkEffect(dispatch, REQUEST_ALL_APARTMENT_EXPENSES, ApartmentsEffect.requestAllApartmentExpenses,
      user.token, user.role, user.currentApartment.id, query);
  };
}

export function requestCreateApartmentExpense(data) {
  return async (dispatch, getState) => {
    const { user } = getState();


    await ActionUtils.createThunkEffect(dispatch, REQUEST_CREATE_APARTMENT_EXPENSE, ApartmentsEffect.requestCreateApartmentExpense,
      user.token, user.role, user.currentApartment.id, data);
  };
}

export function requestCalculateApartmentExpense(data) {
  return async (dispatch, getState) => {
    const { user } = getState();


    await ActionUtils.createThunkEffect(dispatch, REQUEST_CALCULATE_APARTMENT_EXPENSE, ApartmentsEffect.requestCalculateApartmentExpense,
      user.token, user.role, user.currentApartment.id, data);
  };
}

export function requestDeleteApartmentExpense(expenseId) {
  return async (dispatch, getState) => {
    const { user } = getState();


    await ActionUtils.createThunkEffect(dispatch, REQUEST_DELETE_APARTMENT_EXPENSE, ApartmentsEffect.requestDeleteApartmentExpense,
      user.token, user.role, user.currentApartment.id, expenseId);
  };
}

export function requestAllExpenseOptions() {
  return async (dispatch, getState) => {
    const { user } = getState();

    await ActionUtils.createThunkEffect(dispatch, REQUEST_ALL_EXPENSE_OPTIONS, ApartmentsEffect.requestAllExpenseOptions,
      user.token, user.role, user.currentApartment.id);
  };
}

export function requestApartmentSetting() {
  return async (dispatch, getState) => {
    const { user } = getState();

    await ActionUtils.createThunkEffect(dispatch, REQUEST_APARTMENT_SETTING, ApartmentsEffect.requestApartmentSetting,
      user.token, user.role, user.currentApartment.id);
  };
}

export function requestUpdateApartmentSetting(data) {
  return async (dispatch, getState) => {
    const { user } = getState();

    await ActionUtils.createThunkEffect(dispatch, REQUEST_UPDATE_APARTMENT_SETTING, ApartmentsEffect.requestUpdateApartmentSetting,
      user.token, user.role, user.currentApartment.id, data);
  };
}

export function selectAllExpenses() {
  return ActionUtils.createAction(SELECT_ALL_EXPENSES);
}

export function selectExpense(expenseId) {
  return ActionUtils.createAction(SELECT_EXPENSE, expenseId);
}

export function unselectExpense(expenseId) {
  return ActionUtils.createAction(UNSELECT_EXPENSE, expenseId);
}

export function resetSelectedExpenses() {
  return ActionUtils.createAction(RESET_SELECTED_EXPENSES);
}
