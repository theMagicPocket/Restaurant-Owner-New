import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://13.235.77.237:4000", // Set your base URL here
});

export default axiosInstance;
