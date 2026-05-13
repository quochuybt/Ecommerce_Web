import { api } from "../../services/api.js";

export const userApi = {
  detail: (id) => api.get(`/users/${id}`),
  update: (id, payload) => api.put(`/users/${id}`, payload),
};
