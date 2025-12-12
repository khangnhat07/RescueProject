

const FilterRescueRequest = () => {

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
                            <select className="form-select">
                                <option>Tất cả trạng thái</option>
                                <option className="text-danger fw-bold">Đang chờ cứu</option>
                                <option className="text-primary fw-bold">Đang xử lý</option>
                                <option className="text-success fw-bold">Đã an toàn</option>
                            </select>
                        </div>

                        <div className="col-md-2">
                            <button className="btn btn-dark w-100 fw-bold">Lọc tin</button>
                        </div>
                    </div>
                </div>
            </div>

            <ul className="nav nav-pills mb-4 overflow-auto flex-nowrap pb-2" id="pills-tab">
                <li className="nav-item"><button className="nav-link active">Tất cả tin báo</button></li>
                <li className="nav-item"><button className="nav-link">Đang chờ <span className="badge bg-danger ms-1">5</span></button></li>
                <li className="nav-item"><button className="nav-link">Đã an toàn <i className="fas fa-check-circle ms-1 text-success"></i></button></li>
                <li className="nav-item"><button className="nav-link">Tin của tôi</button></li>
            </ul>
        </>
    )
}

export default FilterRescueRequest;