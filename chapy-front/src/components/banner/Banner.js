import React from "react";
import "./Banner.less";
import Fade from "react-reveal/Fade";

export default function Banner(props) {
  const { isMobile } = props;

  return (
    <div className="main-banner">
      <Fade bottom>
        <h1 className="home-page-title">Chapy</h1>
        <p className="home-page-description">Chat with anyone you want!</p>
      </Fade>
    </div>
  );
}
