import { createSelector } from 'reselect';

function _selectApartments(apartments) {
  return apartments;
}

export const selectApartments = createSelector((state) => state.apartments.apartments, _selectApartments);
