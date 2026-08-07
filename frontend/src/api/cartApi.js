import axiosClient from "./axiosClient";

export const cartApi = {
  getCart: () => {
    return axiosClient.get("/cart");
  },

  addToCart: (variantId, quantity) => {
    return axiosClient.post("/cart", { variantId, quantity });
  },

  updateCartItem: (id, quantity) => {
    return axiosClient.put(`/cart/${id}`, { quantity });
  },

  removeFromCart: (id) => {
    return axiosClient.delete(`/cart/${id}`);
  },

  clearCart: () => {
    return axiosClient.delete("/cart");
  },
};