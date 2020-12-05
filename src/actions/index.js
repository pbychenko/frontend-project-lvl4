import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes.js';

export const fetchChannelsRequest = createAction('CHANNELS_FETCH_REQUEST');
export const fetchChannelsSuccess = createAction('CHANNELS_FETCH_SUCCESS');
export const fetchChannelsFailure = createAction('CHANNELS_FETCH_FAILURE');

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