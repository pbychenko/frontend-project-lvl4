import { getNewChannel, getRenamedChannel, getDeletedChannel } from './features/channels/channelsSlice';
import { getNewMessage } from './features/messages/messagesSlice';

export default (socket, store) => {
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
