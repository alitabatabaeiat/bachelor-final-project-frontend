import { createSelector } from 'reselect';
import _ from 'lodash';

export const selectRequesting = createSelector(
  (state) => state.requesting,
  (state, actionTypes) => actionTypes,
  _selectRequesting
);

function _selectRequesting(requestingState, actionTypes) {
  console.log('aaa', (_.isNil(actionTypes) && _.chain(requestingState).values().some(true).value()));
  return (_.isNil(actionTypes) && _.chain(requestingState).values().some(v => v).value()) ||
    (!_.isNil(actionTypes) && actionTypes.some((actionType) => requestingState[actionType]));
}
