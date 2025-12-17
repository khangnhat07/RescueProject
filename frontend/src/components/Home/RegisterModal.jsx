import React, { useState } from 'react';
import axios from 'axios'; // Đảm bảo bạn đã cài đặt: npm install axios
import axiosClient from '../../api/axiosClient';

const RegisterModal = () => {
  // 1. Khởi tạo State để lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    role: 'ROLE_VICTIM', // Giá trị mặc định
    password: '',
    confirmpassword: '',
    termsAccepted: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // 2. Hàm xử lý thay đổi input
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      // Đối với checkbox, lấy giá trị checked. Ngược lại, lấy value.
      [id.replace('floatingReg', '').replace('floating', '').toLowerCase()]: type === 'checkbox' ? checked : value,
    }));
    // Reset lỗi khi người dùng bắt đầu nhập lại
    setError(null);
  };
  
  // Hàm xử lý thay đổi Role riêng (vì id khác)
  const handleRoleChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      role: e.target.value,
    }));
  };

  // 3. Hàm xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi gửi form mặc định của trình duyệt

    // Validation cơ bản
    if (formData.password !== formData.confirmpassword) {
      setError('Mật khẩu và Xác nhận mật khẩu không khớp.');
      return;
    }
    if (!formData.termsAccepted) {
        setError('Vui lòng đồng ý với Điều khoản.');
        return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // Chuẩn bị dữ liệu gửi đi (Chỉ bao gồm các trường cần thiết)
    const dataToSend = {
      name: formData.username,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      password: formData.password,
    };


    try {
      const response = await axiosClient.post('/auth/signup', dataToSend);
      
      console.log('Đăng ký thành công:', response.data);
      setSuccess(true);
      // Bạn có thể thêm logic chuyển hướng (redirect) hoặc đóng modal tại đây
      
      // Tùy chọn: Reset form sau khi thành công
      // setFormData({ /* ... giá trị ban đầu ... */ }); 

    } catch (err) {
      console.error('Lỗi đăng ký:', err.response ? err.response.data : err.message);
      // Hiển thị thông báo lỗi từ server (ví dụ: Email đã tồn tại)
      setError(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal fade" id="registerModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 border-0 overflow-hidden">
          {/* Header */}
          <div className="modal-header bg-danger text-white border-0 p-4">
            <h5 className="modal-title fw-bold">
              <i className="fas fa-user-plus me-2"></i>Đăng Ký Tài Khoản
            </h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          
          <div className="modal-body p-4 p-lg-5">
            {/* Thêm onSubmit handler vào form */}
            <form onSubmit={handleSubmit}>
              
              {/* Hiển thị thông báo lỗi/thành công */}
              {error && (
                  <div className="alert alert-danger" role="alert">{error}</div>
              )}
              {success && (
                  <div className="alert alert-success" role="alert">Đăng ký thành công!</div>
              )}

              {/* 1. Họ và tên */}
              <div className="form-floating mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  id="floatingUsername" 
                  placeholder="Nguyễn Văn A" 
                  value={formData.username} 
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="floatingUsername">Họ và tên hiển thị</label>
              </div>

              {/* 2. Email */}
              <div className="form-floating mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  id="floatingRegEmail" 
                  placeholder="name@example.com"
                  value={formData.email} 
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="floatingRegEmail">Địa chỉ Email</label>
              </div>

              {/* 3. Số điện thoại */}
              <div className="form-floating mb-3">
                <input 
                  type="tel" 
                  className="form-control" 
                  id="floatingPhone" 
                  placeholder="0912345678"
                  value={formData.phone} 
                  onChange={handleInputChange}
                />
                <label htmlFor="floatingPhone">Số điện thoại liên hệ</label>
              </div>

              {/* 4. Vai trò (Dùng Select Box) */}
              <div className="form-floating mb-3">
                <select 
                  className="form-select" 
                  id="floatingRole" 
                  aria-label="Chọn vai trò"
                  value={formData.role}
                  onChange={handleRoleChange} // Dùng handler riêng cho select
                >
  <option value="ROLE_VICTIM">Người dùng (Cần cứu hộ / Đóng góp)</option>
      <option value="ROLE_RESCUETEAM">Team Giải Cứu (Hỗ trợ cứu hộ)</option>
                </select>
                <label htmlFor="floatingRole">Bạn đăng ký với vai trò là?</label>
              </div>

              {/* 5. Mật khẩu */}
              <div className="form-floating mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  id="floatingRegPassword" 
                  placeholder="Password"
                  value={formData.password} 
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="floatingRegPassword">Mật khẩu</label>
              </div>

              {/* Nhập lại Mật khẩu */}
              <div className="form-floating mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  id="floatingConfirmPassword" 
                  placeholder="Password"
                  value={formData.confirmpassword} 
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="floatingConfirmPassword">Xác nhận mật khẩu</label>
              </div>
              
              {/* Điều khoản */}
              <div className="form-check mb-4">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="flexCheckTerms" 
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData(prevData => ({ ...prevData, termsAccepted: e.target.checked }))} // Dùng handler inline
                  required
                />
                <label className="form-check-label text-secondary small" htmlFor="flexCheckTerms">
                  Tôi cam kết thông tin trên là chính xác và đồng ý với <a href="#" className="text-danger text-decoration-none fw-bold">Điều khoản</a>
                </label>
              </div>

              <div className="d-grid gap-2">
                <button 
                  className="btn btn-dark btn-lg fw-bold rounded-pill" 
                  type="submit"
                  disabled={isLoading} // Vô hiệu hóa nút khi đang gửi
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Đang xử lý...
                    </>
                  ) : 'TẠO TÀI KHOẢN'}
                </button>
              </div>

              {/* Footer chuyển đổi */}
              <div className="text-center mt-4">
                <span className="text-secondary small">Bạn đã có tài khoản? </span>
                <a 
                  href="#" 
                  className="text-danger fw-bold text-decoration-none"
                  data-bs-target="#loginModal" 
                  data-bs-toggle="modal"
                >
                  Đăng nhập ngay
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