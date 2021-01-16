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
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers/index.js';
import App from './components/App.jsx';
import initSocket from './initSockets';
import UserContext from './initContext';
import './locales/index';

if (!cookies.get('userName')) {
  cookies.set('userName', faker.name.findName());
}

const userName = cookies.get('userName');

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

export default () => {
  const store = configureStore({
    reducer: reducers,
  });
  console.log('integration test');
  // console.log(process.env.NODE_ENV);
  // const baseUrl = 'http://localhost:5000';
  // const baseUrl = process.env.PORT || 5000;
  // const baseUrl = (process.env.NODE_ENV ? production : development);
  const socket = io();

  initSocket(socket, store);

  render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App />
      </UserContext.Provider>
    </Provider>, document.getElementById('chat'),
  );
};
