import React, { useRef } from "react";

import "./SideMenu.less";

import { Menu } from "antd";

import {
  DesktopOutlined,
  PieChartOutlined,
  RedEnvelopeOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import Button from "antd/es/button";
import { useHistory } from "react-router-dom";
import Text from "antd/lib/typography/Text";
import OutsideClickListener from "../../utils/OutsideClickListener";
import Title from "antd/es/typography/Title";
import { useTranslation } from "react-i18next";

const SideMenu = (props) => {
  const { isOpen, isLoggedIn, logout, close, me } = props;
  const menuRef = useRef(null);
  const { t } = useTranslation();
  const location = useHistory();
  function switchTab(newLocation) {
    location.push(newLocation);
    close();
  }

  OutsideClickListener(menuRef, close);

  return (
    <div
      className="chapy-hamburger-root"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="chapy-hamburger" ref={menuRef}>
        <img alt="profile" src={me.avatar} style={{ maxWidth: "256px" }} />
        <div style={{ padding: "1em", textAlign: "center" }}>
          <Title level={3}>{me.full_name}</Title>
          <Text strong>
            {t("balance")}: {me.balance}
          </Text>
        </div>
        <Menu
          style={{ width: "100%", height: "150%" }}
          mode="inline"
        >
          <Menu.Item
            key="profile"
            icon={<DesktopOutlined />}
            onClick={() => switchTab("/profile")}
          >
            {t("profile")}
          </Menu.Item>
          <Menu.Item
            key="transactions"
            icon={<PieChartOutlined />}
            onClick={() => switchTab("/transactions")}
          >
            {t("transactions")}
          </Menu.Item>
          <Menu.Item
            key="conversations"
            icon={<RedEnvelopeOutlined />}
            onClick={() => switchTab("/chat")}
          >
            {t("conversations")}
          </Menu.Item>
          {!me.can_charge && (
            <Menu.Item
              key="switchToInfluencer"
              icon={<UserSwitchOutlined style={{ color: "#FFD600" }} />}
              onClick={() => switchTab("/to-influencer")}
            >
              {t("switchToInfluencer")}
            </Menu.Item>
          )}
          {isLoggedIn && (
            <Menu.Item danger>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={() => logout()}
              >
                {t("logout")}
              </Button>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default SideMenu;
