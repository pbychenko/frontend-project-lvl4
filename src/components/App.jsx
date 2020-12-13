import React from 'react';
import {
  Spinner,
  Alert,
  ListGroup,
  Container,
  Row,
  Col,
  Button,
  Jumbotron,
} from 'react-bootstrap';
import AddChannelModal from './modals/AddChannelModal.jsx';
import EditChannelModal from './modals/EditChannelModal.jsx';
import DeleteChannelModal from './modals/DeleteChannelModal.jsx';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import MessageForm from './MessageForm.jsx';
// import EditChannelElements from './EditChannelElements.jsx';

const App = () => (
  <>
    <Jumbotron>
      <h1 align="center">CHATIK</h1>
    </Jumbotron>
    <Container>
      <Row>
        <Col xs={10} md={4}>
          <ListGroup variant="flush">
            <Channels />
            {/* <ListGroup.Item>
              <Button variant="outline-info" type="submit" block 
              // onClick={this.handleShowModal}
              >Add channel</Button>
              </ListGroup.Item> */}
            <AddChannelModal />
            <EditChannelModal />
            <DeleteChannelModal />
          </ListGroup>
        </Col>
        {/* <Col xs={2} md={1}>
          <EditChannelElements />
        </Col> */}
        <Col xs={12} md={7}>
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
