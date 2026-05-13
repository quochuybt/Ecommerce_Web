import { api } from "../../services/api.js";

export const analyticsApi = {
  dashboard: () => api.get("/analytics/dashboard"),
};
