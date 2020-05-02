import environment from 'environment';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { routerMiddleware } from 'connected-react-router';
import reduxFreeze from 'redux-freeze';
import rootReducer from './rootReducer';

export default function createStoreWithMiddleware(initialState, history) {
  const middleware = [environment.isDevelopment ? reduxFreeze : null, thunk, routerMiddleware(history)].filter(Boolean);

  const store = createStore(rootReducer(history), initialState, composeWithDevTools(applyMiddleware(...middleware)));

  return store;
}
