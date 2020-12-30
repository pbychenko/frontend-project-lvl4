import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/index.js';
import UserContext from '../initContext';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

const MessageForm = (props) => {
  const { currentChannelId } = props;
  const userName = useContext(UserContext);
  const validate = (values) => ((!values.text) ? { text: 'Введите сообщение' } : {});
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
    <Form onSubmit={formik.handleSubmit} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <Form.Row>
        <Col md={10} xs={12}>
          <Form.Control type="text" placeholder="Write your message here" name="text" { ...formik.getFieldProps('text')} />
          {formik.touched.text && formik.errors.text ? (
            <div>{formik.errors.text}</div>
          ) : null}
        </Col>
        <Col md={2} xs={12}>
          <Button type="submit" disabled={formik.isSubmitting} block>Send</Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default connect(mapStateToProps, null)(MessageForm);
