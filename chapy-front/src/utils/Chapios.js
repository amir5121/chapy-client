import axios from "axios";
import { getAuthToken, isLoggedIn, logout } from "./Authenticate";
import { get } from "lodash";
import { baseUrl } from "../LocalSetting";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;
axios.interceptors.request.use(
  (config) => {
    isLoggedIn() &&
      (config.headers["Authorization"] = `Token ${getAuthToken()}`);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    if (response) return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
    } else if (error.response && error.response.status === 401) {
      logout();
    }
    return Promise.reject(get(error, "response.data", error));
  }
);

console.log("@###################");
export default axios;
