import { api } from "../../services/api.js";

export const productsApi = {
  list: (query = "") => api.get(`/products${query}`),
  detail: (id) => api.get(`/products/${id}`),
  create: (payload) => api.post("/products", payload),
  update: (id, payload) => api.put(`/products/${id}`, payload),
  remove: (id) => api.delete(`/products/${id}`),
};
