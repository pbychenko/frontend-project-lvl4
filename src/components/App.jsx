import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import io from 'socket.io-client';
import _ from 'lodash';
// import axios from 'axios';
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
import MyModal from './MyModal.jsx';
import Channels from './Channels.jsx';
// import DeleteChannels from './DeleteChannels.jsx';
import Messages from './Messages.jsx';
import MessageForm from './MessageForm.jsx';

const App = ({ data }) => (
  <>
    <Jumbotron>
        <h1 align='center'>CHATIK</h1>
    </Jumbotron>
    {/* {data.channels[1].name} */}
    <Container>
        <Row>
          <Col xs={10} md={4}>
            <ListGroup variant="flush">
              <Channels channels={data.channels}
                // selectedChannel={selectedChannel}
                // selectChannel={this.handleSelectChannel}
              />
              <ListGroup.Item>
                <Button variant="outline-info" type="submit" block 
                // onClick={this.handleShowModal}
                >Add channel</Button>
                </ListGroup.Item>
              {/* <MyModal show={showModal} onFormChange={this.handleChange}
                onFormSubmit={this.handleAddChannel} newChannelName={newChannelName}
                onHide={this.handleCloseModal}
              /> */}
            </ListGroup>
          </Col>
          <Col xs={12} md={7}>
            {/* {(selectedChannel !== '')
              ? ( */}
              <>
                <Messages 
                visibleMessages={data.messages }
                  />
                <MessageForm 
                // message={message}
                // submitMessage={this.handleSubmit} writeMessage={this.handleChange}
                  />
              </>
              {/* ) : null
            } */}
          </Col>
        </Row>
      </Container>
  </>
);
export default App;
