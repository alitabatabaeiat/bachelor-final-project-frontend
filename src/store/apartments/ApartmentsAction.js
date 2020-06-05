import * as ApartmentsEffect from './ApartmentsEffect';
import * as ActionUtils from '../../helpers/ActionUtils';

export const REQUEST_ALL_APARTMENTS = 'ApartmentsAction.REQUEST_ALL_APARTMENTS';
export const REQUEST_ALL_APARTMENTS_FINISHED = 'ApartmentsAction.REQUEST_ALL_APARTMENTS_FINISHED';

export const REQUEST_DELETE_APARTMENT = 'ApartmentsAction.REQUEST_DELETE_APARTMENT';
export const REQUEST_DELETE_APARTMENT_FINISHED = 'ApartmentsAction.REQUEST_DELETE_APARTMENT_FINISHED';

export const UPDATE_ACTIVE_APARTMENT = 'ApartmentsAction.UPDATE_ACTIVE_APARTMENT';

export const REQUEST_ALL_APARTMENT_EXPENSES = 'ApartmentsAction.REQUEST_ALL_APARTMENT_EXPENSES';
export const REQUEST_ALL_APARTMENT_EXPENSES_FINISHED = 'ApartmentsAction.REQUEST_ALL_APARTMENT_EXPENSES_FINISHED';

export const REQUEST_CREATE_APARTMENT_EXPENSE = 'ApartmentsAction.REQUEST_CREATE_APARTMENT_EXPENSE';
export const REQUEST_CREATE_APARTMENT_EXPENSE_FINISHED = 'ApartmentsAction.REQUEST_CREATE_APARTMENT_EXPENSE_FINISHED';

export const REQUEST_DELETE_APARTMENT_EXPENSE = 'ApartmentsAction.REQUEST_DELETE_APARTMENT_EXPENSE';
export const REQUEST_DELETE_APARTMENT_EXPENSE_FINISHED = 'ApartmentsAction.REQUEST_DELETE_APARTMENT_EXPENSE_FINISHED';

export const REQUEST_ALL_EXPENSE_OPTIONS = 'ApartmentsAction.REQUEST_ALL_EXPENSE_OPTIONS';
export const REQUEST_ALL_EXPENSE_OPTIONS_FINISHED = 'ApartmentsAction.REQUEST_ALL_EXPENSE_OPTIONS_FINISHED';

export const SELECT_ALL_EXPENSES = 'ApartmentsAction.SELECT_ALL_EXPENSES';

export const SELECT_EXPENSE = 'ApartmentsAction.SELECT_EXPENSE';

export const UNSELECT_EXPENSE = 'ApartmentsAction.UNSELECT_EXPENSE';

export const RESET_SELECTED_EXPENSES = 'ApartmentsAction.RESET_SELECTED_EXPENSES';


export function requestAllApartments() {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_ALL_APARTMENTS, ApartmentsEffect.requestAllApartments, userRole);
  };
}

export function requestDeleteApartment(id) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_DELETE_APARTMENT, ApartmentsEffect.requestDeleteApartment, userRole, id);
  };
}

export function updateActiveApartment(apartment) {
  return ActionUtils.createAction(UPDATE_ACTIVE_APARTMENT, apartment);
}

export function requestAllApartmentExpenses() {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().apartments.activeApartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_ALL_APARTMENT_EXPENSES, ApartmentsEffect.requestAllApartmentExpenses,
      userRole, apartmentId);
  };
}

export function requestCreateApartmentExpense(data) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().apartments.activeApartment.id;


    await ActionUtils.createThunkEffect(dispatch, REQUEST_CREATE_APARTMENT_EXPENSE, ApartmentsEffect.requestCreateApartmentExpense,
      userRole, apartmentId, data);
  };
}

export function requestDeleteApartmentExpense(expenseId) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().apartments.activeApartment.id;


    await ActionUtils.createThunkEffect(dispatch, REQUEST_DELETE_APARTMENT_EXPENSE, ApartmentsEffect.requestDeleteApartmentExpense,
      userRole, apartmentId, expenseId);
  };
}

export function requestAllExpenseOptions() {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().apartments.activeApartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_ALL_EXPENSE_OPTIONS, ApartmentsEffect.requestAllExpenseOptions,
      userRole, apartmentId);
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
