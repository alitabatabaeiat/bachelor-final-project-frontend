import * as UnitsAction from './UnitsAction';
import baseReducer from '../../helpers/BaseReducer';

export const initialState = {
  units: [],
  unitsCount: 0,
  formDialogOpen: false,
  formDialogUpdate: false,
  uploadExcelDialogOpen: false,
  selectedUnit: {}
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

  [UnitsAction.REQUEST_ALL_UNITS_COUNT_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      unitsCount: action.payload.data
    };
  },

  [UnitsAction.REQUEST_CREATE_UNIT_FINISHED](state, action) {
    if (action.error)
      return state;
    return state;
  },

  [UnitsAction.REQUEST_UPLOAD_EXCEL_FINISHED](state, action) {
    if (action.error)
      return state;
    return state;
  },

  [UnitsAction.REQUEST_UPDATE_UNIT_FINISHED](state, action) {
    if (action.error)
      return state;
    return state;
  },

  [UnitsAction.REQUEST_DELETE_UNIT_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      units: state.units.filter(unit => unit.id !== action.payload.data.id)
    };
  },

  [UnitsAction.SET_FORM_DIALOG_OPEN](state, action) {
    return {
      ...state,
      formDialogOpen: action.payload
    }
  },

  [UnitsAction.SET_UPLOAD_EXCEL_DIALOG_OPEN](state, action) {
    return {
      ...state,
      uploadExcelDialogOpen: action.payload
    }
  },


  [UnitsAction.SET_FORM_DIALOG_UPDATE](state, action) {
    return {
      ...state,
      formDialogUpdate: action.payload
    }
  },

  [UnitsAction.SELECT_UNIT](state, action) {
    return {
      ...state,
      selectedUnit: action.payload
    }
  }
});

export default unitsReducer;
