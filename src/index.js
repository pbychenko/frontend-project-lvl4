// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import App from './components/App.jsx';

// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/index.js';
// import App from './components/App.jsx';
// import { fetchTasks } from './actions/index.js';

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const store = createStore(
  reducers,
  compose(
    // BEGIN (write your solution here)
    applyMiddleware(thunk),
    // END
    devtoolMiddleware,
  ),
);

console.log('it works!');
console.log('gon', gon);

// import React from 'react';
// import ReactDOM from 'react-dom';

// ReactDOM.render(
//     <App data={gon} />,
//     document.getElementById('chat'),
// );
render(
  <Provider store={store}>
    <App data={gon}/>
  </Provider>,
  document.getElementById('chat'),
);