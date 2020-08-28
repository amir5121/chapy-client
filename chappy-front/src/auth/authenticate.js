import cookie from "react-cookies";
// import api from "../data/api";

export const getAuthToken = () => {
  return cookie.load("auth-token", { path: "/" });
};

export const isLogin = () => {
  const auth_token = getAuthToken();
  return Boolean(auth_token);
};

export const logout = (location) => {
  cookie.remove("auth-token", { path: "/" });
  cookie.remove("csrftoken");
  cookie.remove("sessionid");
  // api.logout().then(() => {
  //   window.location = location ? location : "/";
  // });
};

export const saveAuthToken = (data) => {
  cookie.save("auth-token", data.token, { path: "/" });
  cookie.save("csrftoken", data.csrftoken, { path: "/" });
  cookie.save("sessionid", data.sessionid, { path: "/" });
  // token.includes("rubika") &&
  //   cookie.save("last_rubika_token_date", Date.now(), { path: "/" });
};
