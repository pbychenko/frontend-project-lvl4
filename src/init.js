// @ts-nocheck
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import App from './components/App.jsx';

// import faker from 'faker';
// import cookies from 'js-cookie';
import io from 'socket.io-client';
import * as actions from './actions/index.js';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/index.js';
import { fetchChannels } from './actions/index.js';
import initSocket from './initSockets';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

// console.log(process.env.NODE_ENV);
export default () => {
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      devtoolMiddleware,
    ),
  );
  store.dispatch(fetchChannels());
  const baseUrl = 'http://localhost:5000';
  const socket = io(baseUrl);

  initSocket(socket, store);

  render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('chat'),
  );
};
