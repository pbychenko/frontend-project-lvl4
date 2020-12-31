import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes.js';

export const selectChannel = createAction('CHANNEL_SELECT');

export const getNewMessage = createAction('MESSAGE_GET');
export const getNewChannel = createAction('CHANNEL_GET');
export const getRenamedChannel = createAction('CHANNEL_RENAME');
export const getDeletedChannel = createAction('CHANNEL_DELETE');

export const hideModal = createAction('MODAL_HIDE');
export const showModal = createAction('MODAL_SHOW');

export const renameChannel = async (values, channelId) => {
  // console.log(values);
  const url = routes.channelPath(channelId);
  const data = { data: { attributes: { ...values } } };
  await axios.patch(url, { ...data });
};
