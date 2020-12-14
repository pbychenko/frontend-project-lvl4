import * as actions from './actions/index.js';

export default (socket, store) => {
  // const baseUrl = 'http://localhost:5000';
  // const socket = io(baseUrl);

  const {
    getNewMessage,
    getNewChannel,
    getDeletedChannel,
    getRenamedChannel,
  } = actions;

  socket.on('newMessage', (data) => {
    store.dispatch(getNewMessage(data));
  });

  socket.on('newChannel', (data) => {
    store.dispatch(getNewChannel(data));
  });

  socket.on('removeChannel', (data) => {
    store.dispatch(getDeletedChannel(data));
  });

  socket.on('renameChannel', (data) => {
    store.dispatch(getRenamedChannel(data));
  });
};
