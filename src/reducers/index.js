import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import gon from 'gon';
import * as actions from '../actions/index.js';

const { channels, currentChannelsId, messages } = gon;
// const byId = _.keyBy(channels, 'id');
// const allIds = channels.map(c => c.id);

const channells = handleActions({
  // [actions.fetchChannelsSuccess](state, { payload }) {
  //   // console.log(payload);

  //   return {
  //     byId: _.keyBy(payload.channels, 'id'),
  //     allIds: payload.channels.map((t) => t.id),
  //   };
  // },
  [actions.getNewChannel](state, { payload: { data: { attributes } } }) {
    // console.log(payload);
    const { byId, allIds } = state;
    // console.log('in reducer');
    // console.log(attributes);
    // console.log(state);

    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
}, { byId: _.keyBy(channels, 'id'), allIds: channels.map((c) => c.id) });

const messagges = handleActions({
  [actions.getNewMessage](state, { payload: { data: { attributes } } }) {
    // console.log(payload);
    const { byId, allIds } = state;
    // console.log('in reducer');
    // console.log(attributes);

    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
}, { byId: _.keyBy(messages, 'id'), allIds: messages.map((c) => c.id) });

const currentChannelId = handleActions({
  [actions.selectChannel](state, { payload: { id } }) {
    return id;
  },
}, 1);

const modalState = handleActions({
  [actions.hideModal](state, { payload: { channelName } }) {
    // console.log(payload);
    return { ...state, [channelName]: { show: false } };
  },
  [actions.showModal](state, { payload: { channelName } }) {
    return { ...state, [channelName]: { show: true } };
  },
}, { addChannelModal: { show: false }, removeChannelModal: { show: true } });

export default combineReducers({
  channells,
  messagges,
  currentChannelId,
  modalState,
});
