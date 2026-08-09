import axiosClient from "./axiosClient";

export const adminApi = {
  createProduct: (formData) => {
    return axiosClient.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateProduct: (id, formData) => {
    return axiosClient.put(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteProduct: (id) => {
    return axiosClient.delete(`/products/${id}`);
  },

  getAllOrders: () => {
    return axiosClient.get("/orders/admin");
  },

  updateOrderStatus: (id, status) => {
    return axiosClient.put(`/orders/${id}/status`, { status });
  },

  // Lấy dữ liệu thống kê tổng quan cho Admin Dashboard
  getDashboardStats: () => {
    return axiosClient.get("/orders/admin/dashboard-stats");
  },
};