import { createSelector } from 'reselect';
import _ from 'lodash';

function _selectExpenseTypes(types) {
  return types;
}

function _selectExpenseOptions(options) {
  const { splitOptions, filterOptions } = options;
  return {
    splitOptions: [...splitOptions],
    filterOptions: [...filterOptions]
  };
}

function _selectUnits(units, selectedUnits) {
  console.log(selectedUnits);
  return _.chain(units).map(unit => ({
    ...unit,
    selected: _.includes(selectedUnits, unit.id)
  })).sortBy('title').value();
}

export const selectExpenseTypes = createSelector((state) => state.expenseTypes.types, _selectExpenseTypes);

export const selectExpenseOptions = createSelector(state => state.apartments.expenseOptions, _selectExpenseOptions);

export const selectUnits = (selectedUnits) => createSelector(state => state.units.units, () => selectedUnits, _selectUnits);
