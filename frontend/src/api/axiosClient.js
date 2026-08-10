import axios from "axios";

// Khởi tạo axios client
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const isLoginApi = error.config?.url?.includes("/auth/login");

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !isLoginApi
    ) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;