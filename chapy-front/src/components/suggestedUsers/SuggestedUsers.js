import React from "react";
import "./SuggestedUsers.less";
import Fade from "react-reveal/Fade";
import ImageList from "../imageList/ImageList";

export default function SuggestedUsers(props) {
  const { users } = props;

  const list = users.map((el) => {
    return {
      link: `/chat/${el.email}`,
      title: el.full_name,
      image: el.avatar,
      description: "asd",
    };
  });

  return (
    <Fade bottom>
      <ImageList items={list} />
    </Fade>
  );
}
