import React, { useEffect } from "react";

import "./ProfileForm.less";

import { Button, Card, Col, Form, Input, InputNumber, Row } from "antd";
import Image from "antd/lib/image";
import Text from "antd/lib/typography/Text";
import Space from "antd/es/space";

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
        <Card>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: "1rem",
            }}
          >
            <Image
              width="100%"
              style={{ padding: "0 1rem 1rem 1rem" }}
              src={me.avatar}
            />
            <Space>
              <Text>{me.email}</Text>
              <Text strong>Balance: {me.balance}</Text>
            </Space>
          </div>

          <Form
            {...layout}
            form={form}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
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
