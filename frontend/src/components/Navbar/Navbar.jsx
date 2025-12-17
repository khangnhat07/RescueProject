// components/Navbar.js
import React from 'react';
import '../../assets/css/Blog.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow border-bottom border-secondary">
    <div className="container">
      <a className="navbar-brand fw-bold text-uppercase" href="/">
        <i className="fas fa-life-ring text-danger me-2"></i>SAR VIETNAM
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <li className="nav-item"><a className="nav-link" href="/">Trang chủ</a></li>
          <li className="nav-item"><a className="nav-link active fw-bold text-warning" href="#">Tin tức & Cảnh báo</a></li>
          <li className="nav-item ms-lg-3">
            <a href="#" className="btn btn-danger btn-sm fw-bold rounded-pill px-3">
              <i className="fas fa-broadcast-tower me-1"></i> NHẬN TIN BÁO
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
