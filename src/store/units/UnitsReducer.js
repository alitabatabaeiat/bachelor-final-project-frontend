import * as UnitsAction from './UnitsAction';
import baseReducer from '../../helpers/BaseReducer';

export const initialState = {
  units: [],
  formDialogOpen: false,
  formDialogUpdate: false,
  selectedUnit: {},
  activeUnit: {}
};

const unitsReducer = baseReducer(initialState, {
  [UnitsAction.REQUEST_ALL_UNITS_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      units: action.payload.data,
    };
  },

  [UnitsAction.REQUEST_CREATE_UNIT_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      units: [action.payload.data, ...state.units]
    };
  },

  [UnitsAction.REQUEST_UPDATE_UNIT_FINISHED](state, action) {
    if (action.error)
      return state;
    return {
      ...state,
      units: state.units.map(unit => unit.id === action.payload.data.id ? action.payload.data : unit)
    };
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
