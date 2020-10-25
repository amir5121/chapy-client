import React, { useState } from "react";

import "./RegisterForm.less";

import { Button, Col, Form, Input, Row, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";
import {useTranslation} from "react-i18next";

const RegisterForm = (props) => {
  const { onFinish, errors, isLoading } = props;
  const [reTypeIsValid, setReTypeIsValid] = useState(null);
  const [form] = Form.useForm();
  const { t } = useTranslation();

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
                message: t("emailRequired"),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t("email")}
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            name="first_name"
            rules={[
              {
                required: true,
                message: t("firstNameRequired"),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t("firstName")}
              autoComplete="first_name"
            />
          </Form.Item>

          <Form.Item
            name="last_name"
            rules={[
              {
                required: true,
                message: t("lastNameRequired"),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t("lastName")}
              autoComplete="last_name"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t("passwordRequired"),
              },
            ]}
          >
            <Input.Password
              allowClear
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t("password")}
              autoComplete="new-password"
            />
          </Form.Item>
          <Form.Item
            validateStatus={reTypeIsValid ? "success" : "error"}
            hasFeedback={reTypeIsValid !== null}
            help={
              reTypeIsValid === null || reTypeIsValid
                ? null
                : t("passwordDoNotMatch")
            }
            name="password_retype"
            rules={[
              {
                required: true,
                message: t("passwordAgainRequired"),
              },
            ]}
          >
            <Input.Password
              allowClear
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password_retype"
              placeholder={t("passwordAgain")}
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
