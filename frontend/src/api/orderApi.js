import axiosClient from "./axiosClient";

export const orderApi = {
  createOrder: (orderData) => {
    return axiosClient.post("/orders", orderData);
  },

  checkCoupon: (couponCode, subtotal) => {
    return axiosClient.post("/orders/check-coupon", { couponCode, subtotal });
  },

  getOrderById: (id) => {
    return axiosClient.get(`/orders/${id}`);
  },
};