import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes.js';

export const fetchChannelsRequest = createAction('CHANNELS_FETCH_REQUEST');
export const fetchChannelsSuccess = createAction('CHANNELS_FETCH_SUCCESS');
export const fetchChannelsFailure = createAction('CHANNELS_FETCH_FAILURE');

export const selectChannel = createAction('CHANNEL_SELECT');

// export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
// export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
// export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const getNewMessage = createAction('MESSAGE_GET');
export const getNewChannel = createAction('CHANNEL_GET');
export const getRenamedChannel = createAction('CHANNEL_RENAME');
export const getDeletedChannel = createAction('CHANNEL_DELETE');
// export const addNewChannel = createAction('CHANNEL_ADD');
// export const removeChannel = createAction('CHANNEL_REMOVE');
// export const renameChannel = createAction('CHANNEL_RENAME');

export const hideModal = createAction('MODAL_HIDE');
export const showModal = createAction('MODAL_SHOW');

// export const getMessage = createAction('CHANNEL_ADD_REQUEST');
// export const getMessage = createAction('CHANNEL_ADD_REQUEST');

// export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
// export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
// export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const fetchChannels = () => async (dispatch) => {
    dispatch(fetchChannelsRequest());
    try {
      const url = routes.channelsPath();
      const response = await axios.get(url);
      const channels = response.data.data.map(el => el.attributes);
      dispatch(fetchChannelsSuccess({ channels }));
    } catch (e) {
      dispatch(fetchChannelsFailure());
      throw e;
    }
};

export const sendMessage = async (values, userName, channelId) => {
  const url = routes.channelMessagesPath(channelId);
  // const messageDate = new Date();
  const data = { data: { attributes: { ...values, userName } } };
  await axios.post(url, { ...data });
};

export const addChannel = async (values) => {
  // console.log(values);
  const url = routes.channelsPath();
  const data = { data: { attributes: { ...values } } };
  try {
    await axios.post(url, { ...data });
  } catch (er) {
    throw er;
  }
  // await axios.post(url, { ...data });
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

// export const sendMessage = ({ message }) => async (dispatch) => {
//     dispatch(addChannelRequest());
//     try {
//         const url = routes.channelsPath();
//         const response = await axios.post(url, { data });
//         dispatch(addChannelSuccess({ task: response.data }));
//     } catch (e) {
//         dispatch(addChannelFailure());
//         throw e;
//     };
// };

// export const sendMessage = ({ message }) => async (dispatch) => {
//       const url = routes.channelsPath();
//       const response = await axios.post(url, { data });
//       dispatch(addChannelSuccess({ task: response.data }));
// };



// export const addChannel = ({ channel }) => async (dispatch) => {
//     dispatch(addChannelRequest());
//     try {
//         const url = routes.channelsPath();
//         const response = await axios.post(url, { data });
//         dispatch(addChannelSuccess({ task: response.data }));
//     } catch (e) {
//         dispatch(addChannelFailure());
//         throw e;
//     };
// };
  
//   export const removeTask = (task) => async (dispatch) => {
//     dispatch(removeTaskRequest());
//     try {
//       const url = routes.taskUrl(task.id);
//       await axios.delete(url);
//       dispatch(removeTaskSuccess({ id: task.id }));
//     } catch (e) {
//       dispatch(removeTaskFailure());
//       throw e;
//     }
//   };

