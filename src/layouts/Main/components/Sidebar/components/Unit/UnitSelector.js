import { createSelector } from 'reselect';

function _selectActiveUnit(unit) {
  return unit;
}

export const selectActiveUnit = createSelector((state) => state.units.activeUnit, _selectActiveUnit);
