import React, { useState } from "react";

import "./RegisterForm.less";

import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const RegisterForm = (props) => {
  const { onFinish, isMobile, errors, isLoading} = props;
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
      style={{ minHeight: "80vh" }}
    >
      <Col span={isMobile ? 24 : 8}>
        <Card>
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
                  : "Should be combination of numbers & alphabets"
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
              <Space>
                Already have an account
                <Link className="register-form-forgot" to={"/login/"}>
                  Login now!
                </Link>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterForm;
