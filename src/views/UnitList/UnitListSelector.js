import { createSelector } from 'reselect';
import _ from 'lodash';

function _selectUnits(units) {
  console.log(_.chain(units).sortBy('title').groupBy('floor').value());
  return _.chain(units).sortBy('title').groupBy('floor').value();
}

export const selectUnits = createSelector(state => state.units.units, _selectUnits);
