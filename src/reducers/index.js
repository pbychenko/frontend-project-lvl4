import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/index.js';

import gon from 'gon';

const { channels, currentChannelsId, messages } = gon;
const byId = _.keyBy(channels, 'id');
const allIds = channels.map(c => c.id);

const channells = handleActions({
  [actions.fetchChannelsSuccess](state, { payload }) {
    // console.log(payload);

    return {
      byId: _.keyBy(payload.channels, 'id'),
      allIds: payload.channels.map((t) => t.id),
    };
  },
}, { byId: _.keyBy(channels, 'id'), allIds: channels.map(c => c.id) });

export default combineReducers({
  channells,
});