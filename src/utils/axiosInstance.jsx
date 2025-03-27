import axios from "axios";

// Create authenticated axios instance
export const authAxios = axios.create({
  baseURL: import.meta.env.VITE_REACT_BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include JWT
authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // Handle missing token (redirect to login)
    window.location.href = "/login";
    return Promise.reject("No authentication token found");
  }
  return config;
});

// Add response interceptor to handle 401 errors
authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwtToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
