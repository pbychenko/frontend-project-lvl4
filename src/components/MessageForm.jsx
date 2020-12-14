import React from 'react';
import { useFormik } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/index.js';
import UserContext from '../initContext';
import { useContext } from 'react';

// const constextType = UserContext;

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

const MessageForm = (props) => {
  const { currentChannelId } = props;
  const userName = useContext(UserContext);
  const validate = (values) => {
    const errors = {};
    if (!values.text) {
      errors.text = 'Required';
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validate,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      sendMessage(values, userName, currentChannelId);
      setSubmitting(false);
      resetForm();
    },
  });
  // console.log(formik.isSubmitting);
  // console.log(constextType);

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
    </Form>
  );
};

export default connect(mapStateToProps, null)(MessageForm);
