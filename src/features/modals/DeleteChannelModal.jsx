import React from 'react';
import axios from 'axios';
import {
  Modal, Card, Form, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { hideModal as hideModalAction } from './modalStateSlice';
import routes from '../../routes.js';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};
const actionCreators = { hideModal: hideModalAction };

const DeleteChannelModal = ({ hideModal, currentChannelId }) => {
  const { t } = useTranslation();
  const handleHideModal = () => {
    hideModal();
  };
  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const url = routes.channelPath(currentChannelId);
      try {
        await axios.delete(url);
        setSubmitting(false);
        resetForm();
        hideModal();
      } catch (er) {
        setSubmitting(true);
        throw er;
      }
    },
  });

  return (
    <Modal
      show
      onHide={handleHideModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('removeModalForm.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Card>
          <Card.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Button variant="primary" type="submit" block>{t('removeModalForm.buttonName')}</Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(DeleteChannelModal);
