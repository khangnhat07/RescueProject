import { Link } from "react-router-dom";
import { acceptRequestAPI } from "../../service/api.service";
const ManageRequestBody = (props) => {

    const { dataRequest, loadAllRequest } = props;
    const handleAccept = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn tiếp nhận ca cứu hộ này không?")) {
            try {
                const res = await acceptRequestAPI(id);
                if (res) {
                    alert("Tiếp nhận thành công! Hãy di chuyển đến vị trí nạn nhân.");
                    if (loadAllRequest) await loadAllRequest(); // Gọi lại hàm fetch ở component cha
                }
            } catch (error) {
                console.error("Lỗi khi tiếp nhận:", error);
                alert("Không thể tiếp nhận. Có thể yêu cầu này đã được người khác nhận.");
            }
        }
    };

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

    const getIconStatusClass = (status) => {
        switch (status) {
            case "COMPLETE":
                return "fas fa-check-circle me-1"; // xanh lá
            case "IN_PROCESS":
                return "fas fa-spinner fa-spin me-1"; // xanh biển
            case "WAITING_ACCEPT":
                return "fas fa-exclamation-circle me-1"; // đỏ
            default:
                return "fas fa-exclamation-circle me-1";
        }
    };

    const getAddressColorClass = (status) => {
        switch (status) {
            case "COMPLETE":
                return "text-success"; // xanh lá
            case "IN_PROCESS":
                return "text-primary"; // xanh biển
            case "WAITING_ACCEPT":
                return "text-danger"; // đỏ
            default:
                return "text-secondary";
        }
    };
    return (
        <div className="case-feed">
            {dataRequest.map((item, index) => (
                <div key={index} className="feed-card p-4">
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
                            ${item.status === "WAITING_ACCEPT" ? "text-danger" : "text-secondary"}`}
                            disabled={item.status !== "WAITING_ACCEPT"}
                            onClick={() => handleAccept(item.id)} // Gắn sự kiện vào đây
                        >
                            <i className="fas fa-hand-holding-heart me-2"></i>
                            {item.status === "WAITING_ACCEPT" ? "Ứng cứu" : "Đã tiếp nhận"}
                        </button>
                        <Link to={`/rescuer/detail-request/${item.id}`}>
                            <button className="btn btn-sm btn-light text-secondary fw-bold rounded-pill px-3"> <i className="fa-solid fa-eye me-2"></i>Xem chi tiết</button>
                        </Link>
                    </div>
                </div>

            ))}

        </div>
    )

}

export default ManageRequestBody;