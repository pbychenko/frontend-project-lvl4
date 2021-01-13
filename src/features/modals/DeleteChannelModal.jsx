import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Modal, Card, Form, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { hideModal } from './modalStateSlice';
import routes from '../../routes.js';

const DeleteChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state);
  const { currentChannelId } = currentState;

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const url = routes.channelPath(currentChannelId);
      try {
        await axios.delete(url);
        setSubmitting(false);
        resetForm();
        dispatch(hideModal());
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

export default DeleteChannelModal;
