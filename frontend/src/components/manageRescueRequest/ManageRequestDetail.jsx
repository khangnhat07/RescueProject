import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { acceptRequestAPI, cancelAcceptRequestAPI, completeAcceptRequestAPI, fetchRequestDetailByIdAPI } from "../../service/api.service";
import { useAuth } from '../../context/AuthContext';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const ManageRequestDetail = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const { user } = useAuth()

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

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

    const handleCompleteRequest = async () => {
        if (window.confirm(`Bạn xác nhận đã hoàn yêu cầu cứu hộ cho yêu cầu #${id}?`)) {
            setIsSubmitting(true);
            try {
                const res = await completeAcceptRequestAPI(id);
                if (res) {
                    alert("Hoàn thành yêu cầu thành công! Trạng thái đã chuyển sang Đã hoàn thành.");
                    await loadDetail(); // Tải lại dữ liệu để cập nhật giao diện (hiện nút tiếp nhận)
                }
            } catch (error) {
                console.error("Lỗi:", error);
                alert("Không thể hoàn thành.");
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
    const isInProcess = request.status === "IN_PROCESS";
    const isComplete = request.status === "COMPLETE";
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
                        <span className={`badge ${request.status === 'WAITING_ACCEPT' ? 'bg-danger' :
                            request.status === 'COMPLETE' ? 'bg-success' : 'bg-primary'
                            }`}>
                            {
                                request.status === 'WAITING_ACCEPT' ? 'Đang chờ' :
                                    request.status === 'COMPLETE' ? 'Đã hoàn thành' : 'Đang thực hiện'
                            }
                        </span>

                    </div>

                    <div className="d-flex gap-2">
                        {/* TH 1: Chưa có ai nhận */}
                        {isWaiting && (
                            <>
                                <button className="btn btn-success me-2" onClick={handleAcceptRequest}>
                                    <i className="fas fa-check-circle me-1"></i> Tiếp nhận cứu hộ
                                </button>
                            </>
                        )}

                        {/* TH 2: CHÍNH TÔI đã nhận -> Hiện nút Hủy và Cập nhật */}
                        {isProcessedByMe && !isComplete && (
                            <>
                                <button className="btn btn-danger me-2" onClick={handleCancelRequest}>
                                    <i className="fa-solid fa-ban me-2"></i>Hủy xử lý
                                </button>
                                <button className="btn btn-dark me-2" disabled>
                                    <i className="fas fa-user-check me-2"></i>Bạn đang xử lý
                                </button>
                            </>
                        )}
                        {/* TH 3: NGƯỜI KHÁC đã nhận -> Chỉ hiện thông báo, không cho bấm gì */}
                        {isProcessedByOther && (
                            <>
                                <div className="alert alert-warning mb-0 py-2 ">
                                    <i className="fas fa-info-circle me-2"></i>
                                    Nhân viên <strong>{request.rescuer.username}</strong> đang xử lý ca này
                                </div>
                            </>
                        )}

                        {isProcessedByMe && isComplete && (
                            <>
                                <button className="btn btn-dark me-2" disabled>
                                    <i className="fas fa-user-check me-2"></i>Bạn đã hoàn thành
                                </button>
                            </>
                        )}

                        <Link to={`/rescuer/rescue`}>
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

                            <div className="mt-3 pt-3 border-top d-flex justify-content-center">
                                {isProcessedByMe && isInProcess && (
                                    <>
                                        <button className="btn btn-success me-2" onClick={handleCompleteRequest}>
                                            <i class="fa-solid fa-check me-2"></i>Hoàn Thành
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ManageRequestDetail;