import * as actions from './actions/index.js';

export default (socket, store) => {
  // const baseUrl = 'http://localhost:5000';
  // const socket = io(baseUrl);

  socket.on('newMessage', (data) => {
    console.log(data);
    const { getNewMessage } = actions;
    store.dispatch(getNewMessage(data));
  });
};
