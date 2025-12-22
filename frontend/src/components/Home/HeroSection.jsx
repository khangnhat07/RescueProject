import React from 'react';

const HeroSection = () => {
  return (
    <header className="hero-section text-white position-relative">
      <div className="container position-relative z-2">
        <div className="row align-items-center">
          
          {/* Left Content */}
          <div className="col-lg-7">
            <span className="badge bg-danger mb-3 px-3 py-2 rounded-pill"><i className="fas fa-broadcast-tower me-2"></i>HỆ THỐNG CẢNH BÁO SỚM</span>
            <h1 className="display-3 fw-bolder mb-3 lh-1">MẠNG LƯỚI CỨU NẠN <br />TOÀN QUỐC</h1>
            <p className="lead mb-4 text-white-50">Nền tảng công nghệ kết nối người gặp nạn với lực lượng chức năng và cộng đồng tình nguyện viên gần nhất trong thời gian thực.</p>
            <div className="d-flex flex-wrap gap-3">
              <button className="btn btn-danger btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg">
                <i className="fas fa-map-marker-alt me-2"></i>GỬI TỌA ĐỘ KHẨN CẤP
              </button>
              <button className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill fw-bold">
                <i className="fas fa-hand-holding-heart me-2"></i>ĐĂNG KÝ CỨU HỘ
              </button>
            </div>
          </div>

          {/* Right Stats */}
          <div className="col-lg-5 mt-5 mt-lg-0">
            <div className="card bg-dark bg-opacity-75 text-white border-0 backdrop-blur shadow-lg rounded-4 p-4">
              <h5 className="fw-bold mb-4 border-bottom border-secondary pb-2">THỐNG KÊ THỜI GIAN THỰC</h5>
              
              <div className="d-flex justify-content-between mb-3">
                <span><i className="fas fa-bolt text-warning me-2"></i>Ca đang xử lý</span>
                <span className="fw-bold fs-5">14</span>
              </div>
              <div className="progress mb-4" style={{height: '6px'}}>
                <div className="progress-bar bg-warning progress-bar-striped progress-bar-animated" style={{width: '45%'}}></div>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <span><i className="fas fa-check-circle text-success me-2"></i>Đã cứu thành công (24h)</span>
                <span className="fw-bold fs-5">08</span>
              </div>
              <div className="progress mb-4" style={{height: '6px'}}>
                <div className="progress-bar bg-success" style={{width: '80%'}}></div>
              </div>

              <div className="d-flex justify-content-between">
                <span><i className="fas fa-users text-info me-2"></i>Tình nguyện viên online</span>
                <span className="fw-bold fs-5">1,205</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default HeroSection;