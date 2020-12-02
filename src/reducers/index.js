import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
// import * as actions from '../actions/index.js';

const text = handleActions({
  // [actions.addTask]() {
  //   return '';
  // },
  // [actions.updateNewTaskText](state, { payload }) {
  //   return payload.text;
  // },
}, '');

export default combineReducers({
  // tasks,
  text,
});