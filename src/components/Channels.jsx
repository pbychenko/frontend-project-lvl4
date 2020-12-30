import React from 'react';
import { connect } from 'react-redux';
import {
  ListGroup,
  Button,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  // console.log(state);
  const { channells: { byId, allIds }, currentChannelId } = state;
  const channels = allIds.map((id) => byId[id]);
  return { channels, currentChannelId };
};

const actionCreators = {
  selectChannel: actions.selectChannel,
  showModal: actions.showModal,
};

const Channels = (props) => {
  // const { channels, currentChannelId } = props;
  const { channels } = props;

  const handleSelectChannel = (channelId) => () => {
    const { selectChannel } = props;
    selectChannel({ id: channelId });
  };

  const handleAddChannelButton = (e) => {
    e.preventDefault();
    const { showModal } = props;
    showModal({ channelName: 'addChannelModal' });
  };

  const handleEditChannelButton = (e) => {
    e.preventDefault();
    const { showModal } = props;
    showModal({ channelName: 'editChannelModal' });
  };

  const handleDeleteChannelButton = (e) => {
    e.preventDefault();
    const { showModal } = props;
    showModal({ channelName: 'deleteChannelModal' });
  };

  return (
    <ListGroup variant="flush">
      {channels.map((channel) => (
        <ListGroup.Item
          key={channel.id}
          // className={ channel.id === currentChannelId ? 'active' : null}
          onClick={handleSelectChannel(channel.id)}
          style={{ wordWrap: 'break-word', borderStyle: 'none' }}
        >
          <Nav>
            <Nav.Link href="" style={{ width: '90%' }}>{channel.name}</Nav.Link>
            {channel.removable ? (
              <NavDropdown id="basic-nav-dropdown" title="" style={{ width: '10%' }}>
                <NavDropdown.Item href="" onClick={handleEditChannelButton}>Edit</NavDropdown.Item>
                <NavDropdown.Item href="" onClick={handleDeleteChannelButton}>Delete</NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Nav>
        </ListGroup.Item>
      ))}
      <Button type="submit" block onClick={handleAddChannelButton}>
        Add channel
      </Button>
    </ListGroup>
  );
};

export default connect(mapStateToProps, actionCreators)(Channels);
