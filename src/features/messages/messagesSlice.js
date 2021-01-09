/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

const { messages } = gon;

const messaggesSlice = createSlice({
  name: 'messagges',
  initialState: { byId: _.keyBy(messages, 'id'), allIds: messages.map((c) => c.id) },
  reducers: {
    getNewMessage(state, { payload: { data: { attributes } } }) {
      state.byId[attributes.id] = attributes;
      state.allIds.push(attributes.id);
    },
    getDeletedChannel(state, { payload: { data: { id } } }) {
      const { byId, allIds } = state;
      const deletedChannelMessageIds = Object.entries(byId)
        .filter(([, value]) => value.channelId === id)
        .map(([, value]) => value.id);

      state.byId = _.omitBy(byId, (message) => message.channelId === id);
      state.allIds = _.without(allIds, ...deletedChannelMessageIds);
    },
  },
});

export const { getNewMessage, getDeletedChannel } = messaggesSlice.actions;
export default messaggesSlice.reducer;
