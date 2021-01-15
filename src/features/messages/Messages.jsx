import React from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import Message from './Message.jsx';
import { currentChannelMessagesSelector } from '../../selectors';

const Messages = () => {
  const currentState = useSelector((state) => state);
  const messages = currentChannelMessagesSelector(currentState);
  console.log(messages);
  return (
    <ListGroup variant="flush" id="messages">
      {messages.map((message) => (
        <ListGroup.Item key={_.uniqueId()}>
          <Message userName={message.userName} text={message.text} date={message.messageDate} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Messages;
