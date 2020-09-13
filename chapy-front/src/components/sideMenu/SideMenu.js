import React from "react";

import "./SideMenu.less";

import { Menu } from "antd";

import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";

const SideMenu = (props) => {
  const { isMobile, menuSelect } = props;
  // const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Menu
        defaultSelectedKeys={["profile"]}
        mode="inline"
        onSelect={(e) => menuSelect(e.key)}
        // inlineCollapsed={collapsed}
      >
        <Menu.Item key="profile" icon={<DesktopOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="transactions" icon={<PieChartOutlined />}>
          Transactions
        </Menu.Item>
      </Menu>

      {/*<Button onClick={() => setCollapsed(!collapsed)}>*/}
      {/*  {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}*/}
      {/*</Button>*/}
    </div>
  );
};

export default SideMenu;
