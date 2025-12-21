import { Link } from "react-router-dom";
const ManageRequestBody = (props) => {

    const { dataRequest } = props;

    const getStatusClass = (status) => {
        switch (status) {
            case "Hoàn thành":
                return "status-badge st-done"; // xanh lá
            case "Đội cứu hộ đang đến":
                return "status-badge st-processing"; // xanh biển
            case "Đang chờ tiếp nhận":
                return "status-badge st-waiting"; // đỏ
            default:
                return "status-badge st-waiting";
        }
    };

    const getIconStatusClass = (status) => {
        switch (status) {
            case "Hoàn thành":
                return "fas fa-check-circle me-1"; // xanh lá
            case "Đội cứu hộ đang đến":
                return "fas fa-spinner fa-spin me-1"; // xanh biển
            case "Đang chờ tiếp nhận":
                return "fas fa-exclamation-circle me-1"; // đỏ
            default:
                return "fas fa-exclamation-circle me-1";
        }
    };

    const getAddressColorClass = (status) => {
        switch (status) {
            case "Hoàn thành":
                return "text-success"; // xanh lá
            case "Đội cứu hộ đang đến":
                return "text-primary"; // xanh biển
            case "Đang chờ tiếp nhận":
                return "text-danger"; // đỏ
            default:
                return "text-secondary";
        }
    };
    return (
        <div className="case-feed">
            {dataRequest.map((item, index) => (
                <div className="feed-card p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center">
                            <div className="avatar-circle bg-secondary me-3">H</div>
                            <div>
                                <h6 className="fw-bold mb-0 text-dark">{item.victim.username}<small className="text-muted fw-normal ms-1">{item.victim.phone}</small></h6>
                                <small className="text-muted"><i className="fas fa-globe-asia me-1"></i>{item.datetime}</small>
                            </div>
                        </div>
                        <span className={getStatusClass(item.status)}><i className={getIconStatusClass(item.status)}></i>{item.status}</span>
                    </div>
                    <div className="mb-3">
                        <h6 className={`fw-bold mb-2 ${getAddressColorClass(item.status)}`}><i className="fas fa-map-marker-alt me-2"></i>{item.address}</h6>
                        <p className="mb-0 text-secondary">{item.detail}</p>
                    </div>
                    <div className="d-flex justify-content-between pt-3 border-top">
                        <button
                            className={`btn btn-sm btn-light fw-bold rounded-pill px-3 
                            ${item.status === "Đang chờ tiếp nhận" ? "text-danger" : "text-secondary"}`}
                            disabled={item.status !== "Đang chờ tiếp nhận"}
                        >
                            <i className="fas fa-hand-holding-heart me-2"></i>
                            Ứng cứu
                        </button>
                        <Link to={`/rescuer/detail-request/${item.id}`}>
                            <button className="btn btn-sm btn-light text-secondary fw-bold rounded-pill px-3"> <i class="fa-solid fa-eye me-2"></i>Xem chi tiết</button>
                        </Link>
                    </div>
                </div>

            ))}

        </div>
    )

}

export default ManageRequestBody;