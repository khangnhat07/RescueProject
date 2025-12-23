import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRequestDetailByIdAPI } from "../../service/api.service";
import { Link } from "react-router-dom";
import UpdateRequestModal from "./UserUpdateRequest";
import UpdateRescueRequestModal from "./UserUpdateRequest";
import { useAuth } from "../../context/AuthContext";

const UserRequestDetail = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const { user } = useAuth()

    // 1. State cho Modal và Form
    const [showUpdateModal, setShowUpdateModal] = useState(false);

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

    useEffect(() => {
        loadDetail();
    }, [id]);

    const loadDetail = async () => {
        const res = await fetchRequestDetailByIdAPI(id);

        setRequest(res.data);

        console.log("Data request: ", res.data);

    };

    const handleCancelRequest = async () => {
        alert("Đã hủy.");
    }



    if (!request) {
        return <div>Đang tải...</div>;
    }

    // --- LOGIC KIỂM TRA QUYỀN ---
    // console.log("Dữ liệu User đang đăng nhập:", user);
    // console.log("Dữ liệu User đang đăng nhập:", request.victim);
    const isPostByMe = request.victim && request.victim.email === user?.email;
    const isPostByOther = request.victim && request.victim.email !== user?.email;

    return (
        <>
            {/* Thêm wrapper này nếu muốn căn giữa toàn trang theo chiều dọc */}
            <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        {/* Bắt đầu Column 8 - Tất cả nội dung nên nằm trong này */}
                        <div className="col-lg-8">

                            {/* Header Section: Bây giờ đã nằm trong col-lg-8 */}
                            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                                <div>
                                    <h4 className="mb-1">
                                        Yêu cầu # {id}
                                    </h4>
                                    <p className="text-muted mb-0">Thời gian báo: {request.datetime} </p>
                                </div>

                                <div className="d-flex gap-2">


                                    {/* TH 1: CHÍNH TÔI đã tạo -> Hiện nút Hủy và Cập nhật */}
                                    {isPostByMe && (
                                        <>
                                            <button className="btn btn-danger" onClick={handleCancelRequest}>
                                                <i className="fa-solid fa-ban me-2"></i>Hủy yêu cầu
                                            </button>
                                            <button onClick={() => setShowUpdateModal(true)} className="btn btn-warning">
                                                <i className="fa-solid fa-pen-to-square me-2"></i>Cập nhật
                                            </button>
                                            <Link to={`/user/rescue`}>
                                                <button className="btn btn-outline-secondary">
                                                    <i className="fa-solid fa-arrow-left me-2"></i>Trở về
                                                </button>
                                            </Link>
                                        </>
                                    )}

                                    {/* TH 3: NGƯỜI KHÁC tạo ->  không cho bấm gì */}
                                    {isPostByOther && (
                                        <Link to={`/user/rescue`}>
                                            <button className="btn btn-outline-secondary">
                                                <i className="fa-solid fa-arrow-left me-2"></i>Trở về
                                            </button>
                                        </Link>
                                    )}

                                    {/* <button onClick={() => setShowUpdateModal(true)} className="btn btn-danger rounded-pill px-4 shadow-sm">
                                        <i className="fa-solid fa-pen-to-square me-2"></i>Cập nhật
                                    </button>
                                    <Link to={`/user/rescue`}>
                                        <button className="btn btn-success rounded-pill px-4 shadow-sm">
                                            <i className="fa-solid fa-arrow-left me-2"></i> Trở về
                                        </button>
                                    </Link> */}
                                </div>
                            </div>

                            {/* Map Card */}
                            <div className="rescue-card mb-4 shadow-sm border-0">
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
                                    <p className="mb-0 text-muted small">Tọa độ: 21.0285, 105.8542</p>
                                </div>
                            </div>

                            {/* Description Card */}
                            <div className="rescue-card bg-white p-4 shadow-sm border-0 rounded">
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
                                    <img src="https://placehold.co/100" className="rounded border" alt="Ảnh 1" />
                                    <img src="https://placehold.co/100" className="rounded border" alt="Ảnh 2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <UpdateRescueRequestModal
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                data={request}
            />
        </>
    )

}

export default UserRequestDetail;