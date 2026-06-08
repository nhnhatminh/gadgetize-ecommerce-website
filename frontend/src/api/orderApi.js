import axiosClient from "./axiosClient";

export const orderApi = {
  createOrder: (orderData) => {
    return axiosClient.post("/orders", orderData);
  },
};