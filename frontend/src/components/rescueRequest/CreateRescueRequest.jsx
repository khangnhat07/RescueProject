
import { useEffect, useState } from "react";

import "./rescue.css"
import { CreateRequestAPI } from "../../service/api.service";
import useDebounce from "../../hook/useDebounce";

const CreateRescueRequest = (props) => {

    const { loadAllRequest } = props;
    const [address, setAddress] = useState("");
    const [detail, setDetail] = useState("");
    const [typeId, setTypeId] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const debouncedAddress = useDebounce(address, 500);

    const getCurrentDateTimeString = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const day = now.getDate().toString().padStart(2, "0");
        const month = (now.getMonth() + 1).toString().padStart(2, "0"); // tháng bắt đầu từ 0
        const year = now.getFullYear();

        return `${hours}:${minutes} ${day}/${month}/${year}`;
    };

    const resetInput = () => {
        setAddress("");
        setDetail("");
        setTypeId("");
    }



    const hanldeBtnCreate = async () => {
        const timeCreated = getCurrentDateTimeString();
        const res = await CreateRequestAPI(address, detail, timeCreated, typeId)
        if (res.data) {
            alert("Tạo yêu cầu cứu hộ thành công!");
            resetInput();
            await loadAllRequest();
        } else {
            alert("Tạo yêu cầu cứu hộ thất bại!");
        }
        console.log("check res: ", res)
    }
    const getMyLocation = () => {
        if (!navigator.geolocation) {
            alert("Trình duyệt không hỗ trợ định vị");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await res.json();

                    if (data && data.display_name) {
                        setAddress(data.display_name);
                    } else {
                        alert("Không tìm được địa chỉ");
                    }
                } catch (error) {
                    console.error(error);
                    alert("Lỗi khi lấy địa chỉ");
                }
            },
            (error) => {
                alert("Không thể lấy vị trí của bạn");
                console.error(error);
            }
        );
    };


    useEffect(() => {
        if (!debouncedAddress || debouncedAddress.length < 3) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${debouncedAddress}&countrycodes=vn&addressdetails=1&limit=5`
                );
                const data = await res.json();
                setSuggestions(data);
            } catch (error) {
                console.error("Lỗi gợi ý địa chỉ", error);
            }
        };

        fetchSuggestions();
    }, [debouncedAddress]);

    return (

        <div className="sticky-sos-sidebar">
            <div className="sos-widget">
                <div className="sos-header text-center">
                    <div className="mb-2">
                        <i className="fas fa-tower-broadcast fa-2x animate__animated animate__pulse animate__infinite"></i>
                    </div>
                    <h5 className="fw-bold mb-0 text-uppercase ls-1">Gửi Tín Hiệu SOS</h5>
                    <small className="opacity-75">Thông tin sẽ được gửi đến đội cứu hộ gần nhất</small>
                </div>

                <div className="p-4">
                    <form>
                        {/* VỊ TRÍ & TÌNH TRẠNG */}
                        <div className="mb-3">
                            <label className="form-label fw-bold small text-secondary">VỊ TRÍ &amp; TÌNH TRẠNG</label>

                            <div className="input-group mb-2">
                                <button className="btn btn-danger" type="button">
                                    <i className="fas fa-location-crosshairs"></i> GPS
                                </button>
                                <input type="text" className="form-control" placeholder="Tọa độ hoặc địa chỉ..."
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            {suggestions.length > 0 && (
                                <ul className="list-group position-absolute w-100 shadow-sm z-3">
                                    {suggestions.map((item) => (
                                        <li
                                            key={item.place_id}
                                            className="list-group-item list-group-item-action"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setAddress(item.display_name);
                                                setSuggestions([]);
                                            }}
                                        >
                                            {item.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div
                                className="get-location-text text-danger small fw-bold mt-1"
                                style={{ cursor: "pointer", width: "fit-content" }}
                                onClick={getMyLocation}
                            >
                                <i className="fas fa-location-crosshairs me-1"></i>
                                Lấy vị trí của tôi
                            </div>

                            <label className="form-label fw-bold small text-secondary">LOẠI CỨU HỘ</label>
                            <select className="form-select mb-2 fw-bold text-danger bg-danger bg-opacity-10 border-danger"
                                value={typeId}
                                onChange={(event) => setTypeId(event.target.value)}>
                                <option value="">Chọn loại cứu hộ</option>
                                <option value="1">Lương thực</option>
                                <option value="2">Cứu người</option>
                                <option value="3">Y tế</option>
                                <option value="4">Quần áo</option>
                            </select>

                            <textarea
                                className="form-control bg-light"
                                rows="3"
                                placeholder="Mô tả chi tiết tình hình, số lượng người..."
                                value={detail}
                                onChange={(event) => { setDetail(event.target.value) }}
                            />
                        </div>

                        {/* ẢNH */}
                        <div className="mb-4">
                            <label className="form-label fw-bold small text-secondary">HÌNH ẢNH (NẾU CÓ)</label>
                            <input type="file" className="form-control form-control-sm" />
                        </div>

                        {/* SUBMIT */}
                        <button type="button" className="btn btn-danger w-100 py-3 fw-bold rounded-pill shadow-sm hover-scale"
                            onClick={hanldeBtnCreate}>
                            <i className="fas fa-paper-plane me-2"></i>
                            PHÁT TÍN HIỆU NGAY
                        </button>

                        <p className="text-center mt-3 small text-muted fst-italic mb-0">
                            <i className="fas fa-shield-alt me-1 text-success"></i>
                            Dữ liệu được bảo mật và xác minh.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateRescueRequest;
