import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
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
    // Bỏ qua API đăng nhập
    const isLoginApi = error.config?.url?.includes("/auth/login");

    // Tự động đăng xuất khi token không còn hợp lệ
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !isLoginApi
    ) {
      localStorage.removeItem("token");
      window.location.href = "/auth";
    }

    // Chuyển lỗi cho nơi gọi API xử lý
    return Promise.reject(error);
  }
);

export default axiosClient;