import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "../module/chat/Chat";
import Home from "../module/home/Home";
import PrivateRoute from "./PrivateRoute";
import NormalLoginForm from "../module/login/Login";
import Conversations from "../module/conversations/Conversations";
import { getMe } from "../redux/reducer/AuthSlice";
import { useDispatch } from "react-redux";
import { ConfigProvider, Layout, Menu } from "antd";
import ChapyHeader from "../component/header/ChapyHeader";
import ChapyFooter from "../component/footer/ChapyFooter";

const { Content, Sider } = Layout;

const Routes = () => {
  const dispatch = useDispatch();
  dispatch(getMe());

  return (
    <ConfigProvider direction="rtl">
      <Layout>
        <ChapyHeader />
        <Content style={{ padding: "0 50px" }}>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Router>
                <Switch>
                  <Route path="/login" component={NormalLoginForm} />
                  <PrivateRoute path="/chat/:username" component={Chat} />
                  <PrivateRoute path="/chat" component={Conversations} />
                  <PrivateRoute path="/profile" component={Home} />
                  <Route path="/" component={Home} />
                </Switch>
              </Router>
            </Content>
          </Layout>
        </Content>
        <ChapyFooter />
      </Layout>
    </ConfigProvider>
  );
};

export default Routes;
