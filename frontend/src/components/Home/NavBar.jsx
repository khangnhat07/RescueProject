import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 1. Import Auth Hook
import * as bootstrap from 'bootstrap';
const Navbar = () => {
  // 2. Get user data and logout function
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to Home after logout
  };

  console.log("Current User Role:", user?.role);
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
          {/* Use Link instead of a tag for the Brand */}
          <Link className="navbar-brand fw-bolder d-flex align-items-center" to="/">
            <span className="bg-white text-danger rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px' }}>
              <i className="fas fa-star-of-life fa-lg"></i>
            </span>
            KKT VIETNAM
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fw-medium align-items-center">

              <li className="nav-item">
                <Link className="nav-link active" to="/">Trang chủ</Link>
              </li>

              {/* Link xem danh sách cứu trợ: Guest, Victim và Admin đều nên xem được */}
              {(user?.role !== 'ROLE_RESCUETEAM') && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/user/rescue">Danh sách cứu trợ</Link>
                </li>
              )}

              <li className="nav-item">
                <Link className="nav-link active" to="/blogs">Tin tức</Link>
              </li>


              {/* --- NHÓM 2: HIỂN THỊ THEO ROLE CỤ THỂ --- */}

              {/* Chỉ dành cho RESCUER */}
              {user?.role === 'ROLE_RESCUETEAM' && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/rescuer/rescue">Bảng điều khiển cứu hộ</Link>
                </li>
              )}

              {/* Chỉ dành cho ADMIN */}
              {user?.role === 'ROLE_ADMIN' && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/admin/blogs">Quản lý tin tức</Link>
                </li>
              )}

              {/* --- CONDITIONAL RENDERING AREA --- */}
              <li className="nav-item ms-lg-3">

                {user ? (
                  // SITUATION 1: USER IS LOGGED IN -> Show Dropdown
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-light rounded-pill dropdown-toggle d-flex align-items-center gap-2"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {/* Avatar Icon */}
                      <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '25px', height: '25px', fontSize: '12px' }}>
                        <i className="fas fa-user"></i>
                      </div>

                      {/* Display Email or Username */}
                      <span className="small">
                        {user.email?.split('@')[0] || "Member"}
                      </span>
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end shadow animate__animated animate__fadeIn">
                      {/* Show Role Badge */}
                      <li className="px-3 py-1">
                        <span className="badge bg-secondary w-100">{user.role || 'USER'}</span>
                      </li>
                      <li><hr className="dropdown-divider" /></li>

                      <li><Link className="dropdown-item" to="/profile"><i className="fas fa-id-card me-2 text-muted"></i>Hồ sơ cá nhân</Link></li>
                      <li><Link className="dropdown-item" to="/history"><i className="fas fa-history me-2 text-muted"></i>Lịch sử hoạt động</Link></li>

                      <li><hr className="dropdown-divider" /></li>

                      {/* Logout Button */}
                      <li>
                        <button className="dropdown-item text-danger fw-bold" onClick={handleLogout}>
                          <i className="fas fa-sign-out-alt me-2"></i>Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>

                ) : (
                  // SITUATION 2: GUEST (NOT LOGGED IN) -> Show Login Button
                  <button
                    className="btn btn-outline-light px-4 rounded-pill"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    <i className="fas fa-user-astronaut me-2"></i>Thành viên
                  </button>
                )}

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;