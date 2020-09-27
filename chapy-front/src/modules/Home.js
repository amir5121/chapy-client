import React, { useEffect } from "react";
import Banner from "../components/banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import { getConfigs, initialConfig } from "../redux/reducer/ConfigSlice";
import SuggestedUsers from "../components/suggestedUsers/SuggestedUsers";

export default function Home() {
  const configs = useSelector(getConfigs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialConfig());
  }, [dispatch]);

  return (
    <>
      <Banner />
      {configs && <SuggestedUsers users={configs.top_users} />}
    </>
  );
}
