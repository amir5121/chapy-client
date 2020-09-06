import React from "react";
import "./ChapyHeader.less";
import {
  Menu,
  Col,
  Input,
  Layout,
  Row,
  Typography,
  Dropdown,
  Button,
} from "antd";
import {
  HomeOutlined,
  RedEnvelopeOutlined,
  SettingFilled,
  SmileOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { isLoggedIn, logout } from "../../utils/Authenticate";

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;

export default function ChapyHeader(props) {
  const { isMobile } = props;
  const history = useHistory();
  const menu = (
    <Menu>
      <Menu.Item>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to="http://www.alipay.com/"
        >
          1st menu item
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to="http://www.taobao.com/"
        >
          2nd menu item
        </Link>
      </Menu.Item>
      <Menu.Item danger={isLoggedIn()}>
        <Button
          onClick={() => (isLoggedIn() ? logout("/") : history.push("/login"))}
        >
          {isLoggedIn() ? "LogOut!" : "RegisterForm! Or Register"}
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header>
      <Row align="middle" style={{ height: "100%" }}>
        <Col span={9}>
          <Title level={3}>Chapy</Title>
        </Col>
        {!isMobile && (
          <Col span={6}>
            <Search
              placeholder="input search text"
              onSearch={(value) => console.log(value)}
              style={{ width: "100%" }}
            />
          </Col>
        )}
        <Col span={isMobile ? 15 : 9} className="header-icons">
          <HomeOutlined />
          <RedEnvelopeOutlined />
          <SmileOutlined />
          <Dropdown overlay={menu}>
            <SettingFilled />
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
}
