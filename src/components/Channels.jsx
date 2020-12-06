import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { ListGroup } from 'react-bootstrap';

const mapStateToProps = (state) => {
  // console.log(state);
  const { channells: { byId, allIds } } = state;
  const channels = allIds.map((id) => byId[id]);
  return { channels };
};

const Channels = (props) => {
  const { channels } = props;

  return (
      <ListGroup variant="flush">
        {channels.map((channel) => (
          <ListGroup.Item
              key={channel.id}
              // style={{ wordWrap: 'break-word', textAlign: 'left' }}
              // onClick={selectChannel(channel.id)}
              // className={ channel.id === selectedChannel ? 'active' : null}
              >
              {channel.name}</ListGroup.Item>))}
          </ListGroup>);
};

// export default Channels;
export default connect(mapStateToProps, null)(Channels);
