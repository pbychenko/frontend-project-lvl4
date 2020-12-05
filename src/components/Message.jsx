import React from 'react';
import { Card } from 'react-bootstrap';

const Message = (props) => {
  // const { userName, text, date } = props;
  const { userName, text } = props;

  return (
    <Card >
    <Card.Body>
      <Card.Title>{userName}</Card.Title>
      <Card.Text>
        {text}
      </Card.Text>
      {/* <Card.Text>
        {date}
      </Card.Text> */}
    </Card.Body>
  </Card>);
};

export default Message;
