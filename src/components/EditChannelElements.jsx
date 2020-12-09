import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { channells: { byId, allIds }, currentChannelId } = state;
  const channels = allIds.map((id) => byId[id]);
  return { channels, currentChannelId };
};

const EditChannelElements = ({ channels, currentChannelId }) => {
  // const { channels, currentChannelId } = props;
  console.log(channels)
  return (
  // const EditChannelElements = ({ channels, deleteChannel }) => (
    <ListGroup variant="flush">
      {/* <div>s</div> */}
      {channels.map((channel) => (
      <ListGroup.Item
        key={channel.id}
        style={{ cursor: 'pointer' }}
           onClick={() => alert(channel.name)}
      >{channel.removable === false ? '': '...'}
        </ListGroup.Item>))}
    </ListGroup>
  );
};

export default connect(mapStateToProps, null)(EditChannelElements);
