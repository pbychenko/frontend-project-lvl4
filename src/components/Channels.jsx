import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, Button, Nav, NavDropdown } from 'react-bootstrap';
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
  const { channels, currentChannelId } = props;

  const handleSelectChannel = (channelId) => (e) => {
    e.preventDefault();
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
            // style={{ wordWrap: 'break-word', textAlign: 'left' }}
            onClick={handleSelectChannel(channel.id)}
            className={ channel.id === currentChannelId ? 'active' : null}
            >
            {/* {channel.name} */}
            <Nav className="mr-auto">
      <Nav.Link href="#link" style = {{width:'90%'}}>{channel.name}</Nav.Link>
      <NavDropdown id="basic-nav-dropdown" style = {{width:'10%'}}>
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
      </NavDropdown>
    </Nav>
        </ListGroup.Item>
      ))}
      <Button variant="outline-info" type="submit" block onClick={handleAddChannelButton}>
        Add channel
      </Button>
      <Button variant="outline-info" type="submit" block onClick={handleEditChannelButton}>
        Edit channel
      </Button>
      <Button variant="outline-info" type="submit" block onClick={handleDeleteChannelButton}>
        Delete channel
      </Button>
    </ListGroup>
  );
};

// export default Channels;
export default connect(mapStateToProps, actionCreators)(Channels);
