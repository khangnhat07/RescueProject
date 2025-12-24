import { useEffect, useState } from "react";
import { updateRequestAPI } from "../../service/api.service";

const UpdateRescueRequestModal = (props) => {
    // Các props nhận từ component cha
    const { show, handleClose, data } = props;

    const [address, setAddress] = useState("");
    const [detail, setDetail] = useState("");
    const [typeId, setTypeId] = useState("");

    useEffect(() => {
        if (data) {
            setAddress(data.address || "");
            setDetail(data.detail || "");
            setTypeId(data.type?.id || "");
        }
    }, [data, show]);

    const handleUpdateRequest = async () => {
        try {
            const res = await updateRequestAPI(data.id, address, detail, typeId);
            console.log("check res update:", res);
            if (res && res.status === "success") {
                alert("Cập nhật thông tin thành công!");
                handleClose(); // Đóng modal

            } else {
                alert("Có lỗi xảy ra khi cập nhật.");
            }

        } catch (error) {
            console.error("Lỗi update:", error);
            alert("Lỗi kết nối server.");
        }

        handleClose();
    }

    if (!show) return null;

    return (
        <>
            <div
                className="modal fade show d-block"
                style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1050 }}
                onClick={handleClose} // Đóng khi click ra ngoài
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    onClick={(e) => e.stopPropagation()} // Ngăn đóng modal khi click vào bên trong
                >
                    <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '20px' }}>

                        {/* Header: Giữ style SOS-header nhưng dạng Modal */}
                        <div className="modal-header bg-danger text-white border-0 py-3 px-4" style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
                            <div className="d-flex align-items-center">
                                <i className="fas fa-edit me-3 fa-lg"></i>
                                <div>
                                    <h5 className="fw-bold mb-0 text-uppercase ls-1">Cập Nhật Tin Hiệu</h5>
                                    <small className="opacity-75">Chỉnh sửa thông tin yêu cầu #{data?.id}</small>
                                </div>
                            </div>
                            <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
                        </div>

                        <div className="modal-body p-4 bg-white">
                            <form>
                                {/* VỊ TRÍ & TÌNH TRẠNG */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold small text-secondary text-uppercase mb-2">Vị trí hiện tại</label>
                                    <div className="input-group mb-3 shadow-sm">
                                        <button className="btn btn-danger" type="button">
                                            <i className="fas fa-location-crosshairs"></i> GPS
                                        </button>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tọa độ hoặc địa chỉ..."
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>

                                    <label className="form-label fw-bold small text-secondary text-uppercase mb-2">Loại cứu hộ</label>
                                    <select
                                        className="form-select mb-3 fw-bold text-danger bg-danger bg-opacity-10 border-danger shadow-sm"
                                        value={typeId}
                                        onChange={(e) => setTypeId(e.target.value)}
                                    >
                                        <option value="">Chọn loại cứu hộ</option>
                                        <option value="1">Lương thực</option>
                                        <option value="2">Cứu người</option>
                                        <option value="3">Y tế</option>
                                        <option value="4">Quần áo</option>
                                    </select>

                                    <label className="form-label fw-bold small text-secondary text-uppercase mb-2">Mô tả chi tiết tình hình</label>
                                    <textarea
                                        className="form-control bg-light border-0 shadow-sm"
                                        rows="4"
                                        placeholder="Mô tả chi tiết tình hình, số lượng người..."
                                        value={detail}
                                        onChange={(e) => setDetail(e.target.value)}
                                        style={{ borderRadius: '10px' }}
                                    />
                                </div>

                                {/* HÌNH ẢNH */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold small text-secondary text-uppercase mb-2">Hình ảnh hiện trường (Cập nhật mới)</label>
                                    <div className="input-group">
                                        <input type="file" className="form-control form-control-sm" id="updateFile" />
                                        <label className="input-group-text bg-light" htmlFor="updateFile">
                                            <i className="fas fa-camera"></i>
                                        </label>
                                    </div>
                                </div>

                                {/* NÚT LƯU */}
                                <div className="row g-2">
                                    <div className="col-6">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary w-100 py-2 fw-bold rounded-pill"
                                            onClick={handleClose}
                                        >
                                            HỦY BỎ
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button
                                            type="button"
                                            className="btn btn-danger w-100 py-2 fw-bold rounded-pill shadow-sm hover-scale"
                                            onClick={handleUpdateRequest}
                                        >
                                            <i className="fas fa-save me-2"></i>
                                            LƯU THÔNG TIN
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Footer nhỏ footer giống trang Create */}
                        <div className="modal-footer border-0 justify-content-center bg-white pb-4 pt-0">
                            <p className="small text-muted fst-italic mb-0">
                                <i className="fas fa-history me-1 text-primary"></i>
                                Thay đổi sẽ được cập nhật ngay lập tức.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Layer đảm bảo Modal luôn nổi lên trên */}
            <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
        </>
    );
};

export default UpdateRescueRequestModal;