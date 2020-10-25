import React from "react";
import { InstagramFilled, RiseOutlined } from "@ant-design/icons";

import "./UserPage.less";
import { Button, Col, Image } from "antd";
import Title from "antd/es/typography/Title";
import ImageList from "../imageList/ImageList";
import Text from "antd/es/typography/Text";
import Row from "antd/es/grid/row";
import Tooltip from "antd/es/tooltip";

export default function UserPage(props) {
  const { startConversation, userProfile } = props;
  const list = userProfile?.instagram?.medias?.map((el) => {
    return {
      link: el.permalink,
      image: el.media_url,
    };
  });
  return (
    <>
      <div className="start-conversation-center">
        <div>
          <Image width={350} src={userProfile?.avatar} />
        </div>
        <div>
          <Title style={{ marginTop: "1rem", padding: "8px" }}>
            {userProfile?.full_name}
          </Title>
          <p>
            <RiseOutlined /> Lawyer
          </p>
          {userProfile?.can_charge && (
            <a
              href={`https://instagram.com/${userProfile?.instagram.username}`}
            >
              <p>
                <InstagramFilled /> {userProfile?.instagram.username}
              </p>
            </a>
          )}

          {userProfile?.can_charge && (
            <>
              <Row>
                <Col xs={12}>
                  <Tooltip title="Cost per Character">
                    Conversations{" "}
                    <Text strong style={{ fontSize: "1.5em" }}>
                      {userProfile?.conversation_count}
                    </Text>
                  </Tooltip>
                </Col>
                <Col xs={12}>
                  <Tooltip title="Cost per Character">
                    CPC{" "}
                    <Text strong style={{ fontSize: "1.5em" }}>
                      {userProfile?.cost_per_character}
                    </Text>
                  </Tooltip>
                </Col>
              </Row>
              <Button
                size="large"
                type="primary"
                className="start-conversation-start-button"
                onClick={startConversation}
              >
                Start!
              </Button>
            </>
          )}
        </div>
      </div>
      {userProfile?.can_charge && list && <ImageList items={list} />}
    </>
  );
}
