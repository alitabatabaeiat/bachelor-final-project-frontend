import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import createStoreWithMiddleware from './store';
import { PersistGate } from 'redux-persist/integration/react'

const initialState = {};
const history = createBrowserHistory();
const {store, persistor} = createStoreWithMiddleware(initialState, history);

ReactDOM.render(<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App history={history} />
  </PersistGate>
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
