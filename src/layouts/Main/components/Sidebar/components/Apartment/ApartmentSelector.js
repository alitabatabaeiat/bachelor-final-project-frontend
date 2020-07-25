import { createSelector } from 'reselect';

function _selectActiveApartment(apartment) {
  return apartment;
}

export const selectActiveApartment = createSelector((state) => state.user.currentApartment, _selectActiveApartment);
