// @ts-nocheck
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/index.js';
import App from './components/App.jsx';
import initSocket from './initSockets';
import UserContext from './initContext';

if (!cookies.get('userName')) {
  cookies.set('userName', faker.name.findName());
}

const userName = cookies.get('userName');

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

export default () => {
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      devtoolMiddleware,
    ),
  );
  const baseUrl = 'http://localhost:5000';
  const socket = io(baseUrl);

  initSocket(socket, store);

  render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App />
      </UserContext.Provider>
    </Provider>, document.getElementById('chat'),
  );
};
