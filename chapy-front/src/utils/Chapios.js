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

export default class chapios {
  static post = (url) => (obj, thunkApi) =>
    axios
      .post(url, obj)
      .then((response) => response.data)
      .catch((error) => thunkApi.rejectWithValue(error));

  static get = (url) => (obj, thunkApi) =>
    axios
      .get(url, obj)
      .then((response) => response.data)
      .catch((error) => thunkApi.rejectWithValue(error));

  static patch = (url) => (obj, thunkApi) =>
    axios
      .patch(url, obj)
      .then((response) => response.data)
      .catch((error) => thunkApi.rejectWithValue(error));
}
