import { getNewChannel, getRenamedChannel, getDeletedChannel } from './features/channels/channelsSlice';
import { getNewMessage, getDeletedChannel as getDeletedChannelMessagesAction } from './features/messages/messagesSlice';
import { getDeletedChannel as getDeletedChannelCurrentChannelAction } from './features/channels/currentChannelIdSlice';

export default (socket, store) => {
  socket.on('newMessage', (data) => {
    store.dispatch(getNewMessage(data));
  });

  socket.on('newChannel', (data) => {
    store.dispatch(getNewChannel(data));
  });

  socket.on('removeChannel', (data) => {
    store.dispatch(getDeletedChannel(data));
    store.dispatch(getDeletedChannelMessagesAction(data));
    store.dispatch(getDeletedChannelCurrentChannelAction());
  });

  socket.on('renameChannel', (data) => {
    store.dispatch(getRenamedChannel(data));
  });
};
