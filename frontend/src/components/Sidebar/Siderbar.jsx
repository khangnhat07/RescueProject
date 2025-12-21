import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Nếu bạn dùng React Router
import { api } from "../config/api";
import "../../assets/css/Blog.css";

const Sidebar = ({ onFilterChange, activeCategoryId }) => {
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    api.get("/blogs/categories")
      .then(res => setCategories(res.data.data || res.data))
      .catch(err => console.error("Lỗi lấy chuyên mục", err));

    api.get("/blogs?limit=5")
      .then(res => setTrending((res.data.data || res.data).slice(0, 4)))
      .catch(err => console.error(err));
  }, []);

  // LIVE SEARCH: Chỉ chạy khi keyword thay đổi
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilterChange(activeCategoryId, keyword);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]); // Bỏ activeCategoryId khỏi đây để tránh gọi trùng lặp khi click category

  return (
    <div className="blog-sidebar">
      {/* SEARCH */}
      <div className="card border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
        <div className="card-header bg-dark text-white border-0 py-3">
          <h6 className="mb-0 fw-bold"><i className="fas fa-search me-2"></i>TÌM KIẾM TIN TỨC</h6>
        </div>
        <div className="card-body p-3">
          <div className="search-input-group position-relative">
            <input
              type="text"
              className="form-control form-control-lg fs-6 border-0 bg-light rounded-3 pe-5"
              placeholder="Nhập nội dung cần tìm..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword && (
              <span 
                className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer text-muted"
                onClick={() => setKeyword("")}
                style={{ cursor: 'pointer', zIndex: 5 }}
              >
                <i className="fas fa-times-circle"></i>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="card border-0 shadow-sm mb-4 rounded-4">
        <div className="card-header bg-white border-bottom py-3">
          <h6 className="mb-0 fw-bold text-uppercase">Chuyên Mục</h6>
        </div>
        <div className="list-group list-group-flush p-2">
          <button
            className={`list-group-item list-group-item-action border-0 rounded-3 mb-1 ${!activeCategoryId ? 'active-cat-item fw-bold' : ''}`}
            onClick={() => { setKeyword(""); onFilterChange(null, ""); }}
          >
            <i className="fas fa-th-large me-2"></i> Tất cả bài viết
          </button>
          
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`list-group-item list-group-item-action border-0 rounded-3 mb-1 d-flex justify-content-between align-items-center ${activeCategoryId === cat.id ? 'active-cat-item fw-bold' : ''}`}
              onClick={() => onFilterChange(cat.id, keyword)}
            >
              <span><i className="fas fa-chevron-right me-2 small"></i> {cat.categoryName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TRENDING */}
      <div className="card border-0 shadow-sm mb-4 rounded-4">
        <div className="card-header bg-white border-bottom py-3">
          <h6 className="mb-0 fw-bold text-uppercase">Đáng chú ý</h6>
        </div>
        <div className="card-body p-0">
          {trending.map(blog => (
            <Link to={`/blog/${blog.id}`} key={blog.id} className="d-flex align-items-center p-3 text-decoration-none border-bottom last-child-border-0 trending-hover text-dark">
              <div className="flex-grow-1">
                <small className="text-muted d-block mb-1" style={{fontSize: '11px'}}>
                  <i className="far fa-calendar-alt me-1"></i> {new Date(blog.time).toLocaleDateString('vi-VN')}
                </small>
                <h6 className="mb-0 fw-semibold small line-clamp-2">{blog.title}</h6>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* APP PROMO */}
      <div className="promo-banner bg-primary rounded-4 p-4 text-center text-white shadow">
        <div className="icon-circle mb-3 mx-auto bg-white text-primary d-flex align-items-center justify-content-center" style={{width:'50px', height:'50px', borderRadius:'50%'}}>
          <i className="fas fa-bell fa-lg text-warning"></i>
        </div>
        <h6 className="fw-bold">NHẬN TIN KHẨN CẤP</h6>
        <p className="small opacity-75 mb-3">Tải App SAR Vietnam để nhận thông báo cứu hộ ngay lập tức.</p>
        <button className="btn btn-light btn-sm fw-bold px-4 rounded-pill">CÀI ĐẶT NGAY</button>
      </div>
    </div>
  );
};

export default Sidebar;