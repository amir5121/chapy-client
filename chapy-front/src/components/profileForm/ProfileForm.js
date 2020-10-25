import React, { useEffect } from "react";

import "./ProfileForm.less";

import { Button, Form, Input, InputNumber } from "antd";
import Image from "antd/lib/image";
import Text from "antd/lib/typography/Text";
import { InstagramFilled, SyncOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import ImageList from "../imageList/ImageList";
import Divider from "antd/es/divider";
import { useTranslation } from "react-i18next";

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
  const { onFinish, me, requestSyncInstagram } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    form.setFieldsValue({
      ...me,
    });
  }, [form, me]);

  const list =
    Boolean(me.instagram) &&
    me.instagram.medias.map((el) => {
      return {
        link: el.permalink,
        image: el.media_url,
      };
    });
  return (
    <>
      <div className="profile-form-user-info">
        <Title
          level={1}
          style={{ paddingBottom: "2rem", width: "100%", textAlign: "center" }}
        >
          {me.full_name}
        </Title>
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
          <Text>{me.email}</Text>
          <Text strong>
            {t("balance")}: {me.balance}
          </Text>
        </div>
        <Form
          form={form}
          style={{ margin: "auto" }}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="first_name"
            label={t("firstName")}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label={t("lastName")}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          {me.can_charge ? (
            <Form.Item
              name="cost_per_character"
              label={t("costPerCharacter")}
              rules={[{ type: "number", min: 0, max: 100 }]}
            >
              <InputNumber />
            </Form.Item>
          ) : (
            <Form.Item
              name="auto_accept_blow"
              label={t("acceptBelow")}
              rules={[{ type: "number", min: 0, max: 1000000 }]}
            >
              <InputNumber />
            </Form.Item>
          )}
          <Form.Item>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              {t("submit")}
            </Button>
          </Form.Item>
        </Form>
        {me.instagram ? (
          <>
            <Divider>
              {me.instagram.username}
              <SyncOutlined
                style={{ padding: "0 0.5em" }}
                onClick={() => requestSyncInstagram()}
              />
            </Divider>
            {/*<div*/}
            {/*  style={{*/}
            {/*    width: "100%",*/}
            {/*    display: "flex",*/}
            {/*    justifyContent: "space-evenly",*/}
            {/*    flexWrap: "wrap",*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <Button*/}
            {/*    onClick={() => requestSyncInstagram()}*/}
            {/*    icon={<SyncOutlined style={{ fontSize: "1em" }} />}*/}
            {/*  />*/}
            {/*  /!*<Text> Media count: {me.instagram.media_count}</Text>*!/*/}
            {/*  /!*<Text> Follower count: {me.instagram.media_count}</Text>*!/*/}
            {/*  /!*<Text> Following count: {me.instagram.media_count}</Text>*!/*/}
            {/*</div>*/}
          </>
        ) : (
          <Button
            style={{ width: "100%" }}
            icon={<InstagramFilled />}
            onClick={() => requestSyncInstagram()}
          >
            {t('instagramSync')}
          </Button>
        )}
      </div>
      {list && <ImageList items={list} />}
    </>
  );
};

export default ProfileForm;
