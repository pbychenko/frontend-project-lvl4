import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ListGroup,
  Button,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import getModal from '../modals/index';
import { showModal } from '../modals/modalStateSlice';
import { selectChannel } from './currentChannelIdSlice';
import { channelsSelector } from '../../selectors';

// const mapStateToProps = (state) => {
//   const { currentChannelId, modalState: { modalName } } = state;
//   const channels = channelsSelector(state);
//   return { channels, currentChannelId, modalName };
// };

// const actionCreators = {
//   selectChannel: selectChannelAction,
//   showModal: showModalAction,
// };

const Channels = () => {
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state);
  const { modalState: { modalName } } = currentState;
  const channels = channelsSelector(currentState);
  const { t } = useTranslation();

  const handleSelectChannel = (channelId) => () => {
    dispatch(selectChannel({ id: channelId }));
  };

  const handleAddChannelButton = (e) => {
    e.preventDefault();
    dispatch(showModal({ modalName: 'addChannelModal' }));
  };

  const handleEditChannelButton = (e) => {
    e.preventDefault();
    dispatch(showModal({ modalName: 'editChannelModal' }));
  };

  const handleDeleteChannelButton = (e) => {
    e.preventDefault();
    dispatch(showModal({ modalName: 'deleteChannelModal' }));
  };

  return (
    <ListGroup variant="flush">
      {channels.map((channel) => (
        <ListGroup.Item
          key={channel.id}
          onClick={handleSelectChannel(channel.id)}
          style={{ wordWrap: 'break-word', borderStyle: 'none' }}
        >
          <Nav>
            <Nav.Link href="" style={{ width: '90%' }}>{channel.name}</Nav.Link>
            {channel.removable ? (
              <NavDropdown id="basic-nav-dropdown" title="" style={{ width: '10%' }}>
                <NavDropdown.Item href="" onClick={handleEditChannelButton}>{t('modalButtonNames.editModal')}</NavDropdown.Item>
                <NavDropdown.Item href="" onClick={handleDeleteChannelButton}>{t('modalButtonNames.removeModal')}</NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Nav>
        </ListGroup.Item>
      ))}
      <Button type="submit" block onClick={handleAddChannelButton}>
        {t('modalButtonNames.addModal')}
      </Button>
      {getModal(modalName)}
    </ListGroup>
  );
};

export default Channels;
