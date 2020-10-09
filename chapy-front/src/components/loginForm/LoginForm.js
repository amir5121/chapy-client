import React from "react";

import "./LoginForm.less";

import { Button, Card, Checkbox, Col, Form, Input, Row, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

const LoginForm = (props) => {
  const { onFinish } = props;

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ height: "80vh" }}
      className="login-form-sides-container"
    >
      <Col
        xs={24}
        sm={12}
        md={8}
        style={{ textAlign: "center", backgroundColor: "white" }}
      >
        <Title level={3}>Login</Title>
        <Form
          name="normal_login"
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
              autoComplete="username"
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
            <Input.Password
              allowClear
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
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
            <Space className="hidden-sm-up">
              Or
              <Link className="login-form-forgot" to={"/register/"}>
                register now!
              </Link>
            </Space>
          </Form.Item>
        </Form>
      </Col>
      <Col
        xs={24}
        sm={12}
        md={8}
        style={{ textAlign: "center" }}
        className="hidden-sm-down register-in-login"
      >
        <Title level={3}>Register</Title>
        <Title level={5}>
          Or join us today for free and starting chatting up with most popular
          and talented people
        </Title>

        <Button size="large">
          <Link to={"/register"}>Register</Link>
        </Button>
      </Col>
    </Row>
  );
};

export default LoginForm;
