import "./rescue.css"
import CreateRescueRequest from "./CreateRescueRequest";
import FilterRescueRequest from "./FilterRescueReqeuest";

import '@fortawesome/fontawesome-free/css/all.min.css';
import RescueRequestBody from "./RescueRequestBody";
import { useEffect, useState } from "react";
import { fetchAllRequestAPI } from "../../service/api.service";


const RescueRequestPage = () => {

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
                    <div claclassNamess="row align-items-center">
                        <div className="col-lg-8">
                            <h1 className="fw-bolder display-5 mb-0">Cộng Đồng Cứu Trợ</h1>
                            <p className="text-white-50 mt-2 mb-0 lead">Kết nối người gặp nạn và các đội cứu hộ tình nguyện trên toàn quốc.</p>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container pb-5">
                <div className="row g-4">
                    <div className="col-lg-4" id="sosForm">
                        <CreateRescueRequest loadAllRequest={loadAllRequest} />
                    </div>
                    <div className="col-lg-8">
                        <FilterRescueRequest />
                        <RescueRequestBody dataRequest={dataRequest} />
                    </div>
                </div>
            </div>


        </>
    )


}

export default RescueRequestPage;