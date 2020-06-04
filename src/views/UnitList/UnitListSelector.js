import { createSelector } from 'reselect';

function _selectUnits(units) {
  return units;
}

export const selectUnits = createSelector(state => state.units.units, _selectUnits);
