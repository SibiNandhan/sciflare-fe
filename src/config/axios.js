import axios from "axios";

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`;
console.log("base..", axios.defaults.baseURL);
const authToken = localStorage.getItem("token");

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

export default axiosInstance;
