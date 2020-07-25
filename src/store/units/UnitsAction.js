import * as UnitsEffect from './UnitsEffect';
import * as ActionUtils from '../../helpers/ActionUtils';
import _ from 'lodash';

export const REQUEST_ALL_UNITS = 'UnitsAction.REQUEST_ALL_UNITS';
export const REQUEST_ALL_UNITS_FINISHED = 'UnitsAction.REQUEST_ALL_UNITS_FINISHED';

export const REQUEST_ALL_UNITS_COUNT = 'UnitsAction.REQUEST_ALL_UNITS_COUNT';
export const REQUEST_ALL_UNITS_COUNT_FINISHED = 'UnitsAction.REQUEST_ALL_UNITS_COUNT_FINISHED';

export const REQUEST_CREATE_UNIT = 'UnitsAction.REQUEST_CREATE_UNIT';
export const REQUEST_CREATE_UNIT_FINISHED = 'UnitsAction.REQUEST_CREATE_UNIT_FINISHED';

export const REQUEST_UPLOAD_EXCEL = 'UnitsAction.REQUEST_UPLOAD_EXCEL';
export const REQUEST_UPLOAD_EXCEL_FINISHED = 'UnitsAction.REQUEST_UPLOAD_EXCEL_FINISHED';

export const REQUEST_UPDATE_UNIT = 'UnitsAction.REQUEST_UPDATE_UNIT';
export const REQUEST_UPDATE_UNIT_FINISHED = 'UnitsAction.REQUEST_UPDATE_UNIT_FINISHED';

export const REQUEST_DELETE_UNIT = 'UnitsAction.REQUEST_DELETE_UNIT';
export const REQUEST_DELETE_UNIT_FINISHED = 'UnitsAction.REQUEST_DELETE_UNIT_FINISHED';

export let SET_FORM_DIALOG_OPEN = 'UnitsAction.SET_FORM_DIALOG_OPEN';
export let SET_FORM_DIALOG_UPDATE = 'UnitsAction.SET_FORM_DIALOG_UPDATE';
export let SELECT_UNIT = 'UnitsAction.SELECT_UNIT';

export let SET_UPLOAD_EXCEL_DIALOG_OPEN = 'UnitsAction.SET_UPLOAD_EXCEL_DIALOG_OPEN';

export function requestAllUnits(params) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().user.currentApartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_ALL_UNITS, UnitsEffect.requestUnits, userRole,
      _.assign(params, { apartment: apartmentId }));
  };
}

export function requestUnitsCount() {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().user.currentApartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_ALL_UNITS_COUNT, UnitsEffect.requestUnitsCount, userRole, { apartment: apartmentId });
  };
}

export function requestCreateUnit(data) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().user.currentApartment.id;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_CREATE_UNIT, UnitsEffect.requestCreateUnit, userRole, {...data, apartment: apartmentId });
  };
}

export function requestUploadExcel(data) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;
    const apartmentId = getState().user.currentApartment.id;

    data.append('apartment', apartmentId);

    await ActionUtils.createThunkEffect(dispatch, REQUEST_UPLOAD_EXCEL, UnitsEffect.requestUploadExcel, userRole, data);
  };
}

export function requestUpdateUnit(unitId, data) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_UPDATE_UNIT, UnitsEffect.requestUpdateUnit, userRole, unitId, data);
  };
}

export function requestDeleteUnit(unitId) {
  return async (dispatch, getState) => {
    const userRole = getState().user.role;

    await ActionUtils.createThunkEffect(dispatch, REQUEST_DELETE_UNIT, UnitsEffect.requestDeleteUnit, userRole, unitId);
  };
}

export function setFormDialogOpen(open) {
  return ActionUtils.createAction(SET_FORM_DIALOG_OPEN, open);
}

export function setUploadExcelDialogOpen(open) {
  return ActionUtils.createAction(SET_UPLOAD_EXCEL_DIALOG_OPEN, open);
}

export function setFormDialogUpdate(update) {
  return ActionUtils.createAction(SET_FORM_DIALOG_UPDATE, update);
}

export function selectUnit(unit) {
  return ActionUtils.createAction(SELECT_UNIT, unit);
}
