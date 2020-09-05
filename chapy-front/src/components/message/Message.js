import React from "react";
import "./Message.less";
import { Row } from "antd";

const Message = (props) => {
  const { text, created, mine } = props;
  return (
    <Row className='chat-row' justify={mine ? "start" : "end"}>
      <div className='speech-bubble'>
        <p className='chat-content'>{text}</p>
        <p className='chat-date'>{created}</p>
      </div>
    </Row>
  );
};

export default Message;
