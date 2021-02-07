/* eslint-disable no-param-reassign */
import axios from 'axios';
import _ from 'lodash';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../../routes.js';
import { removeChannelPostRequest } from '../channels/channelsSlice';

export const sendMessage = createAsyncThunk(
  'messagges/sendNewMessage',
  async (parameters) => {
    const { data, currentChannelId } = parameters;
    try {
      const url = routes.channelMessagesPath(currentChannelId);
      await axios.post(url, { ...data });
    } catch (er) {
      if (!er.response) {
        throw er;
      }
    }
  },
);

const messaggesSlice = createSlice({
  name: 'messagges',
  initialState: {},
  reducers: {
    getNewMessage(state, { payload: { data: { attributes } } }) {
      state.byId[attributes.id] = attributes;
      state.allIds.push(attributes.id);
    },
  },
  extraReducers: {
    [removeChannelPostRequest.fulfilled]: (state, { payload: { id } }) => {
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
