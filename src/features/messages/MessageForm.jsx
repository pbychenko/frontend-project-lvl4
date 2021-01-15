/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import UserContext from '../../initContext';
import { sendMessage } from './messagesSlice';

const MessageForm = () => {
  const { currentChannelId } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userName = useContext(UserContext);
  const validate = (values) => ((!values.text) ? { text: t('sendMessageForm.textFieldError') } : {});
  const formik = useFormik({
    initialValues: { text: '' },
    validate,
    onSubmit: async (values, { setSubmitting, resetForm, setFieldError }) => {
      const messageDate = new Date();
      const data = { data: { attributes: { ...values, userName, messageDate } } };
      const result = await dispatch(sendMessage({ data, currentChannelId }));
      if (!result.error) {
        setSubmitting(false);
        resetForm();
      } else {
        setSubmitting(true);
        setFieldError('text', t('networkError'));
      }
    },
  });
  const textBorderColorStyle = formik.errors.text ? { borderColor: 'red' } : null;

  return (
    <Form onSubmit={formik.handleSubmit} id="message-form">
      <Form.Row>
        <Col md={10} xs={12}>
          <Form.Control
            type="text"
            placeholder={t('sendMessageForm.placeholder')}
            name="text"
            {...formik.getFieldProps('text')}
            style={textBorderColorStyle}
          />
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

export default MessageForm;
