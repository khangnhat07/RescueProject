import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load lại user khi F5
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    const storedToken = localStorage.getItem('jwt'); // Backend trả về key là jwt nên lưu là jwt cho dễ nhớ

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // --- HÀM LOGIN (Updated) ---
  const login = (token, userData) => {
    // 1. Cập nhật State
    setUser(userData);

    // 2. Lưu vào LocalStorage
    localStorage.setItem('jwt', token); // Lưu token để axiosClient dùng
    localStorage.setItem('userInfo', JSON.stringify(userData)); // Lưu role, email...
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('userInfo');
    // Có thể thêm chuyển hướng về trang chủ nếu cần
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
