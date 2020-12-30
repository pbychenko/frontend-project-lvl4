import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import Message from './Message.jsx';

const mapStateToProps = (state) => {
  const { messagges: { byId, allIds }, currentChannelId } = state;
  const messages = allIds.map((id) => byId[id]);
  const currentChannelMessages = messages.filter((m) => m.channelId === currentChannelId);
  return { messages: currentChannelMessages };
};

const Messages = (props) => {
  const { messages } = props;

  return (
    <ListGroup variant="flush">
      {messages.map((message) => (
        <ListGroup.Item key={_.uniqueId()} style={{ wordWrap: 'break-word', textAlign: 'right', borderStyle: 'none' }}>
          <Message userName={message.userName} text={message.text} date={message.messageDate} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default connect(mapStateToProps, null)(Messages);
