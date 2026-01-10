import { useAuth } from "../../context/AuthContext";
const AdminNavbar = ({ onToggle }) => {
  const { user, logout } = useAuth();
  console.log("USER AVATAR:", user?.avatar);
return (
  <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-3 py-2 sticky-top">
    <div className="container-fluid p-0">
      <button className="btn btn-light border me-2" onClick={onToggle}>
        <i className="fas fa-bars"></i>
      </button>
      
      <h5 className="m-0 fw-bold text-secondary fs-6 d-none d-sm-block">
        Trung tâm điều hành
      </h5>

      <div className="ms-auto d-flex align-items-center">
        {/* Thông báo */}
        <div className="dropdown me-2">
          <button 
            className="btn btn-light position-relative rounded-circle p-0"
            style={{ width: '35px', height: '35px' }} // Sửa từ string sang object
          >
            <i className="fas fa-bell text-secondary"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger p-1"></span>
          </button>
        </div>

        {/* User Dropdown */}
        <div className="dropdown">
          <a 
            href="#" 
            className="d-flex align-items-center text-decoration-none text-dark"
            data-bs-toggle="dropdown"
          >
         {user?.avatar ? (
    // ĐÃ UPLOAD → DÙNG ẢNH
    <img
      src={user.avatar}
      alt="Avatar"
      width="32"
      height="32"
      className="rounded-circle me-md-2"
      style={{ objectFit: 'cover' }}
    />
  ) : (
    // CHƯA UPLOAD → DÙNG ICON
    <div
      className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-md-2"
      style={{ width: '32px', height: '32px', fontSize: '14px' }}
    >
      <i className="fas fa-user"></i>
    </div>
  )}

<span className="fw-bold d-none d-md-inline small">
  {user?.username || user?.email.split("@")[0] || "Admin"}
</span>

          </a>
          
          <ul className="dropdown-menu dropdown-menu-end shadow border-0">
            <li><a className="dropdown-item" href="/userDetail">Hồ sơ</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={logout}
                >
                  Đăng xuất
                </button>
              </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

};
export default AdminNavbar;