// // @ts-check

import gon from 'gon';
import _ from 'lodash';
import runApp from './init';

const formatState = () => {
  const { messages, channels } = gon;
  return {
    channells: { byId: _.keyBy(channels, 'id'), allIds: channels.map((c) => c.id) },
    messagges: { byId: _.keyBy(messages, 'id'), allIds: messages.map((c) => c.id) },
    currentChannelId: 1,
    modalState: { modalName: '' },
  };
};

const initialState = formatState();
runApp(initialState);
