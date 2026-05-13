function resolveApiUrl() {
  const configuredUrl = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

  if (typeof window === "undefined") return configuredUrl;

  const pageHost = window.location.hostname;
  const isNetworkHost = pageHost !== "localhost" && pageHost !== "127.0.0.1";

  if (isNetworkHost && configuredUrl.includes("localhost:3001")) {
    return `${window.location.protocol}//${pageHost}:3001/api`;
  }

  return configuredUrl;
}

const API_URL = resolveApiUrl();

async function request(path, options = {}) {
  const token = localStorage.getItem("electrohub-access-token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("electrohub-access-token");
      localStorage.removeItem("electrohub-refresh-token");
      localStorage.removeItem("electrohub-user");
    }
    throw new Error(data.error || "API request failed");
  }
  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
};
