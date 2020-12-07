import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import { ListGroup, Button } from 'react-bootstrap';

const mapStateToProps = (state) => {
  // console.log(state);
  const { channells: { byId, allIds }, currentChannelId } = state;
  const channels = allIds.map((id) => byId[id]);
  return { channels, currentChannelId };
};

const actionCreators = {
  selectChannel: actions.selectChannel,
};

const Channels = (props) => {
  const { channels, currentChannelId } = props;

  const handleSelectChannel = (channelId) => (e) => {
    e.preventDefault();
    const { selectChannel } = props;
    selectChannel({ id: channelId });
  };

  return (
      <ListGroup variant="flush">
        {channels.map((channel) => (
          <ListGroup.Item
              key={channel.id}
              // style={{ wordWrap: 'break-word', textAlign: 'left' }}
              onClick={handleSelectChannel(channel.id)}
              className={ channel.id === currentChannelId ? 'active' : null}
              >
              {channel.name}
          </ListGroup.Item>))}
          <Button variant="outline-info" type="submit" block 
                // onClick={this.handleShowModal}
                >Add channel</Button>
      </ListGroup>);
};

// export default Channels;
export default connect(mapStateToProps, actionCreators)(Channels);
