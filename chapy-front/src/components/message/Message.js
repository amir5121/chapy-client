import React from "react";
import "./Message.less";
import { Image, Row } from "antd";
import { toPersian } from "../../utils/DateConvertor";
import { CheckCircleFilled, CheckOutlined } from "@ant-design/icons";
import { httpBaseUrl } from "../../Setting";
import VisibilitySensor from "react-visibility-sensor";

const Message = (props) => {
  const {
    text,
    created,
    is_mine,
    is_date,
    cost,
    need_payment,
    acceptCharge,
    file,
    markAsRead,
    is_read,
  } = props;
  return (
    <Row
      className="chat-row"
      justify={is_mine ? "start" : is_date ? "center" : "end"}
    >
      <div
        className={is_mine ? "speech-bubble-mine" : "speech-bubble-not-mine"}
      >
        {need_payment ? (
          <div>
            <p>{`accept the ${cost} charge?`}</p>
            <CheckCircleFilled
              style={{
                fontSize: "2em",
                color: "limegreen",
                width: "100%",
                marginBottom: "0.5em",
              }}
              twoToneColor="#52c41a"
              onClick={() => acceptCharge()}
            />
          </div>
        ) : (
          <VisibilitySensor
            onChange={(isVisible) =>
              !is_read && !is_date && isVisible && !is_mine && markAsRead()
            }
          >
            <>
              {file && <Image src={httpBaseUrl + file} />}
              <p className="chat-content">{text}</p>
            </>
          </VisibilitySensor>
        )}
        {!is_date && (
          <>
            <p className="chat-date">
              <span>{toPersian(created, "TIME")}</span>
              {!need_payment && cost && <span>&nbsp;${cost}</span>}
              {is_read && is_mine && <CheckOutlined />}
            </p>
          </>
        )}
      </div>
    </Row>
  );
};

export default Message;
