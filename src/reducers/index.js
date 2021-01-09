import { combineReducers } from 'redux';
import channellsSliceReducer from '../features/channels/channelsSlice';
import messaggesSliceReducer from '../features/messages/messagesSlice';
import currentChannelIdSliceReducer from '../features/channels/currentChannelIdSlice';
import modalStateSliceReducer from '../features/modals/modalStateSlice';

export default combineReducers({
  channells: channellsSliceReducer,
  messagges: messaggesSliceReducer,
  currentChannelId: currentChannelIdSliceReducer,
  modalState: modalStateSliceReducer,
});
