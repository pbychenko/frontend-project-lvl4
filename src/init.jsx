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
import _ from 'lodash';
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

const formatState = (state) => {
  const { messages, channels } = state;
  return {
    channells: { byId: _.keyBy(channels, 'id'), allIds: channels.map((c) => c.id) },
    messagges: { byId: _.keyBy(messages, 'id'), allIds: messages.map((c) => c.id) },
    currentChannelId: 1,
    modalState: { modalName: '' },
  };
};

const app = (initState) => {
  const formatedState = formatState(initState);

  const store = configureStore({
    reducer: reducers,
    preloadedState: formatedState,
  });
  const socket = io();

  initSocket(socket, store);
  // return (
  //   <Provider store={store}>
  //     <UserContext.Provider value={userName}>
  //       <App />
  //     </UserContext.Provider>
  //   </Provider>
  // );

  render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App />
      </UserContext.Provider>
    </Provider>, document.getElementById('chat'),
  );
};

export default app;
