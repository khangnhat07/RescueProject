// components/Sidebar.js
import React from 'react';
import '../../assets/css/Blog.css';

const Sidebar = () => (
  <div className="shelter-widget">
    <div className="card shadow-sm mb-4 border-0">
      <div className="card-header bg-dark text-white fw-bold">
        <i className="fas fa-search me-2"></i>TÌM KIẾM TIN TỨC
      </div>
      <div className="card-body bg-white">
        <form>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Nhập từ khóa (vd: bão, cháy...)" />
            <button className="btn btn-danger" type="button"><i className="fas fa-search"></i></button>
          </div>
        </form>
      </div>
    </div>

    <div className="card shadow-sm mb-4 border-0">
      <div className="card-header bg-white fw-bold border-bottom">CHUYÊN MỤC</div>
      <div className="list-group list-group-flush small">
        <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <span className="fw-bold text-danger"><i className="fas fa-exclamation-circle me-2"></i>Cảnh báo thiên tai</span>
          <span className="badge bg-danger rounded-pill">12</span>
        </a>
        <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <span><i className="fas fa-fire-extinguisher me-2"></i>Kỹ năng sinh tồn</span>
          <span className="badge bg-secondary rounded-pill">8</span>
        </a>
        <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <span><i className="fas fa-map-marker-alt me-2"></i>Điểm trú ẩn & Hậu cần</span>
          <span className="badge bg-secondary rounded-pill">5</span>
        </a>
        <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <span><i className="fas fa-users me-2"></i>Hoạt động tình nguyện</span>
          <span className="badge bg-secondary rounded-pill">20</span>
        </a>
      </div>
    </div>

    <div className="card shadow-sm mb-4 border-0">
      <div className="card-header bg-white fw-bold border-bottom">CHỦ ĐỀ ĐANG HOT</div>
      <div className="card-body">
        <div className="d-flex flex-wrap gap-2">
          <a href="#" className="btn btn-outline-danger btn-sm rounded-pill">#Bão_Số_1</a>
          <a href="#" className="btn btn-outline-dark btn-sm rounded-pill">#Sơ_cấp_cứu</a>
          <a href="#" className="btn btn-outline-dark btn-sm rounded-pill">#Hà_Nội</a>
          <a href="#" className="btn btn-outline-dark btn-sm rounded-pill">#Sạt_lở</a>
          <a href="#" className="btn btn-outline-primary btn-sm rounded-pill">#Tuyển_TNV</a>
        </div>
      </div>
    </div>

    <div className="card shadow-sm mb-4 border-0">
      <div className="card-header bg-white fw-bold border-bottom">ĐÁNG CHÚ Ý</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item p-3">
          <a href="#" className="text-decoration-none text-dark fw-bold d-block mb-1">Quy tắc "Tam giác vàng" khi xảy ra động đất</a>
          <small className="text-muted"><i className="far fa-eye me-1"></i> 5.000 lượt xem</small>
        </li>
        <li className="list-group-item p-3">
          <a href="#" className="text-decoration-none text-dark fw-bold d-block mb-1">Danh sách thuốc cần có trong túi sơ cứu gia đình</a>
          <small className="text-muted"><i className="far fa-eye me-1"></i> 3.200 lượt xem</small>
        </li>
      </ul>
    </div>

    <div className="card bg-primary text-white text-center p-4 shadow-sm border-0 rounded-3">
      <i className="fas fa-mobile-alt fa-3x mb-3"></i>
      <h5 className="fw-bold">TẢI APP SAR VIETNAM</h5>
      <p className="small opacity-75 mb-3">Nhận thông báo khẩn cấp ngay trên điện thoại.</p>
      <button className="btn btn-light text-primary fw-bold w-100">TẢI VỀ NGAY</button>
    </div>
  </div>
);

export default Sidebar;
