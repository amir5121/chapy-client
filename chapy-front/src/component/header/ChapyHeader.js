import React from "react";
import "./ChapyHeader.less";
import { Col, Input, Layout, Row, Typography } from "antd";
import {
  HomeOutlined,
  RedEnvelopeOutlined,
  SettingFilled,
  SmileOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;

export default function ChapyHeader() {
  return (
    <Header>
      <Row align="middle" style={{ height: "100%" }}>
        <Col span={9}>
          <Title level={3}>Chapy</Title>
        </Col>
        <Col span={6}>
          <Search
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col span={9} className="header-icons">
          <HomeOutlined />
          <RedEnvelopeOutlined />
          <SmileOutlined />
          <SettingFilled />
        </Col>
      </Row>
    </Header>
  );
}
