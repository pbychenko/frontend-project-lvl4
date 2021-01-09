import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: 1,
  reducers: {
    selectChannel(state, { payload: { id } }) {
      return id;
    },
    getDeletedChannel() {
      return 1;
    },
  },
});

export const { selectChannel, getDeletedChannel } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
