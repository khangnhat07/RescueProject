import '@fortawesome/fontawesome-free/css/all.min.css';

import ManageFilterRequest from "./ManageFilterRequest";
import ManageRequestBody from "./ManageRequestBody";
import "./rescue.css"
const ManageRequestPage = () => {

    return (
        <>
            <header className="page-header">
                <div className="container position-relative z-2">
                    <div claclassNamess="row align-items-center">
                        <div className="col-lg-8">
                            <h1 className="fw-bolder display-5 mb-0">Trang của đội cứu hộ</h1>
                            <p className="text-white-50 mt-2 mb-0 lead">Kết nối người gặp nạn và các đội cứu hộ tình nguyện trên toàn quốc.</p>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container pb-5">
                <div className="row g-4">
                    <div className="col-lg-4" id="sosForm">

                    </div>

                    <div className="col-lg-8">
                        <ManageFilterRequest />
                        <ManageRequestBody />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageRequestPage;