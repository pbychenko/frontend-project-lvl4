import React, { useContext } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import UserContext from '../initContext';
import routes from '../routes.js';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

const MessageForm = (props) => {
  const { t } = useTranslation();
  const { currentChannelId } = props;
  const userName = useContext(UserContext);
  const validate = (values) => ((!values.text) ? { text: t('sendMessageForm.textFieldError') } : {});
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
        setFieldError('text', t('networkError'));
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <Form.Row>
        <Col md={10} xs={12}>
          <Form.Control type="text" placeholder={t('sendMessageForm.placeholder')} name="text" { ...formik.getFieldProps('text')} />
          {((formik.touched.text && formik.errors.text)) ? (
            <span>{formik.errors.text}</span>
          ) : null}
        </Col>
        <Col md={2} xs={12}>
          <Button type="submit" disabled={formik.isSubmitting || !formik.dirty} block>{t('sendMessageForm.buttonName')}</Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default connect(mapStateToProps, null)(MessageForm);
