// services/api.ts
import axios from "axios";
import { adminAuthService } from "./adminAuth.service";

// Tự động chọn API URL theo môi trường
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api",
  withCredentials: true,
});

// ✅ Thêm token vào header nếu có
api.interceptors.request.use((config) => {
  const token = adminAuthService.getAccessToken?.();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Debug response để kiểm tra dữ liệu
api.interceptors.response.use((response) => {
  console.log(`🔍 API Response [${response.config.method?.toUpperCase()} ${response.config.url}]:`, response.data);
  return response;
}, (error) => {
  console.error(`❌ API Error [${error.config?.method?.toUpperCase()} ${error.config?.url}]:`, error.response?.data);
  return Promise.reject(error);
});

export default api;
