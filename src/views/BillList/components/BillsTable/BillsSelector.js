import { createSelector } from 'reselect';

function _selectCharges(apartmentCharges, unitCharges, role) {
  return role === 'manager' ? apartmentCharges : unitCharges;
}

export const selectCharges = createSelector(state => state.charges.apartmentCharges, state => state.charges.unitCharges,
  state => state.user.role, _selectCharges);
