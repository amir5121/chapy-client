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
  PoweroffOutlined,
  RedEnvelopeOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../utils/Authenticate";
import { useDispatch, useSelector } from "react-redux";
import { authStateSelector, logoutUser } from "../../redux/reducer/AuthSlice";
import { FULFILLED } from "../../utils/Constatns";

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;

export default function ChapyHeader() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector(authStateSelector) === FULFILLED;

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile/profile/">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/profile/transactions/">Transactions</Link>
      </Menu.Item>
      <Menu.Item danger={isLoggedIn}>
        <Button
          onClick={() =>
            isLoggedIn
              ? dispatch(logoutUser()).then((result) => {
                  logout("/");
                })
              : history.push("/login")
          }
        >
          {isLoggedIn ? "LogOut!" : "RegisterForm! Or Register"}
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header>
      <Row align="middle" style={{ height: "100%" }}>
        <Col xs={9} sm={9}>
          <Link to={"/"}>
            <Title level={3}>Chapy</Title>
          </Link>
        </Col>
        <Col sm={6} className={"hidden-sm"}>
          <Search
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={15} sm={9} className="header-icons">
          <Link to={"/"}>
            <HomeOutlined />
          </Link>
          <Link to={"/chat/"}>
            <RedEnvelopeOutlined />
          </Link>
          {isLoggedIn ? (
            <Dropdown overlay={menu}>
              <SettingFilled />
            </Dropdown>
          ) : (
            <Link to={"/login/"}>
              <PoweroffOutlined />
            </Link>
          )}
        </Col>
      </Row>
    </Header>
  );
}
