import React, {useEffect, useState} from "react";

import "./ProfileForm.less";

import { Button, Card, Col, Form, Input, Row, InputNumber } from "antd";

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required!",
  types: {
    // eslint-disable-next-line no-template-curly-in-string
    email: "${label} is not validate email!",
    // eslint-disable-next-line no-template-curly-in-string
    number: "${label} is not a validate number!",
  },
  number: {
    // eslint-disable-next-line no-template-curly-in-string
    range: "${label} must be between ${min} and ${max}",
  },
};

const ProfileForm = (props) => {
  const { onFinish, isMobile, me } = props;
  const [reTypeIsValid, setReTypeIsValid] = useState(null);
  const [form] = Form.useForm();

  function validateAndFinish(values) {
    console.log(values);
    const passwordIsValid = values.password === values.password_retype;
    setReTypeIsValid(passwordIsValid);
    passwordIsValid && onFinish(values);
  }

  console.log(me)

  useEffect(() => {
    form.setFieldsValue({
      ...me
    })
  }, [form, me])

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "80vh" }}
    >
      <Col span={isMobile ? 24 : 12}>
        <Card>
          Current balance: {me.balance}
          <Form
            {...layout}
            form={form}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            initialValues={{
              full_name: me.full_name
            }}
          >
            <Form.Item
              name={"first_name"}
              label="First Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"last_name"}
              label="Last Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"email"}
              label="Email"
              rules={[{ type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"auto_accept_blow"}
              label="Automatically accept messages below"
              rules={[{ type: "number", min: 0, max: 1000000 }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileForm;
