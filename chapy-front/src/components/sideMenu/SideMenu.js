import React, { useState } from "react";

import "./SideMenu.less";

import { Button, Menu } from "antd";

import {
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const SideMenu = (props) => {
  const { isMobile, menuSelect } = props;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setCollapsed(!collapsed)}
        style={{ marginBottom: 16 }}
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        defaultSelectedKeys={["profile"]}
        mode="inline"
        onSelect={(e) => menuSelect(e.key)}
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="profile" icon={<PieChartOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="transactions" icon={<DesktopOutlined />}>
          Transactions
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideMenu;
