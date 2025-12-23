import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // 1. Thêm import này
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import '../../assets/css/Admin.css';

const Layout = () => { // 2. Không cần nhận props children nữa
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className={isToggled ? "sb-sidenav-toggled" : ""}>
      {/* Thêm overlay cho mobile để bấm ra ngoài thì đóng menu */}
      <div className="sidebar-overlay" onClick={() => setIsToggled(false)}></div>
      
      <div className="d-flex" id="wrapper">
        <AdminSidebar />
        <div id="page-content-wrapper">
          <AdminNavbar onToggle={() => setIsToggled(!isToggled)} />
          <div className="container-fluid px-3 px-md-4 py-4">
            {/* 3. Thay {children} bằng <Outlet /> */}
            <Outlet /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;