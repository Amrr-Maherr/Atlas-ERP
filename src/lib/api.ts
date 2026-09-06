import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !String(error.config?.url).startsWith("/auth/")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      window.location.href = "/login";
    }
    const message = error.response?.data?.message;
    if (message) {
      error.message = message;
    }
    return Promise.reject(error);
  },
);

export default api;
