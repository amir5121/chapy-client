import React from "react";
import "./ImageList.less";
import Card from "antd/es/card";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

const { Meta } = Card;
export default function ImageList(props) {
  const { items } = props;
  return (
    <Fade bottom>
      <Row>
        {items.map((el, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <a href={`${el.link}`}>
              <Card
                hoverable
                className="home-people-card"
                cover={<img alt={el.title} src={el.image} />}
              >
                {el.title && (
                  <Meta title={el.title} description={el.description} />
                )}
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </Fade>
  );
}
