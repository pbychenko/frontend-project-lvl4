import React from 'react';
import { Modal, Card, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import * as actions from '../../actions/index.js';

const mapStateToProps = (state) => {
  const { modalState: { deleteChannelModal: { show } }, currentChannelId } = state;
  return { show, currentChannelId };
};

const actionCreators = {
  hideModal: actions.hideModal,
};

const DeleteChannelModal = (props) => {
  const { show, hideModal, currentChannelId } = props;
  const handleHideModal = () => {
    hideModal({ channelName: 'deleteChannelModal' });
  };
  const formik = useFormik({
    initialValues: {
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // console.log(values);
      actions.deleteChannel(currentChannelId);
      setSubmitting(false);
      resetForm();
      hideModal({ channelName: 'deleteChannelModal' });
    },
  });
  // console.log(formik.isSubmitting);

  return (
    <Modal show={show} onHide={handleHideModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered animation='true'
    >
      <Modal.Header closeButton>
        <Modal.Title>Вы уверены, что хотите удалить канал?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Card>
          <Card.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Button variant="primary" type="submit" block disabled={formik.isSubmitting}>Удалить</Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(DeleteChannelModal);
