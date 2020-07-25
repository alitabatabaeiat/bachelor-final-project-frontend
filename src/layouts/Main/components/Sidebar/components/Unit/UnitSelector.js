import { createSelector } from 'reselect';

function _selectActiveUnit(unit) {
  return unit;
}

export const selectActiveUnit = createSelector((state) => state.user.currentUnit, _selectActiveUnit);
