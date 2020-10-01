import React from "react";
import ChapyHeader from "../components/header/ChapyHeader";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const visible = !(
    location.pathname.match(/\/chat\/.+/g) ||
    location.pathname.includes("authorize-instagram")
  );
  return visible && <ChapyHeader />;
}
