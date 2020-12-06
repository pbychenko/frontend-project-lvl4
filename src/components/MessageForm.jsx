import React from 'react';
import { useFormik } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import axios from 'axios';
import routes from '../routes.js';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

const validate = (values) => {
  const errors = {};
  if (!values.text) {
    errors.text = 'Required';
  } 

  return errors;
};

const sendMessage = async (values, channelId) => {
  const url = routes.channelMessagesPath(channelId);
  // const messageDate = new Date();
  const data = { data: { attributes: {...values, userName: 'Pavel2' } } };
  const response = await axios.post(url, { ...data });
  // console.log(response.data);
  // dispatch(addChannelSuccess({ task: response.data }));
};


// const { data: { attributes } } = req.body;
//       const message = {
//         ...attributes,
//         channelId: Number(req.params.channelId),
//         id: getNextId(),
//       };


const MessageForm = (props) => {
  // const { message, submitMessage, writeMessage } = props;
  const { currentChannelId } = props;
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validate,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // console.log(values)
      // setTimeout(() => {
      //   alert(JSON.stringify(values, null, 2));
      //   setSubmitting(false);
      // }, 400);      
      sendMessage(values, currentChannelId);
      setSubmitting(false);
      resetForm();
    },
  });
  // console.log(formik);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Row>
        <Col lg={10} xs={12} style={{ marginBottom: '10px' }}>
          <Form.Control type="text" placeholder="Write your message here" name="text" {...formik.getFieldProps('text')} />
          {formik.touched.text && formik.errors.text ? (
            <div>{formik.errors.text}</div>
          ) : null}
        </Col>
        <Col lg={2} xs={12}>
          <Button variant="primary" type="submit" block disabled={formik.isSubmitting}>Send</Button>
        </Col>
      </Form.Row>
    </Form>);
};

export default connect(mapStateToProps, null)(MessageForm);
