/* eslint-disable no-param-reassign */
import axios from 'axios';
import _ from 'lodash';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../../routes.js';

export const removeChannelPostRequest = createAsyncThunk(
  'channels/RemoveChannel',
  async (currentChannelId, { rejectWithValue }) => {
    try {
      const url = routes.channelPath(currentChannelId);
      await axios.delete(url);
      return { id: currentChannelId };
    } catch (er) {
      if (!er.response) {
        throw er;
      }
      return rejectWithValue(er.response.data);
    }
  },
);

const channellsSlice = createSlice({
  name: 'channells',
  initialState: {},
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
