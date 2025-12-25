import { useParams } from "react-router-dom";
import "./adminRescue.css";
import { useEffect, useState } from "react";
import { fetchRequestDetailByIdAPI } from "../../service/api.service";
import { Link } from "react-router-dom";


const AdminRequestDetail = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        loadDetail();
    }, [id]);

    const getStatusClass = (status) => {
        switch (status) {
            case "COMPLETE":
                return "status-badge st-done"; // xanh lá
            case "IN_PROCESS":
                return "status-badge st-processing"; // xanh biển
            case "WAITING_ACCEPT":
                return "status-badge st-waiting"; // đỏ
            default:
                return "status-badge st-waiting";
        }
    };

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
                        <Link to={`/admin/rescue`}>
                            <button className="btn btn-outline-secondary me-2">
                                <i className="fa-solid fa-arrow-left me-2"></i>Trở về
                            </button>
                        </Link>
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
                                    <label className="text-muted small">Người đăng / Số điện thoại</label>
                                    <div className="small fw-bold">{request.victim.username}</div>
                                    <div className="small text-muted">
                                        <i className="fas fa-phone me-1"></i>{request.victim.phone}
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="text-muted small">Trạng thái</label>
                                    <div className={`fw-bold ${getStatusClass(request.status)}`}>{request.status}</div>
                                </div>
                            </div>
                            <div className="alert alert-danger border-danger">
                                <strong><i className="fa-solid fa-circle-info me-2"></i>Chi tiết:</strong> {request.detail}
                            </div>



                            <h6 className="mt-3">Hình ảnh hiện trường</h6>
                            <div className="d-flex gap-2 mt-2">
                                {request.image ? (
                                    // Nếu có ảnh từ Database (Cloudinary link)
                                    <div className="position-relative">
                                        <img
                                            src={request.image}
                                            className="rounded border shadow-sm"
                                            alt="Ảnh hiện trường"
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                objectFit: 'cover',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => window.open(request.image, '_blank')} // Nhấn vào để xem ảnh phóng to
                                        />
                                        <small className="d-block text-center text-muted mt-1">Ấn vào ảnh để xem rõ hơn</small>
                                    </div>
                                ) : (
                                    // Nếu không có ảnh
                                    <div className="text-muted fst-italic p-3 border rounded bg-light w-100 text-center">
                                        <i className="fa-regular fa-image me-2"></i>
                                        Người đăng không cung cấp hình ảnh hiện trường.
                                    </div>
                                )}
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
                                <li className={`timeline-item ${request.status === 'COMPLETE' ? 'active' : 'opacity-50'}`}>
                                    <div className={`fw-bold ${request.status === 'COMPLETE' ? 'text-success' : ''}`}>
                                        Đã hoàn thành
                                    </div>
                                    <div className="timeline-time">
                                        {request.status === 'COMPLETE' ? 'Đã xong' : '--:--'}
                                    </div>
                                </li>

                                {/* BƯỚC 2: TIẾP NHẬN & THỰC HIỆN */}
                                <li className={`timeline-item ${(request.status === 'IN_PROCESS' || request.status === 'COMPLETE') ? 'active' : 'opacity-50'}`}>
                                    <div className={`fw-bold ${request.status === 'IN_PROCESS' ? 'text-primary' : ''}`}>
                                        Đội cứu hộ đang xử lý
                                    </div>
                                    <div className="timeline-time">
                                        {(request.status === 'IN_PROCESS' || request.status === 'COMPLETE') ? 'Đang thực hiện' : '--:--'}
                                    </div>
                                </li>

                                {/* BƯỚC 1: GỬI YÊU CẦU  */}
                                <li className="timeline-item active">
                                    <div className="fw-bold">Yêu cầu đã được gửi</div>
                                    <div className="timeline-time">{request.datetime}</div>
                                </li>
                            </ul>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminRequestDetail;