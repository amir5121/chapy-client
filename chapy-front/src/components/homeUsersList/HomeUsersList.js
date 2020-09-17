import React from "react";
import "./HomeUsersList.less";
import Card from "antd/es/card";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

const { Meta } = Card;
export default function HomeUsersList(props) {
  const { isMobile, users } = props;
  return (
    <div className="home-people">
      <Fade bottom>
        <Row>
          {users.map((el, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Link to={`/chat/${el.email}`}>
                <Card
                  hoverable
                  className="home-people-card"
                  cover={<img alt={el.full_name} src={el.avatar} />}
                >
                  <Meta title={el.full_name} description="www.instagram.com" />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Fade>
    </div>
  );
}
