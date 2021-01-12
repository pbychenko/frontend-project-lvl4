/* eslint-disable no-param-reassign */
import axios from 'axios';
import _ from 'lodash';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import gon from 'gon';
import routes from '../../routes.js';

const { messages } = gon;

export const sendMessage = createAsyncThunk(
  'messagges/sendNewMessage',
  async (parameters) => {
    const { data, currentChannelId } = parameters;
    console.log('here');
    // console.log(data);
    console.log(currentChannelId);

    const url = routes.channelMessagesPath(currentChannelId);
    await axios.post(url, { ...data });
  },
);

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
  extraReducers: {
    // omit posts loading reducers
    [sendMessage.fulfilled]: (state, action) => {
      // We can directly add the new post object to our posts array
      // state.posts.push(action.payload)
    },
  },
});

export const { getNewMessage, getDeletedChannel } = messaggesSlice.actions;
export default messaggesSlice.reducer;
