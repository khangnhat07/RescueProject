import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserDetail.css";

const UserDetail = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    avatar: ""
  });

  const API_BASE_URL = "http://localhost:5454/api/users"; // Thay bằng route của bạn
  const token = localStorage.getItem("token"); // Lấy JWT token để xác thực

  // 1. Lấy thông tin user khi vào trang
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin:", error);
      }
    };
    fetchUserProfile();
  }, [token]);

  // 2. Xử lý thay đổi input
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 3. Xử lý chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // 4. Gửi dữ liệu cập nhật lên Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", user.fullName);
    formData.append("phone", user.phone);
    formData.append("address", user.address);
    if (selectedFile) {
      formData.append("image", selectedFile); // Gửi file ảnh nếu có thay đổi
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      alert("Cập nhật thành công!");
      setUser(response.data); // Cập nhật lại state với dữ liệu mới từ server
    } catch (error) {
      alert("Cập nhật thất bại. Vui lòng thử lại!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-card">
          {/* Sidebar */}
          <div className="profile-sidebar">
            <div className="avatar-wrapper">
              <img src={preview || user.avatar || "default-avatar.png"} alt="Avatar" />
              <label htmlFor="avatar-upload" className="upload-badge">
                <i className="fas fa-camera"></i>
              </label>
              <input type="file" id="avatar-upload" hidden onChange={handleImageChange} />
            </div>
            <h5 className="mt-3 fw-bold text-white">{user.fullName || "Người dùng"}</h5>
            <p className="text-white-50 small">Thành viên Đội SOS</p>
          </div>

          {/* Form */}
          <div className="profile-form-section">
            <h3 className="form-title">Cài đặt tài khoản</h3>
            <form onSubmit={handleSubmit} className="row g-4">
              <div className="col-md-6">
                <label className="custom-label">Họ và tên</label>
                <div className="input-group-custom">
                  <i className="far fa-user"></i>
                  <input 
                    type="text" 
                    name="fullName"
                    value={user.fullName} 
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="custom-label">Số điện thoại</label>
                <div className="input-group-custom">
                  <i className="fas fa-mobile-alt"></i>
                  <input 
                    type="text" 
                    name="phone"
                    value={user.phone} 
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-12">
                <label className="custom-label">Email (Không thể thay đổi)</label>
                <div className="input-group-custom readonly">
                  <i className="far fa-envelope"></i>
                  <input type="email" value={user.email} readOnly />
                </div>
              </div>

              <div className="col-12">
                <label className="custom-label">Địa chỉ</label>
                <div className="input-group-custom">
                  <i className="fas fa-map-marker-alt"></i>
                  <textarea 
                    name="address"
                    rows="2" 
                    value={user.address} 
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="col-12 mt-4 d-flex gap-3">
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? "Đang lưu..." : "Cập nhật ngay"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;