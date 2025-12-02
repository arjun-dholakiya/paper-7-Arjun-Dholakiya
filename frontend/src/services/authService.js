import api from "../api/axios";

// Normal + Social Signup
export const signupService = async (data) => {
  return await api.post("/auth/signup", data);
};

// Normal + Social Login
export const loginService = async (data) => {
  return await api.post("/auth/login", data);
};

// Logout
export const logoutService = async () => {
  return await api.post("/auth/logout");
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : {};
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};