import AddChannelModal from './AddChannelModal.jsx';
import EditChannelModal from './EditChannelModal.jsx';
import DeleteChannelModal from './DeleteChannelModal.jsx';

const getModal = (modalName) => {
  const map = {
    addChannelModal: AddChannelModal,
    editChannelModal: EditChannelModal,
    deleteChannelModal: DeleteChannelModal,
  };

  return map[modalName];
};

export default getModal;
