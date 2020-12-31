import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import gon from 'gon';
import * as actions from '../actions/index.js';

// const { channels, currentChannelsId, messages } = gon;
const { channels, messages } = gon;

const channells = handleActions({
  [actions.getNewChannel](state, { payload: { data: { attributes } } }) {
    const { byId, allIds } = state;
    // console.log(attributes);

    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
  [actions.getDeletedChannel](state, { payload: { data: { id } } }) {
    const { byId, allIds } = state;

    return {
      byId: _.omit(byId, id),
      allIds: _.without(allIds, id),
    };
  },
  [actions.getRenamedChannel](state, { payload: { data: { attributes } } }) {
    return {
      ...state,
      byId: { ...state.byId, [attributes.id]: attributes },
    };
  },
}, { byId: _.keyBy(channels, 'id'), allIds: channels.map((c) => c.id) });

const messagges = handleActions({
  [actions.getNewMessage](state, { payload: { data: { attributes } } }) {
    const { byId, allIds } = state;

    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
  [actions.getDeletedChannel](state, { payload: { data: { id } } }) {
    const { byId, allIds } = state;
    const deletedChannelMessageIds = Object.entries(byId)
      .filter(([, value]) => value.channelId === id)
      .map(([, value]) => value.id);

    return {
      byId: _.omitBy(byId, (message) => message.channelId === id),
      allIds: _.without(allIds, ...deletedChannelMessageIds),
    };
  },
}, { byId: _.keyBy(messages, 'id'), allIds: messages.map((c) => c.id) });

const currentChannelId = handleActions({
  [actions.selectChannel](state, { payload: { id } }) {
    return id;
  },
  [actions.getDeletedChannel]() {
    return 1;
  },
}, 1);

const modalState = handleActions({
  [actions.hideModal](state) {
    return { ...state, modalName: '' };
  },
  [actions.showModal](state, { payload: { modalName } }) {
    return { ...state, modalName };
  },
}, { modalName: '' });

export default combineReducers({
  channells,
  messagges,
  currentChannelId,
  modalState,
});
