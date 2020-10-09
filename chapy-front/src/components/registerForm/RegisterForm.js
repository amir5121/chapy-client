import React, { useState } from "react";

import "./RegisterForm.less";

import { Button, Col, Form, Input, Row, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

const RegisterForm = (props) => {
  const { onFinish, errors, isLoading } = props;
  const [reTypeIsValid, setReTypeIsValid] = useState(null);
  const [form] = Form.useForm();

  function validateAndFinish(values) {
    const passwordIsValid = values.password === values.password_retype;
    setReTypeIsValid(passwordIsValid);
    passwordIsValid && onFinish(values);
  }
  errors && form.setFields({ errors });
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
        style={{ textAlign: "center" }}
        className="hidden-sm-down register-in-login"
      >
        <Title level={2}>Login</Title>
        <Title level={4}>Already have an account login instead</Title>

        <Button size="large">
          <Link to={"/login"}>Login</Link>
        </Button>
      </Col>

      <Col
        xs={24}
        sm={12}
        md={8}
        style={{ textAlign: "center", backgroundColor: "white" }}
      >
        <Title level={3}>Register</Title>

        <Form name="register" onFinish={validateAndFinish} form={form}>
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
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your First name!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="First name"
              autoComplete="first_name"
            />
          </Form.Item>

          <Form.Item
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your Last name!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Last name"
              autoComplete="last_name"
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
              autoComplete="new-password"
            />
          </Form.Item>
          <Form.Item
            validateStatus={reTypeIsValid ? "success" : "error"}
            hasFeedback={reTypeIsValid !== null}
            help={
              reTypeIsValid === null || reTypeIsValid
                ? null
                : "Password do not match"
            }
            name="password_retype"
            rules={[
              {
                required: true,
                message: "Please input your Password again!",
              },
            ]}
          >
            <Input.Password
              allowClear
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password_retype"
              placeholder="Password retype"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
              loading={isLoading}
            >
              Register
            </Button>
            <Space className="hidden-sm-up">
              Already have an account
              <Link className="register-form-forgot" to={"/login/"}>
                Login now!
              </Link>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default RegisterForm;
