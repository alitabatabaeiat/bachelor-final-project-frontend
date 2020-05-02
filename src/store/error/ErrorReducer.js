/*
 * Note: This reducer breaks convention on how reducers should be setup.
 */
import * as ErrorAction from './ErrorAction';

export const initialState = {};

export default function errorReducer(state = initialState, action) {
  const { type, error, payload } = action;

  if (type === ErrorAction.REMOVE) {
    return Object.entries(state).reduce((newState, [key, value]) => {
      if (value.id !== payload) {
        newState[key] = value;
      }

      return newState;
    }, {});
  }

  if (type === ErrorAction.CLEAR_ALL) {
    return initialState;
  }

  const isFinishedRequestType = type.includes('_FINISHED');

  const isStartRequestType = type.includes('REQUEST_') && !isFinishedRequestType;

  if (isStartRequestType) {
    const { [`${type}_FINISHED`]: value, ...stateWithoutFinishedType } = state;

    return stateWithoutFinishedType;
  }

  const isError = isFinishedRequestType && Boolean(error);

  if (isError === false) {
    return state;
  }

  return {
    ...state,
    [type]: payload
  };
}
