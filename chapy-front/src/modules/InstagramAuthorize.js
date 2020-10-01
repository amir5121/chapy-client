import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import { submitInstagram } from "../redux/reducer/MeSlice";
import Spin from "antd/es/spin";

export default function InstagramAuthorize() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      submitInstagram({
        code: window.location.search.replace("?code=", "").replace("#_", ""),
      })
    ).then((result) => {
      console.log("ClOse!!!", result);
      result.type === submitInstagram.fulfilled().type && window.close();
    });
  }, [dispatch]);

  return (
    <div style={{ textAlign: "center" }}>
      <Spin size="large" />
    </div>
  );
}
