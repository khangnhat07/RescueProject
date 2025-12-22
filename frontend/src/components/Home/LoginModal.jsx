import React, { useState } from 'react';

// 1. IMPORT HOOK AUTH
import { useAuth } from '../../context/AuthContext'; // Đảm bảo đường dẫn đúng tới file AuthContext của bạn
import instance from '../../service/axios.customize';

const LoginModal = () => {
  // 2. Lấy hàm login từ Context
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Xử lý nhập liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  // Xử lý Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // --- BƯỚC 1: GỌI API ---
      // Lưu ý: Endpoint là /signin khớp với Controller Java của bạn
      const response = await instance.post('/auth/signin', credentials);

      console.log('Login Success:', response.data);

      // --- BƯỚC 2: CHUẨN BỊ DỮ LIỆU ---
      // Backend trả về: { jwt: "...", role: "...", message: "..." }

      const token = response.data.jwt;

      // Tạo object user từ thông tin nhập + thông tin server trả về
      const userData = {
        email: credentials.email, // Lấy từ state form
        role: response.data.role, // Lấy từ server
      };

      // --- BƯỚC 3: CẬP NHẬT CONTEXT ---
      // Hàm này sẽ tự lưu vào localStorage và update State toàn cục
      login(token, userData);

      // --- BƯỚC 4: ĐÓNG MODAL & RESET FORM ---

      // Reset form
      setCredentials({ email: '', password: '' });

      // Đóng modal bằng Bootstrap 5 JS API
      const modalElement = document.getElementById('loginModal');
      // Đảm bảo window.bootstrap tồn tại (đã import ở main.jsx hoặc index.html)
      if (window.bootstrap) {
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
      } else {
        // Fallback: Nếu không tìm thấy bootstrap instance, dùng cách thủ công đóng class
        // (Cách này ít khi cần nếu setup đúng)
        const closeBtn = modalElement.querySelector('.btn-close');
        if (closeBtn) closeBtn.click();
      }

      // Alert nhẹ (hoặc dùng Toast notification thì đẹp hơn)
      // alert("Đăng nhập thành công!"); 

    } catch (err) {
      console.error('Login Error:', err);
      // Lấy thông báo lỗi từ server (Spring Boot thường trả message trong response body)
      const msg = err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản.';
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
                  id="floatingInputEmail"
                  placeholder="name@example.com"
                  name="email"
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
                  id="floatingLoginPassword"
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="floatingLoginPassword">Mật khẩu</label>
              </div>

              {/* Tiện ích */}
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
                  // QUAN TRỌNG: Thêm dòng này để đóng modal login khi mở modal register
                  // tránh bị 2 modal đè lên nhau (backdrop đen thui)
                  data-bs-dismiss="modal"
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