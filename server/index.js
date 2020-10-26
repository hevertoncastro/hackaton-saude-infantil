import axios from "axios";
import Cookies from "js-cookie";

const isDevelopment = process.env.NODE_ENV === "development";

const api = axios.create({
  baseURL: isDevelopment ? process.env.DEV_API_URL : process.env.PROD_API_URL,
  timeout: 60000
});

api.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      Cookies.remove("incaMembersAccessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const param = config;
    param.headers.Authorization = "Bearer " + Cookies.get("incaMembersAccessToken");
    return param;
  },
  error => Promise.reject(error)
);

export default api;
