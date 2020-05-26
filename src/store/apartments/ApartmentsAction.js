import * as ApartmentsEffect from './ApartmentsEffect';
import * as ActionUtils from '../../helpers/ActionUtils';

export const REQUEST_ALL_APARTMENTS = 'ApartmentsAction.REQUEST_ALL_APARTMENTS';
export const REQUEST_ALL_APARTMENTS_FINISHED = 'ApartmentsAction.REQUEST_ALL_APARTMENTS_FINISHED';

export const REQUEST_DELETE_APARTMENT = 'ApartmentsAction.REQUEST_DELETE_APARTMENT';
export const REQUEST_DELETE_APARTMENT_FINISHED = 'ApartmentsAction.REQUEST_DELETE_APARTMENT_FINISHED';

export const UPDATE_ACTIVE_APARTMENT = 'ApartmentsAction.UPDATE_ACTIVE_APARTMENT';

export const REQUEST_ALL_APARTMENT_EXPENSES = 'ApartmentsAction.REQUEST_ALL_APARTMENT_EXPENSES';
export const REQUEST_ALL_APARTMENT_EXPENSES_FINISHED = 'ApartmentsAction.REQUEST_ALL_APARTMENT_EXPENSES_FINISHED';

export const REQUEST_DELETE_APARTMENT_EXPENSE = 'ApartmentsAction.REQUEST_DELETE_APARTMENT_EXPENSE';
export const REQUEST_DELETE_APARTMENT_EXPENSE_FINISHED = 'ApartmentsAction.REQUEST_DELETE_APARTMENT_EXPENSE_FINISHED';


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

export function requestDeleteApartmentExpense(expenseId) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().apartments.activeApartment.id;


    await ActionUtils.createThunkEffect(dispatch, REQUEST_DELETE_APARTMENT_EXPENSE, ApartmentsEffect.requestDeleteApartmentExpense,
      userRole, apartmentId, expenseId);
  };
}