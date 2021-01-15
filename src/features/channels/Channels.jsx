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

const Channels = () => {
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state);
  const { modalState: { modalName }, currentChannelId } = currentState;
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
          style={{ wordWrap: 'break-word', borderStyle: 'none', padding: '0px' }}
        >
          <Nav variant="pills">
            <Nav.Link href="" style={{ width: '88%' }} className={channel.id === currentChannelId ? 'active' : null}>{channel.name}</Nav.Link>
            {channel.removable ? (
              <NavDropdown id="basic-nav-dropdown" title="" style={{ width: '12%' }}>
                <NavDropdown.Item href="" onClick={handleEditChannelButton}>{t('modalButtonNames.editModal')}</NavDropdown.Item>
                <NavDropdown.Item href="" onClick={handleDeleteChannelButton}>{t('modalButtonNames.removeModal')}</NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Nav>
        </ListGroup.Item>
      ))}
      <Button type="submit" block onClick={handleAddChannelButton} style={{ marginTop: '10px' }}>
        {t('modalButtonNames.addModal')}
      </Button>
      {getModal(modalName)}
    </ListGroup>
  );
};

export default Channels;
