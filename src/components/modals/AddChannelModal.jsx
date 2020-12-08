import React from 'react';
import { Modal, Card, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import * as actions from '../../actions/index.js';

const mapStateToProps = (state) => {
  const { modalState: { addChannelModal: { show } } } = state;
  return { show };
};

const actionCreators = {
  hideModal: actions.hideModal,
};

const AddChannelModal = (props) => {
  const { show, hideModal } = props;
  const handleHideModal = () => {
    // const { hideModal } = props;
    hideModal({ channelName: 'addChannelModal' });
  };
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      actions.addChannel(values);
      setSubmitting(false);
      resetForm();
      hideModal({ channelName: 'addChannelModal' });
    },
  });
  // console.log(formik.isSubmitting);

  return (
    <Modal show={show} onHide={handleHideModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered animation='true'
    >
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Card>
          <Card.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Control type="text" placeholder="Введите имя нового канала" name="name" {...formik.getFieldProps('name')} />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </Form.Group>
              <Button variant="primary" type="submit" block disabled={formik.isSubmitting}>Добавить</Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(AddChannelModal);
