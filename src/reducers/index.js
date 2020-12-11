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

    return {
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
  },
  [actions.getDeletedChannel](state, { payload: { data: { id } } }) {
    // console.log(payload);
    const { byId, allIds } = state;
    // console.log('in reducer');
    // console.log(id);
    // console.log(state);

    return {
      byId: _.omit(byId, id),
      allIds: _.without(allIds, id),
    };
  },
  [actions.getRenamedChannel](state, { payload: { data: { attributes } } }) {
    // // console.log(payload);
    // const { byId, allIds } = state;
    // console.log('in reducer');
    // console.log(id);
    // console.log(attributes);

    return {
      ...state,
      byId: { ...state.byId, [attributes.id]: attributes },
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
  [actions.getDeletedChannel](state, { payload: { data: { id } } }) {
    // console.log(payload);
    const { byId, allIds } = state;
    const deletedChannelMessageIds = Object.entries(byId)
      .filter(([, value]) => value.channelId === id)
      .map(([, value]) => value.id);
    // console.log(Object.entries(byId).filter(([, value]) => value.channelId === id).map(([, value]) => value.id));
    // console.log('in messages reducer');
    // console.log(id);
    // console.log(state);

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
  [actions.getDeletedChannel](state, { payload }) {
    // console.log('here');
    return 1;
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
}, { addChannelModal: { show: false }, editChannelModal: { show:  false }, deleteChannelModal: { show: false } });

export default combineReducers({
  channells,
  messagges,
  currentChannelId,
  modalState,
});
