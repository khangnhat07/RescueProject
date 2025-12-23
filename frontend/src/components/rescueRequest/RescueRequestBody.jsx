import { Link } from "react-router-dom";

const RescueRequestBody = (props) => {

    const { dataRequest } = props;

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
        <>
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
                        <div className="d-fle pt-3 border-top">
                            <Link to={`/user/detail-request/${item.id}`}>
                                <button className="btn btn-sm btn-light text-secondary fw-bold rounded-pill px-3"> <i className="fa-solid fa-eye me-2"></i>Xem chi tiết</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>


            <nav className="mt-5">
                <ul className="pagination justify-content-center">
                    <li className="page-item disabled"><a className="page-link" href="#"><i className="fas fa-chevron-left"></i></a></li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#"><i className="fas fa-chevron-right"></i></a></li>
                </ul>
            </nav>
        </>
    )

}

export default RescueRequestBody;