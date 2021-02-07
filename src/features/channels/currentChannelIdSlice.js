import { createSlice } from '@reduxjs/toolkit';
import { removeChannelPostRequest } from './channelsSlice';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: {},
  reducers: {
    selectChannel(state, { payload: { id } }) {
      return id;
    },
  },
  extraReducers: {
    [removeChannelPostRequest.fulfilled]: () => 1,
  },
});

export const { selectChannel, getDeletedChannel } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
