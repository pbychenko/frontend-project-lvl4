import * as actions from './actions/index.js';

export default (socket, store) => {
  // const baseUrl = 'http://localhost:5000';
  // const socket = io(baseUrl);

  const { getNewMessage, getNewChannel } = actions;
  socket.on('newMessage', (data) => {
    // console.log(data);
    store.dispatch(getNewMessage(data));
  });

  socket.on('newChannel', (data) => {
    console.log(data);
    store.dispatch(getNewChannel(data));
  });
};
