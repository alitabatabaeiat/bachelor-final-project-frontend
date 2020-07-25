import environment from 'environment';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { routerMiddleware } from 'connected-react-router';
import reduxFreeze from 'redux-freeze';
import rootReducer from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export default function createStoreWithMiddleware(initialState, history) {
  const middleware = [environment.isDevelopment ? reduxFreeze : null, thunk, routerMiddleware(history)].filter(Boolean);

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'router']
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer(history));

  const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
  const persistor = persistStore(store);

  return {
    store,
    persistor
  };
}
