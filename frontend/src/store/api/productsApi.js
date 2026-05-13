import { api } from "../../services/api.js";

export const productsApi = {
  list: (query = "") => api.get(`/products${query}`),
  detail: (id) => api.get(`/products/${id}`),
};
