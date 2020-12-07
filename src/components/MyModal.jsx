import React from 'react';
import { Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  // console.log(state);
  const { modalState: { showModal } } = state;
  // console.log(showModal);
  return { showModal };
};

const validate = (values) => {
  const errors = {};
  if (!values.newChannelName) {
    errors.newChannelName = 'Required';
  } 

  return errors;
};

const AddChannelModal = (props) => {
  const { showModal } = props;
  // console.log(showModal);
  const formik = useFormik({
    initialValues: {
      newChannelName: '',
    },
    validate,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // console.log(values)
      // setTimeout(() => {
      //   alert(JSON.stringify(values, null, 2));
      //   setSubmitting(false);
      // }, 400);      
      // sendMessage(values, currentChannelId);
      console.log(values);
      setSubmitting(false);
      resetForm();
    },
  });

  // const handleSubmit = async (values, channelId) => {
  //   console.log(values);
  //   // const url = routes.channelMessagesPath(channelId);
  //   // // const messageDate = new Date();
  //   // const data = { data: { attributes: {...values, userName: 'Pavel2' } } };
  //   // const response = await axios.post(url, { ...data });
  //   // console.log(response.data);
  //   // dispatch(addChannelSuccess({ task: response.data }));
  // };

  return (
    // <Modal show={showModal} onHide={onHide} size="lg"
    <Modal show={showModal} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered animation='true'>
          <Modal.Header closeButton className="border-0 pb-0" >Добавить Канал!!!
          </Modal.Header>
          <Modal.Body className="p-0">
            <div className="card border-0">
              <div className="card-body pt-0">
                <div className="row">
                  <div className="container col-sm-8">
                    <form onSubmit={formik.handleSubmit}>
                      <div className="form-group">
                        <input type="text" className="form-control" name="newChannelName" {...formik.getFieldProps('newChannelName')}/>
                      </div>
                      <button type="submit" className="btn btn-primary btn-block" width="100%" disabled={formik.isSubmitting}>Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
    </Modal>);
};

export default connect(mapStateToProps, null)(AddChannelModal);
