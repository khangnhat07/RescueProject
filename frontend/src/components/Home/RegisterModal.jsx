import React, { useState } from 'react';

import { useAuth } from '../../context/AuthContext'; // 1. Import Context để Auto-Login
import instance from '../../service/axios.customize';

const RegisterModal = () => {
  const { login } = useAuth(); // 2. Lấy hàm login

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'ROLE_VICTIM',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation cơ bản
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (!formData.termsAccepted) {
      setError('Vui lòng đồng ý với điều khoản.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // --- 3. CHUẨN BỊ DỮ LIỆU KHỚP VỚI BACKEND ---
    // Backend: User entity có field 'username', 'email', 'password', 'role'
    const dataToSend = {
      username: formData.name, // Mapping: input 'name' -> gửi đi key 'username'
      email: formData.email,
      password: formData.password,
      role: formData.role,
      phone: formData.phone, // (Nếu User entity backend có field phone)
    };

    try {
      // Gọi API (Lưu ý: kiểm tra xem Controller có @RequestMapping("/auth") không nhé)
      const response = await instance.post('/auth/signup', dataToSend);

      console.log('Register & Auto-Login Success:', response.data);

      // --- 4. XỬ LÝ AUTO-LOGIN (Thay đổi lớn nhất) ---
      // Backend trả về: { jwt: "...", role: "...", message: "..." }

      const token = response.data.jwt;
      const userData = {
        email: formData.email, // Lấy email từ form người dùng vừa nhập
        role: response.data.role // Lấy role chuẩn từ backend trả về
      };

      // Gọi hàm login ngay lập tức thay vì bắt người dùng đăng nhập lại
      login(token, userData);

      // --- 5. ĐÓNG MODAL & RESET ---
      setFormData({
        name: '', email: '', phone: '', role: 'ROLE_VICTIM',
        password: '', confirmPassword: '', termsAccepted: false
      });

      // Đóng Register Modal
      const registerModalEl = document.getElementById('registerModal');
      if (window.bootstrap) {
        const modalInstance = window.bootstrap.Modal.getInstance(registerModalEl);
        if (modalInstance) modalInstance.hide();
      }

      // Thông báo nhẹ
      alert("Đăng ký thành công! Bạn đã được đăng nhập.");

    } catch (err) {
      console.error('Register Error:', err);
      const msg = err.response?.data?.message || 'Đăng ký thất bại. Email có thể đã tồn tại.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal fade" id="registerModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 border-0 overflow-hidden">
          <div className="modal-header bg-danger text-white border-0 p-4">
            <h5 className="modal-title fw-bold">
              <i className="fas fa-user-plus me-2"></i>Đăng Ký Tài Khoản
            </h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body p-4 p-lg-5">
            <form onSubmit={handleSubmit}>

              {error && <div className="alert alert-danger" role="alert">{error}</div>}

              {/* Input Họ tên (Map sang username) */}
              <div className="form-floating mb-3">
                <input
                  type="text" className="form-control" id="floatingName"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name} onChange={handleInputChange} required
                />
                <label htmlFor="floatingName">Họ và tên hiển thị</label>
              </div>

              {/* Các input khác giữ nguyên như cũ... */}
              <div className="form-floating mb-3">
                <input
                  type="email" className="form-control" id="floatingRegEmail"
                  placeholder="name@example.com"
                  name="email"
                  value={formData.email} onChange={handleInputChange} required
                />
                <label htmlFor="floatingRegEmail">Địa chỉ Email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="tel" className="form-control" id="floatingPhone"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone} onChange={handleInputChange}
                />
                <label htmlFor="floatingPhone">Số điện thoại</label>
              </div>

              <div className="form-floating mb-3">
                <select
                  className="form-select" id="floatingRole"
                  name="role"
                  value={formData.role} onChange={handleInputChange}
                >
                  <option value="ROLE_VICTIM">Người dùng (Cần cứu hộ / Đóng góp)</option>
                  <option value="ROLE_RESCUETEAM">Team Giải Cứu (Hỗ trợ cứu hộ)</option>
                </select>
                <label htmlFor="floatingRole">Vai trò</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password" className="form-control" id="floatingRegPassword"
                  placeholder="Password"
                  name="password"
                  value={formData.password} onChange={handleInputChange} required
                />
                <label htmlFor="floatingRegPassword">Mật khẩu</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password" className="form-control" id="floatingConfirmPassword"
                  placeholder="Password"
                  name="confirmPassword"
                  value={formData.confirmPassword} onChange={handleInputChange} required
                />
                <label htmlFor="floatingConfirmPassword">Xác nhận mật khẩu</label>
              </div>

              <div className="form-check mb-4">
                <input
                  className="form-check-input" type="checkbox" id="flexCheckTerms"
                  name="termsAccepted"
                  checked={formData.termsAccepted} onChange={handleInputChange} required
                />
                <label className="form-check-label text-secondary small" htmlFor="flexCheckTerms">
                  Đồng ý với <a href="#" className="text-danger text-decoration-none fw-bold">Điều khoản sử dụng</a>
                </label>
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-dark btn-lg fw-bold rounded-pill"
                  type="submit" disabled={isLoading}
                >
                  {isLoading ? 'Đang xử lý...' : 'ĐĂNG KÝ NGAY'}
                </button>
              </div>

              <div className="text-center mt-4">
                <span className="text-secondary small">Đã có tài khoản? </span>
                <a
                  href="#"
                  className="text-danger fw-bold text-decoration-none"
                  data-bs-target="#loginModal"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                >
                  Đăng nhập
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;