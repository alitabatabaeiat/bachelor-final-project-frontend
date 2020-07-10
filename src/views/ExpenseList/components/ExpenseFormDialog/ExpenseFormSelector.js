import { createSelector } from 'reselect';

function _selectExpenseTypes(types) {
  return types;
}

function _selectExpenseOptions(options) {
  const {splitOptions, filterOptions} = options;
  const _options = {
    splitOptions: [...splitOptions],
    filterOptions: [...filterOptions]
  };
  _options.splitOptions.push({
    id: 10000,
    title: 'تعداد ساکنین + تعداد پارکینگ'
  });
  return _options;
}

function _selectUnits(units, localState = {}, coefficients, selectedUnits) {
  console.log(localState);
  const { filterOption, splitOption, amount } = localState;
  let filteredUnits = [...units];
  if (filterOption === 2)
    filteredUnits = filteredUnits.filter(unit => unit.isEmpty === false);
  else if (filterOption === 3)
    filteredUnits = filteredUnits.filter(unit => unit.isEmpty === true);
  if (filterOption !== 4)
    filteredUnits = filteredUnits.map(unit => ({
      ...unit,
      selected: true
    }));
  else
    filteredUnits = filteredUnits.map((unit, index) => ({
      ...unit,
      selected: selectedUnits[index]
    }));

  console.log(selectedUnits);
  console.log(filteredUnits);
  console.log(coefficients);
  if (splitOption && amount) {
    switch (splitOption) {
      case 1: {
        const unitsCount = filteredUnits.reduce((curr, unit) => (unit.selected ? 1 : 0) + curr, 0);
        filteredUnits = filteredUnits.map(unit => ({
          ...unit,
          share: unit.selected ? amount / unitsCount : 0
        }));
        break;
      }
      case 2: {
        const residentCount = filteredUnits.reduce((curr, unit) => (unit.selected ? unit.residentCount : 0) + curr, 0);
        filteredUnits = filteredUnits.map(unit => ({
          ...unit,
          share: unit.selected ? (amount / residentCount) * unit.residentCount : 0
        }));
        break;
      }
      case 3: {
        const parkingSpaceCount = filteredUnits.reduce((curr, unit) => (unit.selected ? unit.parkingSpaceCount : 0) + curr, 0);
        filteredUnits = filteredUnits.map(unit => ({
          ...unit,
          share: unit.selected ? (amount / parkingSpaceCount) * unit.parkingSpaceCount : 0
        }));
        break;
      }
      case 4: {
        const area = filteredUnits.reduce((curr, unit) => (unit.selected ? unit.area : 0) + curr, 0);
        filteredUnits = filteredUnits.map(unit => ({
          ...unit,
          share: unit.selected ? (amount / area) * unit.area : 0
        }));
        break;
      }
      case 5: {
        const floor = filteredUnits.reduce((curr, unit) => (unit.selected ? unit.floor : 0) + curr, 0);
        filteredUnits = filteredUnits.map(unit => ({
          ...unit,
          share: unit.selected ? (amount / floor) * unit.floor : 0
        }));
        break;
      }
      case 6: {
        const coefficient = coefficients.reduce((curr, coefficient, index) => (filteredUnits[index].selected ? coefficient : 0) + curr, 0);
        if (coefficient > 0)
          filteredUnits = filteredUnits.map((unit, index) => ({
            ...unit,
            share: unit.selected ? (amount / coefficient) * coefficients[index] : 0
          }));
        break;
      }
      case 7: {
        const powerConsumption = filteredUnits.reduce((curr, unit) => (unit.selected ? unit.powerConsumption : 0) + curr, 0);
        filteredUnits = filteredUnits.map((unit, index) => ({
          ...unit,
          share: unit.selected ? (amount / powerConsumption) * unit.powerConsumption : 0
        }));
        break;
      }
    }
  }

  return filteredUnits;
}

export const selectExpenseTypes = createSelector((state) => state.expenseTypes.types, _selectExpenseTypes);

export const selectExpenseOptions = createSelector(state => state.apartments.expenseOptions, _selectExpenseOptions);

export const selectUnits = (localState, coefficients, selectedUnits) => createSelector(state => state.units.units,
  () => localState,
  () => coefficients,
  () => selectedUnits, _selectUnits
);
