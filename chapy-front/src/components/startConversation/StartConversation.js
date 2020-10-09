import React from "react";
import {
  CheckOutlined,
  InstagramFilled,
  RiseOutlined,
} from "@ant-design/icons";

import "./StartConversation.less";
import { Button, Image } from "antd";
import Title from "antd/es/typography/Title";
import ImageList from "../imageList/ImageList";
import Text from "antd/es/typography/Text";

export default function StartConversation(props) {
  const { startConversation, userProfile } = props;
  const list = userProfile?.instagram?.medias?.map((el) => {
    return {
      link: el.permalink,
      image: el.media_url,
    };
  });
  return (
    <>
      {userProfile && (
        <div className="start-conversation-center">
          <Image
            className="start-conversation-avatar"
            src={userProfile.avatar}
          />
          <div style={{ flexGrow: 2 }}>
            <Title style={{ marginTop: "1rem", padding: "8px" }}>
              {userProfile.full_name}
            </Title>
            <p>
              <RiseOutlined /> Lawyer
            </p>

            <a href={`https://instagram.com/${userProfile.instagram.username}`}>
              <p>
                <InstagramFilled /> {userProfile.instagram.username}
              </p>
            </a>
            <p>
              <Text strong style={{ fontSize: "1.5em" }}>
                {userProfile.conversation_count}
              </Text>{" "}
              Conversations so far
            </p>

            <Button size="large" type="primary" onClick={startConversation}>
              Chapy
            </Button>
          </div>
        </div>
      )}
      {list && <ImageList items={list} />}
    </>
  );
}
