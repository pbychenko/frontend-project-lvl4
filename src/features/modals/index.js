import AddChannelModal from './AddChannelModal.jsx';
import EditChannelModal from './EditChannelModal.jsx';
import DeleteChannelModal from './DeleteChannelModal.jsx';

const map = {
  addChannelModal: AddChannelModal,
  editChannelModal: EditChannelModal,
  deleteChannelModal: DeleteChannelModal,
};

const getModal = (modalName) => map[modalName];

export default getModal;
