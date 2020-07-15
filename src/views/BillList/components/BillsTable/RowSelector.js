import { createSelector } from 'reselect';
import _ from 'lodash';

function _selectExpenses(expenses, chargeId) {
  return _.filter(expenses, ['charge', chargeId]);
}

export const selectExpenses = chargeId => createSelector(state => state.apartments.expenses, () => chargeId, _selectExpenses);
