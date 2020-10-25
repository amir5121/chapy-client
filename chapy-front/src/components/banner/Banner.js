import React from "react";
import "./Banner.less";
import Fade from "react-reveal/Fade";
import { useTranslation } from "react-i18next";

export default function Banner() {
  const { t } = useTranslation();

  return (
    <div className="main-banner">
      <Fade bottom>
        <h1 className="home-page-title"> {t("label")}</h1>
        <p className="home-page-description"> {t("description")}</p>
      </Fade>
    </div>
  );
}
