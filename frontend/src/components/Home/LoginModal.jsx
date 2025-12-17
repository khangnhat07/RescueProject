import React, { useState } from 'react';
import axiosClient from '../../api/axiosClient';

const LoginModal = () => {
  // 1. Khởi tạo State
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Hàm xử lý nhập liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null); // Xóa lỗi khi người dùng nhập lại
  };

  // 3. Hàm xử lý Đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Gọi API đăng nhập
      const response = await axiosClient.post('/auth/signin', credentials);

      console.log('Login Success:', response.data);

      // --- QUAN TRỌNG: XỬ LÝ SAU KHI ĐĂNG NHẬP THÀNH CÔNG ---
      
      // 1. Lưu Token vào LocalStorage (Giả sử server trả về field tên là 'jwt' hoặc 'token')
      const token = response.data.jwt || response.data.token;
      if (token) {
        localStorage.setItem('jwt', token); 
        // Lưu thêm role hoặc user info nếu cần
        // localStorage.setItem('role', response.data.role); 
      }

      // 2. Thông báo & Đóng modal/Reload trang
      alert("Đăng nhập thành công!");
      
      // Tùy chọn: Reload lại trang để cập nhật Header (hiện tên user thay vì nút Login)
      window.location.reload(); 

      // Hoặc nếu dùng React Router để chuyển hướng:
      // navigate('/dashboard');

    } catch (err) {
      console.error('Login Error:', err);
      // Lấy thông báo lỗi từ server
      const msg = err.response?.data?.message || err.response?.data?.error || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 border-0 overflow-hidden">
          {/* Header */}
          <div className="modal-header bg-dark text-white border-0 p-4">
            <h5 className="modal-title fw-bold"><i className="fas fa-shield-alt me-2"></i>Đăng Nhập Hệ Thống</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          
          <div className="modal-body p-4 p-lg-5">
            <form onSubmit={handleSubmit}>
              
              {/* Hiển thị lỗi nếu có */}
              {error && (
                <div className="alert alert-danger text-center p-2 mb-3" role="alert">
                  <i className="fas fa-exclamation-circle me-2"></i>{error}
                </div>
              )}

              {/* Email Input */}
              <div className="form-floating mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  id="floatingInputEmail" // Đổi ID tránh trùng lặp
                  placeholder="name@example.com"
                  name="email" // Bắt buộc có name
                  value={credentials.email}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="floatingInputEmail">Email đăng nhập</label>
              </div>

              {/* Password Input */}
              <div className="form-floating mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  id="floatingLoginPassword" // Đổi ID tránh trùng lặp
                  placeholder="Password"
                  name="password" // Bắt buộc có name
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="floatingLoginPassword">Mật khẩu</label>
              </div>
              
              {/* Tiện ích: Remember Me & Forgot Password */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="rememberCheck" />
                  <label className="form-check-label text-secondary small" htmlFor="rememberCheck">
                    Duy trì đăng nhập
                  </label>
                </div>
                <a href="#" className="small text-danger fw-bold text-decoration-none">Quên mật khẩu?</a>
              </div>

              {/* Nút Submit */}
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-danger btn-lg fw-bold rounded-pill" 
                  type="submit"
                  disabled={isLoading}
                >
                   {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      ĐANG XỬ LÝ...
                    </>
                  ) : 'TRUY CẬP'}
                </button>
                
                <div className="text-center text-secondary small my-2">HOẶC</div>
                
                <button className="btn btn-outline-dark rounded-pill" type="button">
                  <i className="fab fa-google me-2"></i>Đăng nhập bằng Google
                </button>
              </div>

              {/* Footer: Chuyển sang Đăng ký */}
              <div className="text-center mt-4 pt-3 border-top">
                <span className="text-secondary small">Chưa có tài khoản? </span>
                <a 
                  href="#" 
                  className="text-dark fw-bold text-decoration-none"
                  data-bs-target="#registerModal" 
                  data-bs-toggle="modal"
                  // Cần thêm data-bs-dismiss để đóng modal login hiện tại trước khi mở modal đăng ký (tránh lỗi UI)
                  // data-bs-dismiss="modal" 
                >
                  Đăng ký miễn phí
                </a>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;