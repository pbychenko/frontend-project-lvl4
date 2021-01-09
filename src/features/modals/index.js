import React from 'react';
import AddChannelModal from './AddChannelModal.jsx';
import EditChannelModal from './EditChannelModal.jsx';
import DeleteChannelModal from './DeleteChannelModal.jsx';

const getModal = (modalName) => {
  const map = {
    addChannelModal: <AddChannelModal />,
    editChannelModal: <EditChannelModal />,
    deleteChannelModal: <DeleteChannelModal />,
  };

  return (modalName !== '') ? map[modalName] : null;
};

export default getModal;
