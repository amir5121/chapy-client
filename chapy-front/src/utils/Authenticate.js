import cookie from "react-cookies";

export const getAuthToken = () => {
  return cookie.load("auth_token", { path: "/" });
};

export const isLoggedIn = () => {
  return Boolean(getAuthToken());
};

export const logout = (location) => {
  cookie.remove("auth_token", { path: "/" });
  window && (window.location = location ? location : '/login/')
};

export const saveAuthToken = (data) => {
  cookie.save("auth_token", data.auth_token, { path: "/" });
};
