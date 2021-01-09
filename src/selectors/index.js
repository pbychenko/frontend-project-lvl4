import { createSelector } from '@reduxjs/toolkit';

export const getChannelsById = (state) => state.channells.byId;
export const getChannelsAllIds = (state) => state.channells.allIds;
export const channelsSelector = createSelector(
  getChannelsById,
  getChannelsAllIds,
  (byId, allIds) => allIds.map((id) => byId[id]),
);

export const getMessagesById = (state) => state.messagges.byId;
export const getMessagesAllIds = (state) => state.messagges.allIds;
export const getCurrentChannelId = (state) => state.currentChannelId;
export const messagesSelector = createSelector(
  getMessagesById,
  getMessagesAllIds,
  (byId, allIds) => allIds.map((id) => byId[id]),
);
export const currentChannelMessagesSelector = createSelector(
  messagesSelector,
  getCurrentChannelId,
  (messages, currentChannelId) => messages.filter((m) => m.channelId === currentChannelId),
);
