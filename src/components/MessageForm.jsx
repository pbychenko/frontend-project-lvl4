import React, { useContext } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import UserContext from '../initContext';
import routes from '../routes.js';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

const MessageForm = (props) => {
  const { currentChannelId } = props;
  const userName = useContext(UserContext);
  const validate = (values) => ((!values.text) ? { text: 'Введите сообщение' } : {});
  const formik = useFormik({
    initialValues: { text: '' },
    validate,
    onSubmit: async (values, { setSubmitting, resetForm, setFieldError }) => {
      const url = routes.channelMessagesPath(currentChannelId);
      const messageDate = new Date();
      const data = { data: { attributes: { ...values, userName, messageDate } } };
      try {
        await axios.post(url, { ...data });
        setSubmitting(false);
        resetForm();
      } catch (er) {
        setSubmitting(true);
        setFieldError('text', 'c сетью что-то не так');
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <Form.Row>
        <Col md={10} xs={12}>
          <Form.Control type="text" placeholder="Write your message here" name="text" { ...formik.getFieldProps('text')} />
          {((formik.touched.text && formik.errors.text)) ? (
            <span>{formik.errors.text}</span>
          ) : null}
        </Col>
        <Col md={2} xs={12}>
          <Button type="submit" disabled={formik.isSubmitting || !formik.dirty} block>Send</Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default connect(mapStateToProps, null)(MessageForm);
