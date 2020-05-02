import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import createStoreWithMiddleware from './store';

const initialState = {};
const history = createBrowserHistory();
const store = createStoreWithMiddleware(initialState, history);

ReactDOM.render(<Provider store={store}>
  <App history={history} />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
