import React from 'react';
import { connect } from 'react-redux';
import {
  ListGroup,
  Button,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import getModal from '../modals/index';
import { showModal as showModalAction } from '../modals/modalStateSlice';
import { selectChannel as selectChannelAction } from './currentChannelIdSlice';
import { channelsSelector } from '../../selectors';

const mapStateToProps = (state) => {
  const { currentChannelId, modalState: { modalName } } = state;
  const channels = channelsSelector(state);
  return { channels, currentChannelId, modalName };
};

const actionCreators = {
  selectChannel: selectChannelAction,
  showModal: showModalAction,
};

const Channels = (props) => {
  const { t } = useTranslation();
  const { channels, modalName } = props;

  const handleSelectChannel = (channelId) => () => {
    const { selectChannel } = props;
    selectChannel({ id: channelId });
  };

  const handleAddChannelButton = (e) => {
    e.preventDefault();
    const { showModal } = props;
    showModal({ modalName: 'addChannelModal' });
  };

  const handleEditChannelButton = (e) => {
    e.preventDefault();
    const { showModal } = props;
    showModal({ modalName: 'editChannelModal' });
  };

  const handleDeleteChannelButton = (e) => {
    e.preventDefault();
    const { showModal } = props;
    showModal({ modalName: 'deleteChannelModal' });
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

export default connect(mapStateToProps, actionCreators)(Channels);
