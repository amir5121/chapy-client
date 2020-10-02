import React from "react";

import "./SideMenu.less";

import { Menu } from "antd";

import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";

const SideMenu = (props) => {
  const { menuSelect, selectedItem } = props;
  // const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Menu
        defaultSelectedKeys={[selectedItem]}
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
    </>
  );
};

export default SideMenu;
