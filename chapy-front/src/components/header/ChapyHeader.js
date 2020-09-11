import React from "react";
import "./ChapyHeader.less";
import {
  Button,
  Col,
  Dropdown,
  Input,
  Layout,
  Menu,
  Row,
  Typography,
} from "antd";
import {
  HomeOutlined,
  RedEnvelopeOutlined,
  SettingFilled,
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
        <Link to="/profile/profile/">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/profile/transactions/">Transactions</Link>
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
        <Col xs={9} sm={9}>
          <Title level={3}>Chapy</Title>
        </Col>
        <Col sm={6} className={"hidden-sm"}>
          <Search
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={15} sm={9} className="header-icons">
          <HomeOutlined />
          <Link to={"/chat/"}>
            <RedEnvelopeOutlined />
          </Link>
          <Dropdown overlay={menu}>
            <SettingFilled />
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
}
