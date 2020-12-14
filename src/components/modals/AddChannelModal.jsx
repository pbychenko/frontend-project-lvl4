import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { Modal, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { Field, useFormik } from 'formik';
import { connect } from 'react-redux';
import * as actions from '../../actions/index.js';
import routes from '../../routes.js';

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
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // try {
      //   actions.addChannel(values);
      //   setSubmitting(false);
      //   resetForm();
      //   hideModal({ channelName: 'addChannelModal' });
      // } catch (err) {
      //   setSubmitting(true);
      //   console.log('here');
      // }
      // actions.addChannel(values);
      // setSubmitting(false);
      // resetForm();
      const url = routes.channelsPath();
      const data = { data: { attributes: { ...values } } };
      try {
        await axios.post(url, { ...data });
        // actions.addChannel(values);
        setSubmitting(false);
        resetForm();
        hideModal({ channelName: 'addChannelModal' });
      } catch (er) {
        setSubmitting(true);
        console.log('herse');
        throw er;
        // console.log(er);
      }
    },
  });
  // console.log(formik.errors);
  // console.log(formik.status);
  // console.log(props.show)
  // const inputRef = useRef(null);
  // console.log(props.in)
  // if (show) {
  //   const inputEl = useRef(null);
  //   useEffect(() => {
  //     console.log(inputEl.current);
  //     inputEl.current.focus();
  //   }, [inputEl]);
  // }

  const inputEl = show ? useRef(null) : null;
  if (show) {
    useEffect(() => {
    console.log(inputEl.current);
    inputEl.current.focus();
    }, [inputEl]);
  }

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
                <Form.Control type="text" placeholder="Введите имя нового канала" name="name" {...formik.getFieldProps('name')} ref={show ? inputEl : null} />
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
