import axiosClient from "./axiosClient";

export const productApi = {
  getProducts: (params) => {
    return axiosClient.get("/products", { params });
  },
  getCategories: () => {
    return axiosClient.get("/products/categories");
  },
  getBrands: () => {
    return axiosClient.get("/products/brands");
  },
};