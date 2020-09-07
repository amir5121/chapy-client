import React from "react";
import "./Message.less";
import { Row } from "antd";
import { toPersian } from "../../utils/DateConvertor";

const Message = (props) => {
  const { text, created, is_mine, cost } = props;
  return (
    <Row className="chat-row" justify={is_mine ? "start" : "end"}>
      <div className="speech-bubble">
        <p className="chat-content">{text}</p>
        <p className="chat-date">
          <span>{toPersian(created)}</span>
          {cost && <span>&nbsp;${cost}</span>}
        </p>
      </div>
    </Row>
  );
};

export default Message;
