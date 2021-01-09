/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalStateSlice = createSlice({
  name: 'modalState',
  initialState: { modalName: '' },
  reducers: {
    hideModal(state) {
      state.modalName = '';
    },
    showModal(state, { payload: { modalName } }) {
      state.modalName = modalName;
    },
  },
});

export const { hideModal, showModal } = modalStateSlice.actions;
export default modalStateSlice.reducer;
