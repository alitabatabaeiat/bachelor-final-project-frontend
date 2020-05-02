/*
 * Note: This reducer breaks convention on how reducers should be setup.
 */
export const initialState = {};

export default function requestingReducer(state = initialState, action) {
  const isRequestType = action.type.includes('REQUEST_');

  if (isRequestType === false) {
    return state;
  }

  const requestName = action.type.replace('_FINISHED', '');

  const isFinishedRequestType = action.type.includes('_FINISHED');

  return {
    ...state,
    [requestName]: isFinishedRequestType === false,
  };
}
