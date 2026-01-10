import React, { useState, useEffect } from "react";

import { api } from "../config/api"; 
import { uploadImageToCloudinary } from "../../utils/cloudinaryUploads";
import "./UserDetail.css";
import { useAuth } from "../../context/AuthContext";


// Danh sách thành phố mẫu (Bạn có thể mở rộng thêm)
const VIETNAM_CITIES = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "TP Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

const UserDetail = () => {
  const { login } = useAuth();
  const token = localStorage.getItem("jwt");

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    address: "", 
    city: "", // THÊM TRƯỜNG NÀY
    avatar: ""
  });

  // 1. Lấy thông tin user
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/api/users/profile");
        const data = response.data.data; 
        
        setUser({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address?.street || "", 
          city: data.address?.city || "", // LẤY CITY TỪ BACKEND
          avatar: data.avatar || ""
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = user.avatar;
      if (selectedFile) {
        imageUrl = await uploadImageToCloudinary(selectedFile);
      }

      // Payload JSON gửi sang Backend
      const updatePayload = {
        username: user.username,
        phone: user.phone,
        address: user.address, 
        city: user.city, // GỬI CITY LÊN BACKEND
        avatar: imageUrl
      };

      const response = await api.put("/api/users/profile", updatePayload);
      alert("Cập nhật thành công!");
      
      const updatedData = response.data.data;
      setUser({
        username: updatedData.username || "",
        email: updatedData.email || "",
        phone: updatedData.phone || "",
        address: updatedData.address?.street || "", 
        city: updatedData.address?.city || "", // CẬP NHẬT LẠI CITY SAU KHI LƯU
        avatar: updatedData.avatar || ""
      });
      login(token, {
        ...updatedData,
        address: updatedData.address // giữ object
      });

      setSelectedFile(null);
      setPreview(null);
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

          <div className="profile-sidebar">
            <div className="avatar-wrapper">
              <img src={preview || user.avatar || "https://via.placeholder.com/150"} alt="Avatar" />

              <label htmlFor="avatar-upload" className="upload-badge">
                <i className="fas fa-camera"></i>
              </label>
              <input type="file" id="avatar-upload" hidden onChange={handleImageChange} />
            </div>
            <h5 className="mt-3 fw-bold text-white">{user.username || "Người dùng"}</h5>
          </div>

          <div className="profile-form-section">
            <h3 className="form-title">Cài đặt tài khoản</h3>
            <form onSubmit={handleSubmit} className="row g-4">
              <div className="col-md-6">
                <label className="custom-label">Họ và tên</label>
                <div className="input-group-custom">
                  <i className="far fa-user"></i>
                  <input type="text" name="username" value={user.username} onChange={handleChange} />
                </div>
              </div>

              <div className="col-md-6">
                <label className="custom-label">Số điện thoại</label>
                <div className="input-group-custom">
                  <i className="fas fa-mobile-alt"></i>
                  <input type="text" name="phone" value={user.phone} onChange={handleChange} />
                </div>
              </div>

              <div className="col-12">
                <label className="custom-label">Email (Cố định)</label>
                <div className="input-group-custom readonly">
                  <i className="far fa-envelope"></i>
                  <input type="email" value={user.email} readOnly />
                </div>
              </div>
              {/* --- THÊM TRƯỜNG CHỌN THÀNH PHỐ --- */}
              <div className="col-12">
                <label className="custom-label">Thành phố</label>
                <div className="input-group-custom">
                  <i className="fas fa-city"></i>
                  <select 
                    name="city" 
                    value={user.city} 
                    onChange={handleChange}
                    className="form-select border-0 bg-transparent"
                    style={{ outline: 'none', appearance: 'auto' }}
                  >
                    <option value="" disabled className="text-dark">Chọn thành phố của bạn</option>
                    {VIETNAM_CITIES.map((city) => (
                      <option key={city} value={city} className="text-dark">
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-12">
                <label className="custom-label">Địa chỉ cư trú</label>
                <div className="input-group-custom">
                  <i className="fas fa-map-marker-alt"></i>
                  <textarea 
                    name="address" 
                    className="form-control"
                    rows="2" 
                    value={user.address} 
                    onChange={handleChange}
                    placeholder="Nhập tên đường, số nhà..."
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