export async function createThunkEffect(dispatch, actionType, effect, ...args) {
  dispatch(createAction(actionType));

  const data = await effect(...args);
  const isError = data.status !== 'success';

  dispatch(createAction(`${actionType}_FINISHED`, data, isError));

  return data;
}

export function createAction(type, payload = undefined, error = false, meta = null) {
  return { type, payload, error, meta };
}
