
const ManageRequestBody = () => {
    return (
        <div className="case-feed">
            <div className="feed-card p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center">
                        <div className="avatar-circle bg-secondary me-3">H</div>
                        <div>
                            <h6 className="fw-bold mb-0 text-dark">Hoàng Văn *** <small className="text-muted fw-normal ms-1">(090***889)</small></h6>
                            <small className="text-muted"><i className="fas fa-globe-asia me-1"></i>10 phút trước</small>
                        </div>
                    </div>
                    <span className="status-badge st-waiting"><i className="fas fa-exclamation-circle me-1"></i>Đang chờ tiếp nhận</span>
                </div>
                <div className="mb-3">
                    <h6 className="fw-bold text-danger mb-2"><i className="fas fa-map-marker-alt me-2"></i>Mù Cang Chải, Yên Bái</h6>
                    <p className="mb-0 text-secondary">Gia đình tôi có 5 người bị kẹt do nước lũ dâng cao. Có 1 người già 70 tuổi sức khỏe yếu. Hiện tại nước đã ngập đến cửa sổ tầng 1. Xin hãy cứu giúp, chúng tôi đang ở trên mái nhà!</p>
                </div>
                <div className="d-flex gap-3 pt-3 border-top">
                    <button className="btn btn-sm btn-light text-danger fw-bold rounded-pill px-3"><i className="fas fa-hand-holding-heart me-2"></i>Ứng cứu</button>
                    <button className="btn btn-sm btn-light text-secondary fw-bold rounded-pill px-3"><i className="far fa-comment me-2"></i>Bình luận (2)</button>
                    <button className="btn btn-sm btn-light text-secondary fw-bold rounded-pill px-3"><i className="fas fa-share me-2"></i>Chia sẻ</button>
                </div>
            </div>

            <div className="feed-card p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center">
                        <div className="avatar-circle bg-primary me-3">T</div>
                        <div>
                            <h6 className="fw-bold mb-0 text-dark">Trần Thu *** <small className="text-muted fw-normal ms-1">(091***555)</small></h6>
                            <small className="text-muted"><i className="fas fa-globe-asia me-1"></i>30 phút trước</small>
                        </div>
                    </div>
                    <span className="status-badge st-processing"><i className="fas fa-spinner fa-spin me-1"></i>Đội cứu hộ đang đến</span>
                </div>
                <div className="mb-3">
                    <h6 className="fw-bold text-dark mb-2"><i className="fas fa-map-marker-alt me-2 text-primary"></i>QL1A, Đoạn qua Xuân Lộc, Đồng Nai</h6>
                    <p className="mb-0 text-secondary">Tai nạn giao thông liên hoàn, cần hỗ trợ y tế gấp. Đã có người bị thương nặng, cần xe cứu thương và dụng cụ sơ cứu.</p>
                </div>
                <div className="alert bg-primary bg-opacity-10 border-0 rounded-3 d-flex align-items-center py-2 px-3 mb-3">
                    <i className="fas fa-shield-alt text-primary me-2 fa-lg"></i>
                    <div className="small">
                        <strong>SAR Vietnam:</strong> Đội cứu hộ số 3 (Đội trưởng Hùng) đã nhận tin và đang di chuyển. Dự kiến đến trong 10 phút.
                    </div>
                </div>
                <div className="d-flex gap-3 pt-3 border-top">
                    <button className="btn btn-sm btn-light text-primary fw-bold rounded-pill px-3"><i className="fas fa-eye me-2"></i>Theo dõi</button>
                    <button className="btn btn-sm btn-light text-secondary fw-bold rounded-pill px-3"><i className="far fa-comment me-2"></i>Bình luận (15)</button>
                </div>
            </div>

            <div className="feed-card p-4 opacity-75">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center">
                        <div className="avatar-circle bg-success me-3">L</div>
                        <div>
                            <h6 className="fw-bold mb-0 text-dark">Lê Văn *** <small className="text-muted fw-normal ms-1">(098***123)</small></h6>
                            <small className="text-muted"><i className="fas fa-globe-asia me-1"></i>2 giờ trước</small>
                        </div>
                    </div>
                    <span className="status-badge st-done"><i className="fas fa-check-circle me-1"></i>Đã an toàn</span>
                </div>
                <div className="mb-3">
                    <h6 className="fw-bold text-dark mb-2"><i className="fas fa-map-marker-alt me-2 text-success"></i>Lạc Dương, Lâm Đồng</h6>
                    <p className="mb-0 text-secondary">Nhóm phượt lạc đường 3 người đã được tìm thấy và đưa về trạm kiểm lâm an toàn. Cảm ơn đội cứu hộ và cộng đồng rất nhiều!</p>
                </div>
                <div className="d-flex gap-3 pt-3 border-top">
                    <span className="text-success small fw-bold"><i className="fas fa-heart me-1"></i> 56 người thả tim</span>
                </div>
            </div>

        </div>
    )

}

export default ManageRequestBody;