import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes.js';

export const selectChannel = createAction('CHANNEL_SELECT');

export const getNewMessage = createAction('MESSAGE_GET');
export const getNewChannel = createAction('CHANNEL_GET');
export const getRenamedChannel = createAction('CHANNEL_RENAME');
export const getDeletedChannel = createAction('CHANNEL_DELETE');
// export const addNewChannel = createAction('CHANNEL_ADD');
// export const removeChannel = createAction('CHANNEL_REMOVE');
// export const renameChannel = createAction('CHANNEL_RENAME');

export const hideModal = createAction('MODAL_HIDE');
export const showModal = createAction('MODAL_SHOW');

// export const sendMessage = async (values, userName, channelId) => {
//   const url = routes.channelMessagesPath(channelId);
//   // const messageDate = new Date();
//   const data = { data: { attributes: { ...values, userName } } };
//   await axios.post(url, { ...data });
//   // try {
//   //   await axios.post(url, { ...data });
//   // } catch (er) {
//   //   console.log('ssss');
//   //   throw er;
//   // }
// };

export const addChannel = (values) => {
  // console.log(values);
  const url = routes.channelsPath();
  const data = { data: { attributes: { ...values } } };
  // try {
  //   axios.post(url, { ...data });
  // } catch (er) {
  //   throw er;
  // }
  axios.post(url, { ...data });
  // console.log(response.data);
  // dispatch(addChannelSuccess({ task: response.data }));
};

export const deleteChannel = async (channelId) => {
  // console.log(values);
  const url = routes.channelPath(channelId);
  // const data = { data: { attributes: { ...values } } };
  await axios.delete(url);
  // console.log(response.data);
  // dispatch(addChannelSuccess({ task: response.data }));
};

export const renameChannel = async (values, channelId) => {
  // console.log(values);
  const url = routes.channelPath(channelId);
  const data = { data: { attributes: { ...values } } };
  await axios.patch(url, { ...data });
};
