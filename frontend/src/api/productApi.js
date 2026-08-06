import axiosClient from "./axiosClient";

export const productApi = {
  getProducts: (params) => {
    return axiosClient.get("/products", { params });
  },
  searchProducts: (searchQuery) => {
    return axiosClient.get("/products", {
      params: { search: searchQuery, limit: 5 },
    });
  },
  getCategories: () => {
    return axiosClient.get("/products/categories");
  },
  getBrands: () => {
    return axiosClient.get("/products/brands");
  },
};