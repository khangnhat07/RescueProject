import React from 'react';

const LiveFeed = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h6 className="text-danger fw-bold text-uppercase ls-1">Live Feed</h6>
            <h2 className="fw-bolder text-dark">Các Trường Hợp Cần Hỗ Trợ</h2>
          </div>
          <div className="dropdown">
            <button className="btn btn-outline-dark dropdown-toggle rounded-pill px-4" type="button" data-bs-toggle="dropdown">
              <i className="fas fa-filter me-2"></i>Lọc theo khu vực
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Miền Bắc</a></li>
              <li><a className="dropdown-item" href="#">Miền Trung</a></li>
              <li><a className="dropdown-item" href="#">Miền Nam</a></li>
            </ul>
          </div>
        </div>

        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-md-4">
            <div className="card rescue-card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="position-relative">
                <img src="https://images.unsplash.com/photo-1548685935-696752cb5aa8?q=80&w=2070&auto=format&fit=crop" className="card-img-top" style={{height: '220px', objectFit: 'cover'}} alt="Flood" />
                <span className="badge bg-danger position-absolute top-0 end-0 m-3 shadow">MỨC ĐỘ 1: KHẨN CẤP</span>
              </div>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-water text-info me-2"></i>
                  <small className="text-uppercase fw-bold text-secondary">Lũ lụt / Sạt lở</small>
                </div>
                <h5 className="card-title fw-bold mb-3">Cô lập tại Huyện Mù Cang Chải</h5>
                <p className="card-text text-muted small">
                  <i className="fas fa-map-pin me-1 text-danger"></i> Bản Nậm Khắt, Yên Bái<br/>
                  <i className="fas fa-info-circle me-1 text-primary"></i> 5 người mắc kẹt trên mái nhà, nước đang dâng.
                </p>
                <div className="d-grid gap-2 mt-4">
                  <button className="btn btn-danger fw-bold py-2 rounded-pill">
                    <i class="fas fa-paper-plane me-2"></i>ĐIỀU PHỐI ĐỘI CỨU HỘ
                  </button>
                </div>
              </div>
              <div className="card-footer bg-white border-top-0 px-4 pb-4">
                <small className="text-muted"><i className="far fa-clock me-1"></i>Cập nhật: 12 phút trước</small>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4">
            <div className="card rescue-card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="position-relative">
                <img src="https://images.unsplash.com/photo-1504505340624-9b2ee0382348?q=80&w=2071&auto=format&fit=crop" className="card-img-top" style={{height: '220px', objectFit: 'cover'}} alt="Lost" />
                <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-3 shadow">MỨC ĐỘ 2: TÌM KIẾM</span>
              </div>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-compass text-warning me-2"></i>
                  <small className="text-uppercase fw-bold text-secondary">Lạc đường / Rừng núi</small>
                </div>
                <h5 className="card-title fw-bold mb-3">Nhóm Trekking mất liên lạc</h5>
                <p className="card-text text-muted small">
                  <i className="fas fa-map-pin me-1 text-danger"></i> Vườn QG Bidoup, Lâm Đồng<br/>
                  <i className="fas fa-info-circle me-1 text-primary"></i> 3 người lớn, mất tín hiệu GPS từ tối qua.
                </p>
                <div className="d-grid gap-2 mt-4">
                  <button className="btn btn-outline-dark fw-bold py-2 rounded-pill">
                    <i className="fas fa-eye me-2"></i>THEO DÕI VỊ TRÍ
                  </button>
                </div>
              </div>
              <div className="card-footer bg-white border-top-0 px-4 pb-4">
                <small className="text-muted"><i className="far fa-clock me-1"></i>Cập nhật: 2 giờ trước</small>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4">
            <div className="card rescue-card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="position-relative">
                <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop" className="card-img-top" style={{height: '220px', objectFit: 'cover'}} alt="Medical" />
                <span className="badge bg-primary position-absolute top-0 end-0 m-3 shadow">MỨC ĐỘ 2: Y TẾ</span>
              </div>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-ambulance text-primary me-2"></i>
                  <small className="text-uppercase fw-bold text-secondary">Tai nạn giao thông</small>
                </div>
                <h5 className="card-title fw-bold mb-3">Va chạm liên hoàn QL1A</h5>
                <p className="card-text text-muted small">
                  <i className="fas fa-map-pin me-1 text-danger"></i> Đoạn qua Xuân Lộc, Đồng Nai<br/>
                  <i className="fas fa-info-circle me-1 text-primary"></i> Cần hỗ trợ xe cứu thương và nhóm máu O.
                </p>
                <div className="d-grid gap-2 mt-4">
                  <button className="btn btn-primary fw-bold py-2 rounded-pill">
                    <i className="fas fa-hand-sparkles me-2"></i>ĐĂNG KÝ HỖ TRỢ
                  </button>
                </div>
              </div>
              <div className="card-footer bg-white border-top-0 px-4 pb-4">
                <small className="text-muted"><i className="far fa-clock me-1"></i>Cập nhật: 35 phút trước</small>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LiveFeed;