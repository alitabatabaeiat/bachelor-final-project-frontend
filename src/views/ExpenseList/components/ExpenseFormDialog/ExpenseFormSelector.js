import { createSelector } from 'reselect';

function _selectExpenseTypes(types) {
  return types;
}

function _selectExpenseOptions(options) {
  return options;
}

export const selectExpenseTypes = createSelector((state) => state.expenseTypes.types, _selectExpenseTypes);


export const selectExpenseOptions = createSelector(state => state.apartments.expenseOptions, _selectExpenseOptions)
