import React, { useCallback, useEffect, useRef, useState } from "react";

import "./Messages.less";
import Message from "../message/Message";
import usePrevious from "../../utils/UsePrevious";

export default function Messages(props) {
  const { conversationMessages, acceptCharge, loadMore } = props;
  const [viewHeight, setViewHeight] = useState(0);
  const prevHeight = usePrevious(viewHeight);
  const chatScrollView = useRef(null);
  useEffect(() => {
    typeof prevHeight === "undefined"
      ? (chatScrollView.current.scrollTop = chatScrollView.current.scrollHeight)
      : (chatScrollView.current.scrollTop =
          chatScrollView.current.scrollHeight - prevHeight);
  });
  const messages =
    conversationMessages && conversationMessages.messages
      ? conversationMessages.messages
      : [];
  //
  // const scrollRefCallback = useCallback(
  //   (chatBottomRef) => {
  //     if (chatBottomRef) {
  //       console.log(
  //         "!@#!@#!@#!23!@#!@#!@#!@#!@#!@#!@#",
  //         chatBottomRef,
  //         prevHeight
  //       );
  //       conversationMessages &&
  //         chatBottomRef.scrollIntoView({
  //           behavior: "smooth",
  //           block: "nearest",
  //           inline: "start",
  //         });
  //       chatBottomRef.current && (chatBottomRef.current.scrollTop = prevHeight);
  //     }
  //   },
  //   [conversationMessages, prevHeight]
  // );
  console.log(
    `%c ${messages.length}`,
    "font-weight: bold; background-color: cyan"
  );
  function scrolled(element) {
    const { scrollHeight, scrollTop, clientHeight } = element.target;

    if (scrollTop < 200) {
      console.log(
        "%c @#!@#!@#!@#!@#!@#!@#!@#!",
        "color: pink; font-weight: bold; background-color: black"
      );
      setViewHeight(scrollHeight);
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
      </div>
    </div>
  );
}
