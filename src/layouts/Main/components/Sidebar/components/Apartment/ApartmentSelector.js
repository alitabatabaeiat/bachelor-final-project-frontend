import { createSelector } from 'reselect';

function _selectActiveApartment(apartment) {
  return apartment;
}

export const selectActiveApartment = createSelector((state) => state.apartments.activeApartment, _selectActiveApartment);
