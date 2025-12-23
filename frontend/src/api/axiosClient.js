// src/api/axiosClient.js
import axios from 'axios';

// Cấu hình URL cơ sở (Base URL)
// Sau này chỉ cần sửa ở đây là TOÀN BỘ dự án tự cập nhật
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Link gốc của Backend
  headers: {
    'Content-Type': 'application/json',
  },
  // Có thể thêm timeout (thời gian chờ tối đa)
  timeout: 10000, 
});
axiosClient.interceptors.request.use((config) => {
  // Lấy token đúng cái tên đã lưu ở AuthContext
  const token = localStorage.getItem('jwt'); 
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Bạn có thể cài đặt thêm Interceptors (để tự động gắn Token đăng nhập) ở đây
// axiosClient.interceptors.request.use(...)

export default axiosClient;