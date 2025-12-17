import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-lg-4">
            <h4 className="fw-bold text-danger mb-3"><i className="fas fa-star-of-life me-2"></i>SAR VIETNAM</h4>
            <p className="text-secondary">Cổng thông tin cứu nạn phi lợi nhuận. Kết nối sức mạnh cộng đồng để không ai bị bỏ lại phía sau.</p>
          </div>
          <div className="col-lg-2 col-6">
            <h6 className="fw-bold mb-3">Liên kết</h6>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary hover-white">Về chúng tôi</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary hover-white">Hướng dẫn SOS</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary hover-white">Điều khoản</a></li>
            </ul>
          </div>
          <div className="col-lg-2 col-6">
            <h6 className="fw-bold mb-3">Đối tác</h6>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary hover-white">Cục Cứu Hộ</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary hover-white">Hội Chữ Thập Đỏ</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none text-secondary hover-white">CLB Offroad</a></li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h6 className="fw-bold mb-3">Đăng ký nhận tin khẩn cấp</h6>
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Email của bạn" />
              <button className="btn btn-danger" type="button">Đăng ký</button>
            </div>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="text-center text-secondary small">
          &copy; 2024 SAR Vietnam. Design with Bootstrap 5.
        </div>
      </div>
    </footer>
  );
};

export default Footer;