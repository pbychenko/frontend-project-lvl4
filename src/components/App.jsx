import React from 'react';
import {
  // Spinner,
  // Alert,
  ListGroup,
  Container,
  Row,
  Col,
  // Button,
  Jumbotron,
} from 'react-bootstrap';
// import AddChannelModal from './modals/AddChannelModal.jsx';
// import EditChannelModal from './modals/EditChannelModal.jsx';
// import DeleteChannelModal from './modals/DeleteChannelModal.jsx';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import MessageForm from './MessageForm.jsx';

const App = () => (
  <>
    <Jumbotron>
      <h1 align="center">CHATIK</h1>
    </Jumbotron>
    <Container>
      <Row>
        <Col xs={12} md={4}>
          <ListGroup variant="flush">
            <Channels />
          </ListGroup>
        </Col>
        <Col xs={12} md={8}>
          <>
            <Messages />
            <MessageForm />
          </>
        </Col>
      </Row>
      {/* <AddChannelModal />
      <EditChannelModal />
      <DeleteChannelModal /> */}
      {/* {getModal()} */}
    </Container>
  </>
);
export default App;
