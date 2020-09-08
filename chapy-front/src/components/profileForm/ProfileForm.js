import React, { useEffect, useState } from "react";

import "./ProfileForm.less";

import { Button, Card, Col, Form, Input, Row, InputNumber } from "antd";

const { Meta } = Card;

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
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
  const [form] = Form.useForm();

  console.log(me);

  useEffect(() => {
    form.setFieldsValue({
      ...me,
    });
  }, [form, me]);

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "80vh" }}
    >
      <Col justify="center" span={isMobile ? 24 : 12}>
        <Card cover={<img alt="example" src={me.avatar} />} title={me.email}>
          <Form
            {...layout}
            form={form}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Meta title={`Balance: ${me.balance}`} />
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
              name={"auto_accept_blow"}
              label="Accept messages below"
              rules={[{ type: "number", min: 0, max: 1000000 }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
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
