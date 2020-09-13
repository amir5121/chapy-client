import React, { useEffect } from "react";
import Banner from "../components/banner/Banner";
import { useDispatch, useSelector } from "react-redux";
import {
  getConfigs,
  initialConfig,
  isMobileSelector,
} from "../redux/reducer/ConfigSlice";
import HomeUsersList from "../components/homeUsersList/HomeUsersList";

export default function Home() {
  const isMobile = useSelector(isMobileSelector);
  const configs = useSelector(getConfigs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialConfig());
  }, [dispatch]);

  return (
    <>
      <Banner isMobile={isMobile} />
      {configs && (
        <HomeUsersList isMobile={isMobile} users={configs.top_users} />
      )}
    </>
  );
}
