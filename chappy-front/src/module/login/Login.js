import React from "react";

import "./Login.css";

import { Form, Input, Button, Checkbox, Row, Col, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/reducer/AuthSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { isLoggedIn } from "../../utils/Authenticate";

const NormalLoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values) => {
    dispatch(loginUser(values))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        console.log("originalPromiseResult", originalPromiseResult);
        isLoggedIn() && history.push("/chats");
      })
      .catch((serializedError) => {
        console.log("serializedError", serializedError);
      });
  };

  isLoggedIn() && history.push("/conversations");

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Col span={8}>
        <Card>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link className="login-form-forgot" to={"forgot-pass"}>
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or
              <Link className="login-form-forgot" to={"forgot-pass"}>
                register now!
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default NormalLoginForm;
