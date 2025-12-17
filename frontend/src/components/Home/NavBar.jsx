import React from 'react';

const Navbar = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-danger text-white py-1 small fw-bold">
        <div className="container d-flex justify-content-between align-items-center">
          <span><i className="fas fa-signal me-2"></i>TRẠM ĐIỀU HÀNH TRUNG TÂM: TRỰC TUYẾN</span>
          <span><i className="fas fa-phone-volume me-2"></i>HOTLINE: 112 / 114</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bolder d-flex align-items-center" href="#">
            <span className="bg-white text-danger rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '40px', height: '40px'}}>
              <i className="fas fa-star-of-life fa-lg"></i>
            </span>
            SAR VIETNAM
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fw-medium">
              <li className="nav-item"><a className="nav-link active" href="#">Trang chủ</a></li>
              <li className="nav-item"><a className="nav-link" href="#live-map">Bản đồ số</a></li>
              <li className="nav-item"><a class="nav-link" href="#resources">Nguồn lực</a></li>
              <li className="nav-item ms-lg-3">
                <button className="btn btn-outline-light px-4 rounded-pill" data-bs-toggle="modal" data-bs-target="#loginModal">
                  <i className="fas fa-user-astronaut me-2"></i>Thành viên
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;