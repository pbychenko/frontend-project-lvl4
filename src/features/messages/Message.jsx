import React from 'react';
import { Card } from 'react-bootstrap';

const Message = (props) => {
  const { userName, text, date } = props;

  return (
    <Card>
      <Card.Body>
        <Card.Text>
          {userName}
        </Card.Text>
        <Card.Title>{text}</Card.Title>
        <Card.Text>
          {date}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Message;
