import axios from "axios";
import { getAuthToken, isLoggedIn, logout } from "./Authenticate";
import { get } from "lodash";
import { httpBaseUrl } from "../Setting";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = httpBaseUrl;
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

export default class chapios {
  static post = (url) => (data, thunkApi) =>
    axios
      .post(url, data)
      .then((response) => response.data)
      .catch((error) => thunkApi.rejectWithValue(error));

  static get = (url) => (data, thunkApi) =>
    axios
      .get(url, data)
      .then((response) => response.data)
      .catch((error) => thunkApi.rejectWithValue(error));

  static patch = (url) => (data, thunkApi) =>
    axios
      .patch(url, data)
      .then((response) => response.data)
      .catch((error) => thunkApi.rejectWithValue(error));

  static upload = (url) => (data, thunkApi) =>
    axios
      .post(url, data, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        onUploadProgress: (progressEvent) => {
          console.log("progressEvent:::::", progressEvent);
        },
      })
      .then((response) => response.data)
      .catch((error) => thunkApi.rejectWithValue(error));
}
