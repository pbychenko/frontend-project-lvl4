/* eslint-disable no-param-reassign */
import axios from 'axios';
import _ from 'lodash';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import gon from 'gon';
import routes from '../../routes.js';

const { channels } = gon;

export const removeChannelPostRequest = createAsyncThunk(
  'channels/RemoveChannel',
  async (currentChannelId) => {
    try {
      const url = routes.channelPath(currentChannelId);
      // console.log(url);
      const response = await axios.delete(url);
      console.log(response);
      return response.data;
    } catch (er) {
      if (!er.response) {
        throw er;
      }
    }
  },
);

const channellsSlice = createSlice({
  name: 'channells',
  initialState: { byId: _.keyBy(channels, 'id'), allIds: channels.map((c) => c.id) },
  reducers: {
    getNewChannel(state, { payload: { data: { attributes } } }) {
      state.byId[attributes.id] = attributes;
      state.allIds.push(attributes.id);
    },
    getDeletedChannel(state, { payload: { data: { id } } }) {
      const { byId, allIds } = state;

      state.byId = _.omit(byId, id);
      state.allIds = _.without(allIds, id);
    },
    getRenamedChannel(state, { payload: { data: { attributes } } }) {
      state.byId[attributes.id] = attributes;
    },
  },
});

export const { getNewChannel, getDeletedChannel, getRenamedChannel } = channellsSlice.actions;
export default channellsSlice.reducer;
