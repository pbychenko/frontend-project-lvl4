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
      }
    },
  });
  // console.log(formik.errors);
  // console.log(formik.status);
  // console.log(props.show)
  
  const inputEl = useRef(null);
  // if (show) {
  //   useEffect(() => {
  //   console.log('here')
  //   console.log(inputEl.current);
  //   inputEl.current.focus();
  //   }, [inputEl]);
  // } else {
  //   useEffect(() => {
  //     console.log('heres')
  //     inputEl.current = null;
  //     }, [inputEl]);
  // }

  return (
    <Modal show={show} onHide={handleHideModal} style={{ hidden: true }}
      aria-labelledby="contained-modal-title-vcenter"
      centered animation='true'
      // autoFocus
      // backdrop="static"
      // keyboard={false}
      onEntered={() => inputEl.current.focus()}
    >
      {/* <Modal.Dialog> */}
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Card>
          <Card.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Control type="text" autoFocus placeholder="Введите имя нового канала" name="name"
                {...formik.getFieldProps('name')}
                ref={inputEl} />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </Form.Group>
              <Button variant="primary" type="submit" block disabled={formik.isSubmitting}>Добавить</Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
      {/* </Modal.Dialog> */}
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(AddChannelModal);
