import '@fortawesome/fontawesome-free/css/all.min.css';

import ManageFilterRequest from "./ManageFilterRequest";
import ManageRequestBody from "./ManageRequestBody";
import "./rescue.css"
import { fetchAllRequestAPI } from '../../service/api.service';
import { useEffect, useState } from 'react';
const ManageRequestPage = () => {

    const [dataRequest, setDataRequest] = useState([]);

    useEffect(() => {
        loadAllRequest();
    }, []);


    const loadAllRequest = async () => {
        const res = await fetchAllRequestAPI();

        setDataRequest(res.data);

        console.log("Data request: ", res.data);
    }

    return (
        <>
            <header className="page-header">
                <div className="container position-relative z-2">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h1 className="fw-bolder display-5 mb-0">Trang của đội cứu hộ</h1>
                            <p className="text-white-50 mt-2 mb-0 lead">Kết nối người gặp nạn và các đội cứu hộ tình nguyện trên toàn quốc.</p>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container pb-5">
                <div className="row g-4 justify-content-center">
                    <div className="col-lg-8">
                        <ManageFilterRequest loadAllRequest={loadAllRequest}
                            setDataRequest={setDataRequest} />
                        <ManageRequestBody dataRequest={dataRequest}
                            loadAllRequest={loadAllRequest} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageRequestPage;