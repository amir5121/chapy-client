import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "../modules/Chat";
import Home from "../modules/Home";
import PrivateRoute from "./PrivateRoute";
import Login from "../modules/Login";
import Conversations from "../modules/Conversations";
import { getMe } from "../redux/reducer/MeSlice";
import { useDispatch } from "react-redux";
import { ConfigProvider, Layout } from "antd";
import ChapyHeader from "../components/header/ChapyHeader";
import ChapyFooter from "../components/footer/ChapyFooter";
import Register from "../modules/Register";

const { Content } = Layout;

const Routes = () => {
  const dispatch = useDispatch();

  dispatch(getMe());

  return (
    <ConfigProvider direction="ltr">
      <Router>
        <Layout>
          <ChapyHeader />
          <Content style={{ padding: "0 2vw" }}>
            <Layout
              style={{ padding: "5vh 0" }}
            >
              <Content style={{ padding: "0 2vw", minHeight: "50vh" }}>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <PrivateRoute path="/chat/:username" component={Chat} />
                  <PrivateRoute path="/chat" component={Conversations} />
                  <PrivateRoute path="/profile" component={Home} />
                  <Route path="/" component={Home} />
                </Switch>
              </Content>
            </Layout>
          </Content>
          <ChapyFooter />
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default Routes;
