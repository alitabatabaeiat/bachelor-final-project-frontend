import { createSelector } from 'reselect';
import _ from 'lodash';

function _selectCharges(charges) {
  return _.map(charges, charge => ({
    ..._.omit(charge, ['charge']),
    ..._.omit(charge.charge, ['id', 'expenses']),
    chargeId: charge.charge.id,
    expenses: _.map(charge.charge.expenses, expense => ({
      ..._.omit(expense, ['id', 'amount', 'unitExpenses']),
      ..._.omit(expense.unitExpenses[0], ['unitId']),
      apartmentExpenseId: expense.id,
      apartmentExpenseAmount: expense.amount
    }))
  }));
}

export const selectCharges = createSelector(state => state.charges.unitCharges, _selectCharges);
