import React, { useRef } from "react";

import "./SideMenu.less";

import { Avatar, Menu } from "antd";

import {
  DesktopOutlined,
  PieChartOutlined,
  RedEnvelopeOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import Button from "antd/es/button";
import { useHistory } from "react-router-dom";
import Text from "antd/lib/typography/Text";
import OutsideClickListener from "../../utils/OutsideClickListener";
import Title from "antd/es/typography/Title";

const SideMenu = (props) => {
  const { isOpen, isLoggedIn, logout, close, me } = props;
  const menuRef = useRef(null);
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
        <Avatar
          size={120}
          src={me.avatar}
          style={{ display: "block", margin: "0 auto", paddingTop: "8px 0" }}
        />
        <Title level={3}>{me.full_name}</Title>
        <Text strong>Balance: {me.balance}</Text>
        <Menu
          style={{ width: "100%", height: "150%" }}
          // onClick={this.handleClick}
          // onSelect={(e) => menuSelect(e.key)}

          // defaultSelectedKeys={[selectedItem]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <DesktopOutlined />
                <span>User</span>
              </span>
            }
          >
            <Menu.ItemGroup key="g1">
              <Menu.Item
                key="profile"
                icon={<DesktopOutlined />}
                onClick={() => switchTab("/profile")}
              >
                Profile
              </Menu.Item>
              <Menu.Item
                key="transactions"
                icon={<PieChartOutlined />}
                onClick={() => switchTab("/transactions")}
              >
                Transactions
              </Menu.Item>
              <Menu.Item
                key="conversations"
                icon={<RedEnvelopeOutlined />}
                onClick={() => switchTab("/chat")}
              >
                Conversations
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>

          {!me.can_charge ? (
            <Menu.Item
              key="switchToInfluencer"
              icon={<UserSwitchOutlined style={{ color: "#FFD600" }} />}
              onClick={() => switchTab("/to-influencer")}
            >
              Switch to influencer
            </Menu.Item>
          ) : (
            <Menu.Item
              key="chargeConfig"
              icon={<UserSwitchOutlined />}
              onClick={() => switchTab("/charge-config")}
            >
              Charge configuration
            </Menu.Item>
          )}
          <SubMenu key="sub2" icon={<DesktopOutlined />} title="Navigation Two">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <DesktopOutlined />
                <span>Navigation Three</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
          {isLoggedIn && (
            <Menu.Item danger>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={() => logout()}
              >
                LogOut!
              </Button>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default SideMenu;
