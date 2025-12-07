import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: false, // evnt true, but for now - easier this way
  baseURL: process.env.REACT_APP_API_BASE_URL || "",
});

export default axiosInstance;
