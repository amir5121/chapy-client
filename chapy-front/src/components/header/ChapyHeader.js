import React, { useState } from "react";
import "./ChapyHeader.less";
import { Col, Input, Layout, Row, Typography } from "antd";
import {
  PoweroffOutlined,
  RedEnvelopeOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authStateSelector, logoutUser } from "../../redux/reducer/AuthSlice";
import { FULFILLED } from "../../utils/Constatns";
import SideMenu from "../sideMenu/SideMenu";
import { logout } from "../../utils/Authenticate";
import { selectMe } from "../../redux/reducer/MeSlice";
import { useTranslation } from "react-i18next";

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;

export default function ChapyHeader() {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isLoggedIn = useSelector(authStateSelector) === FULFILLED;
  const me = useSelector(selectMe);
  const { t } = useTranslation();

  function handleLogout() {
    dispatch(logoutUser()).then((result) => {
      logout("/");
    });
  }
  return (
    <Header style={{ borderBottom: "1px solid #ECEFF1" }}>
      {isLoggedIn && (
        <SideMenu
          isOpen={drawerOpen}
          isLoggedIn={isLoggedIn}
          logout={handleLogout}
          me={me}
          close={() => setDrawerOpen(false)}
        />
      )}
      <Row align="middle" style={{ height: "100%" }}>
        <Col xs={20} sm={9}>
          {isLoggedIn && (
            <UnorderedListOutlined
              onClick={() => setDrawerOpen(!drawerOpen)}
              style={{ padding: "8px" }}
            />
          )}
          <Link to={"/"}>
            <Title
              level={3}
              style={{
                display: "inline-flex",
                marginLeft: "16px",
                marginRight: "16px",
              }}
            >
              {t("label")}
            </Title>
          </Link>
        </Col>
        <Col sm={6} className={"hidden-sm-down"}>
          <Search
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={4} sm={9} className="header-icons">
          {!isLoggedIn ? (
            <Link to={"/login/"}>
              <PoweroffOutlined />
            </Link>
          ) : (
            <Link to={"/chat/"}>
              <RedEnvelopeOutlined />
            </Link>
          )}
        </Col>
      </Row>
    </Header>
  );
}
