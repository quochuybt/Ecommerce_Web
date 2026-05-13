import { api } from "../../services/api.js";

export const cartApi = {
  list: () => api.get("/cart"),
  add: (payload) => api.post("/cart/items", payload),
  update: (itemId, payload) => api.put(`/cart/items/${itemId}`, payload),
  remove: (itemId) => api.delete(`/cart/items/${itemId}`),
};
