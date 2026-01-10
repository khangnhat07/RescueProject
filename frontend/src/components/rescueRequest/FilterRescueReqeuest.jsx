import { useState } from "react";
import { fetchAllRequestByVictimAPI, filterStatusRequestAPI, searchRequestByKeywordAPI } from "../../service/api.service";
import { useAuth } from "../../context/AuthContext";

const FilterRescueRequest = (props) => {

    const { loadAllRequest, setDataRequest, dataRequest } = props;
    const [statusFilter, setStatusFilter] = useState("");
    const { user } = useAuth()
    const [searchTerm, setSearchTerm] = useState("");
    const myRequestsCount = dataRequest.filter(item => item.victim?.email === user?.email).length;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    };

    const performSearch = async () => {
        // Nếu ô tìm kiếm trống, load lại toàn bộ danh sách
        if (!searchTerm.trim()) {
            await loadAllRequest();
            return;
        }

        try {
            const res = await searchRequestByKeywordAPI(searchTerm);
            if (res && res.data) {
                setDataRequest(res.data);
                setStatusFilter(""); // Reset bộ lọc status khi tìm kiếm theo từ khóa
            }
        } catch (error) {
            console.error("Lỗi tìm kiếm:", error);
        }
    };




    const handleFilter = async (status) => {
        setStatusFilter(status);
        setSearchTerm("");

        if (status === "") {
            await loadAllRequest();
            return;
        }
        const res = await filterStatusRequestAPI(status);
        console.log("Filter result: ", res.data);

        setDataRequest(res.data);

    };

    const fetchAllRequestByVictim = async () => {
        const res = await fetchAllRequestByVictimAPI();
        console.log("Filter result: ", res.data);

        setDataRequest(res.data);
    }

    return (
        <>
            <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                    <h5 className="fw-bold mb-3 text-dark"><i className="fas fa-filter me-2 text-primary"></i>Bộ lọc tìm kiếm</h5>
                    <div className="row g-3">
                        <div className="col-md-8">
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0"><i className="fas fa-search text-muted"></i></span>
                                <input type="text"
                                    className="form-control border-start-0 ps-0"
                                    placeholder="Tìm theo SĐT hoặc địa chỉ..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleKeyDown} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <select className="form-select"
                                value={statusFilter}
                                onChange={(event) => handleFilter(event.target.value)}>
                                <option value="">Tất cả trạng thái</option>
                                <option value="WAITING_ACCEPT" className="text-danger fw-bold">Đang chờ cứu</option>
                                <option value="IN_PROCESS" className="text-primary fw-bold">Đang xử lý</option>
                                <option value="COMPLETE" className="text-success fw-bold">Đã an toàn</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <ul className="nav nav-pills mb-4 overflow-auto flex-nowrap pb-2" id="pills-tab">
                <li className="nav-item"><button className="nav-link active"
                    onClick={async () => {
                        setStatusFilter("");
                        setSearchTerm("");
                        await loadAllRequest();
                    }}>Tất cả tin báo</button></li>
                <li className="nav-item"><button className="nav-link"
                    onClick={async () => {
                        await fetchAllRequestByVictim();
                    }}>Tin của tôi
                    <span className="badge rounded-pill bg-primary ms-2" style={{ fontSize: '0.7rem' }}>
                        {myRequestsCount > 0 ? myRequestsCount : 0}
                    </span>
                </button></li>
            </ul>
        </>
    )
}

export default FilterRescueRequest;