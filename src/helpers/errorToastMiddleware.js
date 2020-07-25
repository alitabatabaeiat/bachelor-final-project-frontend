import * as ToastsAction from '../store/toasts/ToastsAction';

export default function errorToastMiddleware() {
  return (store) => (next) => (action) => {
    if (action.error)
      next(ToastsAction.add(action.payload.message, 'error'));

    next(action);
  };
}
