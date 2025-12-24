import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  // Hàm kiểm tra trang hiện tại để active menu
  const isActive = (path) => (location.pathname.includes(path) ? "active" : "");

  return (
    <div id="sidebar-wrapper">
      <div className="sidebar-heading d-flex align-items-center gap-2">
        <div
          className="logo-icon bg-white rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "32px", height: "32px" }}
        >
          <i className="fas fa-asterisk text-danger"></i>
        </div>
        <span className="text-white">SAR ADMIN</span>
      </div>

      <div className="list-group list-group-flush mt-3">
        {/* Nhóm chính */}
        <Link
          to="/"
          className={`list-group-item list-group-item-action ${isActive(
            "dashboard"
          )}`}
        >
          <i className="fas fa-th-large me-3"></i>Trở về
        </Link>

        <Link
          to="/admin/rescue"
          className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${isActive(
            "sos"
          )}`}
        >
          <span>
            <i className="fas fa-bullhorn me-3"></i>Quản lý tin cứu trợ
          </span>

        </Link>

        <Link
          to="/admin/teams"
          className="list-group-item list-group-item-action"
        >
          <i className="fas fa-users-cog me-3"></i>Đội cứu hộ
        </Link>

        <Link
          to="/admin/map"
          className="list-group-item list-group-item-action"
        >
          <i className="fas fa-map-marked-alt me-3"></i>Bản đồ tác chiến
        </Link>
        <Link
          to="/admin/blogs"
          className={`list-group-item list-group-item-action ${isActive(
            "blogs"
          )}`}
        >
          <i className="fas fa-newspaper me-3"></i>Quản lý Blog
        </Link>
        {/* Nhóm hệ thống - cách ra một đoạn */}
        <div className="sidebar-divider my-4 border-top border-secondary opacity-25"></div>



        <Link
          to="/logout"
          className="list-group-item list-group-item-action text-danger mt-2"
        >
          <i className="fas fa-sign-out-alt me-3"></i>Đăng xuất
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
