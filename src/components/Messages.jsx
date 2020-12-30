import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import Message from './Message.jsx';
// import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { messagges: { byId, allIds }, currentChannelId } = state;
  // console.log(byId);
  // console.log(allIds);

  const messages = allIds.map((id) => byId[id]);
  const currentChannelMessages = messages.filter((m) => m.channelId === currentChannelId);
  return { messages: currentChannelMessages };
};

// const actionCreators = {
//   removeTask: actions.removeTask,
// };

const Messages = (props) => {
  const { messages } = props;
  // console.log(messages);
  // console.log(messages)

  return (
    <ListGroup variant="flush">
      {messages.map((message) => (
        <ListGroup.Item key={_.uniqueId()} style={{ wordWrap: 'break-word', textAlign: 'right', borderStyle: 'none' }}>
          <Message userName={message.userName} text={message.text} date={message.date} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default connect(mapStateToProps, null)(Messages);
