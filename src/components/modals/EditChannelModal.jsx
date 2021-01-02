import React, { useRef } from 'react';
import axios from 'axios';
import {
  Modal, Card, Form, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as actions from '../../actions/index.js';
import routes from '../../routes.js';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

const actionCreators = {
  hideModal: actions.hideModal,
};

const EditChannelModal = (props) => {
  const { t } = useTranslation();
  const { hideModal, currentChannelId } = props;
  const handleHideModal = () => {
    hideModal();
  };
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = t('editModalForm.textFieldError');
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate,
    onSubmit: async (values, { setSubmitting, resetForm, setFieldError }) => {
      const url = routes.channelPath(currentChannelId);
      const data = { data: { attributes: { ...values } } };
      try {
        await axios.patch(url, { ...data });
        setSubmitting(false);
        resetForm();
        hideModal();
      } catch (er) {
        setSubmitting(true);
        setFieldError('name', t('networkError'));
        throw er;
      }
    },
  });
  const inputEl = useRef(null);

  return (
    <Modal
      show
      onHide={handleHideModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation
      onEntered={() => inputEl.current.focus()}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('editModalForm.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Card>
          <Card.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Control type="text" placeholder={t('editModalForm.placeholder')} {...formik.getFieldProps('name')} ref={inputEl} />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </Form.Group>
              <Button variant="primary" type="submit" block disabled={formik.isSubmitting}>{t('editModalForm.buttonName')}</Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(EditChannelModal);
