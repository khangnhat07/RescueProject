import { useState } from "react";
import { fetchAllRequestByVictimIdAPI, filterStatusRequestAPI } from "../../service/api.service";

const FilterRescueRequest = (props) => {

    const { loadAllRequest, setDataRequest } = props;
    const [statusFilter, setStatusFilter] = useState("");

    const handleFilter = async (status) => {
        setStatusFilter(status);

        if (status === "") {
            await loadAllRequest();
            return;
        }
        const res = await filterStatusRequestAPI(status);
        console.log("Filter result: ", res.data);

        setDataRequest(res.data);

    };

    const fetchAllRequestByVictim = async (id) => {
        const res = await fetchAllRequestByVictimIdAPI(id);
        console.log("Filter result: ", res.data);

        setDataRequest(res.data);
    }

    return (
        <>
            <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                    <h5 className="fw-bold mb-3 text-dark"><i className="fas fa-filter me-2 text-primary"></i>Bộ lọc tìm kiếm</h5>
                    <div className="row g-3">
                        <div className="col-md-5">
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0"><i className="fas fa-search text-muted"></i></span>
                                <input type="text" className="form-control border-start-0 ps-0" placeholder="Tìm theo tên, SĐT (3 số cuối)..." />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select"
                                value={statusFilter}
                                onChange={(event) => handleFilter(event.target.value)}>
                                <option value="">Tất cả trạng thái</option>
                                <option value="Đang chờ tiếp nhận" className="text-danger fw-bold">Đang chờ cứu</option>
                                <option value="Đội cứu hộ đang đến" className="text-primary fw-bold">Đang xử lý</option>
                                <option value="Hoàn thành" className="text-success fw-bold">Đã an toàn</option>
                            </select>
                        </div>

                        <div className="col-md-2">
                            <button className="btn btn-dark w-100 fw-bold">Lọc tin</button>
                        </div>
                    </div>
                </div>
            </div>

            <ul className="nav nav-pills mb-4 overflow-auto flex-nowrap pb-2" id="pills-tab">
                <li className="nav-item"><button className="nav-link active"
                    onClick={async () => {
                        setStatusFilter("");
                        await loadAllRequest();
                    }}>Tất cả tin báo</button></li>
                <li className="nav-item"><button className="nav-link"
                    onClick={async () => {
                        // Example victim ID = 2
                        await fetchAllRequestByVictim(2);
                    }}>Tin của tôi</button></li>
            </ul>
        </>
    )
}

export default FilterRescueRequest;