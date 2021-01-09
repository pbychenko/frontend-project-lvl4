/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import gon from 'gon';

const { channels } = gon;

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
