import React from 'react';
import {
  ListGroup,
  Container,
  Row,
  Col,
  Jumbotron,
} from 'react-bootstrap';
import Channels from '../features/channels/Channels.jsx';
import Messages from '../features/messages/Messages.jsx';
import MessageForm from '../features/messages/MessageForm.jsx';

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
    </Container>
  </>
);
export default App;
