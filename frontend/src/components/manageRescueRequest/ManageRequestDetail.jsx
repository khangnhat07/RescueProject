import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRequestDetailByIdAPI } from "../../service/api.service";


const ManageRequestDetail = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        loadDetail();
    }, [id]);

    const loadDetail = async () => {
        const res = await fetchRequestDetailByIdAPI(id);

        setRequest(res.data);

        console.log("Data request: ", res.data);
    };
    if (!request) {
        return <div>Đang tải...</div>;
    }
    return (
        <>
            <div className="container">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <div>
                        <h4 className="mb-1">
                            Yêu cầu # {id}
                        </h4>
                        <p className="text-muted mb-0">Thời gian báo: {request.datetime} </p>

                    </div>

                    <div className="mt-2 mt-md-0">
                        <button className="btn btn-outline-danger me-2">
                            <i className="fas fa-times"></i> Từ chối
                        </button>
                        <button className="btn btn-success">
                            <i className="fas fa-check-circle"></i> Tiếp nhận cứu hộ
                        </button>
                    </div>
                </div>

                <div className="row">
                    {/* Left Column */}
                    <div className="col-lg-8">
                        {/* Map Card */}
                        <div className="rescue-card mb-4">
                            <div className="card-header-custom">
                                <span><i className="fas fa-map-marker-alt text-danger me-2"></i>Vị trí hiện tại</span>
                                <a href="#" className="btn btn-sm btn-outline-primary">Mở Google Maps</a>
                            </div>
                            <div className="map-container">
                                <img
                                    src="https://placehold.co/800x300/e9ecef/adb5bd?text=Bản+Đồ+Vị+Trí+Của+User"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    alt="map"
                                />
                                <i className="fas fa-map-marker-alt map-marker"></i>
                            </div>
                            <div className="p-3 bg-white">
                                <p className="mb-1"><strong>Địa chỉ:</strong> {request.address}</p>
                                <p className="mb-0 text-muted"><small>Tọa độ: 21.0285, 105.8542 (Độ chính xác: ~10m)</small></p>
                            </div>
                        </div>

                        {/* Description Card */}
                        <div className="rescue-card bg-white p-4">
                            <h5 className="mb-3">Mô tả tình trạng</h5>
                            <div className="row mt-4">
                                <div className="col-md-4 mb-3">
                                    <label className="text-muted small">Loại sự cố</label>
                                    <div className="fw-bold">{request.type.name}</div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="text-muted small">Số lượng người</label>
                                    <div className="fw-bold">1 người</div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="text-muted small">Yêu cầu y tế</label>
                                    <div className="fw-bold text-success">Không nguy kịch</div>
                                </div>
                            </div>
                            <div className="alert alert-danger border-danger">
                                <strong><i className="fa-solid fa-circle-info me-2"></i>Chi tiết:</strong> {request.detail}
                            </div>



                            <h6 className="mt-3">Hình ảnh hiện trường</h6>
                            <div className="d-flex gap-2 mt-2">
                                <img src="https://placehold.co/100" className="rounded border" alt="Ảnh 1" />
                                <img src="https://placehold.co/100" className="rounded border" alt="Ảnh 2" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-lg-4">
                        {/* Reporter Info */}
                        <div className="rescue-card bg-white mb-4">
                            <div className="card-header-custom">Thông tin người báo</div>
                            <div className="p-3 text-center">
                                <img
                                    src="https://placehold.co/100x100/png?text=User"
                                    className="user-avatar mb-3"
                                    alt="avatar"
                                />
                                <h5 className="fw-bold">{request.victim.username}</h5>
                                <div className="d-grid gap-2">
                                    <a href="tel:0901234567" className="btn btn-primary">
                                        <i className="fas fa-phone-alt me-2"></i>Gọi điện ({request.victim.phone})
                                    </a>
                                    <button className="btn btn-outline-secondary">
                                        <i className="fas fa-comment-alt me-2"></i>Nhắn tin
                                    </button>
                                </div>
                            </div>
                            <div className="border-top p-3 bg-light text-muted small">
                                <div><i className="fa-solid fa-house me-2"></i>Địa chỉ: <strong>{request.victim.address}</strong></div>
                            </div>
                        </div>

                        {/* Timeline & Update */}
                        <div className="rescue-card bg-white p-3">
                            <h6 className="mb-3">Tiến độ xử lý</h6>
                            <ul className="timeline">
                                <li className="timeline-item">
                                    <div className="fw-bold text-success">Đã hoàn thành</div>
                                    <div className="timeline-time">--:--</div>
                                </li>
                                <li className="timeline-item">
                                    <div className="fw-bold text-primary">Đang di chuyển đến</div>
                                    <div className="timeline-time">--:--</div>
                                </li>
                                <li className="timeline-item">
                                    <div className="fw-bold">Đội cứu hộ tiếp nhận</div>
                                    <div className="timeline-time">--:--</div>
                                </li>
                                <li className="timeline-item">
                                    <div className="fw-bold">Người dùng gửi Yêu cầu</div>
                                    <div className="timeline-time">10:30 AM</div>
                                </li>
                            </ul>

                            <div className="mt-3 pt-3 border-top">
                                <label className="form-label small fw-bold">Cập nhật trạng thái:</label>
                                <select className="form-select form-select-sm mb-2">
                                    <option>Đang di chuyển đến hiện trường</option>
                                    <option>Đã đến nơi</option>
                                    <option>Đang sơ cứu</option>
                                </select>
                                <button className="btn btn-sm btn-dark w-100">Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ManageRequestDetail;