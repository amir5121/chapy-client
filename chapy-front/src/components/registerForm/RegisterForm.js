import React from "react";

import "./RegisterForm.less";

import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const RegisterForm = (props) => {
  const { onFinish } = props;

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "80vh" }}
    >
      <Col span={8}>
        <Card>
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
            <Form.Item
              name="password_retype"
              rules={[
                {
                  required: true,
                  message: "Please input your Password again!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password_retype"
                placeholder="Password retype"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
              >
                Register
              </Button>
              <Space>
                Already have an account
                <Link className="register-form-forgot" to={"login"}>
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
