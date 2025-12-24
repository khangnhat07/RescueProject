import { useEffect, useState } from "react";
import AdminListRequest from "./AdminListRequest";
import { fetchAllRequestAPI } from "../../service/api.service";


const AdminRescueRequestPage = () => {

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
            <div>Admin Rescue Request Page</div>
            <AdminListRequest dataRequest={dataRequest}
                loadAllRequest={loadAllRequest} />
        </>
    )

};
export default AdminRescueRequestPage