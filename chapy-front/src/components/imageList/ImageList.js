import React from "react";
import "./ImageList.less";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Title from "antd/es/typography/Title";

export default function ImageList(props, backgroundColor = "white") {
  const { items } = props;
  return (
    <Row style={{ backgroundColor: "white"}}>
      {items.map((el, index) => (
        <Col xs={24} sm={12} md={8} lg={6} key={index}>
          <a href={`${el.link}`}>
            <div
              className="home-people-card"
              style={{ backgroundImage: `url('${el.image}')` }}
            />
            {el.title && (
              <div style={{ padding: "1vh" }}>
                <Title level={5}>{el.title}</Title>
                <p>{el.description}</p>
              </div>
            )}
          </a>
        </Col>
      ))}
    </Row>
  );
}
