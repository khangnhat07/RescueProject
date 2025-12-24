import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { acceptRequestAPI, cancelAcceptRequestAPI, fetchRequestDetailByIdAPI } from "../../service/api.service";
import { useAuth } from '../../context/AuthContext';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const ManageRequestDetail = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const { user } = useAuth()

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Hàm xử lý khi bấm nút Chat
    const handleChatClick = () => {
        navigate(`/chat/${id}`); 
    };

    useEffect(() => {
        loadDetail();
    }, [id]);

    const loadDetail = async () => {
        const res = await fetchRequestDetailByIdAPI(id);

        setRequest(res.data);

        console.log("Data request: ", res.data);
    };

    const handleAcceptRequest = async () => {
        if (window.confirm(`Bạn xác nhận tiếp nhận cứu hộ cho yêu cầu #${id}?`)) {
            setIsSubmitting(true);
            try {
                const res = await acceptRequestAPI(id);
                if (res) {
                    alert("Tiếp nhận thành công! Trạng thái đã chuyển sang Đang xử lý.");
                    await loadDetail(); // Tải lại dữ liệu để cập nhật giao diện (ẩn nút tiếp nhận)
                }
            } catch (error) {
                console.error("Lỗi tiếp nhận:", error);
                alert("Không thể tiếp nhận. Có thể yêu cầu đã có người khác nhận hoặc lỗi kết nối.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleCancelRequest = async () => {
        if (window.confirm(`Bạn xác nhận hủy tiếp nhận cứu hộ cho yêu cầu #${id}?`)) {
            setIsSubmitting(true);
            try {
                const res = await cancelAcceptRequestAPI(id);
                if (res) {
                    alert("Hủy tiếp nhận thành công! Trạng thái đã chuyển sang Đang chờ.");
                    await loadDetail(); // Tải lại dữ liệu để cập nhật giao diện (hiện nút tiếp nhận)
                }
            } catch (error) {
                console.error("Lỗi hủy:", error);
                alert("Không thể hủy.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };


    if (!request) {
        return <div>Đang tải...</div>;
    }

    // --- LOGIC KIỂM TRA QUYỀN ---
    // console.log("Dữ liệu User đang đăng nhập:", user);
    const isWaiting = request.status === "WAITING_ACCEPT";
    const isProcessedByMe = request.rescuer && request.rescuer.email === user?.email;
    const isProcessedByOther = request.rescuer && request.rescuer.email !== user?.email;


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
                        <span className={`badge ${request.status === 'WAITING_ACCEPT' ? 'bg-danger' : 'bg-primary'}`}>
                            {request.status === 'WAITING_ACCEPT' ? 'Đang chờ' : 'Đang thực hiện'}
                        </span>

                    </div>

                    <div className="d-flex gap-2">
                        {/* TH 1: Chưa có ai nhận */}
                        {isWaiting && (
                            <>
                                <button className="btn btn-success me-2" onClick={handleAcceptRequest}>
                                    <i className="fas fa-check-circle me-1"></i> Tiếp nhận cứu hộ
                                </button>
                                <Link to={`/rescuer/rescue`}>
                                    <button className="btn btn-outline-secondary me-2">
                                        <i className="fa-solid fa-arrow-left me-2"></i>Trở về
                                    </button>
                                </Link>
                            </>
                        )}

                        {/* TH 2: CHÍNH TÔI đã nhận -> Hiện nút Hủy và Cập nhật */}
                        {isProcessedByMe && (
                            <>
                                <button className="btn btn-danger me-2" onClick={handleCancelRequest}>
                                    <i className="fa-solid fa-ban me-2"></i>Hủy xử lý
                                </button>
                                <button className="btn btn-dark me-2" disabled>
                                    <i className="fas fa-user-check me-2"></i>Bạn đang xử lý
                                </button>
                                <Link to={`/rescuer/rescue`}>
                                    <button className="btn btn-outline-secondary me-2">
                                        <i className="fa-solid fa-arrow-left me-2"></i>Trở về
                                    </button>
                                </Link>
                            </>
                        )}
                        {/* TH 3: NGƯỜI KHÁC đã nhận -> Chỉ hiện thông báo, không cho bấm gì */}
                        {isProcessedByOther && (
                            <>
                                <div className="alert alert-warning mb-0 py-2 ">
                                    <i className="fas fa-info-circle me-2"></i>
                                    Nhân viên <strong>{request.rescuer.username}</strong> đang xử lý ca này
                                </div>
                                <Link to={`/rescuer/rescue`}>
                                    <button className="btn btn-outline-secondary">
                                        <i className="fa-solid fa-arrow-left me-2"></i>Trở về
                                    </button>
                                </Link>
                            </>
                        )}
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
                                    <button className="btn btn-outline-secondary" onClick={handleChatClick}>
                                        <i className="fas fa-comment-alt me-2" ></i>Nhắn tin
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