import { createSelector } from 'reselect';

function _selectExpenses(expenses) {
  return expenses;
}

export const selectExpenses = createSelector((state) => state.apartments.expenses, _selectExpenses);
