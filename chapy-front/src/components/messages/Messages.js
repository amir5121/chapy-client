import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import "./Messages.less";
import Message from "../message/Message";
import usePrevious from "../../utils/UsePrevious";
import { addDateToMessages } from "../../utils/DateConvertor";

const Messages = forwardRef((props, ref) => {
  const { conversationMessages, acceptCharge, loadMore, loading } = props;
  const [viewHeight, setViewHeight] = useState(0);
  const prevHeight = usePrevious(viewHeight);
  const chatScrollView = useRef(null);
  const bottomRef = useRef(null);

  useImperativeHandle(ref, () => ({
    scrollToBottom() {
      bottomRef &&
        bottomRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
    },
  }));

  useEffect(() => {
    typeof prevHeight === "undefined"
      ? (chatScrollView.current.scrollTop = chatScrollView.current.scrollHeight)
      : (chatScrollView.current.scrollTop =
          chatScrollView.current.scrollHeight - prevHeight);

    setViewHeight(chatScrollView.current.scrollHeight);
  }, [prevHeight]);

  const messages = addDateToMessages(conversationMessages?.messages) || [];
  function scrolled(element) {
    // const { scrollHeight, scrollTop, clientHeight } = element.target;
    if (element.target.scrollTop < 1000) {
      // console.log(
      //   `%c @#!@#!@#!@#!@#!@#!@#!@#!, ${scrollHeight}  ${scrollTop} ${clientHeight}`,
      //   "color: pink; font-weight: bold; background-color: black"
      // );
      loadMore();
    }
    // console.log("ASDASDASDASD", {
    //   scrollHeight,
    //   scrollTop,
    //   clientHeight,
    //   prevHeight,
    // });
  }

  return (
    <div className="chat-container">
      <div className="chat-messages" onScroll={scrolled} ref={chatScrollView}>
        {messages.map((it) => (
          <Message
            key={it.id}
            {...it}
            acceptCharge={() => acceptCharge(it.id)}
          />
        ))}
        <span ref={bottomRef} />
      </div>
    </div>
  );
});

export default Messages;
