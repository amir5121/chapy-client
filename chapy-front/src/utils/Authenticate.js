import cookie from "react-cookies";

export const getAuthToken = () => {
  return cookie.load("auth_token", { path: "/" });
};

export const isLoggedIn = () => {
  return Boolean(getAuthToken());
};

export const logout = (location) => {
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
  cookie.remove("auth_token", { path: "/" });
  location && window && (window.location = location)
};

export const saveAuthToken = (data) => {
  console.log("ooooooooooooooooooooo", data.auth_token)
  cookie.save("auth_token", data.auth_token, { path: "/" });
};
