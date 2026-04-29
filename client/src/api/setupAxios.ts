import axios from "axios";

// Set base URL from Vite env (empty string for proxy) or fallback to empty
axios.defaults.baseURL = import.meta.env.VITE_API_BASE ?? "";

// Attach Authorization header from localStorage.token for every request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    if (!config.headers["Authorization"] && !config.headers["authorization"]) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

axios.interceptors.response.use(
  (r) => r,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      // auto logout on unauthorized
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      try {
        window.location.href = "/";
      } catch (e) { }
    }
    return Promise.reject(err);
  }
);

export default axios;
