import React from "react";
import "./HomeUsersList.less";
import Card from "antd/es/card";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { Link } from "react-router-dom";

const { Meta } = Card;
export default function HomeUsersList(props) {
  const { isMobile, users } = props;
  return (
    <div className="home-people">
      <Row>
        {users.map((el) => (
          <Col xs={24} sm={12} md={8} lg={6}>
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
    </div>
  );
}
