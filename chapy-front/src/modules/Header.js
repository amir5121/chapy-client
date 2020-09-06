import React from "react";
import { isMobileSelector } from "../redux/reducer/ConfigSlice";
import ChapyHeader from "../components/header/ChapyHeader";
import { useSelector } from "react-redux";

export default function Header() {
  const isMobile = useSelector(isMobileSelector);

  return <ChapyHeader isMobile={isMobile} />;
}
