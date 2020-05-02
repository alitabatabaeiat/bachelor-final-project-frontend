import { createSelector } from 'reselect';

export const selectApartments = createSelector((state) => state.apartments.apartments, _selectApartments);

function _selectApartments(apartments) {
  return apartments;
}
