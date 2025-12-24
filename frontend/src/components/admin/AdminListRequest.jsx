import { deleteRequestAPI } from "../../service/api.service";
import "./adminRescue.css";
import { Link } from "react-router-dom";
const AdminListRequest = (props) => {

    const { dataRequest, loadAllRequest } = props;

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

    const deleteRequest = async (id) => {
        const isConfirm = window.confirm(`Bạn có chắc chắn muốn hủy yêu cầu #${id} không?`);

        if (isConfirm) {
            try {
                const res = await deleteRequestAPI(id);
                console.log("Check kết quả res trả về: ", res);

                if (res && res.data.status === "success") {
                    alert("Hủy yêu cầu thành công!");
                    loadAllRequest();

                } else {
                    alert(res.message || "Hủy yêu cầu thất bại!");
                }
            } catch (error) {
                console.error("Lỗi xóa:", error);
                alert("Lỗi kết nối hệ thống.");
            }
        }
    };

    return (
        <>
            <div className="row g-3 mb-4">
                {/* Đang chờ đợi */}
                <div className="col-6 col-md-3">
                    <div className="card stat-card bg-white p-3 h-100 border-0 shadow-sm">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h6 className="text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.65rem' }}>
                                    Đang chờ đợi
                                </h6>
                                <h2 className="fw-bolder text-danger mb-0">05</h2>
                            </div>
                            <div className="icon-box bg-danger bg-opacity-10 text-danger d-none d-sm-flex">
                                <i className="fas fa-exclamation-triangle"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Đang cứu */}
                <div className="col-6 col-md-3">
                    <div className="card stat-card bg-white p-3 h-100 border-0 shadow-sm">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h6 className="text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.65rem' }}>
                                    Đang cứu
                                </h6>
                                <h2 className="fw-bolder text-primary mb-0">12</h2>
                            </div>
                            <div className="icon-box bg-primary bg-opacity-10 text-primary d-none d-sm-flex">
                                <i className="fas fa-ambulance"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Xong */}
                <div className="col-6 col-md-3">
                    <div className="card stat-card bg-white p-3 h-100 border-0 shadow-sm">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h6 className="text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.65rem' }}>
                                    Xong
                                </h6>
                                <h2 className="fw-bolder text-success mb-0">48</h2>
                            </div>
                            <div className="icon-box bg-success bg-opacity-10 text-success d-none d-sm-flex">
                                <i className="fas fa-check-double"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lực lượng */}
                <div className="col-6 col-md-3">
                    <div className="card stat-card bg-white p-3 h-100 border-0 shadow-sm">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h6 className="text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.65rem' }}>
                                    Lực lượng
                                </h6>
                                <h2 className="fw-bolder text-dark mb-0">8/15</h2>
                            </div>
                            <div className="icon-box bg-dark bg-opacity-10 text-dark d-none d-sm-flex">
                                <i className="fas fa-users"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Danh sách yêu cầu cứu hộ */}
            <div className="card table-card mb-4 border-0 shadow-sm">

                <div className="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">
                        <i className="fas fa-list-alt me-2 text-primary"></i>Danh sách tin báo SOS
                    </h5>
                    <div className="d-flex gap-2">
                        <input
                            type="text"
                            className="form-control form-control-sm rounded-pill"
                            placeholder="Tìm kiếm SĐT, Tên..."
                        />
                        <select className="form-select form-select-sm rounded-pill" style={{ width: '150px' }}>
                            <option>Tất cả</option>
                            <option>Chưa xử lý</option>
                            <option>Đang xử lý</option>
                        </select>
                    </div>
                </div>

                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="ps-4" style={{ width: '12%' }}>ID / Thời gian</th>
                                    <th style={{ width: '22%' }}>Người báo tin</th>
                                    <th>Vị trí</th>
                                    <th>Trạng thái</th>
                                    <th style={{ width: '22%' }}>Đội phụ trách</th>
                                    <th className="text-end pe-4">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataRequest.map((item, index) => (
                                    <tr key={index} className="bg-danger bg-opacity-10">
                                        <td className="ps-4">
                                            <div className="fw-bold">{item.id}</div>
                                            <small className="text-muted">{item.datetime}</small>
                                        </td>
                                        <td>
                                            <div className="small fw-bold">{item.victim.username}</div>
                                            <div className="small text-muted">
                                                <i className="fas fa-phone me-1"></i>{item.victim.phone}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="small fw-bold">{item.address}</div>

                                        </td>

                                        <td><span className={getStatusClass(item.status)}>{item.status}</span></td>
                                        <td>
                                            {item.rescuer?.username ? (
                                                <div className="fw-bold text-dark">
                                                    <i className="fas fa-user-shield me-1"></i> {item.rescuer.username}
                                                </div>
                                            ) : (
                                                <span className="text-muted fst-italic">Chưa có đội nhận</span>
                                            )}
                                        </td>
                                        <td className="text-end pe-4">
                                            <Link to={`/admin/detail-request/${item.id}`}>
                                                <button className="btn btn-sm btn-primary rounded-pill px-3" data-bs-toggle="modal" data-bs-target="#detailModal">
                                                    <i className="fas fa-eye me-1"></i> Xem
                                                </button>
                                            </Link>
                                            <button className="btn btn-sm btn-outline-danger rounded-pill ms-1"
                                                title="Xóa tin rác"
                                                onClick={() => deleteRequest(item.id)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className="card-footer bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                    <small className="text-muted">Hiển thị 3 trên 50 tin báo</small>
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className="page-item active">
                                <button className="page-link bg-dark border-dark text-white">1</button>
                            </li>
                            <li className="page-item">
                                <button className="page-link text-dark">2</button>
                            </li>
                            <li className="page-item">
                                <button className="page-link text-dark">3</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </>
    );

};
export default AdminListRequest