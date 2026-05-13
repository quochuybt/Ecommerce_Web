import { api } from "../../services/api.js";

export const ordersApi = {
  list: () => api.get("/orders"),
  create: (payload) => api.post("/orders", payload),
};
